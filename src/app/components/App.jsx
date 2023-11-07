import React from 'react';
import Card from './Card';
import Header from './Header';
import { cvssConfig } from '../../references/cvssConfig';

const App = () => (
  <>
    <Header />

    <div className="container">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          {Object.entries(cvssConfig).map(([metricType, metricData]) => (
            <Card
              metricType={metricType}
              metricData={metricData}
              key={metricType}
            />
          ))}
        </div>
      </div>
    </div>
  </>
);

export default App;
