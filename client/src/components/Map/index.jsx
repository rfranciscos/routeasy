import React, { Component } from 'react';
import L from 'leaflet';
import './index.css';
import 'leaflet/dist/leaflet.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deliveries: {}
    };
  }



  componentDidMount() {

  }

  render() {
    return <div id='map'></div>;
  }
}

export default Form;
