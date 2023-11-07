import React from 'react';
import Cards from './Cards';
import Header from './Header';

const App = () => (
  <>
    <Header />

    <div className="container">
      <div className="row">
        <div className="col">
          <Cards />
        </div>
      </div>
    </div>
  </>
);

export default App;
