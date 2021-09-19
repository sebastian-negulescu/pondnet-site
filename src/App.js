import React, { useState, useEffect } from 'react';

import Home from './home/Home.js';
import FindPond from './find-pond/FindPond.js';
import ReportPond from './report-pond/ReportPond.js';

import styles from './App.module.css';

const App = () => {
  const [find, setFind] = useState(false);
  const [report, setReport] = useState(false);
  const [userLocLat, setUserLocLat] = useState(0);
  const [userLocLong, setUserLocLong] = useState(0);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
          setUserLocLat(position.coords.latitude);
          setUserLocLong(position.coords.longitude);
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
      {find && !report && (<FindPond userLoc={{lat: userLocLat, long: userLocLong}} backFunction={onBackClick}/>)}
      {!find && report && (<ReportPond userLoc={{lat: userLocLat, long: userLocLong}} backFunction={onBackClick}/>)}
    </div>
  );
};

export default App;
