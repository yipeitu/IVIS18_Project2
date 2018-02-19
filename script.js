var countries = ["AUS", "BGD", "BRA", "CAN", "CHN", "TWN", "COL", "CYP", "FIN", "FRA", "DEU", "HKG", "IND", "IDN", "IRN", "ISR", "ITA", "JPN", "KOR", "LBN", "RUS", "SGP", "ESP", "SWE", "CHE", "THA", "GBR", "USA", "VEN"]

var basic_choropleth = new Datamap({
  element: document.getElementById("basic_choropleth"),
  projection: 'mercator',
  fills: {
    defaultFill: "#BDC3C7",
    authorHasTraveledTo: "#DAF7A6"
  },
  data: {
    AUS: { fillKey: "authorHasTraveledTo" },
	BGD: { fillKey: "authorHasTraveledTo" },
	BRA: { fillKey: "authorHasTraveledTo" },
	CAN: { fillKey: "authorHasTraveledTo" },
	CHN: { fillKey: "authorHasTraveledTo" },
	TWN: { fillKey: "authorHasTraveledTo" },
	COL: { fillKey: "authorHasTraveledTo" },
	CYP: { fillKey: "authorHasTraveledTo" },
	FIN: { fillKey: "authorHasTraveledTo" },
	FRA: { fillKey: "authorHasTraveledTo" },
	DEU: { fillKey: "authorHasTraveledTo" },
	HKG: { fillKey: "authorHasTraveledTo" },
	IND: { fillKey: "authorHasTraveledTo" },
	IDN: { fillKey: "authorHasTraveledTo" },
	IRN: { fillKey: "authorHasTraveledTo" },
	ISR: { fillKey: "authorHasTraveledTo" },
	ITA: { fillKey: "authorHasTraveledTo" },
	JPN: { fillKey: "authorHasTraveledTo" },
	KOR: { fillKey: "authorHasTraveledTo" },
	LBN: { fillKey: "authorHasTraveledTo" },
	// MYS: { fillKey: "authorHasTraveledTo" },
	// MEX: { fillKey: "authorHasTraveledTo" },
	// NLD: { fillKey: "authorHasTraveledTo" },
	// NZL: { fillKey: "authorHasTraveledTo" },
	// NGA: { fillKey: "authorHasTraveledTo" },
	// NOR: { fillKey: "authorHasTraveledTo" },
	// PHL: { fillKey: "authorHasTraveledTo" },
	RUS: { fillKey: "authorHasTraveledTo" },
	SGP: { fillKey: "authorHasTraveledTo" },
	ESP: { fillKey: "authorHasTraveledTo" },
	SWE: { fillKey: "authorHasTraveledTo" },
	CHE: { fillKey: "authorHasTraveledTo" },
	THA: { fillKey: "authorHasTraveledTo" },
	GBR: { fillKey: "authorHasTraveledTo" },
	USA: { fillKey: "authorHasTraveledTo" },
	VEN: { fillKey: "authorHasTraveledTo" }
  }
});

var colors = d3.scale.category10();

// window.setInterval(function() {
//   basic_choropleth.updateChoropleth({
//     USA: "#FF5733",
//     RUS: { fillKey: 'authorHasTraveledTo' },
//     AUS: { fillKey: 'authorHasTraveledTo' },
//     BRA: { fillKey: 'authorHasTraveledTo' },
//     CAN: { fillKey: 'authorHasTraveledTo' },
//     ZAF: { fillKey: 'authorHasTraveledTo' },
//     IND: colors(Math.random() * 50),
//   });
// }, 2000);


var tableContent = function(i, variable){
	return `<tr>
	      <th scope="row">${i+1}</th>
		      <td>${variable[0]}</td>
		      <td>${variable[1]}</td>
		      <td>1</td>
		      <td>2</td>
		      <td>3</td>
		      <td>4</td>
		      <td>5</td>
		      <td>6</td>
		      <td>7</td>
		      <td>8</td>
		      <td>9</td>
		      <td>10</td>
	    </tr>`
}

variables = [
["avoiding a fare on public transport", "Avoiding a fare on public transport"],
["tax cheating", "Cheating on taxes if you have a chance"],
["bribe accept", "Someone accepting a bribe in the course of their duties"],
["homosexuality", "Homosexuality"],
["prostitution", "Prostitution"],
["abortion", "Abortion"],
["divorce", "Divorce"],
["euthanasia", "Suicide"],
["suicide","Euthanasia"],
]

variables.forEach(function(v, i){
	$("#iVariables").append(tableContent(i, v))
})

// graph
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 1200 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// var formatPercent = d3.format(".0%");

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1, 1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    // .tickFormat(formatPercent);

var svg = d3.select("#iBar").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return `<div class="text-light bg-dark rounded px-1"><strong>${d.name}</strong>: <span class="text-warning">${d.sum}</span></div>`;
  })

svg.call(tip)

d3.csv("https://yipeitu.github.io/IVIS18_Project2/countryAvg.csv", function(error, data) {

  data.forEach(function(d) {
    d.sum = +d.sum;
  });

  x.domain(data.map(function(d) { return d.c2; }));
  y.domain([0, d3.max(data, function(d) { return d.sum; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(0)")
      .attr("y", 0)
      .attr("x", 30)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Justifiable");

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.c2); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.sum); })
      .attr("height", function(d) { return height - y(d.sum); })
      .on("mouseover", tip.show)
      .on("mouseout", tip.hide);

  d3.select("input").on("change", change);

  var sortTimeout = setTimeout(function() {
    d3.select("input").property("checked", true).each(change);
  }, 2000);

  function change() {
    clearTimeout(sortTimeout);

    // Copy-on-write since tweens are evaluated after a delay.
    var x0 = x.domain(data.sort(this.checked
        ? function(a, b) { return b.sum - a.sum; }
        : function(a, b) { return d3.ascending(a.c2, b.c2); })
        .map(function(d) { return d.c2; }))
        .copy();

    svg.selectAll(".bar")
        .sort(function(a, b) { return x0(a.c2) - x0(b.c2); });

    var transition = svg.transition().duration(750),
        delay = function(d, i) { return i * 50; };

    transition.selectAll(".bar")
        .delay(delay)
        .attr("x", function(d) { return x0(d.c2); });

    transition.select(".x.axis")
        .call(xAxis)
      .selectAll("g")
        .delay(delay);
  }
});
// radar graph
// RadarChart.js
var RadarChart = {
  draw: function(id, d, options){
  var cfg = {
	 radius: 5,
	 w: 600,
	 h: 600,
	 factor: 1,
	 factorLegend: .85,
	 levels: 3,
	 maxValue: 0,
	 radians: 2 * Math.PI,
	 opacityArea: 0.5,
	 ToRight: 5,
	 TranslateX: 80,
	 TranslateY: 30,
	 ExtraWidthX: 100,
	 ExtraWidthY: 100,
	 color: d3.scale.category10()
	};
	
	if('undefined' !== typeof options){
	  for(var i in options){
		if('undefined' !== typeof options[i]){
		  cfg[i] = options[i];
		}
	  }
	}
	cfg.maxValue = Math.max(cfg.maxValue, d3.max(d, function(i){return d3.max(i.map(function(o){return o.value;}))}));
	var allAxis = (d[0].map(function(i, j){return i.axis}));
	var total = allAxis.length;
	var radius = cfg.factor*Math.min(cfg.w/2, cfg.h/2);
	var Format = d3.format('%');
	d3.select(id).select("svg").remove();
	
	var g = d3.select(id)
			.append("svg")
			.attr("width", cfg.w+cfg.ExtraWidthX)
			.attr("height", cfg.h+cfg.ExtraWidthY)
			.append("g")
			.attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");
			;

	var tooltip;
	
	//Circular segments
	for(var j=0; j<cfg.levels-1; j++){
	  var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
	  g.selectAll(".levels")
	   .data(allAxis)
	   .enter()
	   .append("svg:line")
	   .attr("x1", function(d, i){return levelFactor*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
	   .attr("y1", function(d, i){return levelFactor*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
	   .attr("x2", function(d, i){return levelFactor*(1-cfg.factor*Math.sin((i+1)*cfg.radians/total));})
	   .attr("y2", function(d, i){return levelFactor*(1-cfg.factor*Math.cos((i+1)*cfg.radians/total));})
	   .attr("class", "line")
	   .style("stroke", "grey")
	   .style("stroke-opacity", "0.75")
	   .style("stroke-width", "0.3px")
	   .attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");
	}

	//Text indicating at what % each level is
	for(var j=0; j<cfg.levels; j++){
	  var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
	  g.selectAll(".levels")
	   .data([1]) //dummy data
	   .enter()
	   .append("svg:text")
	   .attr("x", function(d){return levelFactor*(1-cfg.factor*Math.sin(0));})
	   .attr("y", function(d){return levelFactor*(1-cfg.factor*Math.cos(0));})
	   .attr("class", "legend")
	   .style("font-family", "sans-serif")
	   .style("font-size", "10px")
	   .attr("transform", "translate(" + (cfg.w/2-levelFactor + cfg.ToRight) + ", " + (cfg.h/2-levelFactor) + ")")
	   .attr("fill", "#737373")
	   .text(Format((j+1)*cfg.maxValue/cfg.levels));
	}
	
	series = 0;

	var axis = g.selectAll(".axis")
			.data(allAxis)
			.enter()
			.append("g")
			.attr("class", "axis");

	axis.append("line")
		.attr("x1", cfg.w/2)
		.attr("y1", cfg.h/2)
		.attr("x2", function(d, i){return cfg.w/2*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
		.attr("y2", function(d, i){return cfg.h/2*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
		.attr("class", "line")
		.style("stroke", "grey")
		.style("stroke-width", "1px");

	axis.append("text")
		.attr("class", "legend")
		.text(function(d){return d})
		.style("font-family", "sans-serif")
		.style("font-size", "11px")
		.attr("text-anchor", "middle")
		.attr("dy", "1.5em")
		.attr("transform", function(d, i){return "translate(0, -10)"})
		.attr("x", function(d, i){return cfg.w/2*(1-cfg.factorLegend*Math.sin(i*cfg.radians/total))-60*Math.sin(i*cfg.radians/total);})
		.attr("y", function(d, i){return cfg.h/2*(1-Math.cos(i*cfg.radians/total))-20*Math.cos(i*cfg.radians/total);});

 
	d.forEach(function(y, x){
	  dataValues = [];
	  g.selectAll(".nodes")
		.data(y, function(j, i){
		  dataValues.push([
			cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)), 
			cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
		  ]);
		});
	  dataValues.push(dataValues[0]);
	  g.selectAll(".area")
					 .data([dataValues])
					 .enter()
					 .append("polygon")
					 .attr("class", "radar-chart-serie"+series)
					 .style("stroke-width", "2px")
					 .style("stroke", cfg.color(series))
					 .attr("points",function(d) {
						 var str="";
						 for(var pti=0;pti<d.length;pti++){
							 str=str+d[pti][0]+","+d[pti][1]+" ";
						 }
						 return str;
					  })
					 .style("fill", function(j, i){return cfg.color(series)})
					 .style("fill-opacity", cfg.opacityArea)
					 .on('mouseover', function (d){
										z = "polygon."+d3.select(this).attr("class");
										g.selectAll("polygon")
										 .transition(200)
										 .style("fill-opacity", 0.1); 
										g.selectAll(z)
										 .transition(200)
										 .style("fill-opacity", .7);
									  })
					 .on('mouseout', function(){
										g.selectAll("polygon")
										 .transition(200)
										 .style("fill-opacity", cfg.opacityArea);
					 });
	  series++;
	});
	series=0;


	d.forEach(function(y, x){
	  g.selectAll(".nodes")
		.data(y).enter()
		.append("svg:circle")
		.attr("class", "radar-chart-serie"+series)
		.attr('r', cfg.radius)
		.attr("alt", function(j){return Math.max(j.value, 0)})
		.attr("cx", function(j, i){
		  dataValues.push([
			cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)), 
			cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
		]);
		return cfg.w/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total));
		})
		.attr("cy", function(j, i){
		  return cfg.h/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total));
		})
		.attr("data-id", function(j){return j.axis})
		.style("fill", cfg.color(series)).style("fill-opacity", .9)
		.on('mouseover', function (d){
					newX =  parseFloat(d3.select(this).attr('cx')) - 10;
					newY =  parseFloat(d3.select(this).attr('cy')) - 5;
					
					tooltip
						.attr('x', newX)
						.attr('y', newY)
						.text(Format(d.value))
						.transition(200)
						.style('opacity', 1);
						
					z = "polygon."+d3.select(this).attr("class");
					g.selectAll("polygon")
						.transition(200)
						.style("fill-opacity", 0.1); 
					g.selectAll(z)
						.transition(200)
						.style("fill-opacity", .7);
				  })
		.on('mouseout', function(){
					tooltip
						.transition(200)
						.style('opacity', 0);
					g.selectAll("polygon")
						.transition(200)
						.style("fill-opacity", cfg.opacityArea);
				  })
		.append("svg:title")
		.text(function(j){return Math.max(j.value, 0)});

	  series++;
	});
	//Tooltip
	tooltip = g.append('text')
			   .style('opacity', 0)
			   .style('font-family', 'sans-serif')
			   .style('font-size', '13px');
  }
};

var createRadar = function(d, country, continent){
	var w = 250,
	h = 250;

	var colorscale = d3.scale.category10();

	//Legend titles
	var LegendOptions = ['wave 1','wave 2', 'wave 3', 'wave 4', 'wave 5', 'wave 6'];

	//Data

	//Options for the Radar chart, other than default
	var mycfg = {
	  w: w,
	  h: h,
	  maxValue: 0.6,
	  levels: 6,
	  ExtraWidthX: 200
	}

	//Call function to draw the Radar chart
	//Will expect that data is in %'s
	RadarChart.draw("#"+country, d, mycfg);

	////////////////////////////////////////////
	/////////// Initiate legend ////////////////
	////////////////////////////////////////////

	var svgRadar = d3.select('#i'+continent)
		.selectAll('svg')
		.append('svg')
		.attr("width", w)
		.attr("height", h)

	//Create the title for the legend
	var text = svgRadar.append("text")
		.attr("class", "title")
		.attr('transform', 'translate(90,0)') 
		.attr("x", w - 70)
		.attr("y", 10)
		.attr("font-size", "12px")
		.attr("fill", "#404040")
		.text("The wave number");
			
	//Initiate Legend	
	var legend = svgRadar.append("g")
		.attr("class", "legend")
		.attr("height", 100)
		.attr("width", 200)
		.attr('transform', 'translate(90,20)') 
		;
		//Create colour squares
		legend.selectAll('rect')
		  .data(LegendOptions)
		  .enter()
		  .append("rect")
		  .attr("x", w - 65)
		  .attr("y", function(d, i){ return i * 20;})
		  .attr("width", 10)
		  .attr("height", 10)
		  .style("fill", function(d, i){ return colorscale(i);})
		  ;
		//Create text next to squares
		legend.selectAll('text')
		  .data(LegendOptions)
		  .enter()
		  .append("text")
		  .attr("x", w - 52)
		  .attr("y", function(d, i){ return i * 20 + 9;})
		  .attr("font-size", "11px")
		  .attr("fill", "#737373")
		  .text(function(d) { return d; })
		  ;	
}

var dataRadar = null;
d3.json("https://yipeitu.github.io/IVIS18_Project2/wave.json", function(data) {
  // create html
  // Object.keys(data).forEach(function(continent) {
  // 	Object.keys(data[continent]).forEach(function(country){
  // 		console.log(continent, country, data[continent][country])
  // 		countryId = country.replace("(", "").replace(")", "").replace(" ", "")
  // 		$("#i"+continent).append(`<div id=${countryId}></div>`)
  // 		createRadar(data[continent][country], countryId, continent)

  // 		// createRadar(data[continent][country], country, continent)
  // 	})
  // })
  dataRadar = data
  console.log(data["ASIA"]["TAIWAN"])
  $("#iASIA").append(`<div id=TAIWAN></div>`)
  createRadar(data["ASIA"]["TAIWAN"], "TAIWAN", "ASIA")
});






// ===========
// var margin = {top: 20, right: 20, bottom: 30, left: 40},
//     width = 960 - margin.left - margin.right,
//     height = 500 - margin.top - margin.bottom;

// // var formatPercent = d3.format(".0%");

// var x = d3.scale.ordinal()
//     .rangeRoundBands([0, width], .1, 1);

// var y = d3.scale.linear()
//     .range([height, 0]);

// var xAxis = d3.svg.axis()
//     .scale(x)
//     .orient("bottom");

// var yAxis = d3.svg.axis()
//     .scale(y)
//     .orient("left")
//     // .tickFormat(formatPercent);

// var svg = d3.select("#iBar").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// d3.csv("https://yipeitu.github.io/IVIS18_Project2/countryAvg.csv", function(error, data) {

//   data.forEach(function(d) {
//     d.sum = +d.sum;
//   });

//   x.domain(data.map(function(d) { return d.c2; }));
//   y.domain([0, d3.max(data, function(d) { return d.sum; })]);

//   svg.append("g")
//       .attr("class", "x axis")
//       .attr("transform", "translate(0," + height + ")")
//       .call(xAxis);

//   svg.append("g")
//       .attr("class", "y axis")
//       .call(yAxis)
//     .append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 6)
//       .attr("dy", ".71em")
//       .style("text-anchor", "end")
//       .text("Justifiable");

//   svg.selectAll(".bar")
//       .data(data)
//     .enter().append("rect")
//       .attr("class", "bar")
//       .attr("x", function(d) { return x(d.c2); })
//       .attr("width", x.rangeBand())
//       .attr("y", function(d) { return y(d.sum); })
//       .attr("height", function(d) { return height - y(d.sum); });

//   d3.select("input").on("change", change);

//   var sortTimeout = setTimeout(function() {
//     d3.select("input").property("checked", true).each(change);
//   }, 2000);

//   function change() {
//     clearTimeout(sortTimeout);

//     // Copy-on-write since tweens are evaluated after a delay.
//     var x0 = x.domain(data.sort(this.checked
//         ? function(a, b) { return b.sum - a.sum; }
//         : function(a, b) { return d3.ascending(a.c2, b.c2); })
//         .map(function(d) { return d.c2; }))
//         .copy();

//     svg.selectAll(".bar")
//         .sort(function(a, b) { return x0(a.c2) - x0(b.c2); });

//     var transition = svg.transition().duration(750),
//         delay = function(d, i) { return i * 50; };

//     transition.selectAll(".bar")
//         .delay(delay)
//         .attr("x", function(d) { return x0(d.c2); });

//     transition.select(".x.axis")
//         .call(xAxis)
//       .selectAll("g")
//         .delay(delay);
//   }
// });
//------------
// var width = 1300, height = 670;

// var dataset = [
//     [
//         { x: 0, y: 5 },{ x: 1, y: 4 },{ x: 2, y: 2 },{ x: 3, y: 2 },
//         { x: 4, y: 3 },{ x: 5, y: 1 },{ x: 6, y: 2 },{ x: 7, y: 2 }
//     ],[
//         { x: 0, y: 2 },{ x: 1, y: 5 },{ x: 2, y: 3 },{ x: 3, y: 3 },
//         { x: 4, y: 1 },{ x: 5, y: 5 },{ x: 6, y: 3 },{ x: 7, y: 2 }
//     ],[
//         { x: 0, y: 5 },{ x: 1, y: 8 },{ x: 2, y: 1 },{ x: 3, y: 4 },
//         { x: 4, y: 3 },{ x: 5, y: 7 },{ x: 6, y: 2 },{ x: 7, y: 6 }
//     ],[
//         { x: 0, y: 7 },{ x: 1, y: 8 },{ x: 2, y: 9 },{ x: 3, y: 10 },
//         { x: 4, y: 3 },{ x: 5, y: 7 },{ x: 6, y: 2 },{ x: 7, y: 11 }
//     ]
// ];

// var stack = d3.layout.stack()(dataset);

// var xScale = d3.scale.ordinal()
//         .domain(d3.range(dataset[0].length))
//         .rangeRoundBands([0, width/2], 0.01);

// var maxHeight = d3.max(dataset, function(d) {
//     return d3.max(d, function(d) { return d.y0 + d.y; });
// });

// var yScale = d3.scale.linear()
//         .domain([0,	maxHeight])
//         .range([0, height]);

// var colors = d3.scale.category20();

// var svg = d3.select("body")
//         .append("svg")
//         .attr("width", width)
//         .attr("height", height);

// var groups = svg.selectAll("g")
//         .data(dataset)
//         .enter()
//         .append("g")
//         .style("fill", function(d, i) { return colors(i); });

// var area = d3.svg.area()
//         .interpolate("cardinal")
//         .x(function(d,i) { return xScale(i); })
//         .y0(function(d) { return height-yScale(d.y0 + d.y); })
//         .y1(function(d) { return height-yScale(d.y0); });

// groups.append("path")
//         .attr("d", function(d) { return area(d); })
//         .style("fill", function(d, i) { return colors(i); });

// ----------
// var margin = {
//         top: 20,
//         right: 20,
//         bottom: 30,
//         left: 40
//       };
// var width = 960 - margin.left - margin.right;
// var height = 500 - margin.top - margin.bottom;

// var svg = d3.select("#iBar").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// var x = d3.scale.linear()
//       .range([0, width]);

// var y = d3.scale.ordinal()
//     .range([height, 0]);


// var yAxis = d3.svg.axis(y);

// d3.csv("https://yipeitu.github.io/IVIS18_Project2/countryAvga.csv", type, function(error, data) {
//   if (error) throw error;

//   data.sort(function(a, b) {
//     return a.sum - b.sum;
//   });

//   x.domain([0, d3.max(data, function(d) { return d.sum; })]);
//   console.log(data)

//   y.domain(data.map(function(d) { return d.c2; }))
//     .rangeRoundBands(0.1);
//   console.log(y)

//   svg.append("g")
//       .attr("class", "x axis")
//   .attr("transform", "translate(0," + height + ")")
//   .call(d3.svg.axis(x));

//   svg.append("g")
//       .attr("class", "y axis")
//       .call(yAxis);

//   svg.selectAll(".bar")
//       .data(data)
//     .enter().append("rect")
//       .attr("class", "bar")
//       .attr("x", 0)
//       .attr("height", y.rangeBand())
//       .attr("y", function(d) { return y(d.c2); })
//       .attr("width", function(d) { return x(d.sum); });

// });

// function type(d) {
//   d.sum = +d.sum;
//   return d;
// }