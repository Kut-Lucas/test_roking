
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './Events.css';

const EventImages = ({ images, openModal }) => (
  <div className="event-images">
    {images.map(image => (
      <div key={image.id} className="event-card" onClick={() => openModal(image)}>
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

const Events = () => {
  const [events, setEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
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

  const openModal = useCallback((image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalIsOpen(false);
    setSelectedImage(null);
  }, []);

  const meetings = events.filter(event => event.category === 'Meeting');
  const otherActivities = events.filter(event => event.category === 'Other');

  return (
    <div className="events-container">
      <h1 className="events-title">Events</h1>

      <div className="events-category">
        <h2 className="events-category-title">Meetings</h2>
        {meetings.map(event => (
          <div key={event.id} className="event-category-section">
            <EventImages images={event.images} openModal={openModal} />
          </div>
        ))}
      </div>

      <div className="events-category">
        <h2 className="events-category-title">Other Activities</h2>
        {otherActivities.map(event => (
          <div key={event.id} className="event-category-section">
            <EventImages images={event.images} openModal={openModal} />
          </div>
        ))}
      </div>

      {selectedImage && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="View Image"
          className="modal"
          overlayClassName="overlay"
        >
          <div className="modal-content">
            <img src={`https://roking-server.onrender.com${selectedImage.image_url}`} alt="Event" className="modal-image" />
            <div className="modal-description">{selectedImage.brief}</div>
            <button onClick={closeModal} className="modal-close-button">Close</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Events;
