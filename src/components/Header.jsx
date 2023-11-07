import React from 'react';
import { connect } from 'react-redux';

import { getScore } from '../utils';

const Header = ({
  root: {
    cvss4: { metrics },
  },
}) => (
  <header className="mt-5">
    <div className="container fixed-top border-bottom bg-body">
      <div className="row ">
        <div className="col-6 fs-2">CVSS v4.0</div>
        <div className="col-6 fs-2 text-end">Score : {getScore(metrics)}</div>
      </div>
    </div>
  </header>
);

const mapStateToProps = (state) => ({
  root: state,
});

export default connect(mapStateToProps)(Header);
