import React, { useState } from 'react';
import { MapContainer, TileLayer, Polygon, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './CartePortGentil.css';

const dataArrondissements = [
  {
    name: "1er Arrondissement",
    coords: [
      [-0.6874841, 8.7667810], [-0.7142010, 8.7862120], [-0.7185334, 8.7774593], [-0.7163216, 8.7694520], [-0.7184652, 8.7555585], [-0.7024199, 8.7613095]
    ],
    winner: "Alain Claude Billie Bi Nze",
    centres: [
      { nom: "Centre de vote 1", adresse: "École Martine Publique Balise 2 - NGADI" },
      { nom: "Centre de vote 2", adresse: "École Joseph AMBOUROUET AVARO" },
      { nom: "Centre de vote 3", adresse: "Centre de Formation Professional et de Perfectionnement" },
      { nom: "Centre de vote 4", adresse: "École publique de la Cité" }

    ],
    color: "blue"
  },
  {
    name: "2e Arrondissement",
    coords: [
      [-0.7151979, 8.7862327], [-0.7191433, 8.7778459], [-0.7173559, 8.7689663], [-0.7196959, 8.7560876], [-0.7277240, 8.7525822], [-0.7319684, 8.7495588], [-0.7421631, 8.7596250], [-0.7455053, 8.7679787], [-0.7455053, 8.7679787], [-0.7336982, 8.7742638], [-0.7258702, 8.7800666], [-0.7258702, 8.7800666], [-0.7258702, 8.7800666], [-0.7213049, 8.7885773]
    ],
  
    color: "green" 
  },
  {
    name: "Mairie du 2e Arrondissement",
    centre:"principal",
    coords: [
      [-0.7265175, 8.7742088],
       [-0.7264208, 8.7737821], 
       [-0.7268167, 8.7737123], 
       [-0.7268737, 8.7741605]
    ],
    winner: "Candidat B",
    centres: [
      { nom: "Centre de vote 1", adresse: "Centre Social" },
      { nom: "Centre de vote 2", adresse: "École publique Abbé YOYA" },
      { nom: "Centre de vote 3", adresse: "École publique AMBOUROUE AVARO" },
      { nom: "Centre de vote 4", adresse: "École Sainte Thérèse" },
      { nom: "Centre de vote 5", adresse: "École publique Ancienne Balise" },
      { nom: "Centre de vote 6", adresse: "École Prostestante" },
      { nom: "Centre de vote 7", adresse: "École du Stade Blanc 1 - Balise" },
      { nom: "Centre de vote 8", adresse: "École du Stade Blanc 2 - Henri Clément" },

    ],
    color: "white" 
  },
  {
    name: "Mairie du 1er Arrondissement",
    centre:"principal",

    coords: [
      [-0.7162321, 8.7759428], 
      [-0.7178093, 8.7749528],
      [-0.7180088, 8.7767323]
    ],
    winner: "Alain Claude Billie Bi Nze",
    centres: [
      { nom: "Centre de vote 1", adresse: "École Martine Publique Balise 2 - NGADI" },
      { nom: "Centre de vote 2", adresse: "École Joseph AMBOUROUET AVARO" },
      { nom: "Centre de vote 3", adresse: "Centre de Formation Professional et de Perfectionnement" },
      { nom: "Centre de vote 4", adresse: "École publique de la Cité" }

    ],
    color: "red" 
  }
];

const CartePortGentil = () => {
  const [selectedArrondissement, setSelectedArrondissement] = useState(null);

  const handleClick = (arrondissement) => {
    if (arrondissement.centre === "principal") {
      setSelectedArrondissement(arrondissement);
    }
  };
  

  return (
    <div className="map-wrapper">
      <MapContainer center={[-0.720, 8.78]} zoom={14} scrollWheelZoom={false} className="map">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {dataArrondissements.map((arr, index) => (
          <Polygon
            key={index}
            positions={arr.coords}
            pathOptions={{ color: arr.color }}
            eventHandlers={{ click: () => handleClick(arr) }}
          >
            {selectedArrondissement?.name === arr.name && (
              <Popup>
                <div>
                  <h3>{arr.name}</h3>
                  <p><strong>Vainqueur :</strong> {arr.winner}</p>
                  <h4>Centres de vote :</h4>
                  <ul>
                    {arr.centres.map((centre, i) => (
                      <li key={i}>
                        <strong>{centre.nom}</strong><br />
                        {centre.adresse}
                      </li>
                    ))}
                  </ul>
                </div>
              </Popup>
            )}
          </Polygon>
        ))}
      </MapContainer>
    </div>
  );
};

export default CartePortGentil;
