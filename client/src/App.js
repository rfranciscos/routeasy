import React, { Component } from 'react';
import Form from './components/Form';
import Table from './components/Table';
import Map from './components/Map';

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
  }

  getAddress = state => {
    console.log(state);
    state.address
      ? axios
          .get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
              state.address
            )}&key=KEY`
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
      .then(responseFromApi => {
        console.log('sucesso');
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
        // console.log(this.state.deliveries.data, 'sucesso');
        
      })
      .catch(error => console.log(error));
  };

  componentDidMount() {
    this.getDeliveries();
  }

  render() {
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
