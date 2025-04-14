import { useEffect, useState } from 'react';
import EventsList from '../components/EventsList';
import { useLoaderData } from 'react-router-dom';

export default function EventPage(){
  const data = useLoaderData();
  const events = data.events;
  if(data.isError){
    return <p>{data.message}</p>
  }

    return (
        <>
            <h1>EventsPage</h1>
            
          {<EventsList events={events} />}
        </>
    )
}


export async function loader() {
  const response = await fetch('http://localhost:8080/events');
  console.log("🚀 ~ loader ~ response:", response)

    if (!response.ok) {
      // ...
      return { isError: true, message: 'Could not fetch events'}
    } else {
      return response;
    }
              
  
}