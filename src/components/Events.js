
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Events.css';

const EventImages = ({ images, onImageClick }) => (
  <div className="event-images">
    {images.map(image => (
      <div key={image.id} className="event-card" onClick={() => onImageClick(image)}>
        <img
          src={`https://roking-server.onrender.com${image.image_url}`}
          alt="Event"
          className="event-card-image"
        />
        <div className="event-card-content">
          <div className="event-card-brief">{image.brief}</div>
        </div>
      </div>
    ))}
  </div>
);

const ImageModal = ({ image, onClose }) => {
  if (!image) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-btn" onClick={onClose}>&times;</span>
        <img
          src={`https://roking-server.onrender.com${image.image_url}`}
          alt="Full-size Event"
          className="modal-image"
        />
        <div className="modal-brief">{image.brief}</div>
      </div>
    </div>
  );
};

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios.get('https://roking-server.onrender.com/events')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const meetings = events.filter(event => event.category === 'Meeting');
  const otherActivities = events.filter(event => event.category === 'Other');

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div id="events" className="events-container">
      <h1 className="events-title">Events</h1>
      <div className='card-flex'>
        <div className="events-category" id='meetings'>
          <h2 className="events-category-title">Meetings</h2>
          <div className='events-list'>
            {meetings.map(event => (
              <div key={event.id} className="event-category-section">
                <EventImages images={event.images} onImageClick={handleImageClick} />
              </div>
            ))}
          </div>
        </div>

        <div className="events-category" id='other'>
          <h2 className="events-category-title">Other Activities</h2>
          <div className='events-list'>
            {otherActivities.map(event => (
              <div key={event.id} className="event-category-section">
                <EventImages images={event.images} onImageClick={handleImageClick} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <ImageModal image={selectedImage} onClose={handleCloseModal} />
    </div>
  );
};

export default Events;
