var listOfStates = [];
var images = [];
//eventually combine these
var hoverEffect = false;

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



	this.setHoverEffect = function(hoverColor, exitColor, transitionTime){

		var over = function(){
			this.stop().animate({fill: hoverColor.toString()}, transitionTime);
		};

		var out = function(){
			this.stop().animate({fill: exitColor.toString()}, transitionTime);
		};
		elementSet.hover(over, out);
	}

	return this;

};

function pathExists(path, callback){
	var img = new Image();
	// img.onerror = function(){alert("error"); return false;};

	img.onload = function(){callback(true);};
	img.onerror = function(){callback(false);};

	img.src = path;

}

function pullImages(state, id){
	// alert(id); // returns the initials of the state (the path)
	var path = 'images/'.concat(id).concat('/0.jpg');

	pathExists(path, function(exists){
		if(exists){
			var url = 'url('.concat(path).concat(')');
			state.attr('fillfit',url);
		}
	});

}


function hideImages(state, id){
	for(var i = 0; i < images.length; i++){
		if(images[i].id == id){
			var image = images[i];
			images.splice(i, 1);

			var div = document.getElementById('holder');
			div.removeChild(image);

		}
	}

}
