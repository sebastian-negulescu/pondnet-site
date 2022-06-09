import React from 'react';

import styles from './RinkInfo.module.css';

const RinkInfo = props => {
    console.log(props.rink);

    const emptyElement = (<></>);

    if (props.rink === null) {
        return emptyElement;
    }

    const loc = props.rink.hasOwnProperty('location') ? props.rink.location.coordinates : null;
    const rating = props.rink.hasOwnProperty('rating') ? props.rink.rating : null;
    const size = props.rink.hasOwnProperty('size') ? props.rink.size : null;
    const busy = props.rink.hasOwnProperty('busy') ? props.rink.busy : null;

    if (!(loc || rating || size || busy)) {
        return emptyElement;
    }

    const locElement = loc ? (
        <span>location: ({loc[0]},{loc[1]})</span>
    ) : emptyElement;

    const ratingElement = rating ? (
        <span>rating: {rating}</span>
    ) : emptyElement;

    const sizeElement = size ? (
        <span>size: {size}</span>
    ) : emptyElement;

    const busyElement = busy ? (
        <span>busy: {busy}</span>
    ) : emptyElement;

    return (
        <div className={styles.container}>
            {locElement}
            {ratingElement}
            {sizeElement}
            {busyElement}
        </div>
    );
};

export default RinkInfo;
