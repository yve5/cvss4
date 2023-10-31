import React from 'react';
import { cvssConfig } from '../resources/cvssConfig';
// import logo from '../resources/logo.svg';
// import '../styles/App.css';

// console.log(Object.entries(cvssConfig));

const App = () => (
  <div className="App container">
    <div className="row">
      <div className="col">
        {/*
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        */}

        {Object.entries(cvssConfig).map(
          ([metricType, { fill, metric_groups: metricGroups }]) => (
            <div className="card my-3" key={metricType}>
              <div className="card-header text-center">
                {metricType}{' '}
                <sup>
                  <abbr
                    title={`This category is usually filled by the ${fill}`}
                  >
                    ?
                  </abbr>
                </sup>
              </div>
              {Object.entries(metricGroups).map(
                ([metricGroup, metricGroupData]) => (
                  <div className="card-body" key={metricType + metricGroup}>
                    {metricGroup && (
                      <h5 className="card-title text-center">{metricGroup}</h5>
                    )}

                    {Object.entries(metricGroupData).map(
                      ([metric, metricData]) => (
                        <div
                          className="row my-2"
                          key={metricType + metricGroup + metric}
                        >
                          <div className="col-md-4">
                            <p className="card-text text-end">
                              {metric}{' '}
                              <sup>
                                <abbr title={metricData?.tooltip}>?</abbr>
                              </sup>
                            </p>
                          </div>
                          <div className="col-md-8">
                            <div
                              aria-label="Basic radio toggle button group"
                              className="btn-group btn-group-sm"
                              role="group"
                            >
                              {Object.entries(metricData?.options).map(
                                ([option, optionsData]) => (
                                  <button
                                    className="btn btn-outline-primary"
                                    title={optionsData?.tooltip}
                                    type="button"
                                    key={
                                      metricType + metricGroup + metric + option
                                    }
                                  >
                                    {option}
                                  </button>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )
              )}
            </div>
          )
        )}
      </div>
    </div>
  </div>
);

export default App;
