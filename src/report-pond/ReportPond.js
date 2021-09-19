import React, { useState } from 'react';

import styles from './ReportPond.module.css';

const ReportPond = (props) => {
    const [rating, setRating] = useState(3);
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
                    locLat: props.userLoc.lat,
                    locLong: props.userLoc.long,
                    rating: rating
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
                <div className={styles.text}>how's the ice?</div>
                <div>
                    <label className={styles.label}>
                        <input type='radio' 
                            value={1}
                            checked={rating === 1}
                            onChange={() => setRating(1)} 
                        />
                        unskateable
                    </label>
                    <label className={styles.label}>
                        <input type='radio' 
                            value={2}
                            checked={rating === 2}
                            onChange={() => setRating(2)} 
                        />
                        bad
                    </label>
                    <label className={styles.label}>
                        <input type='radio' 
                            value={3}
                            checked={rating === 3}
                            onChange={() => setRating(3)} 
                        />
                        okay
                    </label>
                    <label className={styles.label}>
                        <input type='radio' 
                            value={4}
                            checked={rating === 4}
                            onChange={() => setRating(4)} 
                        />
                        good
                    </label>
                    <label className={styles.label}>
                        <input type='radio' 
                            value={5}
                            checked={rating === 5}
                            onChange={() => setRating(5)} 
                        />
                        great
                    </label>
                </div>
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