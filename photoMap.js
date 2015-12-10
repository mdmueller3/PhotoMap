var listOfStates = [];
var statesWithImages = []; //not used
//eventually combine these

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

function photomap(posX, posY, width, height, scale, mapName){
	var paper = Raphael(posX,posY,width,height);

	paper.setStart();
	for(var path in mapName){

		var state = paper.path(mapName[path]);
		state.attr("stroke-width",2);
		state.attr("stroke", "gray");
		state.attr("fill","white");
	
		listOfStates.push(path);

		var tfm = 'S'.concat(scale).concat(',').concat(scale).concat(',0,0');

		state.transform(tfm);

		pullImages(state, listOfStates[state.id]);

	};
	var elementSet = paper.setFinish();

	this.setHoverEffect = function(hover, exit, transition){
		hoverEffect = true;
		hoverColor = hover;
		exitColor = exit;
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
	}

	this.setFlipSpeed = function(speed){
		flipSpeed = speed;
	}

	ready = true;

	return this;
};

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
				//Open slideshow
				var slideshowBackground = document.getElementById('slideshowBackground');
				slideshowBackground.style.backgroundColor = 'black';
				slideshowBackground.style.zIndex = 0;

				var slideshowHolder = document.getElementById('slideshow');
				slideshowHolder.style.zIndex = 1;
				var img = new Image();
				img.src = 'images/hi/0.jpg';
				slideshowHolder.appendChild(img);
				
				if(img.height > img.width){
					img.className = "slideImageHeight";
				}
				else{
					img.className = "slideImageWidth";
				}

				var x = new Image();
				x.src = "logos/x.png";
				x.id = "x";
				slideshowHolder.appendChild(x);
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
		var path = 'images/'.concat(stateHoveredId).concat('/').concat(pathNum).concat('.jpg');
		this.pathNum++;

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


