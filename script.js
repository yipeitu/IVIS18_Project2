var countries = {
	'BGD': ['BD', 'BANGLADESH', 'ASIA', '25.02'], 
	'USA': ['US', 'UNITED STATES', 'AMERICA', '25.51'], 
	'ISR': ['IL', 'ISRAEL', 'ASIA', '44.78'], 
	'SWE': ['SE', 'SWEDEN', 'EUROPE', '42.13'], 
	'DEU': ['DE', 'GERMANY', 'EUROPE', '42.15'], 
	'IDN': ['ID', 'INDONESIA', 'ASIA', '12.91'], 
	'GBR': ['GB', 'UNITED KINGDOM', 'EUROPE', '50.6'], 
	'CAN': ['CA', 'CANADA', 'AMERICA', '32.61'], 
	'KOR': ['KR', 'KOREA', 'ASIA', '23.55'], 
	'COL': ['CO', 'COLOMBIA', 'AMERICA', '31.16'], 
	'CYP': ['CY', 'CYPRUS', 'ASIA', '27.91'], 
	'SGP': ['SG', 'SINGAPORE', 'ASIA', '22.3'], 
	'HKG': ['HK', 'HONG KONG', 'ASIA', '27.85'], 
	'LBN': ['LB', 'LEBANON', 'ASIA', '31.11'], 
	'FRA': ['FR', 'FRANCE', 'EUROPE', '41.11'], 
	'CHE': ['CH', 'SWITZERLAND', 'EUROPE', '27.54'], 
	'ESP': ['ES', 'SPAIN', 'EUROPE', '28.59'], 
	'TWN': ['TW', 'TAIWAN', 'ASIA', '22.97'], 
	'CHN': ['CN', 'CHINA', 'ASIA', '24.87'], 
	'AUS': ['AU', 'AUSTRALIA', 'ASIA', '30.77'], 
	'IRN': ['IR', 'IRAN', 'ASIA', '13.95'], 
	'VEN': ['VE', 'VENEZUELA', 'AMERICA', '21.16'], 
	'FIN': ['FI', 'FINLAND', 'EUROPE', '29.43'], 
	'THA': ['TH', 'THAILAND', 'ASIA', '26.28'], 
	'JPN': ['JP', 'JAPAN', 'ASIA', '19.9'], 
	'ITA': ['IT', 'ITALY', 'EUROPE', '24.12'], 
	'IND': ['IN', 'INDIA', 'ASIA', '17.5'], 
	'RUS': ['RU', 'RUSSIA', 'EUROPE', '23.12'], 
	'MEX': ['MX', 'MEXICO', 'AMERICA', '25.99'], 
	'BRA': ['BR', 'BRAZIL', 'AMERICA', '22.69']}
var emptyWave = [
	{"value": 0, "axis": "homosexuality"},
	{"value": 0, "axis": "prostitution"},
	{"value": 0, "axis": "suicide"},
	{"value": 0, "axis": "euthanasia"},
	{"value": 0, "axis": "divorce"},
	{"value": 0, "axis": "avoiding a fare on public transport"},
	{"value": 0, "axis": "tax cheating"},
	{"value": 0, "axis": "bribe accept"},
	{"value": 0, "axis": "abortion"}]
var countryDefault = ["JPN", "TWN", "RUS", "CAN", "ESP", "MEX", "BRA", "HKG", "SWE"];
var countrySelected = []
var waveUnselected = [0, 2, 3]
var dataAvg = null;
var dataRadar = null;
d3.json("https://yipeitu.github.io/IVIS18_Project2/wave.json", function(data) {
  // create html
  Object.keys(data).forEach(function(continent) {
  	Object.keys(data[continent]).forEach(function(country){
  		$("#i"+continent).append(`<div id=${country}></div>`)
  		if(countryDefault.indexOf(country) != -1){
  			countrySelected.push(country);
  			$("#"+country).addClass('bound');
  			
  			createRadar(data[continent][country], country, continent)
  		}
  	})
  })
  dataRadar = data;
});


var updateRadar = function(redraw=false){
	
	Object.keys(countries).forEach(function(country){
		var continent = countries[country][2]
		if(countrySelected.indexOf(country) != -1){
			if($("body").find('#'+country+":not(.bound)").length != 0 || redraw){
				console.log(country, "draw")
				$("#"+country).addClass('bound');
				createRadar(dataRadar[continent][country], country, continent);
			}
			console.log(country, "show");
			$("#"+country).removeAttr("hidden");
		} else {
			// console.log(country, "hide")
			$("#"+country).attr("hidden", "true")
		}
	})
}

var basic_choropleth = new Datamap({
  element: document.getElementById("basic_choropleth"),
  projection: 'mercator',
  fills: {
    defaultFill: "#BDC3C7",
    authorHasTraveledTo: "#DAF7A6",
    authorHasClicked: "#FF5733"
  },
  geographyConfig: {
    highlightOnHover: false,
    // popupOnHover: true,
    popupTemplate: function (geo, data) {
            if ( !data ) return;
            return ['<div class="hoverinfo text-light bg-dark rounded px-1"><strong>',
                geo.properties.name,
                '</strong>: <span class="text-warning">',
                countries[geo.id][3],
                '</span></div>'].join('');
        }
  },
  data: {
    BGD: { fillKey: "authorHasTraveledTo" },
	USA: { fillKey: "authorHasTraveledTo" },
	ISR: { fillKey: "authorHasTraveledTo" },
	SWE: { fillKey: "authorHasClicked" },
	DEU: { fillKey: "authorHasTraveledTo" },
	IDN: { fillKey: "authorHasTraveledTo" },
	GBR: { fillKey: "authorHasTraveledTo" },
	CAN: { fillKey: "authorHasClicked" },
	KOR: { fillKey: "authorHasTraveledTo" },
	COL: { fillKey: "authorHasTraveledTo" },
	CYP: { fillKey: "authorHasTraveledTo" },
	SGP: { fillKey: "authorHasTraveledTo" },
	HKG: { fillKey: "authorHasClicked" },
	LBN: { fillKey: "authorHasTraveledTo" },
	FRA: { fillKey: "authorHasTraveledTo" },
	CHE: { fillKey: "authorHasTraveledTo" },
	ESP: { fillKey: "authorHasClicked" },
	TWN: { fillKey: "authorHasClicked" },
	CHN: { fillKey: "authorHasTraveledTo" },
	AUS: { fillKey: "authorHasTraveledTo" },
	IRN: { fillKey: "authorHasTraveledTo" },
	VEN: { fillKey: "authorHasTraveledTo" },
	FIN: { fillKey: "authorHasTraveledTo" },
	THA: { fillKey: "authorHasTraveledTo" },
	JPN: { fillKey: "authorHasClicked" },
	ITA: { fillKey: "authorHasTraveledTo" },
	IND: { fillKey: "authorHasTraveledTo" },
	RUS: { fillKey: "authorHasClicked" },
	MEX: { fillKey: "authorHasClicked" },
	BRA: { fillKey: "authorHasClicked" }
  },
  done: function(datamap) {
    datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography){
    	var c3 = geography.id;
		if(countrySelected.indexOf(c3) === -1){
			countrySelected.push(c3);
		} 
		else {
			countrySelected.splice(countrySelected.indexOf(c3), 1);
		}
		var temp = {}
		Object.keys(countries).forEach(function(c){
			if(countrySelected.indexOf(c) != -1){
				temp[c] = {"fillKey": "authorHasClicked"}
			} else {
				temp[c] = {"fillKey": "authorHasTraveledTo"}
			}
		})
		datamap.updateChoropleth(temp)
		updateRadar();
    });
  }
});


d3.select("#iSelect").on("change", function(){
	var temp = {}
	countrySelected.length = 0;
	if(this.checked){
		Object.keys(countries).forEach(function(c){  
			temp[c] = { "fillKey": "authorHasClicked" };
			countrySelected.push(c);
		})
	} else {
		Object.keys(countries).forEach(function(c){  
			temp[c] = { "fillKey": "authorHasTraveledTo" };
		})
	}
	basic_choropleth.updateChoropleth(temp);
	updateRadar();
});

var colors = d3.scale.category10();


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
  dataAvg = data;
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

  d3.select("#iSort").on("change", change);

  var sortTimeout = setTimeout(function() {
    d3.select("#iSort").property("checked", true).each(change);
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
	
	if($(id+"bound").length === 0){
		var idName = id.replace("#", "")
		d3.select(id)
		.append("div")
		.attr("id", idName+"bound")
		.attr("class", "bg-dark text-light py-1")
		.text(countries[idName][1])
	}
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
	var newD = Object.assign([], d);
	waveUnselected.forEach(function(index){
		newD[index] = emptyWave
	})
	console.log(country, d, newD)
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
	RadarChart.draw("#"+country, newD, mycfg);

	////////////////////////////////////////////
	/////////// Initiate legend ////////////////
	////////////////////////////////////////////

	var svgRadar = d3.select('#i'+continent)
		.selectAll('svg')
		.append('svg')
		.attr("width", w)
		.attr("height", h)
		.attr("class", "text-center")

	//Create the title for the legend
	// var text = svgRadar.append("text")
	// 	.attr("class", "title")
	// 	.attr('transform', 'translate(90,0)') 
	// 	.attr("x", w - 70)
	// 	.attr("y", 10)
	// 	.attr("font-size", "12px")
	// 	.attr("fill", "#404040")
	// 	.text("The wave number");
			
	// //Initiate Legend	
	// var legend = svgRadar.append("g")
	// 	.attr("class", "legend")
	// 	.attr("height", 100)
	// 	.attr("width", 200)
	// 	.attr('transform', 'translate(90,20)') 
	// 	;
	// 	//Create colour squares
	// 	legend.selectAll('rect')
	// 	  .data(LegendOptions)
	// 	  .enter()
	// 	  .append("rect")
	// 	  .attr("x", w - 65)
	// 	  .attr("y", function(d, i){ return i * 20;})
	// 	  .attr("width", 10)
	// 	  .attr("height", 10)
	// 	  .style("fill", function(d, i){ return colorscale(i);})
	// 	  ;
	// 	//Create text next to squares
	// 	legend.selectAll('text')
	// 	  .data(LegendOptions)
	// 	  .enter()
	// 	  .append("text")
	// 	  .attr("x", w - 52)
	// 	  .attr("y", function(d, i){ return i * 20 + 9;})
	// 	  .attr("font-size", "11px")
	// 	  .attr("fill", "#737373")
	// 	  .text(function(d) { return d; })
	// 	  ;	
}

var waveChange = function(event){
	var waveNum = parseInt(event.target.id.replace("iWave", "")) - 1;
	if(event.target.checked){
		waveUnselected.splice(waveUnselected.indexOf(waveNum), 1)
	} else {
		waveUnselected.push(waveNum)
	}
	updateRadar(true);
}

$("#iWave1").on("change", waveChange.bind(this));
$("#iWave2").on("change", waveChange.bind(this));
$("#iWave3").on("change", waveChange.bind(this));
$("#iWave4").on("change", waveChange.bind(this));
$("#iWave5").on("change", waveChange.bind(this));
$("#iWave6").on("change", waveChange.bind(this));


