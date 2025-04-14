import { useRouteLoaderData } from "react-router-dom";
import EventForm from "../components/EventForm";

function EditEventPage() {
  const data = useRouteLoaderData('event-detail');
  console.log("🚀 ~ EditEventPage ~ data:", data)
  const event = data.event;
  return <EventForm event={event} method='PATCH'/>;
}

export default EditEventPage;
