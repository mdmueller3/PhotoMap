function photomap(posX, posY, width, height){
	
	var paper = Raphael(posX,posY,width,height);

	paper.setStart();

	for(var path in worldmap.shapes){

		var state = paper.path(worldmap.shapes[path]);

		state.attr("stroke-width",0.3);


	};

	var elementSet = paper.setFinish();

	var over = function(){
		this.stop().animate({fill: "#ddffff"},0);
	};

	var out = function(){
		this.stop().animate({fill: "white"},100);
	};

	elementSet.hover(over, out);


};


