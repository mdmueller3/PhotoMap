var paper = Raphael(0,0,1000,1000);

paper.setStart();

for(var path in worldmap.shapes){

	var state = paper.path(worldmap.shapes[path]);

	state.attr("stroke-width",0.3);


};

var elementSet = paper.setFinish();

var over = function(){
	this.stop().animate({fill: "#ddffff"},100);
};

var out = function(){
	this.stop().animate({fill: "white"},100);
};

elementSet.hover(over, out);