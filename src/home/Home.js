import React from 'react';

const Home = (props) => {
    return (
        <div>
            <button onClick={props.findClick}>find</button>
            <button onClick={props.reportClick}>report</button>
        </div>
    );
};

export default Home;