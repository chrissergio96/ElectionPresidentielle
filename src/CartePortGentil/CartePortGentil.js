import React, { useState } from 'react';
import { MapContainer, TileLayer, Polygon, Popup ,Tooltip} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './CartePortGentil.css';

const dataArrondissements = [
  {
    name: "1er Arrondissement",
    centre:"global",
    coords: [
      [-0.6874841, 8.7667810], [-0.7142010, 8.7862120], [-0.7185334, 8.7774593], [-0.7163216, 8.7694520], [-0.7184652, 8.7555585], [-0.7024199, 8.7613095]
    ],
    color: "blue"
  },
  {
    name: "2e Arrondissement",
    centre:"global",
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
    resultat: [
        { nom: "Alain Claude Billie-Bi-Nze", votes: "1000" },
        { nom: "Brice Clotaire Oligui Nguema", votes: "300" },
        { nom: "Zenaba Gninga Chaning", votes: "500" },
  
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
    resultat: [
        { nom: "Alain Claude Billie-Bi-Nze", votes: "1000" },
        { nom: "Brice Clotaire Oligui Nguema", votes: "300" },
        { nom: "Zenaba Gninga Chaning", votes: "500" },
  
      ],
    color: "red" 
  }
  ,
  {
    name: "Zenaba Gninga Chaning ",
    centre:"Vainqueur",
     votes: "100%",
    coords: [
      [-0.7122964,8.7959383],
    ],
    color: "red" 
  },
 
//   les bureaux

  {
    name: "Ecole publique Balise 2",
    centre:"pointcentre",

    coords: [
      [-0.7205230, 8.7688796],[-0.7207167,8.7691724], 
      [-0.7213145,8.7686883], [-0.7210522,8.7683583], 

    ],

    resultat: [
      { nom: "Alain Claude Billie-Bi-Nze", votes: "1000" },
      { nom: "Brice Clotaire Oligui Nguema", votes: "300" },
      { nom: "Zenaba Gninga Chaning", votes: "500" },

    ],
    color: "red" 
  },
  {
    name: "Lycée Joseph Ambourouet Avaro ",
    centre:"pointcentre",

    coords: [
      [-0.7106946,8.7728321],[-0.7098247,8.7743136], 
      [-0.7123888,8.7738867], [-0.7118331,8.7752086], 

    ],

    resultat: [
      { nom: "Alain Claude Billie-Bi-Nze", votes: "1000" },
      { nom: "Brice Clotaire Oligui Nguema", votes: "300" },
      { nom: "Zenaba Gninga Chaning", votes: "500" },

    ],
    color: "red" 
  }
  ,
  {
    name: "CFPP ",
    centre:"pointcentre",

    coords: [
      [-0.7167705,8.7784792],[-0.7173235,8.7788054],[-0.7177276,8.7778267],[-0.7170621,8.7775471] 
    ],

    resultat: [
      { nom: "Alain Claude Billie-Bi-Nze", votes: "1000" },
      { nom: "Brice Clotaire Oligui Nguema", votes: "300" },
      { nom: "Zenaba Gninga Chaning", votes: "500" },

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

        {dataArrondissements.map((arr, index) => {
  // Cas "pointcentre"
  if (arr.centre === "pointcentre") {
    return (
      <Polygon
        key={index}
        positions={arr.coords}
        pathOptions={{ color: arr.color }}
        eventHandlers={{
          mouseover: (e) => e.target.openPopup(),
          mouseout: (e) => e.target.closePopup(),
        }}
      >
        <Tooltip
          direction="center"
          sticky
          className="labels-centre"
        >
          <img
            src="https://www.svgrepo.com/show/376794/box.svg"
            alt="icone"
            style={{ width: "16px", marginRight: "5px" }}
          />
          <p>{arr.name}</p>
        </Tooltip>

        <Popup>
          <div>
            <h3>{arr.name}</h3>
            {arr.resultat && (
              <>
                <h4>Résultat de vote :</h4>
                <ul>
                  {arr.resultat.map((resultat, i) => (
                    <li key={i}>
                      <strong>{resultat.nom}</strong><br />
                      {resultat.votes}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </Popup>
      </Polygon>
    );
  }

  if (arr.centre === "Vainqueur") {
    return (
      <Polygon
        key={index}
        positions={arr.coords}
        pathOptions={{ color: arr.color }}
      >
        <Tooltip
          direction="center"
          permanent
          className="arrondissement-labelvq"
        >
            <img
              src="https://election-presidentielle.vercel.app/zenaba.webp"
              alt="icone"
              style={{ width: "70%",height:"110px", marginRight: "5px" ,borderRadius:"100%"}}
            />
          <p>{arr.name}</p>
          <span>{arr.votes}de votes</span>
        </Tooltip>
  
      </Polygon>
    );
  }
  

  // Tous les autres cas : global ou principal
  return (
    <Polygon
      key={index}
      positions={arr.coords}
      pathOptions={{ color: arr.color }}
      eventHandlers={{ click: () => handleClick(arr) }}
    >
    
      {arr.centre === "global" && (
        <Tooltip
          direction="center"
          permanent
          className="arrondissement-label"
        >
          <p>{arr.name}</p>
        </Tooltip>
      )}
      {arr.centre === "principal" && (
        <Tooltip
          direction="center"
          permanent
          className="arrondissement-labels"
        >
          <img src="https://www.svgrepo.com/show/376939/library.svg" alt="icone" style={{ width: "16px", marginRight: "5px" }} />
          <p>{arr.name}</p>
        </Tooltip>
      )}
      {selectedArrondissement?.name === arr.name && (
        <Popup>
          <div>
            <h3>{arr.name}</h3>
            {arr.resultat && (
              <>
                <h4>Résultat de vote :</h4>
                <ul>
                  {arr.resultat.map((resultat, i) => (
                    <li key={i}>
                      <strong>{resultat.nom}</strong><br />
                      {resultat.votes}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </Popup>
      )}
    </Polygon>
  );
})}


      </MapContainer>
    </div>
  );
};

export default CartePortGentil;
