import React, { useEffect, useRef, useState } from 'react';

const StoreMap = () => {
  const [selectedStore, setSelectedStore] = useState('п.Щельяюр');
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const placemarkRef = useRef(null);
  const [isApiReady, setIsApiReady] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);

  const stores = ['п.Щельяюр', 'д.Вертеп', 'с.Краснобор', 'д.Диюр'];

  // Фиксированные координаты для населённых пунктов
  const coordsByName = {
    'Щельяюр': [65.325869, 53.417914],
    'Вертеп': [65.298894, 53.204025],
    'Краснобор': [65.294898, 53.285251],
    'Диюр': [65.277609, 53.359892]
  };

  const normalizeName = (label) => {
    // Убираем префиксы вида "п.", "д.", "с." и пробелы
    if (!label) return '';
    const dotIndex = label.indexOf('.');
    const name = dotIndex !== -1 ? label.slice(dotIndex + 1) : label;
    return name.trim();
  };

  // Лениво загружаем скрипт Яндекс.Карт один раз
  useEffect(() => {
    const ensureApi = () => {
      if (window.ymaps) {
        window.ymaps.ready(() => setIsApiReady(true));
        return true;
      }
      return false;
    };

    if (!ensureApi()) {
      const script = document.createElement('script');
      script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
      script.async = true;
      script.onload = () => {
        if (window.ymaps) {
          window.ymaps.ready(() => setIsApiReady(true));
        }
      };
      document.head.appendChild(script);
    }
  }, []);

  // Инициализируем карту, когда API готов и контейнер смонтирован
  useEffect(() => {
    if (!isApiReady || !mapContainerRef.current || mapRef.current) return;
    // Центр по умолчанию — Сыктывкар
    const defaultCenter = [61.6688, 50.8356];
    const map = new window.ymaps.Map(mapContainerRef.current, {
      center: defaultCenter,
      zoom: 7,
      controls: ['zoomControl']
    });
    map.controls.add('fullscreenControl', { float: 'right' });
    mapRef.current = map;
    setIsMapReady(true);
  }, [isApiReady]);

  // Геокодируем и ставим метку при смене выбранного магазина
  useEffect(() => {
    if (!isMapReady) return;

    const updatePlacemark = () => {
      const name = normalizeName(selectedStore);
      const coords = coordsByName[name];
      if (!coords) return;

      if (!placemarkRef.current) {
        placemarkRef.current = new window.ymaps.Placemark(
          coords,
          { balloonContent: `<strong>${selectedStore}</strong>` },
          { preset: 'islands#redIcon' }
        );
        mapRef.current.geoObjects.add(placemarkRef.current);
      } else {
        placemarkRef.current.geometry.setCoordinates(coords);
        placemarkRef.current.properties.set('balloonContent', `<strong>${selectedStore}</strong>`);
      }

      const currentZoom = mapRef.current.getZoom();
      if (currentZoom < 12) {
        mapRef.current.setZoom(12, { duration: 150 });
      }
      mapRef.current.panTo(coords, { flying: true, duration: 300 }).catch(() => {
        mapRef.current.setCenter(coords, mapRef.current.getZoom(), { duration: 300 });
      });
    };

    updatePlacemark();
  }, [selectedStore, isMapReady]);

  return (
    <div className="bg-white rounded-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Наши магазины</h3>

      <div className="flex flex-wrap gap-2 mb-6">
        {stores.map((store) => (
          <button
            key={store}
            onClick={() => setSelectedStore(store)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedStore === store
                ? 'bg-primary-green text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {store}
          </button>
        ))}
      </div>

      <div className="rounded-lg h-64 overflow-hidden">
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>
      <p className="text-sm text-gray-500 mt-2">Магазин: {selectedStore}</p>
    </div>
  );
};

export default StoreMap;
