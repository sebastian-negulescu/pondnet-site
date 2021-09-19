import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import apiKey from '../apiKey.js';

import styles from './FindPond.module.css';

const FindPond = (props) => {
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

            console.log(data);
            setPonds(data);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

    const ratingConversion = (rating) => {
        let ret;
        switch (rating) {
            case 1: 
                ret = 'no';
                break;
            case 2: 
                ret = 'bad';
                break;
            case 3: 
                ret = 'okay';
                break;
            case 4: 
                ret = 'good';
                break;
            case 5: 
                ret = 'great';
                break;
        }
        return ret;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button className={styles.backBtn} onClick={props.backFunction}>back</button>
                <span>find a rink near you</span>
            </div>
            <div className={styles.mapContainer}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: apiKey }}
                    defaultCenter={{lat: props.userLoc.lat, lng: props.userLoc.long}}
                    defaultZoom={15}
                >
                    {ponds && ponds.map((pond, i) => (
                        <span 
                            key={i} 
                            lat={pond.locLat} 
                            lng={pond.locLong}
                            className={styles.loc}
                        >
                            {ratingConversion(pond.rating)}
                        </span>
                    ))}
                </GoogleMapReact>
            </div>
        </div>
    );
};

export default FindPond;