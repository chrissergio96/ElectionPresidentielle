import React, { useState } from 'react';
import { MapContainer, TileLayer, Polygon, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './CartePortGentil.css';

const dataArrondissements = [
  {
    name: "1er Arrondissement",
    coords: [
      [-0.709, 8.784], [-0.712, 8.79], [-0.718, 8.785], [-0.715, 8.777]
    ],
    winner: "Alain Claude Billie Bi Nze",
    centres: [
      { nom: "Centre de vote A1", adresse: "École Martine Orou Gabon" },
      { nom: "Centre de vote A2", adresse: "Lycée Evangélique" }
    ],
    color: "blue"
  },
  {
    name: "2e Arrondissement",
    coords: [
      [-0.720, 8.790], [-0.725, 8.795], [-0.730, 8.788], [-0.726, 8.780]
    ],
    winner: "Candidat B",
    centres: [
      { nom: "Centre de vote B1", adresse: "École Michel Dirat" },
      { nom: "Centre de vote B2", adresse: "CEM du 2e Arrondissement" }
    ],
    color: "green"
  }
];

const CartePortGentil = () => {
  const [selectedArrondissement, setSelectedArrondissement] = useState(null);

  const handleClick = (arrondissement) => {
    setSelectedArrondissement(arrondissement);
  };

  return (
    <div className="map-wrapper">
      <h2>Carte Interactive - Port-Gentil</h2>
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
