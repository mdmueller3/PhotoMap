function photomap(posX, posY, width, height, scale){
	var paper = Raphael(posX,posY,width,height);

	paper.setStart();
	for(var path in usMap){

		var state = paper.path(usMap[path]);
		state.attr("stroke-width",0.5);

		var tfm = 'S'.concat(scale).concat(',').concat(scale).concat(',0,0');

		state.transform(tfm);

	};
	var elementSet = paper.setFinish();

	var over = function(){
		this.stop().animate({fill: "#eeffff"},0);
	};

	var out = function(){
		this.stop().animate({fill: "white"},100);
	};

	elementSet.hover(over, out);
};

$(document).ready(function(){
	


	
});