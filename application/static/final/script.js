$.ajax({
    url: "https://raw.githubusercontent.com/brayomumo/Digital-matatu-GTFS/master/final/data/nairobi.json",
    dataType: "json",
    data: "",

    success: function (data) {
        drawing(data)
        drawingCircles()
    }
});



var rscale = d3.scaleLinear()
.domain([0, 100])
.range([3, 20])

var colorScale = d3.scaleOrdinal().range(["#ff5733", "#33ffe9", "#ff33c4", "BDE7AE", "E17250", "ECF809",
"FC6E61"
]);
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}


$('.country').on('change', function (e) {
    e.preventDefault();
    var selectedID = $(this).children(":selected").attr("id");
    var Turl = "ResponceOnClick/" + selectedID
    console.log("url will be : " + Turl);
    $.ajax({
        url: Turl,
        method: 'GET',
        // send selected data to the parca_kayit method which is in views.py
        data: {
            'id': selectedID
        }, // 'parcaAdi' will be used in request.GET.get('parcaAdi') which is in views.py, $(this).val() is selected item, 
        success: function (d) {
            console.log(d.length);

            var g = svg.append("g");
            var projection = d3.geoMercator()
                .center([36.8, -1.3])
                .scale([90000])
                .translate([width / 2, height / 2]);

            var pathing = d3.geoPath().projection(projection);
            g.selectAll("myCircles")
                .data(d)
                .enter()
                .append("circle")
                .attr("cx", function (d) {
                    // console.log(d.coordinates[0])
                    return projection([d.coordinates[1], d.coordinates[0]])[0]
                })
                .attr("cy", function (d) {
                    return projection([d.coordinates[1], d.coordinates[0]])[1]
                })
                .attr("r",20)
                .style("fill","#190707" )
                .attr("stroke", (d) => {
                    var leng  = ((d.choices).length) *10
                    var colorIndex = colorScale(Math.floor (getRandomArbitrary(10,leng)))
                    console.log(colorIndex)
                    return colorIndex
                    })
                .attr("stroke-width", 2)
                .attr("fill-opacity", 0.1)
                .on("mouseover", function (d) {
                    tooltip
                        .transition()
                        .duration(200)
                    tooltip
                        .style("opacity", 1)
                        .html("responses: " + d.choices)
                        .style("left", (d3.mouse(this)[0] + 30) + "px")
                        .style("top", (d3.mouse(this)[1] + 30) + "px")
                })
                .on("mousemove", moveTooltip)
                .on("mouseleave", hideTooltip)


        }
    });
});


//  $.ajax({
//     url: "/getdata",
//     dataType: "json",
//     data: "",

//     success: function (data) {
//         trial = data
//     }
// });




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

    g.selectAll("path")
        .data(data.geometries)
        .enter()
        .append("path")
        .attr("fill", "#ccc")
        .attr("class", "inci")
        .attr("stroke", "#333")
        .attr("d", pathing);
}
// -1- Create a tooltip div that is hidden by default:
var tooltip = d3.select(".map")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "black")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("color", "white")

// -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
var showTooltip = function (d) {
    tooltip
        .transition()
        .duration(200)
    tooltip
        .style("opacity", 1)
        .html("Place: " + d.name)
        .style("left", (d3.mouse(this)[0] + 30) + "px")
        .style("top", (d3.mouse(this)[1] + 30) + "px")
}
var moveTooltip = function (d) {
    tooltip
        .style("left", (d3.mouse(this)[0] + 30) + "px")
        .style("top", (d3.mouse(this)[1] + 30) + "px")
}
var hideTooltip = function (d) {
    tooltip
        .transition()
        .duration(200)
        .style("opacity", 0)
}

function drawingCircles() {
    $.ajax({
        url: "/getdata",
        dataType: "json",
        data: "",

        success: function (data) {
            rand_data = data

            var g = svg.append("g");
            var projection = d3.geoMercator()
                .center([36.8, -1.3])
                .scale([90000])
                .translate([width / 2, height / 2]);

            var pathing = d3.geoPath().projection(projection);

            g.selectAll("myCircles")
                .data(rand_data)
                .enter()
                .append("circle")
                .attr("cx", function (d) {
                    console.log(d.coordinates[0])
                    return projection([d.coordinates[1], d.coordinates[0]])[0]
                })
                .attr("cy", function (d) {
                    return projection([d.coordinates[1], d.coordinates[0]])[1]
                })
                .attr("r", function (d) {
                    return d.radius
                })
                .style("fill", "69b3a2")
                .attr("stroke", "#000000")
                .attr("stroke-width", 2)
                .attr("fill-opacity", 0.1)
                .on("mouseover", showTooltip)
                .on("mousemove", moveTooltip)
                .on("mouseleave", hideTooltip)


        }
    });
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
        .center([36.77, -1.27])
        .scale([59000])
        .translate([width / 2, height / 2]);

    var nairobipathing = d3.geoPath().projection(projection);

    g.selectAll("path")
        .data(pos_data.features)
        .enter()
        .append("path")
        .attr("fill", "blue")
        .attr("class", "incident")
        .attr("stroke", "#334")
        .attr("d", nairobipathing)
        .style("stroke", (d, i) =>{
            return colorScale(i)
        })




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

  





}