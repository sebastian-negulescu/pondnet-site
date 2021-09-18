import React from 'react';

const Home = (props) => {
    return (
        <>
            <button onClick={props.findClick}>find</button>
            <button onClick={props.reportClick}>report</button>
        </>
    );
};

export default Home;