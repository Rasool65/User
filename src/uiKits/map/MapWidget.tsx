import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';

mapboxgl.accessToken =
  'pk.eyJ1IjoicmFzb29sNjUiLCJhIjoiY2t3ZDg2N3E2MGkwMTJudDMzdjk1MGdjeiJ9.Sn7DOopMZh9YdohAwnCmvQ';
export default function MapWidget({ lat, lon }) {
  const mapContainer = useRef(null);

  useEffect(() => {
    if (lat && lon) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lat, lon],
        zoom: 12,
      });

      if (mapboxgl.getRTLTextPluginStatus() === 'unavailable') {
        mapboxgl.setRTLTextPlugin(
          'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js'
        );
      }
      map.addControl(
        new MapboxLanguage({
          defaultLanguage: 'mul',
        })
      );

      const marker1 = new mapboxgl.Marker({ color: 'red', rotation: 0 })
        .setLngLat([lat, lon])
        .addTo(map);
    }
    // const marker2 = new mapboxgl.Marker({ color: 'red', rotation: 0 })
    //   .setLngLat([51.353, 35.712])
    //   .addTo(map);
  }, [lat, lon]);
  return (
    <div
      style={{ height: 350, border: '1px solid rgba(240, 241, 242)' }}
      ref={mapContainer}
    />
  );
}
