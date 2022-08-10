import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import {Fill, Stroke, Style} from 'ol/style';

var Layersymbols = {
  rainContourSymb0l1: new Style({
    stroke: new Stroke({
      color: [237, 212, 0, 0],
      width: 3
    }),
    fill: new Fill({
      color: [237, 212, 0, 0]
    })
  }),
  rainContourSymb0l2: new Style({
    stroke: new Stroke({
      color: '#A6F2F2',
      width: 3
    }),
    fill: new Fill({
      color: '#A6F2F2'
    })
  }),
  rainContourSymb0l3: new Style({
    stroke: new Stroke({
      color: '#3DB83F',
      width: 3
    }),
    fill: new Fill({
      color: '#3DB83F'
    })
  }),
  rainContourSymb0l4: new Style({
    stroke: new Stroke({
      color: '#62B8FF',
      width: 3
    }),
    fill: new Fill({
      color: '#62B8FF'
    })
  }),
  rainContourSymb0l5: new Style({
    stroke: new Stroke({
      color: '#0002FE',
      width: 3
    }),
    fill: new Fill({
      color: '#0002FE'
    })
  }),
  rainContourSymb0l6: new Style({
    stroke: new Stroke({
      color: '#F701F8',
      width: 3
    }),
    fill: new Fill({
      color: '#F701F8'
    })
  }),
  rainContourSymb0l7: new Style({
    stroke: new Stroke({
      color: '#7F0140',
      width: 3
    }),
    fill: new Fill({
      color: '#7F0140'
    })
  }),
  rainContourSymb0l8: new Style({
    stroke: new Stroke({
      color: '#F4A700',
      width: 3
    }),
    fill: new Fill({
      color: '#F4A700'
    })
  }),
  rainContourSymb0l9: new Style({
    stroke: new Stroke({
      color: '#EB6300',
      width: 3
    }),
    fill: new Fill({
      color: '#EB6300'
    })
  }),
  rainContourSymb0l10: new Style({
    stroke: new Stroke({
      color: '#DC0000',
      width: 3
    }),
    fill: new Fill({
      color: '#DC0000'
    })
  }),
  rainContourSymb0l11: new Style({
    stroke: new Stroke({
      color: '#930000',
      width: 3
    }),
    fill: new Fill({
      color: '#930000'
    })
  })
}

var contourStyle = {
    renderType:"level",
    renderField:"lvalue",
    FieldScope:[{min:-1,max:0.01,symbol:Layersymbols.rainContourSymb0l1},
    {min:0.01,max:9.99,symbol:Layersymbols.rainContourSymb0l2},
    {min:9.99,max:24.99,symbol:Layersymbols.rainContourSymb0l3},
    {min:24.99,max:49.99,symbol:Layersymbols.rainContourSymb0l4},
    {min:49.99,max:99.99,symbol:Layersymbols.rainContourSymb0l5},
    {min:99.99,max:249.99,symbol:Layersymbols.rainContourSymb0l6},
    {min:249.99,max:399.99,symbol:Layersymbols.rainContourSymb0l7},
    {min:399.99,max:599.99,symbol:Layersymbols.rainContourSymb0l8},{min:599.99,max:999.99,symbol:Layersymbols.rainContourSymb0l9},{min:999.99,max:1499.99,symbol:Layersymbols.rainContourSymb0l10},{min:1499.99,max:100000,symbol:Layersymbols.rainContourSymb0l11}]
};

const vectorLayer = new VectorLayer({
  background: '#FFFFFF',
  source: new VectorSource({
    url: 'http://192.168.1.231:8200/huaihe/test.json',
    format: new GeoJSON(),
  }),
  style: function (feature) {
    // const color = feature.get('COLOR') || '#eeeeee';
    // style.getFill().setColor(color);
    for(var i = 0; i < contourStyle.FieldScope.length; i++){
      if(feature.values_[contourStyle.renderField] > contourStyle.FieldScope[i].min && feature.values_[contourStyle.renderField] <= contourStyle.FieldScope[i].max){
        return contourStyle.FieldScope[i].symbol;
      }
    }
  },
});

const map = new Map({
  // 对vectorlayer设置颜色


  layers: [vectorLayer],
  target: 'map',
  view: new View({
    projection: 'EPSG:4326',
    center: [104.036487,30.150627],
    zoom: 6,
    multiWorld: true
  }),
});

const featureOverlay = new VectorLayer({
  source: new VectorSource(),
  map: map,
  style: new Style({
    stroke: new Stroke({
      color: 'rgba(255, 255, 255, 0.7)',
      width: 2,
    }),
  }),
});

let highlight;
const displayFeatureInfo = function (pixel) {
  const feature = map.forEachFeatureAtPixel(pixel, function (feature) {
    return feature;
  });

  const info = document.getElementById('info');
  if (feature) {
    info.innerHTML = feature.get('ECO_NAME') || '&nbsp;';
  } else {
    info.innerHTML = '&nbsp;';
  }

  if (feature !== highlight) {
    if (highlight) {
      featureOverlay.getSource().removeFeature(highlight);
    }
    if (feature) {
      featureOverlay.getSource().addFeature(feature);
    }
    highlight = feature;
  }
};

// map.on('pointermove', function (evt) {
//   if (evt.dragging) {
//     return;
//   }
//   const pixel = map.getEventPixel(evt.originalEvent);
//   displayFeatureInfo(pixel);
// });
//
// map.on('click', function (evt) {
//   displayFeatureInfo(evt.pixel);
// });
