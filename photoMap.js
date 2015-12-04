var listOfStates = [];

function photomap(posX, posY, width, height, scale){
	var paper = Raphael(posX,posY,width,height);

	paper.setStart();
	for(var path in usMap){

		var state = paper.path(usMap[path]);
		state.attr("stroke-width",0.5);
		state.attr("fill","white");
	
		listOfStates.push(path);

		var tfm = 'S'.concat(scale).concat(',').concat(scale).concat(',0,0');

		state.transform(tfm);


	};
	var elementSet = paper.setFinish();

	var over = function(){
		// this.stop().animate({fill: "#eeffff"},0);
		pullImages(this, listOfStates[this.id]);
	};

	var out = function(){
		this.stop().animate({fill: "white"},100);
	};

	elementSet.hover(over, out);
};

function pathExists(path){
	var img = new Image();
	// img.onload = function(){return true;};
	img.onerror = function(){return false;};
	
	img.src = path;
	return true;
}

function pullImages(state, id){
	// alert(id); // returns the initials of the state (the path)
	var path = 'images/'.concat(id).concat('/0.jpg');
	// if(pathExists(path)){
	// 	alert("420 blaze it");
	// 	var img = new Image();
	// 	var div = document.getElementById('holder');
	// 	img.onload = function(){
	// 		div.appendChild(img);
	// 	}
	// 	img.src = path;
	// }
	// else{
	// 	state.stop().animate({fill: "#eeffff"},0); // animate
	// }

	var img = new Image();
	var div = document.getElementById('holder');
	img.onload = function(){
		div.appendChild(img);	
	}
	img.onerror = function(){
		state.stop().animate({fill: "#eeffff"},0);
	}
	img.src = path;

}

$(document).ready(function(){
	// function pullImages(state, id){
	// 	state.stop().animate({fill: "#eeffff"},0);
	// };
	$.fn.pullImages = function(state,id){
		state.stop().animate({fill: "#eeffff"},0);
	};
});

//Right now: trying to convert all of this stuff to jQuery SO I can 
//use AJAX to make an image appear and disappear (and also check to
//see if the path is valid)
