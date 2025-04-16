import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import Header from '../Header.jsx';
import { deleteEvent, fetchEvent , queryClient} from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import { useState } from 'react';
import Modal from '../UI/Modal.jsx';

export default function EventDetails() {
  const [isDeleting, setIsDeleting] =  useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  console.log("🚀 ~ EventDetails ~ id:", id)

  const {data, isPending, isError, error} = useQuery({
    queryKey: ['events-details'],
    queryFn: ({signal}) => fetchEvent({signal, id})
  })
  console.log("🚀 ~ EventDetails ~ data:", data)

  const { mutate, isPending: isPendingDelete, isError: isErrorDeleting, error: deleteError } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['events'], refetchType: 'none'});
      navigate('/events')
    }
  })

  function handleStartDelete(){
    setIsDeleting(true);
  }

  function handleDelete(){
    mutate({id: id})
  }

  function handleStopDelete(){
    setIsDeleting(false);
  }

  
  const formattedDate = data ? new Date(data.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
    }): null
  

  return (
    <>
    {
      isDeleting && (
        <Modal onClose={handleStopDelete}>
          <h2>Are you sure</h2>
          <p>
            Do you really want to delete this event. This action cannot be undone!
          </p>
          <div className='form-actions'>
            {isPendingDelete && <p>Wait for it</p>}
            {
              !isPendingDelete && (
                <>
                  <button onClick={handleStopDelete} className='button-text'>
                    Cancel
                  </button>
                  <button onClick={handleDelete} className='button'>
                    Delete
                  </button>
                </>
              )
            }
          </div>
          {isErrorDeleting && <ErrorBlock title='Failed to delete event' message={deleteError.info?.message || 'try again later'}/>}
          
        </Modal>
      )
    }
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">
        {isPending && <p>Veri getiriliyor lütfen bekleyiniz</p>}
        
        { isError && <ErrorBlock title='Veri getirilirken bir hata oluştu' message={error.info?.message || 'lütfen daha sonra tekrar deneyiniz'} />}

        {
          data && (
            <>
              <header>
                <h1>{data.title}</h1>
                <nav>
                  <button onClick={handleStartDelete}>Delete</button>
                  <Link to="edit">Edit</Link>
                </nav>
              </header>
              <div id="event-details-content">
                <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
                <div id="event-details-info">
                  <div>
                    <p id="event-details-location">{data.location}</p>
                    <time dateTime={`Todo-DateT$Todo-Time`}>{formattedDate} @ {data.time}</time>
                  </div>
                  <p id="event-details-description">{data.description}</p>
                </div>
              </div>
            </>
          )
        }
        
      </article>
    </>
  );
}
