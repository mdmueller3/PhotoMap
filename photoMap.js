var states = []; // Raphael objects
var ids = []; // IDs ('hi')
var numImages = new Array(); // Hopefully lines up with the above




var hoverEffect = false;
var hoverColor;
var exitColor;
var transition;

var strokeWidth = 2;

var flip = true;
var flipSpeed = 800;

var stateHovered;
var stateHoveredId;
var pathNum = 0;

var slideNum = 0;

var lineColor = "black";
var fillColor = "white";

function photomap(posX, posY, width, height, scale, mapName){

	var paper;
	if(typeof(posX) === 'string'){
		paper = Raphael(posX, posY, width);
		mapName = scale;
		scale = height;

	}
	else{
		paper = Raphael(posX,posY,width,height);
	}
	
	paper.setStart();

	var index = 0;
	for(var path in mapName){

		var state = paper.path(mapName[path]);
		state.attr("stroke-width",2);
		state.attr("stroke", lineColor);
		state.attr("fill","white");
	
		ids.push(path); // ID ('hi')
		states.push(state); // Raphael object

		var tfm = 'S'.concat(scale).concat(',').concat(scale).concat(',0,0');


		state.transform(tfm);

		numImages[index] = 0;
		countImages(path, index);
		pullImages(state, ids[state.id]);

	};
	var elementSet = paper.setFinish();

	this.setHoverEffect = function(hover, transition){
		hoverEffect = true;
		hoverColor = hover;
		exitColor = fillColor;
		transitionTime = transition;
	};

	this.setSize = function(width, height){
		paper.setSize(width, height);
	};

	this.setWidth = function(width){
		paper.setSize(width, paper.height);
	};

	this.setHeight = function(height){
		paper.setSize(paper.width, height);
	};

	this.setStrokeWidth = function(width){
		strokeWidth = width;
		elementSet.forEach(function(state){
			state.attr({"stroke-width": width});
		});
	}

	this.setFlipSpeed = function(speed){
		flipSpeed = speed;
	}

	this.setLineColor = function(color){
		lineColor = color;
		elementSet.forEach(function(state){
			state.attr({"stroke": color});
		});
	}

	this.setFillColor = function(color){
		fillColor = color;
		elementSet.forEach(function(state){
			state.attr({fill: color});
		});
		setHoverEffect(hoverColor, transitionTime);
	}

	ready = true;

	return this;
};

function countImages(id, index){

	var keepGoing = true;

	var pathNum = 0;
	while(keepGoing){
		var img = new Image();
		var path = 'images/'.concat(id).concat('/').concat(pathNum).concat('.jpg');

		img.src = path;


		keepGoing = false;
	}
	// alert(id + " : " + numImages[index]);
}

function pathExists(path, callback){
	var img = new Image();
	// img.onerror = function(){alert("error"); return false;};

	// What occurs on load
	img.onload = function(){callback(true);};

	// What occurs on error
	img.onerror = function(){callback(false);};

	img.src = path;
}

function backToOriginal(state, id){
	var path = 'images/'.concat(id).concat('/0.jpg');
	var url = 'url('.concat(path).concat(')');
	state.attr('fillfit',url);
}

//DISABLING AND ENABLING SCROLLING

var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null;  
}
// - - - 

function pullImages(state, id){
	// alert(id); // returns the initials of the state (the path)
	var path = 'images/'.concat(id).concat('/0.jpg');

	// Path exists function - checks whether the path exists
	pathExists(path, function(exists){

		// Checks if path exists
		if(exists){
			// if path exists, use url to fill state
			var url = 'url('.concat(path).concat(')');
			state.attr('fillfit',url);

			if(flip){
				var hoverTransition = function(){
					stateHovered = state;
					stateHoveredId = id;
					var newStrokeWidth = state.attr("stroke-width") + 2;
					state.attr("stroke-width", newStrokeWidth);
				};
				var exitTransition = function(){
					backToOriginal(stateHovered, stateHoveredId);
					state.attr("stroke-width", strokeWidth);
					stateHovered = null;
					stateHoveredId = null;
				};
				state.hover(hoverTransition,exitTransition);

			}




			var clicked = function(){
				disableScroll();

				//Open slideshow
				var slideshowBackground = document.getElementById('slideshowBackground');
				slideshowBackground.style.backgroundColor = 'black';
				slideshowBackground.style.zIndex = 0;

				var slideshowHolder = document.getElementById('slideshow');
				slideshowHolder.style.zIndex = 1;


				var imageNum = 0; //The image you're on

				var path = 'images/'.concat(id).concat('/').concat(imageNum).concat('.jpg');

				var img = new Image();
				img.src = path;
				img.className = "slideImage";

				slideshowHolder.appendChild(img);




				// RIGHT ARROW STUFF
				var rightArrowHolder = document.getElementById('right');
				var rightArrow = new Image();
				rightArrow.src = "logos/right.png";
				rightArrow.id = "rightArrow";


				var rightClicked = function(){
					imageNum++;
					path = 'images/'.concat(id).concat('/').concat(imageNum).concat('.jpg');

					var error = function(){
						imageNum = imageNum - 2;
						rightClicked();
					}

					img.onerror = function(){error();};
					img.src = path;
					
				}

				rightArrow.onclick = function(){
					rightClicked();
				}
				rightArrowHolder.appendChild(rightArrow);


				// LEFT ARROW STUFF
				var leftArrowHolder = document.getElementById('left');
				var leftArrow = new Image();
				leftArrow.src = "logos/left.png";
				leftArrow.id = "leftArrow";

				var leftClicked = function(){
					imageNum--;
					path = 'images/'.concat(id).concat('/').concat(imageNum).concat('.jpg');

					var error = function(){
						imageNum = imageNum + 2;
						leftClicked();
					}

					img.onerror = function(){error();};
					img.src = path;
				}

				leftArrow.onclick = function(){
					leftClicked();
				}
				leftArrowHolder.appendChild(leftArrow);

				// X STUFF
				var xHolder = document.getElementById('xHolder');
				var x = new Image();
				x.src = "logos/x.png";
				x.id = "x";
				x.onclick = function(){
					imageNum = 0;
					slideshowHolder.removeChild(img);
					slideshowBackground.style.backgroundColor = 'transparent';
					slideshowBackground.style.zIndex = -1;
					xHolder.removeChild(x);
					leftArrowHolder.removeChild(leftArrow);
					rightArrowHolder.removeChild(rightArrow);
					enableScroll();
				}
				xHolder.appendChild(x);

			}
			state.click(clicked);
		}
		// If path doesn't exist, but hoverEffect is true, add hover effect
		else if(hoverEffect == true){
			// Hover effect
			var over = function(){
				state.stop().animate({fill: hoverColor}, transitionTime);
			}
			// Exit effect
			var out = function(){
				state.stop().animate({fill: exitColor}, transitionTime);
			};

			// Add the hover
			state.hover(over, out);
		};
	});

}

function hideImages(state, id){
	for(var i = 0; i < statesWithImages.length; i++){
		if(statesWithImages[i].id == id){
			var image = statesWithImages[i];
			statesWithImages.splice(i, 1);

			var div = document.getElementById('holder');
			div.removeChild(image);

		}
	}

}


setInterval(function(){
	//called every 500 milliseconds
	if(stateHovered != null){

		this.pathNum++;
		var path = 'images/'.concat(stateHoveredId).concat('/').concat(pathNum).concat('.jpg');


		var img = new Image();
		img.onload = function(){
			nextImage();
		}
		img.onerror = function(){
			original();
		}
		img.src = path;

		function nextImage(){
			var url = 'url('.concat(path).concat(')');
			stateHovered.attr('fillfit',url);

		}

		function original(){
			this.pathNum = 0;
			path = 'images/'.concat(stateHoveredId).concat('/').concat(pathNum).concat('.jpg');
			var url = 'url('.concat(path).concat(')');
			stateHovered.attr('fillfit',url);
		}

	};

}, flipSpeed);



