'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../globals.css';

const CreateBooking: React.FC = () => {
    const [service, setService] = useState('');
    const [doctorName, setDoctorName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Submitting form...");

        try {
            const response = await fetch('http://host.docker.internal:5000/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    service,
                    doctor_name: doctorName,
                    start_time: startTime,
                    end_time: endTime,
                    date,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to create booking: ${errorText}`);
            }

            setSuccess(true);
            setError(null);
            setService('');
            setDoctorName('');
            setStartTime('');
            setEndTime('');
            setDate('');

            router.push('/');
        } catch (error) {
            setError(error.message || 'Failed to create booking');
            setSuccess(false);
        }
    };

    return (
        <div className="create-booking-container">
            <h1>Create Booking</h1>
            {success && <p className="success-message">Booking created successfully!</p>}
            {error && <p className="error-message">Error: {error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="service">Service:</label>
                    <input
                        id="service"
                        type="text"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="doctorName">Doctor Name:</label>
                    <input
                        id="doctorName"
                        type="text"
                        value={doctorName}
                        onChange={(e) => setDoctorName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="startTime">Start Time:</label>
                    <input
                        id="startTime"
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="endTime">End Time:</label>
                    <input
                        id="endTime"
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Create Booking</button>
            </form>
        </div>
    );
};

export default CreateBooking;