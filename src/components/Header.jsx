import React from 'react';
import { getScore } from '../utils';

const Header = () => (
  <header className="py-3">
    <h1 className="display-6">CVSS v4.0 Calculator</h1>
    <h2>Score : {getScore()}</h2>
  </header>
);

export default Header;
