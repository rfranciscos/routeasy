import React, { Component, Fragment } from 'react';
import axios from 'axios';
import './index.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geolocation: {
        latitude: '',
        longitude: ''
      }
    };
  }

  handleChange(event) {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  }

  getAddress = address => {
    console.log(address);
    address
      ? axios
          .get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
              address
            )}&key=AIzaSyAsj3zrJUdEZWBC5XJ_FADJbBosbD3clcQ`
          )
          .then(responseFromApi => {
            const address = responseFromApi.data.results[0];
            console.log(responseFromApi.data.results[0]);

            this.setState({
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

  componentDidMount() {}

  render() {
    return (
      <Fragment>
        <div className='form'>
          <form onSubmit={this.handleFormSubmit}>
            <div align='center' className='part1-form'>
              <input
                className='input'
                type='text'
                name='customer'
                id=''
                placeholder='Nome do Cliente'
                onChange={e => this.handleChange(e)}
              />
              <input
                className='input'
                type='number'
                name='weight'
                id=''
                placeholder='Peso da Entrega'
                onChange={e => this.handleChange(e)}
              />
              <div className='input'>
                <input
                  className='inputAddress'
                  type='text'
                  name='address'
                  id=''
                  placeholder='Endereço Cliente'
                  onChange={e => this.handleChange(e)}
                />
                <input
                  className='addressBtn'
                  type='button'
                  value='Buscar'
                  onClick={() => this.getAddress(this.state.address)}
                />
              </div>
            </div>
            <input
              className='geolocation'
              type='text'
              name='latitude'
              id=''
              placeholder='Latitude'
              disabled
              value={this.state.geolocation.latitude}
            />
            <input
              className='geolocation'
              type='text'
              name='longitude'
              id=''
              placeholder='Longitude'
              disabled
              value={this.state.geolocation.longitude}
            />
            <button className='registerBtn' type='submit'>
              Cadastrar Cliente
            </button>
          </form>
        </div>
        <div className='resetCard'>
          <button className='resetBtn' type='submit'>
            Resetar Cadastro
          </button>
        </div>
      </Fragment>
    );
  }
}

export default Form;
