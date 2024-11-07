import React from 'react';
import { clsx } from 'clsx';
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
  <div className={clsx('card', 'my-3')} key={metricType}>
    <div
      className={clsx('card-header')}
      title={`This category is usually filled by the ${fill}`}
    >
      {metricType} <sup>?</sup>
    </div>
    {Object.entries(metricGroups).map(([metricGroup, metricGroupData]) => (
      <div className={clsx('card-body')} key={metricType + metricGroup}>
        {metricGroup && (
          <div className={clsx('row')}>
            <div className={clsx('col-md-8', 'offset-md-4')}>
              <h5 className={clsx('card-title', 'mb-1')}>{metricGroup}</h5>
            </div>
          </div>
        )}

        {Object.entries(metricGroupData).map(([metric, metricData]) => (
          <div
            className={clsx('row', 'my-2')}
            key={metricType + metricGroup + metric}
          >
            <div className={clsx('col-md-4')}>
              <p
                title={metricData?.tooltip}
                className={clsx(
                  'card-text',
                  'text-md-end',
                  'mt-2',
                  'mt-md-1',
                  'mb-2',
                  'mb-md-0'
                )}
              >
                {metric} <sup>?</sup>
              </p>
            </div>

            <div className={clsx('col-md-8')}>
              <div className={clsx('btn-group')} role="group">
                {Object.entries(metricData?.options)
                  .filter(([option]) => option !== '')
                  .map(([option, optionsData]) => (
                    <button
                      type="button"
                      title={optionsData?.tooltip}
                      key={metricType + metricGroup + metric + option}
                      className={getClassNames(
                        metrics,
                        metricData?.short,
                        optionsData?.value,
                        metricType
                      )}
                      onClick={() =>
                        changeValue(metricData?.short, optionsData?.value)
                      }
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
