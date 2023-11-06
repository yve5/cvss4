import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getScore } from '../utils';

const Header = ({
  root: {
    cvss4: { metrics },
  },
}) => {
  const inScore = getScore(metrics);

  useEffect(() => {
    console.log('Score', inScore);
  }, [inScore]);

  return (
    <header className="py-3">
      <h1 className="display-6">CVSS v4.0 Calculator</h1>
      <h2>Score : {inScore}</h2>
    </header>
  );
};

const mapStateToProps = (state) => ({
  root: state,
});

export default connect(mapStateToProps)(Header);
