import React from 'react';
import img from '../img/feature-1.png';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Enjoy() {
  return (
    <>
    
      <div className='col-md-12 bg-dark text-light py-5'>
        <div className='row align-items-center justify-content-between'>
          {/* Left column with heading and paragraph */}
          <hr />
          <div className='col-md-5'>
            <h1 id='h11' className='display-4'>Enjoy on your TV</h1>
            <p id="p1" className='lead'>
              Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.
            </p>
            {/* Button to trigger modal */}
            <button
              type='button'
              className='btn btn-danger'
              data-bs-toggle='modal'
              data-bs-target='#enjoyModal'
            >
              Learn More
            </button>
          </div>

          {/* Right column with image */}
          <div className='col-md-6 text-center'>
            <img src={img} alt="Enjoy on TV" id='img' />
          </div>
        </div>
      </div>

      {/* Modal Section */}
      <div className='modal fade' id='enjoyModal' tabIndex='-1' aria-labelledby='enjoyModalLabel' aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='enjoyModalLabel'>Watch on Various Devices</h5>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              You can enjoy content on a wide range of devices, including smart TVs, gaming consoles, streaming sticks, 
              and more. Get the best experience on the device of your choice.
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Close</button>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}
