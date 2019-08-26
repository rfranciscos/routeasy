import React from 'react';
import Form from './components/Form';
import Table from './components/Table';
import Map from './components/Map';

import './App.css'

function App() {
  return (
    <div className='container'>
      <Form />
      <Map />
      <Table />
    </div>
  );
}

export default App;
