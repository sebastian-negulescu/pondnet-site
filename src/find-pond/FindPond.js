import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import apiKey from '../apiKey.js';

const FindPond = () => {
    const [ponds, setPonds] = useState(null);

    useEffect(() => {
        fetch('https://localhost:8000/find', {
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
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: apiKey }}
                defaultCenter={{lat: 59.95, lng: 30.33}}
                defaultZoom={8}
            ></GoogleMapReact>
        </div>
    );
};

export default FindPond;