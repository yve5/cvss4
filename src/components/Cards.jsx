import React from 'react';
import { cvssConfig } from '../resources/cvssConfig';

// console.log(Object.entries(cvssConfig));

const Cards = () =>
  Object.entries(cvssConfig).map(
    ([metricType, { fill, metric_groups: metricGroups }]) => (
      <div className="card my-3" key={metricType}>
        <div
          className="card-header text-center"
          title={`This category is usually filled by the ${fill}`}
        >
          {metricType} <sup>?</sup>
        </div>
        {Object.entries(metricGroups).map(([metricGroup, metricGroupData]) => (
          <div className="card-body" key={metricType + metricGroup}>
            {metricGroup && (
              <h5 className="card-title text-center mb-3">{metricGroup}</h5>
            )}

            {Object.entries(metricGroupData).map(([metric, metricData]) => (
              <div className="row my-2" key={metricType + metricGroup + metric}>
                <div className="col-md-3">
                  <p
                    className="card-text text-end mt-1"
                    title={metricData?.tooltip}
                  >
                    {metric} <sup>?</sup>
                  </p>
                </div>

                <div className="col-md-9">
                  <div className="row">
                    {Object.entries(metricData?.options).map(
                      ([option, optionsData]) => (
                        <div
                          key={metricType + metricGroup + metric + option}
                          className="col-md-2 d-grid"
                        >
                          <button
                            className="btn btn-outline-success btn-block"
                            title={optionsData?.tooltip}
                            type="button"
                          >
                            {option}
                          </button>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  );

export default Cards;
