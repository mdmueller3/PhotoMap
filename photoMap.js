var paper = Raphael(0,0,1000,1000);

for(var path in worldmap.shapes){
	var state = paper.path(worldmap.shapes[path]);

	state.attr("stroke-width",0.5);

	paper.path(worldmap.shapes[path]).mouseover(function(){
		this.attr("fill","#f00");
	});

};


// paper.forEach(function(country){
// 	country.mouseover(function(){
// 		country.attr("fill","#f00");
// 		alert("DFSA");
// 	});
// });

