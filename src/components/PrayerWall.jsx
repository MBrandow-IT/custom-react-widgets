import React, { useState, useEffect } from 'react';
import { requestPrefix, httpRequest } from '../lib/utils';
import Error from './Error';
import Spinner from './Loading';

const Button = ({onClick, children}) => <button onClick={onClick} data-select="true" className="bg-accent hover:brightness-125 data-[selected=true]: transition-colors border-4 border-accent w-full rounded-sm p-1 px-2 text-white font-semibold">{children}</button>;

const PrayerCard = ({request}) => {
  const {Prayer_Request_ID, Author_Name, Date_Created, Prayer_Body, Prayer_Count, Private} = request;
  return <div className="w-full aspect-square p-4 rounded-md shadow-md bg-white flex flex-col justify-start">
    <h1 className="text-3xl uppercase">{Author_Name}</h1>
    <p className="text-grayed-out font-semibold">{new Date(Date_Created).toLocaleDateString('en-us', {weekday: "long", month: "short", day: "numeric", year: "numeric"})}</p>
    <div className="mb-auto overflow-y-auto">
      <p className="my-2">{Prayer_Body}</p>
    </div>
    <Button>I Prayed</Button>
  </div>
}

const PrayerWall = () => {
  const [skip, setSkip] = useState(0);
  const [prayerRequests, setPrayerRequests] = useState([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);


  
  useEffect(() => {
    (async () => {
      try {
        const pRequests = await httpRequest(`${requestPrefix}/api/widgets/prayer-requests?skip=${skip}`, 'GET');
        setPrayerRequests(prevRequests => [...prevRequests, ...pRequests])
      } catch (error) {
        setError("Internal server error. Please try again later.");
      }
      setLoading(false);
    })();
  }, [skip]);

  return <>
    {loading && <Spinner />}
    <Error error={error} />

    {!loading && !error && <div className="w-full max-w-screen-lg p-2 mx-auto grid grid-cols-3 gap-4">

      {prayerRequests.map((request, i) => {
        return <PrayerCard request={request} key={i} />
      })}
      <h1>This is a prayer wall</h1>
      <button onClick={() => setSkip(x => x+1)}>Load more requests</button>
    </div>}
  </>
}

export default PrayerWall;