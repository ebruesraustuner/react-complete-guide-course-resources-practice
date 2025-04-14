import { redirect, useLoaderData, useParams, useRouteLoaderData } from 'react-router-dom';
import EventItem from '../components/EventItem';

export default function EventDetailPage(){
    const data = useRouteLoaderData('event-detail');
    console.log("🚀 ~ EventDetailPage ~ data:", data)


    const params = useParams();

    return (
        <>
            <h1>Event DetailPage</h1>
            <p>Event ID: {params.id}</p>
            <EventItem event={data.event} />
        </>
    )
}


export async function loader({request, params}){
   const id =  params.id

   const response = await fetch('http://localhost:8080/events/' + id);

   if(!response.ok) {
    return { isError: true, message: 'Could not fetch details for selected event'}
   } else {
    return response
   }
}

export async function action({params, request}) {
    const eventId = params.id;
    const response = await fetch('http://localhost:8080/events/' + eventId, {
        method: request.method
    });

    if (!response.ok) {
    // ...
    return { isError: true, message: 'Could not delete'}
    } 

    return redirect('/events')
}