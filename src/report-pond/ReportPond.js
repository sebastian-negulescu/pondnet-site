import React, { useState } from 'react';

import styles from './ReportPond.module.css';

const ReportPond = (props) => {
    const [rating, setRating] = useState(3);
    const [size, setSize] = useState(3);
    const [busy, setBusy] = useState(3);
    const [submitted, setSubmitted] = useState(false);

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
                    'location': {
                      'coordinates': props.coordinates,
                    },
                    'rating': rating,
                    'size': size,
                    'busy': busy
                })
            });
            if (!res.ok) {
                const errorMessage = await res.text();
		        throw new Error(errorMessage);
            }

            setSubmitted(true);
        } catch (e) {
            console.log(e);
        }
    };

    const form = (
        <form onSubmit={handleSubmit}>
            <div className={styles.question}>
                <div className={styles.text}>ice condition</div>
                <input
                    type='range'
                    value={rating}
                    min='1'
                    max='5'
                    step='1'
                    onChange={event => setRating(event.target.value)}
                />
            </div>
            <div className={styles.question}>
                <div className={styles.text}>ice size</div>
                <input
                    type='range'
                    value={size}
                    min='1'
                    max='5'
                    step='1'
                    onChange={event => setSize(event.target.value)}
                />
            </div>
            <div className={styles.question}>
                <div className={styles.text}>ice business</div>
                <input
                    type='range'
                    value={busy}
                    min='1'
                    max='5'
                    step='1'
                    onChange={event => setBusy(event.target.value)}
                />
            </div>
            <div className={styles.buttons}>
                <button className={styles.submitBtn} type='submit'>submit</button>
                <button className={styles.backBtn} onClick={props.backFunction}>back</button>
            </div>
        </form>
    );
    
    const message = (
        <>
            <span>thanks for placing another rink on our map!</span>
            <div className={styles.buttons}>
                <button className={styles.backBtn} onClick={props.backFunction}>back</button>
            </div>
        </>
    );

    const content = submitted ? message : form;

    return (
        <div className={styles.container}>
            <div className={styles.report}>
                <h1 className={styles.title}>add a rink</h1>
                {content}
            </div>
        </div>
    );
};

export default ReportPond;
