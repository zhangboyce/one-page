var width = 400;
var height = 400;
var r = 20;
var sides = 8;
var points = Array.from({length: sides}).map(function (it, i) {
    var theta = (i / sides) * 2*Math.PI;
    return [200 - Math.sin(theta) * r, 200 - Math.cos(theta) * r];
});

var pointsStr = points.map(function (point) {
    return point.join(',')
}).join(' ');

console.log(pointsStr);