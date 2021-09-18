import React, { useState } from 'react';

const ReportPond = () => {
    const [rating, setRating] = useState(3);
    const [locLat, setLocLat] = useState(0);
    const [locLong, setLocLong] = useState(0);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const res = await fetch('http://localhost:8000/', {
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
                    location:
                    <input type='number' 
                        value={locLat}
                        onChange={e => setLocLat(e.target.value)} />
                    <input type='number' 
                        value={locLong}
                        onChange={e => setLocLong(e.target.value)} />
                </label>
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