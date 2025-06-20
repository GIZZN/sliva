'use client';

import { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import styles from './about.module.css';

const Icons = {
  Location: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
    </svg>
  ),
  Phone: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.01 15.38C18.78 15.38 17.59 15.18 16.48 14.82C16.13 14.7 15.74 14.79 15.47 15.06L13.9 17.03C11.07 15.68 8.42 13.13 7.01 10.2L8.96 8.54C9.23 8.26 9.31 7.87 9.2 7.52C8.83 6.41 8.64 5.22 8.64 3.99C8.64 3.45 8.19 3 7.65 3H4.19C3.65 3 3 3.24 3 3.99C3 13.28 10.73 21 20.01 21C20.72 21 21 20.37 21 19.82V16.37C21 15.83 20.55 15.38 20.01 15.38Z" fill="currentColor"/>
    </svg>
  ),
  Map: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.5 3L20.34 3.03L15 5.1L9 3L3.36 4.9C3.15 4.97 3 5.15 3 5.38V20.5C3 20.78 3.22 21 3.5 21L3.66 20.97L9 18.9L15 21L20.64 19.1C20.85 19.03 21 18.85 21 18.62V3.5C21 3.22 20.78 3 20.5 3ZM15 19L9 16.89V5L15 7.11V19Z" fill="currentColor"/>
    </svg>
  ),
  Book: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.11 21 21 20.1 21 19V5C21 3.9 20.11 3 19 3ZM19 19H5V5H19V19ZM17 12H7V10H17V12ZM13 16H7V14H13V16Z" fill="currentColor"/>
    </svg>
  )
};

interface Location {
  id: number;
  name: string;
  address: string;
  position: {
    lat: number;
    lng: number;
  };
  phone: string;
}

const locations: Location[] = [
  {
    id: 1,
    name: "Автомойка KOMISAR PIVO - Центр",
    address: "ул. Тверская, 15",
    position: { lat: 55.7614, lng: 37.6099 },
    phone: "+7 (999) 123-45-67"
  },
  {
    id: 2,
    name: "Автомойка KOMISAR PIVO - Юг",
    address: "Каширское шоссе, 61к3",
    position: { lat: 55.6539, lng: 37.6738 },
    phone: "+7 (999) 123-45-68"
  },
  {
    id: 3,
    name: "Автомойка KOMISAR PIVO - Запад",
    address: "Кутузовский проспект, 45",
    position: { lat: 55.7419, lng: 37.5350 },
    phone: "+7 (999) 123-45-69"
  }
];

const mapContainerStyle = {
  width: '100%',
  height: '70vh'
};

const center = {
  lat: 55.7558, 
  lng: 37.6173
};

const options = {
  disableDefaultUI: false,
  zoomControl: true,
  styles: [
    {
      featureType: "all",
      elementType: "geometry",
      stylers: [{ color: "#242f3e" }]
    },
    {
      featureType: "all",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#242f3e" }]
    },
    {
      featureType: "all",
      elementType: "labels.text.fill",
      stylers: [{ color: "#746855" }]
    }
  ]
};

export default function LocationPage() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  return (
    <>
      <Header />
      <main className={styles.container}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={styles.pulsingDot}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
        <div className={styles.content}>
          <h1 data-text="Наши автомойки">Наши автомойки</h1>
          <p className={styles.description}>
            Мы расположены в удобных местах по всей Москве. Выберите ближайшую автомойку и приезжайте к нам!
          </p>
          
          <LoadScript googleMapsApiKey="AIzaSyCYozipWlrJut87yCo8Lepim-SMji4zpsk">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={11}
              options={options}
              onLoad={map => setMap(map)}
            >
              {locations.map(location => (
                <Marker
                  key={location.id}
                  position={location.position}
                  onClick={() => setSelectedLocation(location)}
                  icon={{
                    url: '/marker-icon.png',
                  }}
                />
              ))}

              {selectedLocation && (
                <InfoWindow
                  position={selectedLocation.position}
                  onCloseClick={() => setSelectedLocation(null)}
                >
                  <div className={styles.infoWindow}>
                    <h3>{selectedLocation.name}</h3>
                    <p><Icons.Location /> {selectedLocation.address}</p>
                    <p><Icons.Phone /> {selectedLocation.phone}</p>
                    <button 
                      className={styles.bookButton}
                      onClick={() => window.location.href = '/booking'}
                    >
                      <Icons.Book /> Записаться
                    </button>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScript>

          <div className={styles.locationsList}>
            {locations.map(location => (
              <div key={location.id} className={styles.locationCard}>
                <h3>{location.name}</h3>
                <p><Icons.Location /> {location.address}</p>
                <p><Icons.Phone /> {location.phone}</p>
                <button 
                  className={styles.showOnMapButton}
                  onClick={() => {
                    setSelectedLocation(location);
                    map?.panTo(location.position);
                    map?.setZoom(14);
                  }}
                >
                  <Icons.Map /> Показать на карте
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 