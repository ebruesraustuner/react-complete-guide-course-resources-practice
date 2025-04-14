import { redirect } from "react-router-dom";
import EventForm from "../components/EventForm";

function NewEventPage() {

  return (
    <>
    <h1>NewEventPage</h1>

    <EventForm method='POST'/>
    
    </>
  )
}

export default NewEventPage;


