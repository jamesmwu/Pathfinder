import React, { useState, useEffect } from 'react';
import '../styles/modal.css';

export default function Modal({ isOpen, majors, curSelectedMajors, onClose, onSubmit }) {
  const [selectedMajors, setSelectedMajors] = useState(curSelectedMajors);

  useEffect(() => {
    setSelectedMajors(curSelectedMajors);
  }, [curSelectedMajors]);

  const handleMajorChange = (event) => {
    const { value } = event.target;
    if (selectedMajors.includes(value)) {
      setSelectedMajors(selectedMajors.filter((major) => major !== value));
    } else {
      setSelectedMajors([...selectedMajors, value]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(selectedMajors);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h1>Select Interests</h1>
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
        <button type='button' className="modalClose" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
