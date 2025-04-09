import React, { useState } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, Tooltip, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './CartePortGentil.css';

// Configuration des icônes
const mairieIcon = new L.Icon({
  iconUrl: 'https://www.svgrepo.com/show/376939/library.svg',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -15],
  className: 'mairie-icon'
});

const vainqueurIcon = new L.Icon({
  iconUrl: 'https://election-presidentielle.vercel.app/zenaba.webp',
  iconSize: [50, 50],
  iconAnchor: [25, 25],
  popupAnchor: [0, -25],
  className: 'vainqueur-icon'
});

const bureauIcon = new L.Icon({
  iconUrl: 'https://www.svgrepo.com/show/535393/fireplace.svg',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, -10],
  className: 'bureau-icon'
});

const dataArrondissements = [
  {
    name: "1er Arrondissement",
    centre: "global",
    coords: [
      [-0.6874841, 8.7667810], [-0.7142010, 8.7862120], [-0.7185334, 8.7774593], 
      [-0.7163216, 8.7694520], [-0.7184652, 8.7555585], [-0.7024199, 8.7613095]
    ],
    color: "blue"
  },
  {
    name: "2e Arrondissement",
    centre: "global",
    coords: [
      [-0.7151979, 8.7862327], [-0.7191433, 8.7778459], [-0.7173559, 8.7689663], 
      [-0.7196959, 8.7560876], [-0.7277240, 8.7525822], [-0.7319684, 8.7495588], 
      [-0.7421631, 8.7596250], [-0.7455053, 8.7679787], [-0.7455053, 8.7679787], 
      [-0.7336982, 8.7742638], [-0.7258702, 8.7800666], [-0.7258702, 8.7800666], 
      [-0.7258702, 8.7800666], [-0.7213049, 8.7885773]
    ],
    color: "green" 
  },
  {
    name: "Mairie du 2e Arrondissement",
    centre: "principal",
    coords: [
      [-0.7265175, 8.7742088],
      [-0.7264208, 8.7737821], 
      [-0.7268167, 8.7737123], 
      [-0.7268737, 8.7741605]
    ],
    winner: "Candidat B",
    resultat: [
      { nom: "Brice Clotaire Oligui Nguema", votes: "90%" },
      { nom: "Alain Claude Billie-Bi-Nze", votes: "5%" },
      { nom: "Zenaba Gninga Chaning", votes: "2%" },
    ],
    color: "white" 
  },
  {
    name: "Mairie du 1er Arrondissement",
    centre: "principal",
    coords: [
      [-0.7162321, 8.7759428], 
      [-0.7178093, 8.7749528],
      [-0.7180088, 8.7767323]
    ],
    resultat: [
      { nom: "Brice Clotaire Oligui Nguema", votes: "90%" },
      { nom: "Alain Claude Billie-Bi-Nze", votes: "5%" },
      { nom: "Zenaba Gninga Chaning", votes: "2%" },
    ],
    color: "white" 
  },
  {
    name: "Zenaba Gninga Chaning",
    centre: "Vainqueur",
    votes: "100%",
    coords: [
      [-0.7122964, 8.7959383],
    ],
    color: "white" 
  },




  {
    name: "Ecole publique Balise 2",
    centre: "pointcentre",
    coords: [
      [-0.7205230, 8.7688796], [-0.7207167, 8.7691724], 
      [-0.7213145, 8.7686883], [-0.7210522, 8.7683583], 
    ],
    resultat: [
      { nom: "Brice Clotaire Oligui Nguema", votes: "1250 voix" },
      { nom: "Alain Claude Billie-Bi-Nze", votes: "900 voix" },
      { nom: "Zenaba Gninga Chaning", votes: "800 voix" },
    ],
    color: "white" 
  },
  {
    name: "Lycée Joseph Ambourouet Avaro",
    centre: "pointcentre",
    coords: [
      [-0.7106946, 8.7728321], [-0.7098247, 8.7743136], 
      [-0.7123888, 8.7738867], [-0.7118331, 8.7752086], 
    ],
   resultat: [
      { nom: "Brice Clotaire Oligui Nguema", votes: "1250 voix" },
      { nom: "Alain Claude Billie-Bi-Nze", votes: "900 voix" },
      { nom: "Zenaba Gninga Chaning", votes: "800 voix" },
    ],
    color: "white" 
  },
  {
    name: "CFPP",
    centre: "pointcentre",
    coords: [
      [-0.7167705, 8.7784792], [-0.7173235, 8.7788054],
      [-0.7177276, 8.7778267], [-0.7170621, 8.7775471] 
    ],
   resultat: [
      { nom: "Brice Clotaire Oligui Nguema", votes: "1250 voix" },
      { nom: "Alain Claude Billie-Bi-Nze", votes: "900 voix" },
      { nom: "Zenaba Gninga Chaning", votes: "800 voix" },
    ],
    color: "white" 
  },
  {
    name: "Ecole de la cité",
    centre: "pointcentre",
    coords: [
      [-0.7111996, 8.7695500], [-0.7115688, 8.7690017],
      [-0.7120515,8.7693020], [-0.7115681, 8.7700081] 
    ],
   resultat: [
      { nom: "Brice Clotaire Oligui Nguema", votes: "1250 voix" },
      { nom: "Alain Claude Billie-Bi-Nze", votes: "900 voix" },
      { nom: "Zenaba Gninga Chaning", votes: "800 voix" },
    ],
    color: "white" 
  }
  ,
  {
    name: "Centre social",
    centre: "pointcentre",
    coords: [
      [-0.7269754, 8.7736959], [-0.7270391,8.7741558],
      [-0.7273580,8.7736724], [-0.7273882, 8.7741155] 
    ],
   resultat: [
      { nom: "Brice Clotaire Oligui Nguema", votes: "1250 voix" },
      { nom: "Alain Claude Billie-Bi-Nze", votes: "900 voix" },
      { nom: "Zenaba Gninga Chaning", votes: "800 voix" },
    ],
    color: "white" 
  }
  ,
  {
    name: "Abbe Yoya",
    centre: "pointcentre",
    coords: [
      [-0.7358533, 8.7719760], [-0.7359955,8.7723536],
      [-0.7366034,8.7717113], [-0.7367649, 8.7720348] 
    ],
   resultat: [
      { nom: "Brice Clotaire Oligui Nguema", votes: "1250 voix" },
      { nom: "Alain Claude Billie-Bi-Nze", votes: "900 voix" },
      { nom: "Zenaba Gninga Chaning", votes: "800 voix" },
    ],
    color: "white" 
  }
  ,
  {
    name: "Ambourouet Avaro",
    centre: "pointcentre",
    coords: [
      [-0.7419039,8,7695710], [-0.7420648,8,7698613],
      [-0.7425024,8,7692561], [-0.7367649,8,7696382] 
    ],
   resultat: [
      { nom: "Brice Clotaire Oligui Nguema", votes: "1250 voix" },
      { nom: "Alain Claude Billie-Bi-Nze", votes: "900 voix" },
      { nom: "Zenaba Gninga Chaning", votes: "800 voix" },
    ],
    color: "white" 
  }
  ,
  {
    name: "Sainte therèse ",
    centre: "pointcentre",
    coords: [
      [-0.7190726,8.7761020], [-0.7195643,8.7758815],
      [-0.7197726,8.7762825], [-0.7192183,8.7764948] 
    ],
   resultat: [
      { nom: "Brice Clotaire Oligui Nguema", votes: "1250 voix" },
      { nom: "Alain Claude Billie-Bi-Nze", votes: "900 voix" },
      { nom: "Zenaba Gninga Chaning", votes: "800 voix" },
    ],
    color: "white" 
  }
  ,
  {
    name: "Ancienne balise ",
    centre: "pointcentre",
    coords: [
      [-0.7303225,8.7740105], [-0.7304373,8.7744938],
      [-0.7310974,8.7744700], [-0.7310467,8.7739357] 
    ],
   resultat: [
      { nom: "Brice Clotaire Oligui Nguema", votes: "1250 voix" },
      { nom: "Alain Claude Billie-Bi-Nze", votes: "900 voix" },
      { nom: "Zenaba Gninga Chaning", votes: "800 voix" },
    ],
    color: "white" 
  }
  ,
  {
    name: "Stade blanc 1 & 2 ",
    centre: "pointcentre",
    coords: [
      [-0.7188619,8.7725248], [-0.7196281,8.7721513],
      [-0.7198835,8.7727842], [-0.7191639,8.7730718] 
    ],
   resultat: [
      { nom: "Brice Clotaire Oligui Nguema", votes: "1250 voix" },
      { nom: "Alain Claude Billie-Bi-Nze", votes: "900 voix" },
      { nom: "Zenaba Gninga Chaning", votes: "800 voix" },
    ],
    color: "white" 
  }
  ,
  {
    name: "Protestante",
    centre: "pointcentre",
    coords: [
      [-0.7227548,8.7793290], [-0.7230968,8.7787364],
      [-0.7236612,8.7789897], [-0.7234427,8.7795503] 
    ],
   resultat: [
      { nom: "Brice Clotaire Oligui Nguema", votes: "1250 voix" },
      { nom: "Alain Claude Billie-Bi-Nze", votes: "900 voix" },
      { nom: "Zenaba Gninga Chaning", votes: "800 voix" },
    ],
    color: "white" 
  }
];

const CartePortGentil = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);

  // Fonction pour calculer le centre d'un polygone
  const getPolygonCenter = (coords) => {
    let lat = 0, lng = 0;
    coords.forEach(coord => {
      lat += coord[0];
      lng += coord[1];
    });
    return [lat / coords.length, lng / coords.length];
  };

  const createMarkerWithLabel = (position, icon, name, resultat, isOpen = false) => {
    // Création d'une icône personnalisée avec le label intégré
    const CustomIcon = L.divIcon({
      className: 'custom-marker-with-label',
      html: `
        <div style="display: flex; flex-direction: column; align-items: center;">
          ${icon.options.html || `<img src="${icon.options.iconUrl}" style="width:${icon.options.iconSize[0]}px;height:${icon.options.iconSize[1]}px"/>`}
          <div class="marker-label">${name}</div>
        </div>
      `,
      iconSize: [icon.options.iconSize[0], icon.options.iconSize[1] + 20], // Ajoute de l'espace pour le label
      iconAnchor: [icon.options.iconAnchor[0], icon.options.iconAnchor[1] + 10] // Ajuster l'ancre pour le label
    });
  
    return (
      <Marker 
        position={position} 
        icon={CustomIcon}
        eventHandlers={{
          click: () => setSelectedMarker(name)
        }}
      >
        <Popup>
          <div className="popup-content">
            <h3>{name}</h3>
            {resultat && (
              <>
                <h4>Résultats:</h4>
                <ul>
                  {resultat.map((candidat, i) => (
                    <li key={i}>
                      <strong>{candidat.nom}</strong>: {candidat.votes}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </Popup>
      </Marker>
    );
  };


  return (
    <div className="map-wrapper">
      <MapContainer 
        center={[-0.720, 8.78]} 
        zoom={14} 
        scrollWheelZoom={false} 
        className="map"
      >
        <TileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Ici vous insérerez votre tableau dataArrondissements */}
        {dataArrondissements.map((item, index) => {
          // Cas des arrondissements (zones globales)
          if (item.centre === "global") {
            return (
              <Polygon
                key={`poly-${index}`}
                positions={item.coords}
                pathOptions={{ color: item.color, fillOpacity: 0.2 }}
              />
            );
          }

          // Cas des mairies (centres principaux)
          if (item.centre === "principal") {
            const center = getPolygonCenter(item.coords);
            return (
              <React.Fragment key={`mairie-${index}`}>
                <Polygon
                  positions={item.coords}
                  pathOptions={{ color: item.color, fillOpacity: 0.4 }}
                />
                {createMarkerWithLabel(center, mairieIcon, item.name, item.resultat, selectedMarker === item.name)}
              </React.Fragment>
            );
          }

          // Cas des bureaux de vote
          if (item.centre === "pointcentre") {
            const center = getPolygonCenter(item.coords);
            return (
              <React.Fragment key={`bureau-${index}`}>
                <Polygon
                  positions={item.coords}
                  pathOptions={{ color: item.color, fillOpacity: 0.4 }}
                />
                {createMarkerWithLabel(center, bureauIcon, item.name, item.resultat, selectedMarker === item.name)}
              </React.Fragment>
            );
          }

          // Cas du vainqueur
          if (item.centre === "Vainqueur") {
            return (
              <React.Fragment key={`vainqueur-${index}`}>
                {createMarkerWithLabel(item.coords[0], vainqueurIcon, item.name, null, selectedMarker === item.name)}
              </React.Fragment>
            );
          }

          return null;
        })}
      </MapContainer>
    </div>
  );
};

export default CartePortGentil;