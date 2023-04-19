/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchHouses } from "../../redux/house/houseSlice";
import { addReservation } from "../../redux/reservation/reservationSlice";

const ReserveForm = () => {
  const houses =  useSelector((state) => state.houses.houses)
  const [reservation, setReservation] = useState({
    start_date: "",
    end_date: "",
    house_id: ""
  })

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchHouses());
  }, [dispatch]);
 
  const inputValue = (e) => {
    setReservation({
      ...reservation,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addReservation(reservation));
     navigate("/reservations");
  };


  return (
    <form onSubmit={handleSubmit}>
      <label>
        Start Date:
        <input
          type="date"
          name="start_date"
          onChange={inputValue}
         
          required
        />
      </label>
      <label>
        End Date:
        <input
          type="date"
          name="end_date"
          onChange={inputValue}
         
          required
        />
      </label>

      <label for="cars">Choose a house:</label>
<select id="cars" name="house_id" onChange={inputValue} form="carform">
  {
     houses.map((house) => {
      return(
        <option key={house.id} value={house.id}>
          {house.name}
        </option>
      )
     })
  }
 
</select>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ReserveForm;