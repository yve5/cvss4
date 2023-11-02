import React from 'react';
import { connect } from 'react-redux';

import * as All from '../actions/All';
import { getClassNames } from '../utils';
import { cvssConfig } from '../references/cvssConfig';

const Cards = ({
  root: {
    cvss4: { metrics },
  },
  changeValue,
}) =>
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
                    className="card-text text-md-end mt-1"
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
                          className="col-md-6 col-lg-2 d-grid mb-2"
                        >
                          <button
                            title={optionsData?.tooltip}
                            className={getClassNames(
                              metrics,
                              metricData?.short,
                              optionsData?.value
                            )}
                            onClick={() =>
                              changeValue(metricData?.short, optionsData?.value)
                            }
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

const mapStateToProps = (state) => ({
  root: state,
});

const mapDispatchToProps = {
  ...All,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
