# PhotoMap
### A map to visualize your travels. Show the world where you've been.

![A map of the US](screenshots/map.png)

# Downloading
There are 4 important things to include in your HTML file in order to use PhotoMap
- The modified Raphael file provided (same as original with some additions)
- An SVG file containing your map information (in the right format)
- The CSS file provided (or slightly modify your own)
- The PhotoMap.js file

# The SVG File
This is where all the paths for your maps come from. The format of the SVG file is important, so if you are going to add your own follow the template provided. The IDs correspond to the names of the folders in the "images" folder, which is where your images will be placed. The images should be named in incrementing order, designating when they should appear. So for example, if you had 3 pictures for your trip to Hawaii, they should be named:
`0.jpg`,
`1.jpg`,
`2.jpg`. Note, the labeling is zero-based.

# Usage
Creating a photomap variable is very simple:
```
var map = photomap(100,200,1000,500, varName);
//photomap(posX,posY,width,height,variable)
```
The above code creates an absoutely-positioned map with width = 1000 and height = 500 at position (100, 200).

Alternatively, you can insert photomaps into div elements:

**HTML**
```
<div id = "mapHolder">
</div>
```

**JavaScript**
```
var map = photomap("mapHolder", 1000, 500, varName);
//photomap(element, width, height, variable)
```

The variable in the constructor is the name of the variable holding all of the path elements. For example, to use the usmap.svg file provided, one would use:
```
var map = photomap("mapHolder", 1000, 500, usMap);
```

# Slideshow
When elements with images are clicked on, a simple slideshow interface will pop up to allow you to show the images on a bigger screen. An example is shown below

![A slideshow sample from Alaska](screenshots/slideshow.png)

# Improvements to come:
- Better web support
- More customization
- Faster load times
- More provided SVG maps
- PNG support

