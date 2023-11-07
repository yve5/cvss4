import React from 'react';
import { connect } from 'react-redux';

import * as All from '../actions/All';
import { getClassNames } from '../utils';

const Card = ({
  metricData: { fill, metric_groups: metricGroups },
  metricType,
  root: {
    cvss4: { metrics },
  },
  changeValue,
}) => (
  <div className="card my-3" key={metricType}>
    <div
      className="card-header"
      title={`This category is usually filled by the ${fill}`}
    >
      {metricType} <sup>?</sup>
    </div>
    {Object.entries(metricGroups).map(([metricGroup, metricGroupData]) => (
      <div className="card-body" key={metricType + metricGroup}>
        {metricGroup && (
          <div className="row">
            <div className="col-md-8 offset-md-4">
              <h5 className="card-title mb-1">{metricGroup}</h5>
            </div>
          </div>
        )}

        {Object.entries(metricGroupData).map(([metric, metricData]) => (
          <div className="row my-2" key={metricType + metricGroup + metric}>
            <div className="col-md-4">
              <p
                className="card-text text-md-end mt-2 mt-md-1 mb-2 mb-md-0"
                title={metricData?.tooltip}
              >
                {metric} <sup>?</sup>
              </p>
            </div>

            <div className="col-md-8">
              <div className="btn-group" role="group">
                {Object.entries(metricData?.options)
                  .filter(([option]) => option !== '')
                  .map(([option, optionsData]) => (
                    <button
                      key={metricType + metricGroup + metric + option}
                      data-testid="button-metric-change-value"
                      title={optionsData?.tooltip}
                      className={getClassNames(
                        metrics,
                        metricData?.short,
                        optionsData?.value,
                        metricType
                      )}
                      onClick={() =>
                        changeValue(metricData?.short, optionsData?.value)
                      }
                      type="button"
                    >
                      {option}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    ))}
  </div>
);

const mapStateToProps = (state) => ({
  root: state,
});

const mapDispatchToProps = {
  ...All,
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
