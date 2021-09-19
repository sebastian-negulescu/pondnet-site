import React from 'react';

import styles from './Home.module.css';

const Home = (props) => {
    return (
        <div className={styles.home}>
            <button className={styles.find} onClick={props.findClick}>find a rink</button>
            <button className={styles.report} onClick={props.reportClick}>add a rink</button>
        </div>
    );
};

export default Home;