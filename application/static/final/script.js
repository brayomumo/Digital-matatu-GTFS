 $.ajax({
     url: "https://raw.githubusercontent.com/brayomumo/Digital-matatu-GTFS/master/final/data/nairobi.json",
     dataType: "json",
     data: "",

     success: function (data) {
         drawing(data)
     }
 });


 $.ajax({
    url: "/getdata",
    dataType: "txt",
    data: "",

    success: function (data) {
        // 
        console.log(data)
    }
});





 var width = 1000;
 var height = 580;

 var svg = d3.select(".map")
     .append("svg")
     .attr("width", width)
     .attr("height", height);

 function drawing(data) {


     var g = svg.append("g");
     var projection = d3.geoMercator()
         .center([36.8, -1.3])
         .scale([90000])
         .translate([width / 2, height / 2]);

     var pathing = d3.geoPath().projection(projection);

     //drawing bubbles
     var rand_data = [{
             lat: "-1.283894",
             long: "36.825557"
         },
         {
             lat: "-1.283894",
             long: "36.825557"
         }
     ];

     g.selectAll("myCircles")
         .data(rand_data)
         .enter()
         .append("circle")
         .attr("cx", function (d) {
             return projection([d.long, d.lat])[0]
         })
         .attr("cy", function (d) {
             return projection([d.long, d.lat])[1]
         })
         .attr("r", 14)
         .style("fill", "69b3a2")
         .attr("stroke", "#69b3a2")
         .attr("stroke-width", 3)
         .attr("fill-opacity", .4)


     g.selectAll("path")
         .data(data.geometries)
         .enter()
         .append("path")
         .attr("fill", "#ccc")
         .attr("class", "inci")
         .attr("stroke", "#333")
         .attr("d", pathing);
 }


 $.ajax({
     url: "https://raw.githubusercontent.com/brayomumo/Digital-matatu-GTFS/master/final/route_shapes.geojson",
     dataType: "json",
     data: "",

     success: function (data) {
         populate_map(data)
     }
 });

 function populate_map(pos_data) {

     var g = svg.append("g");

     var albersProjection = d3.geoAlbers()
         .scale(190000)
         .rotate([71.057, 0])
         .center([0, 42.313])
         .translate([width / 2, height / 2]);

     var geoPath = d3.geoPath()
         .projection(albersProjection);

     var projection = d3.geoMercator()
         .center([36.75, -1.25])
         .scale([55000])
         .translate([width / 2, height / 2]);

     var nairobipathing = d3.geoPath().projection(projection);

     g.selectAll("path")
         .data(pos_data.features)
         .enter()
         .append("path")
         .attr("fill", "#ccc")
         .attr("class", "incident")
         .attr("stroke", "#334")
         .attr("d", nairobipathing);



     var rodents = svg.append("g");
     var kitext = "Nairobiii"

     g.selectAll("path")
         .data(pos_data.features)
         .enter()
         .append("path")
         .attr("fill", "#900")
         .attr("stroke", "#999")
         .attr("d", geoPath)
         .attr("class", "incident")
         .on("mouseover", function (d) {
             console.log("hovering");
             d3.select("g").text(kitext);
             d3.select(this).attr("class", "incident");
         })
         .on("mouseout", function (d) {
             d3.select("g").text("");
             d3.select(this).attr("class", "incident");
         });


     var locations = svg.append("g");

     locations.selectAll("path")
         .data(pos_data)
         .enter()
         .append("path")
         .attr("fill", "#900")
         .attr("stroke", "#999")
         .attr("d", nairobipathing)
         .attr("class", "trial")
         .attr("transform", function (d) {
             return "translate(" + projection([
                 d.longitude,
                 d.latitude
             ]) + ")";
         });

     var rscale = d3.scaleLinear()
         .domain([0, 100])
         .range([3, 20])

     var colorScale = d3.scaleOrdinal().range(["#ff5733", "#33ffe9", "#ff33c4", "BDE7AE", "E17250", "ECF809",
         "FC6E61"
     ]);


     var color = d3.scaleThreshold()
         .domain([10, 30, 60, 80, 1000])
         .range(["#00a6ff", "#6c00ff", "#FF5733", "#C70039", "#900C3F", "#581845"]);




 }