import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Bed, Bath, Users, Square } from 'lucide-react';
import './css/index.css';
import ReservationApp from '../../components/calendrier';

const roomsData = [
  {
    type: "Classique",
    name: "Chambre Classique",
    description: "Une chambre élégante et confortable, parfaite pour un séjour agréable à Bordeaux.",
    size: 25,
    capacity: 2,
    bedType: "Lit Queen size",
    bathroom: "Salle de bain privative",
    price: 80,
    images: [
        "https://cdn.prod.website-files.com/5faeb38cb5f86ba2c2288cd3/65e9e511f861d43a262ff5c9_36.jpg",
        "https://cdn.prod.website-files.com/5faeb38cb5f86ba2c2288cd3/65e9e4d60486572847d3e103_31.jpg"
    ]
  },
  {
    type: "Confort",
    name: "Chambre Confort",
    description: "Un espace raffiné offrant plus d'espace et une vue sur les toits Bordelais.",
    size: 30,
    capacity: 2,
    bedType: "Lit King size",
    bathroom: "Salle de bain luxueuse",
    price: 100,
    images: [
      "https://cdn.prod.website-files.com/5faeb38cb5f86ba2c2288cd3/65e9e4faacfaa71be2e11532_34.jpg",
      "https://cdn.prod.website-files.com/5faeb38cb5f86ba2c2288cd3/6266992c30a5c20388f38eb4_room%20prestige%205.png"
    ]
  },
  {
    type: "Standing",
    name: "Chambre Standing",
    description: "Une chambre deluxe spacieuse avec des prestations haut de gamme.",
    size: 40,
    capacity: 2,
    bedType: "Lit King size",
    bathroom: "Salle de bain en marbre",
    price: 150,
    images: [
      "https://cdn.prod.website-files.com/5faeb38cb5f86ba2c2288cd3/65e9e47b8f30c9541690603b_24.jpg",
      "https://cdn.prod.website-files.com/5faeb38cb5f86ba2c2288cd3/65e9e44fef2b2daeeb524ce6_20.jpg",
    ]
  },
  {
    type: "Suite",
    name: "Suite Signature",
    description: "Une suite élégante avec vue sur Bordeaux, alliant luxe et confort pour un séjour inoubliable.",
    size: 90,
    capacity: 2,
    bedType: "Lit King size",
    bathroom: "Salle de bain luxueuse",
    price: 250,
    images: [
      "https://cdn.prod.website-files.com/5faeb38cb5f86ba2c2288cd3/65e9e488e67e88c12dadd17a_25.jpg",
      "https://cdn.prod.website-files.com/5faeb38cb5f86ba2c2288cd3/65e9e49198d94008efc8cb1d_26.jpg",
      "https://cdn.prod.website-files.com/5faeb38cb5f86ba2c2288cd3/65e9e4b204824471e8cb6727_29.jpg",
    ]
  }
];

const RoomsPage = () => {
    const [selectedRoom, setSelectedRoom] = useState(null); // État pour la chambre sélectionnée
  
    const openBookingCalendar = (room) => {
        setSelectedRoom(room); // Définit la chambre sélectionnée
    };
  
    return (
      <div>
        <div className="hero-section">
          <div className="hero-content">
            <h1>Chambres & Suites</h1>
          </div>
        </div>
        
        <div className="rooms-section">
          <div className="rooms-grid">
            {roomsData.map((room, index) => (
                <Room key={index} room={room} onBook={() => openBookingCalendar(room)} />
            ))}
          </div>
        </div>
  
      </div>
    );
  };
  
  const Room = ({ room, onBook }) => {
    const [currentImage, setCurrentImage] = useState(0);
  
    const nextImage = () => {
      setCurrentImage((prev) => (prev + 1) % room.images.length);
    };
  
    const prevImage = () => {
      setCurrentImage((prev) => (prev - 1 + room.images.length) % room.images.length);
    };
  
    return (
      <div className="room-card">
        <div className="room-image-container">
          <div className="image-wrapper">
            <img
              src={room.images[currentImage]}
              alt={`${room.name} - Vue ${currentImage + 1}`}
              className="room-image"
            />
          </div>
          
          <button onClick={prevImage} className="slider-button slider-button-left">
            <ChevronLeft className=" text-[#B19B6E]" />
          </button>
          
          <button onClick={nextImage} className="slider-button slider-button-right">
            <ChevronRight className="text-[#B19B6E]" />
          </button>
  
          <div className="slider-dots">
            {room.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`slider-dot ${currentImage === index ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>
  
        <div className="room-info">
          <div className="room-type">{room.type}</div>
          <h2 className="room-name">{room.name}</h2>
          <p className="room-description">{room.description}</p>
  
          <div className="room-features">
            <div className="feature">
              <Square className="w-5 h-5" />
              <span>{room.size} m²</span>
            </div>
            <div className="feature">
              <Users className="w-5 h-5" />
              <span>{room.capacity} personnes</span>
            </div>
            <div className="feature">
              <Bed className="w-5 h-5" />
              <span>{room.bedType}</span>
            </div>
            <div className="feature">
              <Bath className="w-5 h-5" />
              <span>{room.bathroom}</span>
            </div>
          </div>
  
          <div className="room-footer">
            <div className="room-price">
              <span className="price-amount">{room.price}€</span>
              <span className="price-period">/nuit</span>
            </div>
            <ReservationApp />
          </div>
        </div>
      </div>
    );
  };
export { Room, roomsData };
export default RoomsPage;