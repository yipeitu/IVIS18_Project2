var countries = ["AUS", "BGD", "BRA", "CAN", "CHN", "TWN", "COL", "CYP", "FIN", "FRA", "DEU", "HKG", "IND", "IDN", "IRN", "ISR", "ITA", "JPN", "KOR", "LBN", "MYS", "MEX", "NLD", "NZL", "NGA", "NOR", "PHL", "RUS", "SGP", "ESP", "SWE", "CHE", "THA", "GBR", "USA", "VEN"]

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
	MYS: { fillKey: "authorHasTraveledTo" },
	MEX: { fillKey: "authorHasTraveledTo" },
	NLD: { fillKey: "authorHasTraveledTo" },
	NZL: { fillKey: "authorHasTraveledTo" },
	NGA: { fillKey: "authorHasTraveledTo" },
	NOR: { fillKey: "authorHasTraveledTo" },
	PHL: { fillKey: "authorHasTraveledTo" },
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

var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
      };
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var svg = d3.select("#iBar").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scale.linear()
      .range([0, width]);

var y = d3.scale.ordinal()
    .range([height, 0]);


var yAxis = d3.svg.axis(y);

d3.csv("year.csv", type, function(error, data) {
  if (error) throw error;

  data.sort(function(a, b) {
    return a.sum - b.sum;
  });

  x.domain([0, d3.max(data, function(d) { return d.sum; })]);

  y.domain(data.map(function(d) { return d.c3; }))
    .paddingInner(0.1);


  svg.append("g")
      .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", 0)
      .attr("height", y.bandwidth())
      .attr("y", function(d) { return y(d.c3); })
      .attr("width", function(d) { return x(d.sum); });

});

function type(d) {
  d.sum = +d.sum;
  return d;
}