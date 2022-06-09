import React, { useState, useEffect } from 'react';
import { Map, Marker } from 'pigeon-maps';
import RinkInfo from '../rink-info/RinkInfo.js';

import styles from './FindPond.module.css';

const FindPond = props => {
    const [ponds, setPonds] = useState(null);
    const [activeRink, setActiveRink] = useState(null);

    useEffect(() => {
        console.log(props.coordinates);

        fetch('https://localhost:8000/find', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ 
                'location': {
                    'coordinates': props.coordinates
                }
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
    }, [props.coordinates]);

    return (
        <div className={styles.containerContainer}>
            <div className={styles.container}>
                <div className={styles.infoContainer}>
                    <button className={styles.backBtn} onClick={props.backFunction}>back</button>
                    <RinkInfo rink={activeRink} />
                </div>
                <div className={styles.mapContainer}>
                    <Map center={props.coordinates} defaultZoom={11}>
                        {ponds?.map((el, ind) => {
                            return(
                                <Marker 
                                    key={ind} 
                                    width={50} 
                                    anchor={el.location.coordinates} 
                                    onClick={() => setActiveRink(el)} 
                                />
                            );
                        })}
                    </Map> 
                </div>
           </div>
        </div>
    );
};

export default FindPond;
