---
date: "2025-07-20T16:00:00"
title: "Creating a map of Argentina's rivers"
---

{{ img(src="./assets/argentina_rivers.png", class="dark-invert", alt="Map of Argentina rivers") }}

For the past decade I've used [mbostock's map of U.S. Rivers](https://github.com/mbostock/us-rivers) as my desktop wallpaper. It was a perfect fit in an ideological and literal sense: water is an underappreciated (and [mismanaged](https://www.propublica.org/series/killing-the-colorado)) resource, especially in the American Southwest, and the dimensions of the U.S. roughly matches 16:10 laptop displays.

I've recently spent a lot of time in Argentina, so I wanted something similar for my adopted home. I used Perplexity Research to find data sources for rivers/waterways of Argentina, and it led me to the [HydroRIVERS South America dataset](https://www.hydrosheds.org/products/hydrorivers). I then used Claude Code to [vibe-code](https://github.com/sllvn/argentina-rivers) a similar map of Argentina's waterways. I don't have much background with GIS or spatial data, but with some guidance (esp. with image skew/dimensions), it created a script to generate a map for Argentina. It even generated intermediate analysis scripts which it used to debug problems as I pointed them out.

The whole process took less than an hour and it's great to get a sense of the major rivers: the [Paraná](https://en.wikipedia.org/wiki/Paran%C3%A1_River), [Negro](https://en.wikipedia.org/wiki/R%C3%ADo_Negro_(Argentina)), [Bermejo](https://en.wikipedia.org/wiki/Bermejo_River), [Pilcomayo](https://en.wikipedia.org/wiki/Pilcomayo_River), and [Colorado](https://en.wikipedia.org/wiki/Colorado_River_(Argentina)) are all plainly visible. (While the [Uruguay](https://en.wikipedia.org/wiki/Uruguay_River) is second-largest, it forms the border with Uruguay and was filtered out.)

[Full-size image (1600x2400)](./assets/argentina_rivers_large.png)
