# PhotoMap
Create a map to show your travels. Shows where you've been or where you want to go. Alternatively, creates a cool map with awesome hover features

# Downloading
There are 4 important things to include in your HTML file in order to use PhotoMap
- The modified Raphael file provided (same as original with some additions)
- An SVG file containing your map information (in the right format)
- The CSS file provided (or slightly modify your own)
- The PhotoMap.js file

# The SVG File
This is where all the paths for your maps come from. The format of the SVG file is important, so if you are going to add you're own follow the template used by the ones provided. The ids correspond to the names of the folders in the "images" folder, which is where your images will be placesd.

# Usage
Creating a photomap variable is very simple:
```
var map = photomap(100,200,1000,500,1,usMap);
//photomap(posX,posY,width,height,scale,variable)
```
The above code creates a map with width = 1000 and height = 500 at position (100, 200).

# Improvements to come:
- Better web support
- More customization
- Faster load times
- More provided SVG maps

