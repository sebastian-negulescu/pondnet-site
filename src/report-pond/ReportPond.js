import React, { useState, useEffect } from 'react';

const ReportPond = () => {
    const [locLat, setLocLat] = useState(0);
    const [locLong, setLocLong] = useState(0);
    const [rating, setRating] = useState(3);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocLat(position.coords.latitude);
                setLocLong(position.coords.longitude);
            });
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const res = await fetch('https://localhost:8000/report', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ 
                    locLat: locLat,
                    locLong: locLong,
                    rating: rating 
                })
            });
            if (!res.ok) {
                const errorMessage = await res.text();
		        throw new Error(errorMessage);
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <h1>Report a Pond</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    ice condition:
                    <input type='number' 
                        min='1' 
                        max='5' 
                        value={rating}
                        onChange={e => setRating(e.target.value)} />
                </label>
                <input type='submit' value='submit'/>
            </form>
        </>
    );
};

export default ReportPond;