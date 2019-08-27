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

  map = () => {
    var mymap = L.map('map').setView([-23.55052, -46.633309], 13);

    L.tileLayer(
      'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken:
          'pk.eyJ1IjoicmZyYW5jaXNjbyIsImEiOiJjanpzeGx5MHgxZW52M2ptaW9zbXY0bmw1In0.MrOJaTwh7ZjLSg8bSsvUBg'
      }
    ).addTo(mymap);

    console.log(this.props.deliveries.length);

    for (var i = 0; i < this.props.deliveries.length; i++) {
      L.marker([
        this.props.deliveries[i].geolocation.latitude,
        this.props.deliveries[i].geolocation.longitude
      ])
        .addTo(mymap)
        .bindPopup(
          `<b>${this.props.deliveries[i].customer}</b><br>${this.props.deliveries[i].weight}`
        )
        .openPopup();
    }
  };

  componentDidMount() {
    setTimeout(() => {
      this.map();
    }, 50);
  }

  render() {
    return <div id='map'></div>;
  }
}

export default Form;
