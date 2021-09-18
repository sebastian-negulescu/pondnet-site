import React, { useState } from 'react';

import Home from './home/Home.js';
import FindPond from './find-pond/FindPond.js';
import ReportPond from './report-pond/ReportPond.js';

import './App.css';

const App = () => {
  const [find, setFind] = useState(false);
  const [report, setReport] = useState(false);

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
    <div className="App">
      {!find && !report && (<Home findClick={onFindClick} reportClick={onReportClick}/>)}
      {find && !report && (<FindPond/>)}
      {!find && report && (<ReportPond/>)}
    </div>
  );
};

export default App;
