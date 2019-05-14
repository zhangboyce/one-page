var radar = function () {
    var width = 800;
    var height = 800;
    var cx = width / 2;
    var cy = height / 2;
    var r = 50;
    var layer = 5;
    var R = r * layer;
    var sides = 8;

    // 绘制八边形
    function polygon_paths() {
        var fillColor = 'none';
        var strokeColor = '#000';
        var dashedStrokeColor = 'rgba(0, 0, 0, .5)';
        var strokeDashArray = '0,0';
        var dashedStrokeDashArray = '5,5';

        function path(layerth) {
            var points = Array.from({length: sides}).map(function (it, i) {
                var theta = (i / sides) * 2*Math.PI;
                return [cx - Math.sin(theta) * r * layerth, cy - Math.cos(theta) * r * layerth];
            });

            return points.map(function (point, i) {
                return (i === 0 ? "M " : "L ") + point.join(',')
            }).join(' ') + " Z";
        }

        return Array.from({ length: layer }).map(function (it, i) {
            var isDashed = i !== layer - 1;
            return {
                fillColor: fillColor,
                strokeColor: isDashed ? dashedStrokeColor : strokeColor,
                strokeDashArray: isDashed ? dashedStrokeDashArray: strokeDashArray,
                d: path(i + 1)
            };
        });
    }

    // 绘制多边形
    function polygon(pointYs, fillColor, pointColor, strokeColor) {
        fillColor = fillColor || 'rgba(0, 0, 0, .5)';
        strokeColor = strokeColor || 'none';
        pointColor = pointColor || '#000';

        var pointLength = pointYs.length || 0;
        var points = pointYs.map(function (it, i) {
            var theta = (i / pointLength) * 2*Math.PI;
            return [cx - Math.sin(theta) * R * (it / 100), cy - Math.cos(theta) * R * (it / 100)];
        });

        return {
            fillColor: fillColor,
            strokeColor: strokeColor,
            points: points.map(function (point, i) {
                return point.join(',')
            }).join(' '),

            _points: points,
            pointColor: pointColor
        }
    }

    // 绘制文字
    function texts(names) {
        var namesLength = names.length || 0;
        return names.map(function (it, i) {
            var name = it.title || '';
            var desc = it.desc || '';

            var name_fontSize = 24;
            var desc_fontSize = 16;

            var _R = R + 40;
            var theta = (i / namesLength) * 2*Math.PI;
            var name_X = cx - Math.sin(theta) * _R - name.length * name_fontSize / 2;
            var name_Y = cy - Math.cos(theta) * _R;

            var desc_X = cx - Math.sin(theta) * _R - desc.length * desc_fontSize / 2;
            var desc_Y = cy - Math.cos(theta) * _R + 20;

            return {
                name: name,
                name_X: name_X,
                name_Y: name_Y,
                name_fontSize: name_fontSize,

                desc: desc,
                desc_X: desc_X,
                desc_Y: desc_Y,
                desc_fontSize: desc_fontSize
            };
        });
    }
    
    var paths = polygon_paths();

    var polygon1 = polygon([54, 75, 96, 20, 61, 53, 61, 48], 'rgba(232, 233, 234, 0.8)', 'rgb(232, 233, 234)');
    var polygon2 = polygon([34, 78, 56, 90, 11, 23, 66, 78], 'rgba(166,188,61, 0.6)', 'rgb(166,188,61)');
    var polygons = [polygon1, polygon2];

    var texts = texts([{title: '水润度', desc: '轻度缺水'}, {title: '水润度', desc: '轻度缺水'}, {title: '水润度', desc: '轻度缺水'}, {title: '水润度', desc: '油脂分泌过于旺盛'}, {title: '水润度', desc: '轻度缺水'}, {title: '水润度', desc: '轻度缺水'}, {title: '水润度', desc: '无明显色素沉着'}, {title: '水润度', desc: '轻度缺水'},]);

    var html = window.nunjucks.render('radar.html', {
        texts: texts,
        paths: paths,
        polygons: polygons
    });
    return html
};