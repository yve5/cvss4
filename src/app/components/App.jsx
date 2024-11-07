import React from 'react';
import { clsx } from 'clsx';

import Card from './Card';
import Header from './Header';
import { cvssConfig } from '../../cvss4/references/cvssConfig';

const App = () => (
  <>
    <Header />

    <div className={clsx('container')}>
      <div className={clsx('row')}>
        <div className={clsx('col-lg-8', 'offset-lg-2')}>
          {Object.entries(cvssConfig).map(([metricType, metricData]) => (
            <Card
              key={metricType}
              metricData={metricData}
              metricType={metricType}
            />
          ))}
        </div>
      </div>
    </div>
  </>
);

export default App;
