import React, { useState, useEffect } from 'react';

import Home from './home/Home.js';
import FindPond from './find-pond/FindPond.js';
import ReportPond from './report-pond/ReportPond.js';

import styles from './App.module.css';

const App = () => {
  const [find, setFind] = useState(false);
  const [report, setReport] = useState(false);
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      console.log('setting location');
      navigator.geolocation.getCurrentPosition(position => {
        setCoordinates([
          position.coords.latitude,
          position.coords.longitude
        ]);
      });
    }
  }, []);

  const onFindClick = () => {
    setFind(true);
  };

  const onReportClick = () => {
    setReport(true);
  }

  const onBackClick = () => {
    setFind(false);
    setReport(false);
  }

  return (
    <div className={styles.app}>
      {!find && !report && (<Home findClick={onFindClick} reportClick={onReportClick}/>)}
      {find && !report && (
        <FindPond coordinates={coordinates} backFunction={onBackClick}/>
      )}
      {!find && report && (
        <ReportPond coordinates={coordinates} backFunction={onBackClick}/>
      )}
    </div>
  );
};

export default App;
