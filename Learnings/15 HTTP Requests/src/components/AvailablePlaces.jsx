import { useEffect, useState } from 'react';
import Places from './Places.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/places')
    .then((res) => {
      console.log("🚀 ~ fetch ~ res:", res)
      return res.json();
    })
    .then((resData) => {
      console.log("🚀 ~ .then ~ resData:", resData)
      setAvailablePlaces(resData.places)
    })
  }, [])

  

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
