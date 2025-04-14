import { Form, useNavigate, useNavigation, redirect } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const navigate = useNavigate();
  function cancelHandler() {
    navigate('..');
  }

  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  return (
    <Form method={method} className={classes.form}>
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required defaultValue={event ? event.title : ''} />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={event ? event.image : ''}/>
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required defaultValue={event ? event.date : ''}/>
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required defaultValue={event ? event.description : ''} />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button disabled={isSubmitting}>{isSubmitting ? 'Submitting' : 'Save'}</button>
      </div>
    </Form>
  );
}

export default EventForm;


export async function action({request, params}) {
  console.log("🚀 ~ action ~ request:", request)
  const data = await request.formData();
  console.log("🚀 ~ action ~ data:", data)
  const fd = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description')
  }
  console.log("🚀 ~ action ~ fd:", fd)
  const method = request.method;


  let url = 'http://localhost:8080/events';

  if(method === 'PATCH') {
    const eventId = params.id;
    url = 'http://localhost:8080/events/' + eventId;
  }


  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(fd)
  });

  if (!response.ok) {
    // ...
    return { isError: true, message: 'Could not sent'}
  } 

  return redirect('/events')
}