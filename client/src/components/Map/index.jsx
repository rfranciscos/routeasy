import React, { Component } from 'react';
import L from 'leaflet';
import './index.css';
import 'leaflet/dist/leaflet.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // create map
    this.map = L.map('map', {
      center: [49.8419, 24.0315],
      zoom: 16,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        })
      ]
    });
  }

  render() {
    return <div id='map'></div>;
  }
}

export default Form;
