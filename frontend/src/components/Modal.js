import React, { useState } from 'react';
import '../styles/modal.css';

export default function Modal({ isOpen, majors, onClose, onSubmit }) {
  const [selectedMajors, setSelectedMajors] = useState([]);

  const handleMajorChange = (event) => {
    const { value } = event.target;
    if (selectedMajors.includes(value)) {
      setSelectedMajors(selectedMajors.filter((major) => major !== value));
    } else {
      setSelectedMajors([...selectedMajors, value]);
    }
  };

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    onSubmit(selectedMajors);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Select Interests</h2>
        <form onSubmit={handleSubmit}>
          {majors.map((major) => (
            <div key={major}>
              <label>
                <input
                  type="checkbox"
                  value={major}
                  checked={selectedMajors.includes(major)}
                  onChange={handleMajorChange}
                />
                {major}
              </label>
            </div>
          ))}
          <button type="submit">Confirm</button>
        </form>
        <button type='button' onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
