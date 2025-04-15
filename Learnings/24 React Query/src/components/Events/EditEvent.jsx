import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import { fetchEvent, queryClient, updateEvent } from '../../util/http.js';


export default function EditEvent() {
  const navigate = useNavigate();

  const params = useParams();
  const id = params.id;
  console.log("🚀 ~ EventDetails ~ id:", id)

  const {data, isPending, isError, error} = useQuery({
    queryKey: ['events-details'],
    queryFn: ({signal}) => fetchEvent({signal, id})
  })
  console.log("🚀 ~ EventDetails ~ data:", data)

  const {mutate } = useMutation({
    mutationFn: updateEvent,
    onMutate:async (data) => {
      const newEvent = data.event;
      await queryClient.cancelQueries({queryKey: ['events', params.id]});
      const preEvent = queryClient.getQueryData(['events-details', id]);
     
      queryClient.setQueryData(['events-details', id], newEvent);

      return { preEvent }
    },
    onError: (error, data, context) => {
        queryClient.setQueryData(['events-details', id], context.preEvent)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['events-details', id])
    }
    // onSuccess: () => {
    //   queryClient.invalidateQueries({queryKey: ['events']});
    //   navigate('/events')
    // }
  })


  function handleSubmit(formData) {
    mutate({id: id, event: formData})
  }

  function handleClose() {
    navigate('../');
  }

  return (
    <Modal onClose={handleClose}>
      {isPending && <div className='center'> <LoadingIndicator/></div>}
      {data && (
        <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
      )}

      {isPending && <p>Veri getiriliyor lütfen bekleyiniz</p>}
      
      { isError && <ErrorBlock title='Veri getirilirken bir hata oluştu' message={error.info?.message || 'lütfen daha sonra tekrar deneyiniz'} />}

      
    </Modal>
  );
}
