import React, {useState, useEffect, useContext} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import '../App.css';

import { axiosWithAuth } from '../utils/axiosAuth';
import {ReviewContext} from '../contexts/ReviewContext';

const emptyData = {
  strain: '', 
  stars: 0,
  review: '',
};

const ReviewForm = ({userId}) => {
  const [formData, setFormData] = useState(emptyData);
  const { id } = useParams();
  const { push } = useHistory();

  // const {userId} = useContext(ReviewContext);

  const changeHandler = e => {
    e.persist();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(formData)
    setFormData(emptyData);
    // Push request to server
    axiosWithAuth()
    .put(`api/users/${userId}/fav-reviews/${id}`, formData)
    .then(response => {
      console.log(response.data)
      push(`/protected/${userId}`)
    })
    .catch(error => {
      console.log(error)
    })
  };

  return(
    <div className="review-form">
      <form className="card update-form" onSubmit={handleSubmit}>
        <h3>Edit Review</h3>
        <input
          value={formData.strain}
          type="text"
          name="strain"
          onChange={changeHandler}
          placeholder="strain"
        />

        <input
          value={formData.stars}
          type="number"
          name="stars"
          onChange={changeHandler}
          placeholder="stars"
        />

        <input
          value={formData.review}
          type="text"
          name="review"
          onChange={changeHandler}
          placeholder="review"
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default ReviewForm;