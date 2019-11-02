import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import animations from '../src';

export default {
  title: 'Animations'
};

const factory = (specUrl) => {
  const container = document.createElement('div');

  container.style.width = '100%';
  container.style.height = '100%';

  const map = new mapboxgl.Map({
    container,
    center: [0, 0],
    zoom: 3,
    antialias: true,
    renderWorldCopies: false,
    style: specUrl
  });

  animations.addToMap(map);

  map.on('load', (event) => {
    map.resize();
  });

  return container;
}

export const pulse = () => factory('/pulse.json');

export const stressTest = () => factory('/stress-test.json');

export const movingDot = () => factory('/moving-dot.json');
