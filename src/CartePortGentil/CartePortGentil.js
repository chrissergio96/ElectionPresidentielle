import React, { useState,useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, Tooltip, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import sound from './son2.mp3'; // Importez votre fichier audio

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
      [-0.6763949,8.7581967], [-0.6757655,8.7672847], [-0.6786866,8.7758513], 
      [-0.6800184,8.7787492], [-0.6856160,8.7761329], [-0.6934402,8.7741723],
      [-0.7037351,8.7797779], [-0.7140618,8.7854582], [-0.7170793,8.7796757],
      [-0.7181798,8.7755369], [-0.7173358,8.7723648], [-0.7212210,8.7684807],
      [-0.7264857,8.7682324], [-0.7336191,8.7607737], [-0.7243701,8.7533377], 
      [-0.7294196,8.7509070], [-0.7307046,8.7488853], [-0.7305424,8.7462455],
      [-0.7277888,8.7434673], [-0.7228320,8.7424146], [-0.7187541,8.7398903],
      [-0.7156331,8.7376060], [-0.7115383,8.7341525], [-0.7106816,8.7372944],
      [-0.7049438,8.7538347],
    ],
    color: "blue"
  },
  {
    name: "2e Arrondissement",
    centre: "global",
    coords: [
      [-0.7143481,8.7856083], [-0.7180666,8.7866262], [-0.7186143,8.7850525],
      [-0.7186390,8.7849961], [-0.7208434,8.7832485], [-0.7230132,8.7823176],
      [-0.7253161,8.7805925], [-0.7341637,8.7736963], [-0.7352798,8.7729284],
      [-0.7419608,8.7699916], [-0.7447115,8.7688556], [-0.7463084,8.7674678],
      [-0.7474895,8.7660427], [-0.7465884,8.7655069], [-0.7470595,8.7648206], 
      [-0.7481464,8.7650308], [-0.7507969,8.7616310], [-0.7566902,8.7496679],
      [-0.7266918,8.7316985], [-0.7228320,8.7424146], [-0.7277888,8.7434673], [-0.7305424,8.7462455],
      [-0.7307046,8.7488853], [-0.7294196,8.7509070],[-0.7243701,8.7533377],
      [-0.7336191,8.7607737], [-0.7264857,8.7682324], [-0.7286262,8.7683844],
      [-0.7254691,8.7682682], [-0.7213935,8.7686823], [-0.7174570,8.7724852],
      [-0.7180112,8.7747043], [-0.7180390,8.7777328], [-0.7161258,8.7819010]
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
      { nom: "Brice Clotaire Oligui Nguema", votes: "92.284%" },
      { nom: "Alain Claude Billie-Bi-Nze", votes: "4.59%" },
      { nom: "Joseph Lapensée ESSINGONE", votes: "1%" },
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
      { nom: "Brice Clotaire Oligui Nguema", votes: "90.14%" },
      { nom: "Alain Claude Billie-Bi-Nze", votes: "4.39%" },
      { nom: "Joseph Lapensée ESSINGONE", votes: "0.93%" },
    ],
    color: "white" 
  },
  {
    name: "Brice Clotaire Oligui Nguema",
    centre: "Vainqueur",
    votes: "91.121%",
    coords: [
      [-0.7122964, 8.7959383],
    ],
    color: "white" 
  }
  ,
  {
    name: "1er Arrondissement",
    centre: "Vainqr",
    coords: [
      [-0.6966927,8.7531276],
    ],
    color: "white" 
  },
  {
    name: "2eme Arrondissement",
    centre: "Vainqr",
    coords: [
      [-0.7340159, 8.7820265],
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
      { nom: "Brice Clotaire Oligui Nguema", votes: "2606 voix" },
      { nom: "Alain Claude Billie-Bi-Nze", votes: "93 voix" },
      { nom: "Joseph Lapensée ESSINGONE", votes: "29 voix" },
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
      { nom: "Brice Clotaire Oligui Nguema", votes: "1661 voix" },
      { nom: "Alain Claude Billie-Bi-Nze", votes: "96 voix" },
      { nom: "Joseph Lapensée ESSINGONE", votes: "25 voix" },
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
      { nom: "Brice Clotaire Oligui Nguema", votes: "1664 voix" },
      { nom: "Alain Claude Billie-Bi-Nze", votes: "106 voix" },
      { nom: "Zenaba Gninga Chaning", votes: "17 voix" },
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
      { nom: "Brice Clotaire Oligui Nguema", votes: "1078 voix" },
      { nom: "Alain Claude Billie-Bi-Nze", votes: "54 voix" },
      { nom: "Zenaba Gninga Chaning", votes: "10 voix" },
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
      { nom: "Brice Clotaire Oligui Nguema", votes: "3714 voix" },
      { nom: "Alain Claude Billie-Bi-Nze", votes: "187 voix" },
      { nom: "Joseph Lapensée ESSINGONE", votes: "46 voix" },
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
      { nom: "Brice Clotaire Oligui Nguema", votes: "1521 voix" },
      { nom: "Alain Claude Billie-Bi-Nze", votes: "68 voix" },
      { nom: "Zenaba Gninga Chaning", votes: "16 voix" },
    ],
    color: "white" 
  }
  ,
  {
    name: "Ambourouet Avaro",
    centre: "pointcentre",
    coords: [
      [-0.7419389,8.7695470], [-0.7424997,8.7692940],
      [-0.7420804,8.7698379], [-0.7426429,8.7696000] 
    ],
   resultat: [
      { nom: "Brice Clotaire Oligui Nguema", votes: "985 voix" },
      { nom: "Alain Claude Billie-Bi-Nze", votes: "42 voix" },
      { nom: "Zenaba Gninga Chaning", votes: "12 voix" },
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
      { nom: "Brice Clotaire Oligui Nguema", votes: "775 voix" },
      { nom: "Alain Claude Billie-Bi-Nze", votes: "39 voix" },
      { nom: "Joseph Lapensée ESSINGONE", votes: "8 voix" },
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
      { nom: "Brice Clotaire Oligui Nguema", votes: "488 voix" },
      { nom: "Alain Claude Billie-Bi-Nze", votes: "31 voix" },
      { nom: "Alain Simplice BOUENGOUERES", votes: "6 voix" },
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
      { nom: "Brice Clotaire Oligui Nguema", votes: "418 voix" },
      { nom: "Alain Claude Billie-Bi-Nze", votes: "14 voix" },
      { nom: "Stéphane Germain ILOKO", votes: "6 voix" },
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
      { nom: "Brice Clotaire Oligui Nguema", votes: "269 voix" },
      { nom: "Alain Claude Billie-Bi-Nze", votes: "17 voix" },
      { nom: "Zenaba Gninga Chaning", votes: "4 voix" },
    ],
    color: "white" 
  }
];

const CartePortGentil = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);
   const audioRef = useRef(null);
   const [volume, setVolume] = useState(0.08); // Volume par défaut à 50%

    useEffect(() => {
      // Démarrer la musique quand le composant est monté
      const timer = setTimeout(() => {
        audioRef.current.volume = volume; // Applique le volume
        if (audioRef.current) {
          audioRef.current.play()
            .catch(error => console.log("Auto-play prevented:", error));
        }
      }, 10); // Délai pour synchroniser avec l'animation
    
      return () => clearTimeout(timer);
    }, []);

  // Fonction pour calculer le centre d'un polygone
  const getPolygonCenter = (coords) => {
    let lat = 0, lng = 0;
    coords.forEach(coord => {
      lat += coord[0];
      lng += coord[1];
    });
    return [lat / coords.length, lng / coords.length];
  };

  // Fonction pour attribuer des couleurs en fonction du nom du candidat
const getCandidateColor = (name) => {
  const colors = {
    'Brice Clotaire Oligui Nguema': '#2196F3',
    'Alain Claude Billie-Bi-Nze': '#FF9800',
    'Zenaba Gninga Chaning': '#9C27B0',
    // Ajoutez d'autres candidats au besoin
  };
  return colors[name] || '#4CAF50'; // Couleur par défaut
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
        <Popup className="animated-popup">
          <div className="popup-content">
            <h3>{name}</h3>
            {resultat && (
              <>
                <h4>Résultats:</h4>
                <div className="results-container">
                  {(() => {
                    // Calcul du total des voix si ce sont des valeurs absolues
                    const isPercentage = resultat.some(r => r.votes.includes('%'));
                    let totalVoices = 0;
                    
                    if (!isPercentage) {
                      totalVoices = resultat.reduce((sum, candidat) => {
                        return sum + parseInt(candidat.votes.split(' ')[0]);
                      }, 0);
                    }
    
                    return resultat.map((candidat, i) => {
                      // Extraction de la valeur numérique
                      let voteValue, displayValue;
                      
                      if (candidat.votes.includes('%')) {
                        voteValue = parseFloat(candidat.votes.replace('%', ''));
                        displayValue = candidat.votes;
                      } else {
                        const voices = parseInt(candidat.votes.split(' ')[0]);
                        voteValue = totalVoices > 0 ? (voices / totalVoices) * 100 : 0;
                        displayValue = candidat.votes;
                      }
    
                      return (
                        <div key={i} className="result-item">
                          <div className="candidate-info">
                            <strong>{candidat.nom}</strong>
                            <span>{displayValue}</span>
                          </div>
                          <div className="progress-bar-container">
                            <div 
                              className="progress-bar" 
                              style={{ 
                                width: `${voteValue}%`,
                                animation: `slideIn 0.8s cubic-bezier(0.22, 0.61, 0.36, 1) ${i * 0.15}s forwards`,
                                backgroundColor: getCandidateColor(candidat.nom)
                              }}
                            ></div>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </>
            )}
          </div>
        </Popup>
      </Marker>
    );
  };


  return (
    <div className="map-wrapper">
      <audio 
              ref={audioRef} 
              src={sound} 
            />
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
              <Polygon
                key={index}
                positions={item.coords}
                pathOptions={{ color: item.color }}
              >
                <Tooltip
                  direction="center"
                  permanent
                  className="arrondissement-labelvq"
                >
                    <img
                      src="https://img.freepik.com/vecteurs-libre/avatars-anonymes-cercles-gris_78370-2086.jpg?uid=R153887325&ga=GA1.1.861025298.1733141180&semt=ais_country_boost&w=740"
                      alt="icone"
                      style={{ width: "70%",height:"110px", marginRight: "5px" ,borderRadius:"100%"}}
                    />
                  <p>{item.name}</p>
                  <span>{item.votes}de votes</span>
                </Tooltip>
          
              </Polygon>
            );
          }
          if (item.centre === "Vainqr") {
            return (
              <Polygon
                key={index}
                positions={item.coords}
                pathOptions={{ color: item.color }}
              >
                <Tooltip
                  direction="center"
                  permanent
                  className="arrondissement-labelvqA"
                >
                    <img
                      src="https://scontent.flbv5-1.fna.fbcdn.net/v/t39.30808-6/438092279_2237495206592041_4332711800915834235_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFw-WyMt6rqDfrV6C3Nj_TD5P4Y-J61Qc3k_hj4nrVBzeqcriBoqnGN1hJ8XYAtetqC4y9gT8XLjEJX90AHQh1q&_nc_ohc=LiNP3oIjQjIQ7kNvwGZQSM7&_nc_oc=AdkDrd5XahEbqEi5IOWjbM9Xn-FP7zTyZT0nwUKh3n2i7SAGKAqRzo4SznTeYVffb90I_tqCtdbxLtdsxL5MvJab&_nc_zt=23&_nc_ht=scontent.flbv5-1.fna&_nc_gid=MhMKfIM6JSRUVqa7w2loiw&oh=00_AfGKRFaPFsJpw1Ojg_fs-eoZhh3BJx56W4MTr4NMa9q7GQ&oe=67FC8028"
                      alt="icone"
                      style={{ width: "35%",height:"55px", marginRight: "5px" ,borderRadius:"100%"}}
                    />
                  <p>{item.name}</p>
                </Tooltip>
          
              </Polygon>
            );
          }
          if (item.centre === "Vainqr") {
            return (
              <Polygon
                key={index}
                positions={item.coords}
                pathOptions={{ color: item.color }}
              >
                <Tooltip
                  direction="center"
                  permanent
                  className="arrondissement-labelvqA"
                >
                  
                  <p>{item.name}</p>
                </Tooltip>
          
              </Polygon>
            );
          }

          return null;
        })}
      </MapContainer>
    </div>
  );
};

export default CartePortGentil;
