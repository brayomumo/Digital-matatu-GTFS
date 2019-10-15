var feature;
var stopMarker;
var shapeHusk;
var stopHusk;
var layerEaglenest
var minLat;
var maxLat;
var minLng;
var maxLng;


var strokeWidth = 3;

var map = new L.Map("map", {center: [-1.285325, 36.834509], zoom: 10})
const attribution  = '&copy;<a href= "https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution } )
tiles.addTo(map)


var svg = d3.select(map.getPanes().overlayPane).append("svg"),
    stopHuskGroup = svg.append("g").attr("class", "stop-husk-group leaflet-zoom-hide"),
    shapeHuskGroup = svg.append("g").attr("class", "shape-husk-group leaflet-zoom-hide"),
    stopGroup = svg.append("g").attr("class", "stop-group leaflet-zoom-hide"),
    shapeGroup = svg.append("g").attr("class", "shape-group leaflet-zoom-hide");

var pointCache = {};
var projectPoint = function(point) {
    var key = point[0] + ',' + point[1];
    if (pointCache[key] === undefined) {
        pointCache[key] = map.latLngToLayerPoint(new L.LatLng(point[0], point[1]));
    }
    return pointCache[key];
}

function init() {
  document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);
}

function handleFileSelect(event) {
  const reader = new FileReader()
  reader.onload = handleFileLoad;
  reader.readAsText(event.target.files[0])
}

function handleFileLoad(event) {
  console.log(event);
  var madata =  event.target.result;
  madata = madata.split("\n")
  var planes = []
  for (var i = 1; i < madata.length; i++){
    console.log(madata[i])
    planes.append(i)
  }
  console.log(planes)
  // for (var i = 0; i < planes.length; i++) {
  //   marker = new L.marker([planes[i][1],planes[i][2]])
  //     .bindPopup(" <b>Abuse type: </b>" + planes[i][0])
  //     .addTo(map);
  // }
}

  



var color = d3.scale.category20();

var line = d3.svg.line()
    .x(function(d) { return projectPoint([d.lat, d.lon]).x; })
    .y(function(d) { return projectPoint([d.lat, d.lon]).y; })

var drawShapes = function(shapeRows) {
  pointCache = {};

  var shapes = shapeRows.reduce(combineShapeRows);

  var lats = shapeRows.map(function(shape) { return shape.lat });
  var lngs = shapeRows.map(function(shape) { return shape.lon });
  minLat = d3.min(lats);
  minLng = d3.min(lngs);
  maxLat = d3.max(lats);
  maxLng = d3.max(lngs);

  var topLeft = projectPoint([maxLat, minLng]);
  var bottomRight = projectPoint([minLat, maxLng]);

  var southWest = L.latLng(minLat, minLng);
  var northEast = L.latLng(maxLat, maxLng);
  var bounds = L.latLngBounds(southWest, northEast);

  topLeft.x = topLeft.x - strokeWidth;
  topLeft.y = topLeft.y - strokeWidth;
  bottomRight.x = bottomRight.x + strokeWidth;
  bottomRight.y = bottomRight.y + strokeWidth;

  svg.attr("width", bottomRight.x - topLeft.x)
  .attr("height", bottomRight.y - topLeft.y)
  .style("left", topLeft.x + "px")
  .style("top", topLeft.y + "px").on("mouseover", function(){
    tooltip.style("display", null)
  }).on("mouseout", function(){
    tooltip.style("display", None)
  }).on("mousemove", function(d){
    var xPos = d3.mouse(this)[0] -15
    var yPos = d3.mouse(this)[1] - 55
    tooltip.attr("transform", "translate("+ xPos + "," + yPos + ")");
    tooltp.select("text").text(d.name + ":" + d.rank);
  });

  var tooltip = svg.append("g")
    .attr("class", tooltip)
    .style("display", "none");

  tooltip.append("text")
    .attr("x", 15)
    .attr("dy", "1.2em")
    .style("font-size", "1,25em")
    .attr("font-weight", "bold");


  shapeHuskGroup.attr("transform", "translate(" + -topLeft.x + "," + -topLeft.y + ")");
  shapeGroup.attr("transform", "translate(" + -topLeft.x + "," + -topLeft.y + ")");

  shapeHusk = shapeHuskGroup.selectAll('.husk')
  .data(d3.entries(shapes), function(d) { return d.key; })

  shapeHusk.enter().append('path')
  .attr('class', 'husk')
  .attr("d", function(d) { return line(d.value); })
  .style({
    fill: 'none',
    'stroke': '#000',
    'stroke-width': strokeWidth * 2,
    'stroke-opacity': 1
  });

  shapeHusk.exit().remove();

  feature = shapeGroup.selectAll('.feature')
  .data(d3.entries(shapes), function(d) { return d.key; })

  feature.enter().append('path')
  .attr('class', 'feature')
  .attr('d', function(d) { return line(d.value); })
  .style('stroke', function(d, i) { return color(i); })
  .style({
    fill: 'none',
    'stroke-width': strokeWidth,
    'stroke-opacity': 0.5
  });

  feature.exit().remove();

  map.fitBounds(bounds);
};

var resetShapes = function() {
  pointCache = {};

  strokeWidth = map.getZoom() < 8 ? 1 : (map.getZoom() - 7);

  var topLeft = projectPoint([maxLat, minLng]);
  var bottomRight = projectPoint([minLat, maxLng]);

  topLeft.x = topLeft.x - strokeWidth;
  topLeft.y = topLeft.y - strokeWidth;
  bottomRight.x = bottomRight.x + strokeWidth;
  bottomRight.y = bottomRight.y + strokeWidth;

  svg.attr("width", bottomRight.x - topLeft.x)
  .attr("height", bottomRight.y - topLeft.y)
  .style("left", topLeft.x + "px")
  .style("top", topLeft.y + "px");

  shapeHuskGroup.attr("transform", "translate(" + -topLeft.x + "," + -topLeft.y + ")");
  shapeGroup.attr("transform", "translate(" + -topLeft.x + "," + -topLeft.y + ")");

  shapeHusk.attr("d", function(d) { return line(d.value); })
  .style({'stroke-width': strokeWidth * 1});

  feature.attr("d", function(d) { return line(d.value); })
  .style({'stroke-width': strokeWidth});
}

var drawStops = function(data) {
  pointCache = {};

  var lats = data.map(function(stop) { return stop.lat });
  var lngs = data.map(function(stop) { return stop.lon });

  var topLeft = projectPoint([d3.max(lats), d3.min(lngs)]);
  var bottomRight = projectPoint([d3.min(lats), d3.max(lngs)]);

  topLeft.x = topLeft.x - strokeWidth;
  topLeft.y = topLeft.y - strokeWidth;
  bottomRight.x = bottomRight.x + strokeWidth;
  bottomRight.y = bottomRight.y + strokeWidth;

  stopHuskGroup.attr("transform", "translate(" + -topLeft.x + "," + -topLeft.y + ")");
  stopGroup.attr("transform", "translate(" + -topLeft.x + "," + -topLeft.y + ")");

  stopHusk = stopHuskGroup.selectAll('.stop-husk')
  .data(data, function(d) { return d.id; })

  stopHusk.enter().append('circle')
  .attr('class', 'stop-husk')
  .attr('r', strokeWidth * 2)
  .attr('cx', function(d) { return projectPoint([d.lat, d.lon]).x; })
  .attr('cy', function(d) { return projectPoint([d.lat, d.lon]).y; })
  .style('fill', '#333333');

  stopHusk.exit().remove();

  stopMarker = stopGroup.selectAll('.stop')
  .data(data, function(d) { return d.id; })

  stopMarker.enter().append('circle')
  .attr('class', 'stop')
  .attr('r', strokeWidth)
  .attr('cx', function(d) { return projectPoint([d.lat, d.lon]).x; })
  .attr('cy', function(d) { return projectPoint([d.lat, d.lon]).y; })
  .style('fill', '#35A9FC');

  stopMarker.exit().remove();
};

var resetStops = function() {
  pointCache = {};

  strokeWidth = map.getZoom() < 9 ? 1 : (map.getZoom() - 8);

  var topLeft = projectPoint([maxLat, minLng]);
  var bottomRight = projectPoint([minLat, maxLng]);

  topLeft.x = topLeft.x - strokeWidth;
  topLeft.y = topLeft.y - strokeWidth;
  bottomRight.x = bottomRight.x + strokeWidth;
  bottomRight.y = bottomRight.y + strokeWidth;

  stopHuskGroup.attr("transform", "translate(" + -topLeft.x + "," + -topLeft.y + ")");
  stopGroup.attr("transform", "translate(" + -topLeft.x + "," + -topLeft.y + ")");

  stopHusk.attr('r', strokeWidth * 2)
  .attr('cx', function(d) { return projectPoint([d.lat, d.lon]).x; })
  .attr('cy', function(d) { return projectPoint([d.lat, d.lon]).y; })

  stopMarker.attr('r', strokeWidth)
  .attr('cx', function(d) { return projectPoint([d.lat, d.lon]).x; })
  .attr('cy', function(d) { return projectPoint([d.lat, d.lon]).y; })
};

var cleanShapeRow = function(row) {
    return {
        id: row.shape_id,
        lat: parseFloat(row.shape_pt_lat),
        lon: parseFloat(row.shape_pt_lon),
        sequence: row.shape_pt_sequence
    };
};

var cleanStopRow = function(row) {
    return {
        id: row.stop_id,
        code: row.stop_code,
        lat: parseFloat(row.stop_lat),
        lon: parseFloat(row.stop_lon),
        name: row.stop_name
    };
};

var combineShapeRows = function(previous, current, index) {
    if (index === 1) {
        var tmp = {};
        tmp[previous.id] = [previous];
        previous = tmp;
    }

    if (!previous.hasOwnProperty(current.id)) {
        previous[current.id] = [];
    }

    previous[current.id].push(current);
    return previous;
};

var load_shapes = function(csv) {
    var data = d3.csv.parse(csv, cleanShapeRow);
    drawShapes(data);
};

var load_stops = function(csv) {
    var data = d3.csv.parse(csv, cleanStopRow);
    drawStops(data);
};

var upload_button = function(el) {
    var uploader = document.getElementById(el);
    
    var handleFiles = function() {
        parseGtfs(this.files[0], {
            'shapes.txt': load_shapes,
            // 'stops.txt': load_stops
        });
    };

    uploader.addEventListener("change", handleFiles, false);
};


upload_button("uploader");

map.on('viewreset', function() {
    resetShapes();
    //resetStops();
});