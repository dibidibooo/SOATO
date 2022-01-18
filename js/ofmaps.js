




////////////////////////=====Переменная для отображения карты===========///////////////////
var color = '#d40f0f';

// function green(){
//     color = '#29a007';
//     map.removeInteraction(draw);
//     map.removeInteraction(snap);
//     addInteractions();

// }


////////////////////////=====Переменная для отображения карты===========///////////////////





////////////////Составления карты из слоев png, растровый слой... не убирать////////////////////////////////////////
var raster = new ol.layer.Tile({
    source: new ol.source.OSM({  url: 'Tiles/{z}/{x}/{y}.png',}),
});


var Vector = ol.source.Vector;
var source = new Vector({
source:source,
});

////////////////Составления карты из слоев png, растровый слой... не убирать//////////////////////////////////////// 








//////////////////////////////////////////////figure//////////////////////////////////////////////////////////
var vector = new ol.layer.Vector({
    source: source,
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new ol.style.Stroke({
            color: color,
            width: 2,
        }),
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                color: color,
            }),
            



        }),
    }),
});

//////////////////////////////////////////////figure//////////////////////////////////////////////////////////





////////////////////////////////////// ////////настройки самой карты //////////////////////////////////////////////////////////
var map = new ol.Map({
    
    layers: [raster, vector],
    target: 'map', 
    
    
    view: new ol.View({
        center: ol.proj.fromLonLat([62.41, 48.82] ),
        zoom: 5,
        minZoom:5,
        maxZoom:13,
        

    }),
    
    
});

// console.log(">>> map");
// console.log(map);




////////////////////////////////////////////// настройки самой карты  //////////////////////////////////////////////////////////






//////////////////////////////////////////// настройки рисования на слоях ///////////////////////////////////////////////////




var draw, snap; // global so we can remove them later
var typeSelect = document.getElementById('type');


function addInteractions() {
    var value = typeSelect.value;
    if (value !== 'None') {
        draw = new ol.interaction.Draw({
            source: source,
            type: typeSelect.value,
        });
        
        map.addInteraction(draw);
        snap = new ol.interaction.Snap({source: source});
        map.addInteraction(snap);
        
    }
    
}

/**
 * Handle change event.
 */
typeSelect.onchange = function () {
    map.removeInteraction(draw);
    map.removeInteraction(snap);
    addInteractions();
};
document.getElementById('undo').addEventListener('click', function () {
  draw.removeLastPoint();
});

addInteractions();
////////////////////////////////////////////настройки рисования на слоях///////////////////////////////////////////////////