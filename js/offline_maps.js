// < ============================================== IMPORTS ============================================== >
// All map
var Map = ol.Map;
var View = ol.View;
var CircleStyle = ol.style.Circle;
var Fill = ol.style.Fill;
var Stroke = ol.style.Stroke;
var Style = ol.style.Style;

var Draw = ol.interaction.Draw;
var Modify = ol.interaction.Modify;
var Snap = ol.interaction.Snap;

var OSM = ol.source.OSM;
var VectorSource = ol.source.Vector;


var TileLayer = ol.layer.Tile;
var VectorLayer = ol.layer.Vector;

var click = ol.events.condition;
var Select = ol.interaction.Select;

// arrow import
var Icon = ol.style.Icon;
var Point = ol.geom.Point

// icon import
var Feature = ol.Feature;
var Features = ol.Feature.Feature;

// scale import
var ScaleLine = ol.control.ScaleLine;
var defaultControls = ol.control.defaults;

// measure
var Overlay = ol.Overlay;
var LineString = ol.geom.LineString;
var Polygon = ol.geom.Polygon;
var unByKey = ol.Observable.unByKey;
var getArea = ol.sphere.getArea;
var getLength = ol.sphere.getLength;
// text
var Text = ol.style.Text;
var Zoom = ol.control.Zoom;
// render
var renderMode = ol.layer.vectorRendertype;



// / <============================================== IMPORTS ==============================================>


// <============================================== INIT LAYERS AND MAP ==============================================>
// raster layer for map render
var raster = new TileLayer({
    source: new OSM({ url: 'Tiles/{z}/{x}/{y}.png', }),
    updateWhileAnimating: true,
    updateWhileInteracting: true,
});





// Vector layer
var source0 = new VectorSource();
var source1 = new VectorSource();
var source2 = new VectorSource();
var source3 = new VectorSource();
var source = source0;




var radius_1 = 7;



// vector layser for draw figure
var vector = new VectorLayer({
    source: source0,
    updateWhileAnimating: true,
    updateWhileInteracting: true,
    declutter: true,


});



// document.getElementById('set-source').onclick = function() {
//     vector.setSource(source);
// };

// document.getElementById('unset-source').onclick = function() {
//     vector.setSource(source1);
// };

// document.getElementById('unset-source').onclick = function() {
//     vector.setSource(source2);
// };

// document.getElementById('unset-source').onclick = function() {
//     vector.setSource(source3);
// };




// scale line
var control;

function scaleControl() {
    control = new ScaleLine({
        units: "metric",
    });
    return control;
}
// chaikin-gladkaya line never don't work


// map 
var map = new Map({
    controls: defaultControls().extend([scaleControl()]),
    layers: [raster, vector],
    target: 'map',
    view: new View({
        // center: [62.41, 48.82],
        center: ol.proj.fromLonLat([67.41, 48.82]),
        zoom: 5.7,
        minZoom: 5.7,
        maxZoom: 13,

    }),

});





// /<============================================== INIT LAYERS AND MAP ==============================================>
/// логи по масштабу не трогать
var currZoom = map.getView().getZoom();
map.on('moveend', function(e, feature) {
    var newZoom = map.getView().getZoom();
    if (currZoom != newZoom) {
        console.log('zoom end, new zoom: ' + newZoom);
        currZoom = newZoom;

        // if (currZoom < 12.7 && currZoom >= 10) {
        //     scale_i = 1;
        // } else if (currZoom < 10 && currZoom >= 9) {
        //     scale_i = 0.6;

        // } else if (currZoom < 9 && currZoom >= 7.3) {
        //     scale_i = 0.4;
        // } else if (currZoom < 9 && currZoom >= 5.7) {
        //     scale_i = 0.2;
        // }




        map.removeInteraction(draw);
        map.removeInteraction(snap);
        addInteractions();




        // if (currZoom < 12.7 && currZoom >= 10) {
        //     source = source3
        //     console.log(source + '000');
        // } else if (currZoom < 10 && currZoom >= 9) {
        //     source = source2;
        //     console.log(source + '001');
        // } else if (currZoom < 9 && currZoom >= 7.3) {
        //     source = source1;
        //     console.log(source + '002');
        // } else if (currZoom < 9 && currZoom >= 5.7) {
        //     source = source0;
        //     console.log(source + '003');
        // }
        // vector.setSource(source);
        // map.removeInteraction(draw);
        // map.removeInteraction(snap);
        // addInteractions();

        // if (currZoom < 12.7 && currZoom >= 10) {
        //     scale_i = 1;

        //     console.log(radius_1 + '000');
        // } else if (currZoom < 10 && currZoom >= 9) {
        //     scale_i = 0.8;

        // } else if (currZoom < 9 && currZoom >= 7.3) {
        //     scale_i = 0.5;

        // } else if (currZoom < 7.3 && currZoom >= 5.7) {
        //     scale_i = 0.2;

        // }

        vector.setSource(source);


        map.removeInteraction(draw);
        map.removeInteraction(snap);
        addInteractions();


    }
});




// <============================================== STYLES ==============================================>
// for select on page


var style_struct = {
    circle_color: '#000',
    fill_color: '#00f',
    fill_background: '#0f0',
    fill_opacity: 0.2,
    lineDash_style: [10, 10],
    Text_style: "dawdawd",
    scale_icon: 1,
    rotation_icons: 0,
    color_arrow: '#000'
}



// set icon for used image
var icon_image = '';
var icon_style;
var rotation_i;
var scale_i;


var pixel = [1, 1]

///// поулчени иконки и вывощд на карту 
function set_icon_image(t) {


    console.log(">>> set_icon_image");
    type_draw = "icon"
        // console.log(t);
    icon_image = t.getElementsByTagName('img')[0].getAttribute('src');

    // setUsedStyle()
    console.log(icon_image);
    icon_style = new Style({

        image: new Icon({ // set icon image if image selected


            src: icon_image,
            scale: pixel,
            rotation: rotation_i,
            rotateWithView: true,




        }),

    });
    // vector.setStyle(function(feature, resolution) {
    //     iconStyle.getImage().setScale(16000 / resolution);
    //     return iconStyle;
    // });
    map.removeInteraction(draw);
    map.removeInteraction(snap);
    addInteractions();
}





// <===================================== ICON LIST =====================>
function download_icons(e) {
    console.log(">>> download_icons");
    console.log(e);
    if (e.files[0].size <= 12288) {
        let file = e.files[0];

        let reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function() {
            // document.getElementById(id_num + "_img").src = reader.result;
            icons_app.test(reader.result);
        }
    } else {
        alert("File is too large!")
    }

}



var icons_app = new Vue({
    el: "#icon_app",
    data: {
        message: 'fksdljfljs',
        icon_last_id: 1,

        // Стартовые данные иконок
        object_icons: [],
    },

    methods: {
        deleteIconByIdAndType: function(id) {
            this.object_icons.splice(id, 1);
        },

        // icon
        test: function(ind) {
            this.object_icons.push({
                id: ++this.icon_last_id,
                src: ind,
                description: '',
            })

        },

        getIconsAndDesForPDF: function() {
            console.log(">>> getIconsAndDesForPDF");
            var object_icons = this.object_icons;
            var body = [];
            // body.push([{ text: 'Ориентиры', colSpan: 2 }, {}]); // Заголовок Ориентров занимает 2 ячейки по горизонтали

            body.push([{ text: 'Обозначения', colSpan: 2 }, {}]); // Заголовок Обозначений занимает 2 ячейки по горизонтали

            // Ориентиры
            for (var i = 0; i < object_icons.length; i++) {
                var row = [{
                    image: object_icons[i].src, // Изображение
                    width: 32,
                    height: 32
                        // text: "skdfjlskjlfe"
                }, { text: object_icons[i].description }, ]; // Описание
                body.push(row);
            }

            return body
        }
    }

});

icons_app.getIconsAndDesForPDF();
//<================================= ICON LIST ============================================>

// styles for draw
var default_vector_style;
var lineDash_value;

function setUsedStyle() {
    console.log(">>> setUsedStyle");

    // set style 
    style_struct['circle_color'] = document.getElementById("circle_color_id").value;
    style_struct['fill_color'] = document.getElementById("fill_color_id").value;
    style_struct['lineDash_style'] = document.getElementById("lineDash_id").value;
    style_struct['Text_style'] = document.getElementById("Text_style_id").value;
    style_struct['text_size'] = document.getElementById("text_size").value;
    style_struct['text_color'] = document.getElementById("text_color").value;
    style_struct['color_arrow'] = document.getElementById("circle_color_id").value;
    // get opacity
    style_struct['fill_opacity'] = document.getElementById("fill_opacity_id").value;
    var fill_color = setColorWithOpacity(style_struct['fill_color'], style_struct['fill_opacity']);


    switch (style_struct['lineDash_style']) {
        case "Scale":
            lineDash_value = [0, 0];
            break;
        case "Dash":
            lineDash_value = [10, 10]
            break;
        case "Dot":
            lineDash_value = [5, 5]
            break;
    };

    var Text_style_T;
    if (style_struct['Text_style']) {
        Text_style_T = Text_style_id.value
    };

    console.log(style_struct);

    // set style 
    default_vector_style = new Style({

        fill: new Fill({
            color: fill_color,
        }),
        text: new Text({
            text: Text_style_T,
            font: style_struct['text_size'] + 'px Arial',
            placement: 'line',
            maxAngle: Math.PI / 4,
            offsetY: -20,
            rotateWithView: true,
            textAlign: 'start',
            fill: new ol.style.Fill({
                color: style_struct['text_color'],
            }),
        }),
        stroke: new Stroke({
            color: style_struct['circle_color'],
            width: 2,
            lineDash: lineDash_value,

        }),


        image: new CircleStyle({ // set regular circle
            radius: radius_1,

            fill: new Fill({
                color: style_struct['circle_color'],


            }),

        }),
        point: new Point({
            color: style_struct['circle_color'],
            width: 2,


        }),

    });



    map.removeInteraction(draw);
    map.removeInteraction(snap);
    addInteractions();
};

function jjj(feature, resolution) {
    style.getImage().setScale(16000 / resolution);
}

//measure

function createHelpTooltip() {
    if (helpTooltipElement) {
        helpTooltipElement.parentNode.removeChild(helpTooltipElement);
    }
    helpTooltipElement = document.createElement('div');
    helpTooltipElement.className = 'ol-tooltip hidden';
    helpTooltip = new Overlay({
        element: helpTooltipElement,
        offset: [15, 0],
        positioning: 'center-left',
    });
    map.addOverlay(helpTooltip);
}

/**
 * Creates a new measure tooltip
 */
function createMeasureTooltip() {
    if (measureTooltipElement) {
        measureTooltipElement.parentNode.removeChild(measureTooltipElement);
    }
    measureTooltipElement = document.createElement('div');
    measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
    measureTooltip = new Overlay({
        element: measureTooltipElement,
        offset: [0, -15],
        positioning: 'bottom-center',
    });
    map.addOverlay(measureTooltip);
}

createMeasureTooltip();
createHelpTooltip();
// set color with opacity for style 
function setColorWithOpacity(color, opacity) {
    // set color with opacity
    var fill_color = ol.color.asArray(color);
    fill_color = fill_color.slice();
    fill_color[3] = opacity;

    return fill_color
}

function setColorWithOpacity(color, opacity) {
    // set color with opacity
    var fill_color = ol.color.asArray(color);
    fill_color = fill_color.slice();
    fill_color[3] = opacity;
    return fill_color
}


// <============================================== STYLES ==============================================>


// <========================================================= INIT MEASURE ==============================================>
var sketch;
var helpTooltipElement;
var helpTooltip;
var measureTooltipElement;
var measureTooltip;
var continuePolygonMsg = 'Click to continue drawing the polygon';
var continueLineMsg = 'Click to continue drawing the line';


var pointerMoveHandler = function(evt) {
    if (evt.dragging) {
        return;
    }
    var helpMsg = 'Click to start drawing';

    if (sketch) {
        var geom = sketch.getGeometry();
        if (geom instanceof Polygon) {
            helpMsg = continuePolygonMsg;
        } else if (geom instanceof LineString) {
            helpMsg = continueLineMsg;
        }
    }

    helpTooltipElement.innerHTML = helpMsg;
    helpTooltip.setPosition(evt.coordinate);

    helpTooltipElement.classList.remove('hidden');
};

// measure
var formatLength = function(line) {
    var length = getLength(line);
    var output;
    if (length > 100) {
        output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
    } else {
        output = Math.round(length * 100) / 100 + ' ' + 'm';
    }
    return output;
};


var formatArea = function(polygon) {
    var area = getArea(polygon);
    var output;
    if (area > 10000) {
        output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
    } else {
        output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
    }
    return output;
};

map.on('pointermove', pointerMoveHandler);
// mouse out from viewport
map.getViewport().addEventListener('mouseout', function() {
    helpTooltipElement.classList.add('hidden');
});

// /<========================================================= INIT MEASURE ==============================================>



// <============================================== DRAW ==============================================>
var feature_drawed;
var styles;
var draw, snap; // global so we can remove them later
var typeSelect = document.getElementById('type');
var type_draw = 'None'

function set_draw_type_from_interface(t) {
    // console.log(t);
    // window.test = t;
    type_draw = t.value;

    setUsedStyle()
    map.removeInteraction(draw);
    map.removeInteraction(snap);
    addInteractions();
}


// drawing  
function addInteractions() {
    // get type
    var type = type_draw == 'area' ? 'Polygon' : 'LineString';

    let type_value = type_draw;
    if (type_value !== 'None') { // set drawing
        var draw_type_selected = type_draw;
        var draw_type = draw_type_selected;
        var setted_style = default_vector_style;
        var setted_draw_style = default_vector_style;
        // var drawend_function = defaultFunctionDrawEnd;
        var drawend_function = setToLastFeatureStyle;

        // draw arrow
        if (draw_type_selected == 'Arrow') {
            draw_type = "LineString";
            // setted_style = styleFunctionArrow;

        }


        // draw meashure length
        if (draw_type_selected == 'length') {
            draw_type = "LineString";
            // setted_style = setUsedStyle;
        }

        // draw meashuer area
        if (draw_type_selected == 'area') {
            draw_type = "Polygon";
            // setted_style = setUsedMeasureStyle;
        }

        if (draw_type_selected == 'icon') {
            draw_type = "Point";
            setted_style = icon_style;
        }


        // set draw
        draw = new Draw({
            source: source,
            type: draw_type,
            style: setted_draw_style,
        });
        map.addInteraction(draw);



        // dont change style
        draw.on('drawend', ev => { drawend_function(ev, setted_style, draw_type_selected) })
            // if selected measure type to draw
        if (draw_type_selected == 'length' || draw_type_selected == 'area') {
            var listener;
            // begin calc meashure
            draw.on('drawstart', function(evt) {
                // set sketch
                sketch = evt.feature;

                /** @type {import("../src/ol/coordinate.js").Coordinate|undefined} */
                var tooltipCoord = evt.coordinate;

                listener = sketch.getGeometry().on('change', function(evt) {
                    var geom = evt.target;
                    var output;
                    if (geom instanceof Polygon) {
                        output = formatArea(geom);
                        tooltipCoord = geom.getInteriorPoint().getCoordinates();
                    } else if (geom instanceof LineString) {
                        output = formatLength(geom);
                        tooltipCoord = geom.getLastCoordinate();
                    }
                    measureTooltipElement.innerHTML = output;
                    measureTooltip.setPosition(tooltipCoord);
                    console.log(tooltipCoord);
                });
            });

            // end calc meashure
            draw.on('drawend', function() {
                console.log(">>> - drawend meashure");
                measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
                measureTooltip.setOffset([0, -7]);
                // unset sketch
                sketch = null;
                // unset tooltip so that a new one can be created
                measureTooltipElement = null;
                createMeasureTooltip();
                unByKey(listener);
            });
            this
        }

        // set snap
        snap = new Snap({ source: source });
        map.addInteraction(snap);
    }

}


// style and block change style on "change" event
// dont change style
function setToLastFeatureStyle(event, style, type) {
    // console.log(">>> - setToLastFeatureStyle");

    var feature_drawed = event.feature;

    console.log(feature_drawed);


    // set arrow
    styles = [style]
    var geometry = feature_drawed.getGeometry();

    if (type == 'Arrow') {
        geometry.forEachSegment(function(start, end) {
            var dx = end[0] - start[0];
            var dy = end[1] - start[1];
            var rotation = Math.atan2(dy, dx);
            // arrows
            styles.push(
                new Style({
                    geometry: new Point(end),
                    image: new Icon({
                        src: 'img/arraow_update.png',
                        anchor: [0.75, 0.5],
                        rotateWithView: true,
                        rotation: -rotation,
                        color: style_struct['circle_color'],
                    }),
                })
            );
        });


        feature_drawed.style_to_set = cloneObject(styles);
        // console.log(">> style");
        // console.log(style);
        console.log(feature_drawed.style_to_set);
        feature_drawed.setStyle(feature_drawed.style_to_set);
        // block change style 
        feature_drawed.on("change", ev => {
            if (ev.target.getStyle() != feature_drawed.style_to_set && ev.target != selectInteraction.getFeatures().item(0)) {


                ev.target.setStyle(feature_drawed.style_to_set);




            }
        })

    } else if (type == 'icon') {
        feature_drawed.style_to_set = cloneObject(style);
        // console.log(">> style");
        // console.log(style);
        console.log(feature_drawed.style_to_set);
        feature_drawed.setStyle(feature_drawed.style_to_set);
        // block change style 
        feature_drawed.on("change", ev => {
            if (ev.target.getStyle() != feature_drawed.style_to_set && ev.target != selectInteraction.getFeatures().item(0)) {
                console.log("> - change");

                // ev.target.getFeatures().setScale(feature_drawed.style_to_set)

                console.log(feature_drawed.style_to_set);
                ev.target.setStyle(feature_drawed.style_to_set);



            }
        })

    } else {

        feature_drawed.style_to_set = cloneObject(style);
        // console.log(">> style");
        // console.log(style);
        console.log(feature_drawed.style_to_set);
        feature_drawed.setStyle(feature_drawed.style_to_set);
        // block change style 
        feature_drawed.on("change", ev => {
            if (ev.target.getStyle() != feature_drawed.style_to_set && ev.target != selectInteraction.getFeatures().item(0)) {

                console.log(ev.target.setStyle(feature_drawed.style_to_set));

            }
        })
    }




}


function scale_static(feature) {
    map.view.minZoom = 5.7;
    map.view.maxZoom = 14;
    console.log(scale_static);
}

var typeOf = function(obj) {
    return ({}).toString.call(obj)
        .match(/\s([a-zA-Z]+)/)[1].toLowerCase();
};

function cloneObject(obj) {
    var type = typeOf(obj);
    if (type == 'object' || type == 'array') {
        if (obj.clone) {
            return obj.clone();
        }
        var clone = type == 'array' ? [] : {};
        for (var key in obj) {
            clone[key] = cloneObject(obj[key]);
        }
        return clone;
    }
    return obj;
}




function text() {

    var selectedFeature = selectInteraction.getFeatures().item(0);
    console.log(selectedFeature.style_to_set);

    if (selectedFeature) {

        var style_selected = selectedFeature.style_to_set;
        // style_selected.getImage().getImage().src = icon_image;


        // style_selected.getImage().setScale(scale_i);
        // style_selected.getImage().setRotation(rotation_i);
        document.getElementById("Text_style_id").value = '';
        style_selected.getStroke().setColor(style_struct['circle_color']);
        //style_selected.getPoint().setColor(style_struct['circle_color']);
        style_selected.getStroke().setLineDash(lineDash_value);
        style_selected.getFill().setColor(setColorWithOpacity(style_struct['fill_color'], style_struct['fill_opacity']));
        style_selected.getText().getFill().setColor(style_struct['text_color']);
        style_selected.getText().setFont(style_struct['text_size'] + 'px Arial');

        style_selected.getText().setText(Text_style_id.value);



        console.log(">> selectedFeature.setStyle");
        selectedFeature.setStyle(style_selected);

    }
}

function icon_change_selection() {
    var selectedFeature = selectInteraction.getFeatures().item(0);
    console.log(selectedFeature.style_to_set);

    if (selectedFeature) {
        var style_selected = selectedFeature.style_to_set;
        style_selected.getImage().setScale(scale_i);
        style_selected.getImage().setRotation(rotation_i);

        console.log(">> selectedFeature.setStyle");
        selectedFeature.setStyle(style_selected);
    }
}

function change_icon() {
    style_struct['scale_icon'] = document.getElementById("scale_id_for_icon").value;
    style_struct['rotation_icons'] = document.getElementById("rotation_icons_id").value;
    scale_i = style_struct['scale_icon'];
    rotation_i = style_struct['rotation_icons'];

}

function change_icon_text() {
    console.log(">>> change_icon_text");
    change_icon();
    icon_change_selection();

}


// /<============================================== DRAW ==============================================>


// <============================================== DELETE ==============================================>
var selectInteraction = new Select();
map.addInteraction(selectInteraction);
var select = null; // ref to currently selected interaction

// select interaction working on "click"
var selectClick = new Select({
    condition: click,
});
console.log(selectClick);

map.on('pointermove', function(evt) {
    map.getTargetElement().style.cursor = map.hasFeatureAtPixel(evt.pixel) ?
        'pointer' :
        '';
});



var changeInteraction = function() {
    if (select !== null) {
        map.removeInteraction(select);


    }

    var value = 'click';
    if (value == 'click') {
        select = selectClick;
        // console.log("");
    } else {
        select = null;
    }

};

function deleteSelected() {
    console.log(">>> deleteSelected");
    var selectedFeature = selectInteraction.getFeatures().item(0);
    if (selectedFeature) {
        console.log(">> selectedFeature");
        console.log(selectedFeature);
        //Remove it from your feature source
        vector.getSource().removeFeature(selectedFeature)
        console.log(">> vector.getSource()");
    }
};
// /<============================================== DELETE ==============================================>


// <============================================== MODIFY ==============================================>
// modify 
var modify = new Modify({ source: source });
map.addInteraction(modify);

document.getElementById('undo').addEventListener('click', function() {
    draw.removeLastPoint();
});
// /<============================================== MODIFY ==============================================>


// <================= keybordsevent ===============>

document.addEventListener("keydown", function(event) {
    // console.log(">>> addEventListener keydown");
    // console.log(event);

    // console.log(event.which);
    // console.log(event.altKey);
    // console.log(event.ctrlKey);
    // console.log(event.shiftKey);
    // console.log(event.metaKey);

    if (event.keyCode == 46) {
        deleteSelected();
    }
    if (event.keyCode == 90 && event.ctrlKey == true) {
        draw.removeLastPoint();

    }

    if (event.keyCode == 27) {

    }
});
// <================= keybordsevent ===============>
//save png file

document.getElementById('export-png').addEventListener('click', function() {
    map.once('rendercomplete', function() {
        var mapCanvas = document.createElement('canvas');
        var size = map.getSize();
        mapCanvas.width = size[0];
        mapCanvas.height = size[1];
        var mapContext = mapCanvas.getContext('2d');
        Array.prototype.forEach.call(
            document.querySelectorAll('.ol-layer canvas'),
            function(canvas) {
                if (canvas.width > 0) {
                    var opacity = canvas.parentNode.style.opacity;
                    mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
                    var transform = canvas.style.transform;
                    // Get the transform parameters from the style's transform matrix
                    var matrix = transform
                        .match(/^matrix\(([^\(]*)\)$/)[1]
                        .split(',')
                        .map(Number);
                    // Apply the transform to the export map context
                    CanvasRenderingContext2D.prototype.setTransform.apply(
                        mapContext,
                        matrix
                    );
                    mapContext.drawImage(canvas, 0, 0);
                }
            }
        );
        if (navigator.msSaveBlob) {
            // link download attribuute does not work on MS browsers
            navigator.msSaveBlob(mapCanvas.msToBlob(), 'map.png');
        } else {
            var link = document.getElementById('image-download');
            link.href = mapCanvas.toDataURL();
            link.click();
        }
    });
    map.renderSync();
});