import React from 'react';

function Spinner() {
  return (
    <div id='spinner' className='d-flex align-items-center justify-content-center'>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

export default Spinner;