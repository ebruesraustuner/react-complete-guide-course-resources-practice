import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '../../util/http.js';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';

export default function FindEventSection() {
  const searchElement = useRef();
  const [searchTerm, setSearchTerm] = useState();

  const { data, isLoading, isError, error } = useQuery({
      queryKey: ['events', {search: searchTerm }],
      queryFn: ({signal}) => fetchEvents({signal,searchTerm}),
      enabled: !!searchTerm
    });

  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(searchElement.current.value);
  }

  let content = <p> Enter a search term to find  events</p>;

   if (isLoading) {
      content = <LoadingIndicator />;
    }

    if(isError){
      content = <ErrorBlock title="Errorr" message={error.info?.message || 'Failed'} />
    }

    if(data){
      content = <ul className='events-list'>
        {data.map((e) => (
          <li key={e.id}>
              <EventItem event={e} />
          </li>
        ))}

      </ul>
    }

  return (
    <section className="content-section" id="all-events-section">
      
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      {content} 
    </section>
  );
}
