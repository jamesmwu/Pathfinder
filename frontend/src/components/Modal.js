import React, { useState } from 'react';
import '../styles/modal.css';

export default function Modal({ isOpen, majors }) {
  const [selectedMajor, setSelectedMajor] = useState('');
  const [showModal, setShowModal] = useState(isOpen);

  const handleMajorChange = (event) => {
    setSelectedMajor(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the selected major
    console.log('Selected major:', selectedMajor);
    setShowModal(false);
  };

  if (!showModal) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Select a Major</h2>
        <form onSubmit={handleSubmit}>
          <select value={selectedMajor} onChange={handleMajorChange}>
            <option value="">-- Select a major --</option>
            {majors.map((major) => (
              <option key={major} value={major}>
                {major}
              </option>
            ))}
          </select>
          <button type="submit">Submit</button>
        </form>
        <button onClick={() => { setShowModal(false); }}>Close</button>
      </div>
    </div>
  );
};
