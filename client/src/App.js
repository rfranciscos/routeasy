import React, { Component } from 'react';
import Form from './components/Form';
import Table from './components/Table';
import Map from './components/Map';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import axios from 'axios';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geolocation: {
        latitude: '',
        longitude: ''
      },
      deliveries: []
    };
    this.mymap = '';
  }

  getAddress = state => {
    state.address
      ? axios
          .get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
              state.address
            )}&key=AIzaSyAsj3zrJUdEZWBC5XJ_FADJbBosbD3clcQ`
          )
          .then(responseFromApi => {
            const address = responseFromApi.data.results[0];
            console.log(responseFromApi.data.results[0]);

            this.setState({
              customer: state.customer,
              weight: state.weight,
              address: {
                route: address.address_components[1].long_name,
                number: address.address_components[0].long_name,
                neighborhood: address.address_components[2].long_name,
                complement: '',
                city: address.address_components[3].long_name,
                state: address.address_components[4].short_name,
                country: address.address_components[5].short_name
              },
              geolocation: {
                latitude: address.geometry.location.lat,
                longitude: address.geometry.location.lng
              }
            });
          })
          .catch(error => console.log(error))
      : this.setState({ message: 'Adicione um endereço válido' });
  };

  saveDeliverie = () => {
    axios
      .post('http://localhost:5000/register', this.state)
      .then(() => {
        console.log('sucesso');
        this.getDeliveries();
        this.setState({
          customer: '',
          weight: '',
          address: '',
          geolocation: {
            latitude: '',
            longitude: ''
          }
        });
      })
      .catch(error => console.log(error));
  };

  getDeliveries = () => {
    axios
      .get('http://localhost:5000/deliveries')
      .then(responseFromApi => {
        this.setState({
          deliveries: responseFromApi.data
        });
      })
      .catch(error => console.log(error));
  };

  map = () => {
    this.mymap = L.map('map').setView([-23.55052, -46.633309], 13);

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
    ).addTo(this.mymap);

    for (let i = 0; i < this.state.deliveries.length; i++) {
      console.log(this.state.deliveries.length);

      L.marker([
        this.state.deliveries[i].geolocation.latitude,
        this.state.deliveries[i].geolocation.longitude
      ])
        .addTo(this.mymap)
        .bindPopup(
          `<b>${this.state.deliveries[i].customer}</b><br>${this.state.deliveries[i].weight}`
        )
        .openPopup();
    }
  };

  update = () => {
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
    ).addTo(this.mymap);

    for (let i = 0; i < this.state.deliveries.length; i++) {
      console.log(this.state.deliveries.length);

      L.marker([
        this.state.deliveries[i].geolocation.latitude,
        this.state.deliveries[i].geolocation.longitude
      ])
        .addTo(this.mymap)
        .bindPopup(
          `<b>${this.state.deliveries[i].customer}</b><br>${this.state.deliveries[i].weight}`
        )
        .openPopup();
    }
  };

  componentDidUpdate() {
    setTimeout(() => {
      this.update();
    }, 50);
  }
  componentDidMount() {
    this.getDeliveries();
    setTimeout(() => {
      this.map();
    }, 50);
  }

  render() {
    console.log(this.state.deliveries.length);

    return (
      <div className='container'>
        <Form
          getAddress={address => this.getAddress(address)}
          geolocation={this.state.geolocation}
          saveDeliverie={deliveryInfo => this.saveDeliverie(deliveryInfo)}
        />
        <Map deliveries={this.state.deliveries} />
        <Table deliveries={this.state.deliveries} />
      </div>
    );
  }
}

export default App;
