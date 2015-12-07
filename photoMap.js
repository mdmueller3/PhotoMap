var listOfStates = [];
var statesWithImages = [];
//eventually combine these

var hoverEffect = false;
var hoverColor;
var exitColor;
var transition;

function photomap(posX, posY, width, height, scale){
	var paper = Raphael(posX,posY,width,height);

	paper.setStart();
	for(var path in usMap){

		var state = paper.path(usMap[path]);
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
