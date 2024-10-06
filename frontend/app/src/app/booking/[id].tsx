'use client';

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Booking } from '../types';


const BookingDetails: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [booking, setBooking] = useState<Booking | null>(null);

    useEffect(() => {
        if (id) {
            const fetchBooking = async () => {
                try {
                    const response = await fetch(`http://host.docker.internal:5000/api/bookings/${id}`, { cache: 'no-store' });
                    if (response.ok) {
                        const data: Booking = await response.json();
                        setBooking(data);
                    } else {
                        throw new Error('Failed to fetch booking');
                    }
                } catch (error) {
                    console.error('Failed to fetch booking', error);
                }
            };

            fetchBooking();
        }
    }, [id]);

    if (!booking) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Booking Details</h1>
            <p>
                This Booking is with {booking.doctorName} for {booking.service} and it ends on {booking.endTime}.
            </p>
            <Link href="/">
                <a>Back</a>
            </Link>
        </div>
    );
};

export default BookingDetails;