import React from 'react';
import Cards from './Cards';
import Header from './Header';

const App = () => (
  <div className="container">
    <div className="row">
      <div className="col">
        <Header />
        <Cards />
      </div>
    </div>
  </div>
);

export default App;
