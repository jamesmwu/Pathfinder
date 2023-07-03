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

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Select Majors</h2>
        <form onSubmit={() => { onSubmit(selectedMajors); }}>
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
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
