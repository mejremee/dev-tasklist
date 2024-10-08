'use client';

import React, { useEffect, useState } from 'react';
import BookingsList from '././BookingList';
import { Booking } from './types';

const Home: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBookings = async () => {
      try {
        const res = await fetch('http://host.docker.internal:5000/api/bookings', { cache: 'no-store' });
        if (!res.ok) {
           new Error('Failed to fetch data');
        }
        const data: Booking[] = await res.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    getBookings();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <div>
        <h1>Current booking count: {bookings.length}</h1>
        <BookingsList />
      </div>
  );
};

export default Home;
