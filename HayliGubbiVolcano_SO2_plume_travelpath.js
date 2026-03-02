// AUTOMATICALLY GENERATED: imported vars from saved link.
var CONVERT_TO_IMPORT = (
[{"type":"geometry","name":"volcano","record":{"geometries":[{"type":"Polygon","coordinates":[[[40.67491967219028,13.545064962751429],[40.67491967219028,13.470955705177978],[40.75697381037387,13.470955705177978],[40.75697381037387,13.545064962751429]]],"geodesic":false,"evenOdd":true}],"displayProperties":[{"type":"rectangle"}],"properties":{},"color":"#d63000","mode":"Geometry","shown":false,"locked":false}},{"type":"geometry","name":"region","record":{"geometries":[{"type":"Polygon","coordinates":[[[28.0216381624247,34.14350018587247],[28.0216381624247,6.555312991843559],[93.9396069124247,6.555312991843559],[93.9396069124247,34.14350018587247]]],"geodesic":false,"evenOdd":true}],"displayProperties":[{"type":"rectangle"}],"properties":{},"color":"#d63000","mode":"Geometry","shown":false,"locked":false}}])

// AUTOMATICALLY GENERATED: location from saved link.
Map.setCenter(264.8, 34.8, 4)

// Define the volcano location
var volcano = ee.Geometry.Point([40.78, 13.82]); // Hayli Gubbi coordinates

// Load Sentinel-5P SO2 data for the eruption period - NO filterBounds
var so2Collection = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_SO2')
  .select('SO2_column_number_density')
  .filterDate('2025-11-23', '2025-11-29');

print('SO2 Collection:', so2Collection);
print('Number of images:', so2Collection.size());

// Define threshold for volcanic SO2 (filter out background)
var so2Threshold = 0.0003; // Only show values above this

// Function to mask low SO2 values
var maskLowSO2 = function(image) {
  var mask = image.gt(so2Threshold); // Greater than threshold
  return image.updateMask(mask);
};

// Get specific dates using mosaic and apply mask
var nov23 = so2Collection
  .filterDate('2025-11-23', '2025-11-24')
  .mosaic()
  .updateMask(so2Collection.filterDate('2025-11-23', '2025-11-24').mosaic().gt(so2Threshold));

var nov24 = so2Collection
  .filterDate('2025-11-24', '2025-11-25')
  .mosaic()
  .updateMask(so2Collection.filterDate('2025-11-24', '2025-11-25').mosaic().gt(so2Threshold));

var nov25 = so2Collection
  .filterDate('2025-11-25', '2025-11-26')
  .mosaic()
  .updateMask(so2Collection.filterDate('2025-11-25', '2025-11-26').mosaic().gt(so2Threshold));

var nov26 = so2Collection
  .filterDate('2025-11-26', '2025-11-27')
  .mosaic()
  .updateMask(so2Collection.filterDate('2025-11-26', '2025-11-27').mosaic().gt(so2Threshold));
  
var nov27 = so2Collection
  .filterDate('2025-11-27', '2025-11-28')
  .mosaic()
  .updateMask(so2Collection.filterDate('2025-11-27', '2025-11-28').mosaic().gt(so2Threshold));
  
var nov28 = so2Collection
  .filterDate('2025-11-28', '2025-11-29')
  .mosaic()
  .updateMask(so2Collection.filterDate('2025-11-28', '2025-11-29').mosaic().gt(so2Threshold));

// Visualization parameters - only red/orange colors for the plume
var so2VizPlume = {
  min: 0.0003,
  max: 0.002,
  palette: ['yellow', 'orange', 'red', 'darkred']
};

// Center map on the volcano
Map.setCenter(40.78, 13.82, 5);

// Add layers for each day - only the plume will be visible
Map.addLayer(nov23, so2VizPlume, 'Nov 23 - Initial Eruption', true);
Map.addLayer(nov24, so2VizPlume, 'Nov 24 - Eastward Drift', true);
Map.addLayer(nov25, so2VizPlume, 'Nov 25 - Continued Dispersal', false);
Map.addLayer(nov26, so2VizPlume, 'Nov 26 - Extended Plume', false);
Map.addLayer(nov27, so2VizPlume, 'Nov 27 - Further East', false);
Map.addLayer(nov28, so2VizPlume, 'Nov 28 - Final Dispersal', false);

// Add volcano marker prominently
var volcanoVis = {
  color: 'red',
  pointSize: 8,
  pointShape: 'circle',
  width: 3
};
Map.addLayer(volcano, volcanoVis, 'Hayli Gubbi Volcano (Source)');

// Print dates to verify data availability
print('Nov 23 image date:', nov23.bandNames());
print('Nov 24 image date:', nov24.bandNames());

/////////////////////////////////////////////////////////////////

var text = require('users/gena/packages:text');
var animation = require('users/gena/packages:animation');
var palettes = require('users/gena/packages:colorbrewer').Palettes;
var roi =region//volcano.buffer(1500000);   // 1500 km radius around volcano
var bounds = roi.bounds();
var so2Frames = ee.ImageCollection([
  nov23.set('date_label', '2025-11-23'),
  nov24.set('date_label', '2025-11-24'),
  nov25.set('date_label', '2025-11-25'),
  nov26.set('date_label', '2025-11-26'),
  nov27.set('date_label', '2025-11-27'),
  nov28.set('date_label', '2025-11-28')
]);
var so2_video = so2Frames.map(function(image) {

  var label = ee.String(image.get('date_label'));

  // RGB Visualization (SO₂ Plume)
  var visImage = image.visualize({
    forceRgbOutput: true,
    min: 0.0003,
    max: 0.002,
    palette: ['yellow', 'orange', 'red', 'darkred']
  }).clip(roi);

  // Annotate the date on the image
  var annotations = [{
      position: 'left',
      offset: '1%',
      margin: '2%',
      property: 'date_label',
      scale: Map.getScale() * 2
  }];

  var annotated = text.annotateImage(visImage.set('date_label', label),
                                    {}, bounds, annotations);

  return annotated;
});
// animation.animate(so2_video, {
//   maxFrames: so2_video.size(),
//   speed: 0.1   // slower = smooth
// });
var repeatCount = 6; // how many times each frame repeats

var repeatedList = so2_video.toList(so2_video.size())
  .map(function(img) {
    return ee.List.repeat(img, repeatCount);
  })
  .flatten();   // Important: produce a flat list

var slowMotionCollection = ee.ImageCollection(repeatedList);

animation.animate(slowMotionCollection, {
  maxFrames: slowMotionCollection.size(),
  speed: 0.5  // 0.1 = very slow, 1 = fast
});


var gifParams = {
  region: bounds,
  dimensions: 900,
  framesPerSecond: 2
};

print('GIF Download URL:',
      so2_video.getVideoThumbURL(gifParams));