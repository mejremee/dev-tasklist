'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Booking } from './types';

const BookingsList: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch('http://host.docker.internal:5000/api/bookings', { cache: 'no-store' });
                if (response.ok) {
                    const data: Booking[] = await response.json();
                    setBookings(data);
                } else {
                    throw new Error('Failed to fetch bookings');
                }
            } catch (error) {
                console.error('Failed to fetch bookings', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bookings-list-container">
            <h1>Bookings</h1>
            <ul>
                {bookings.map((booking) => (
                    <li key={booking.id}>
                        <Link href={`/booking/${booking.id}`}>
                            A Booking on {booking.date} starting at {booking.startTime}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookingsList;