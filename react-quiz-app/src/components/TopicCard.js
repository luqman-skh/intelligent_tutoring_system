import React from 'react';

const TopicCard = ({ name, image, onLearnNow }) => (
  <div className="card mb-4" style={{ backgroundImage: `url(/assets/${image})` }}>
    <div className="card-body">
      <h5 className="card-title">{name}</h5>
      <button
        onClick={(e) => {
          e.preventDefault();
          onLearnNow();
        }}
        className="btn btn-light mt-3"
      >
        Learn Now
      </button>
    </div>
  </div>
);

export default TopicCard;
