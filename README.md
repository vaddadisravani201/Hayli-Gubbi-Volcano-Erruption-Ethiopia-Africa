Monitoring the Historic Hayli Gubbi Volcano Eruption - November 2025.

On 23 November 2025, the Hayli Gubbi Volcano in Ethiopia’s Afar region erupted explosively for the first time in over 10,000 years, sending ash and sulfur dioxide (SO₂) up to 13–15 km into the atmosphere and triggering aviation alerts across multiple regions.
To analyze this rare event, I developed two satellite-based workflows using Google Earth Engine and open EO datasets - Sentinel-2 & Sentinel-5P.

1. Using Sentinel-2 Surface Reflectance imagery, I generated a time-lapse visualization of the volcano and surrounding area :
Applied 5% cloud filtering.
Created true-color RGB composites for all low-cloud passovers.
Annotated each frame with date, coordinates, and volcano name.
Produced a timelapse showing changes before and after the eruption.
Outcome:
This workflow captures visual evidence of eruptive activity providing spatial context for impacts near the volcano.

2. Atmospheric SO₂ Plume Tracking (Sentinel-5P): 
To assess plume transport and broader impacts, I analyzed Sentinel-5P TROPOMI SO₂ data for 23–28 November 2025:
Isolated volcanic SO₂ signals using threshold-based masking.
Generated daily mosaics to track plume evolution.
Visualized eastward plume transport using custom color palettes.
Created an SO₂ dispersion sequence.
Outcome:
The analysis clearly shows long-range SO₂ transport across the Red Sea, Arabian Peninsula, and toward South Asia, explaining aviation disruptions and air-quality concerns far from the eruption source.

 Why This Matters ?
a. Demonstrates how remote eruptions can have global consequences, especially for aviation.
b. Highlights the power of satellite data for rapid hazard assessment.
c. Shows the value of combining high-resolution optical imagery with atmospheric trace-gas observations.
Reinforces the importance of continuous volcanic monitoring, even for historically inactive systems.

Tools & Data Used: 
Google Earth Engine (Python).
Google Earth Engine (Javascript) for SO2 plume travel.
Sentinel-2 SR (surface monitoring).
Sentinel-5P TROPOMI SO₂ (plume tracking).
<img width="1902" height="924" alt="image" src="https://github.com/user-attachments/assets/7cccb35d-dda9-4d8d-9a69-82c0a147213c" />

<img width="1919" height="833" alt="image" src="https://github.com/user-attachments/assets/a864f82a-5d41-488f-96d8-09a241ce31d4" />
