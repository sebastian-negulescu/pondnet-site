import React, { useState, useEffect } from 'react';

const FindPond = () => {
    const [ponds, setPonds] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/find', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ 
                locLat: 0,
                locLong: 0
            })
        })
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

            setPonds(data);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

    return (
        <div>
            {ponds && ponds.map((pond, i) => 
                (<div key={i}>
                    {pond.locLat}
                    {pond.locLong}
                    {pond.rating}
                </div>)
            )}
        </div>
    );
};

export default FindPond;