import React, { useState } from 'react';
import { clsx } from 'clsx';
import { connect } from 'react-redux';
import { getScore, getVector } from 'lapwing';

import * as All from '../actions/All';

const Header = ({
  root: {
    cvss4: { metrics },
  },
  resetScore,
}) => {
  const [copied, setCopied] = useState(false);
  const currentVector = getVector(metrics);
  const currentScore = getScore(metrics);

  return (
    <header style={{ marginTop: '7rem' }}>
      <div className={clsx('container', 'fixed-top', 'bg-body')}>
        <div className={clsx('row')}>
          <div className={clsx('col-lg-8', 'offset-lg-2', 'border-bottom')}>
            <div
              className={clsx(
                'd-flex',
                'justify-content-between',
                'align-self-center'
              )}
            >
              <span className={clsx('display-5')}>CVSS 4.0</span>
              <span className={clsx('display-5', 'text-end')}>
                Score:{currentScore.toFixed(1)}
              </span>
            </div>

            <div className={clsx('input-group', 'input-group-sm', 'my-2')}>
              <button
                type="button"
                className={clsx(
                  'btn',
                  copied ? 'btn-success' : 'btn-outline-secondary'
                )}
                onClick={() => {
                  navigator.clipboard
                    .writeText(currentVector)
                    .then(() => {
                      setCopied(true);
                      setTimeout(() => setCopied(false), 3000);
                    })
                    .catch(() => console.error('Failed to copy text!'));
                }}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>

              <input
                readOnly
                type="text"
                value={currentVector}
                className={clsx('form-control')}
              />

              <button
                type="button"
                onClick={() => resetScore()}
                className={clsx('btn', 'btn-outline-danger')}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({
  root: state,
});

const mapDispatchToProps = {
  ...All,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
