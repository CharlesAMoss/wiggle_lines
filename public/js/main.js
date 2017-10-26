console.log('... always be closing')

var margin = {top: 20, right: 20, bottom: 30, left: 50},
width = 960 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

var yScale = d3.scaleLinear().domain([0, 600]).range([height, 0]);

var x = d3.scaleTime()
.range([0, width]);

var y = d3.scaleLinear()
.range([height, 0]);

var xAxis = d3.axisBottom()
.scale(x);

var yAxis = d3.axisLeft()
.scale(y)



var areaGenerator = d3.area()
	.x(function(d, i) {
		return i * 10;
	})
	.y0(function(d) {
		return yScale(d[0]);
	})
	.y1(function(d) {
		return yScale(d[1]);
	});

var colors = ['#FBB65B', '#513551', '#de3163', '#c1c1c1', '#000000'];

// var data = [
//   {day: 'Mon', apricots: 120, blueberries: 180, cherries: 100},
//   {day: 'Tue', apricots: 60, blueberries: 185, cherries: 105},
//   {day: 'Wed', apricots: 100, blueberries: 215, cherries: 110},
//   {day: 'Thu', apricots: 80, blueberries: 230, cherries: 105},
//   {day: 'Fri', apricots: 120, blueberries: 240, cherries: 105}
// ];

var svg = d3.select("#entry").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");


d3.json("data/MOCKDATA.json", function(error, data) {
    if (error) throw error;

var stack = d3.stack()
  .keys(['raccoon', 'cat', 'red panda', 'marrmot', 'tanuki']);

var stackedSeries = stack(data);

d3.select('g')
	.selectAll('path')
	.data(stackedSeries)
	.enter()
	.append('path')
	.style('fill', function(d, i) {
		return colors[i];
	})
    .attr('d', areaGenerator)
    

svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis);

svg.append('g')
    .attr('class', 'y axis')
    .call(yAxis);

})



document.addEventListener( 'DOMContentLoaded',() => { 
    if (d3) console.log('d3 has loaded ...')

    //document.getElementById('entry').innerHTML = "hey yo"

})