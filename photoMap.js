var listOfStates = [];
var images = [];
//eventually combine these

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


	};
	var elementSet = paper.setFinish();

	var over = function(){
		// this.stop().animate({fill: "#eeffff"},0);
		pullImages(this, listOfStates[this.id]);
	};

	var out = function(){
		this.stop().animate({fill: "white"},100);
		hideImages(this, listOfStates[this.id]);
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

	var contains = false;
	for(var i = 0; i < images.length; i++){
		if(image[i].id == id){
			contains = true;
		}
	}

	if(!contains){
		// var img = new Image();
		// img.id = id;
		// images.push(img);

		// var width = state.getBBox(false).width;
		// var height = state.getBBox(false).height;

		// var centerX = state.getBBox(false).x2 - state.getBBox(false).x + (width/2);
		// var centerY = state.getBBox(false).y2 - state.getBBox(false).y + (height/2);

		// img.position = "absolute";
		// img.width = width;
		// img.height = height;

		state.attr('fillfit','url(images/hi/0.jpg)');


		// NOT WORKING
		// img.style.left = centerX;
		// img.style.top = centerY;

		var div = document.getElementById('holder');
		img.onload = function(){
			div.appendChild(img);	
		}
		img.onerror = function(){
			state.stop().animate({fill: "#eeffff"},0);
		}
		img.src = path;
	}


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
