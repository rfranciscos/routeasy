import { createStore } from 'redux';
import axios from 'axios';

const INITIAL_STATE = {
  data: ['renan', 'Soares', 'Francisco'],
  geolocation: {
    latitude: '0',
    longitude: '0'
  },
  deliveries: {}
};

function courses(state = INITIAL_STATE, action) {
  console.log(action);
  switch (action.type) {
    case 'GET_ADDRESS':
      getAddress(action.address);
      console.log(state)
      break;
    default:
      return state;
  }
}

function getAddress(address) {
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
          INITIAL_STATE['address'] = {
            route: address.address_components[1].long_name,
            number: address.address_components[0].long_name,
            neighborhood: address.address_components[2].long_name,
            complement: '',
            city: address.address_components[3].long_name,
            state: address.address_components[4].short_name,
            country: address.address_components[5].short_name
          };
          INITIAL_STATE.geolocation = {
            latitude: address.geometry.location.lat,
            longitude: address.geometry.location.lng
          };
        })
        .catch(error => console.log(error))
    : this.setState({ message: 'Adicione um endereço válido' });
}

function saveDeliverie() {
  const form = this.state;
  axios
    .post('http://localhost:5000/register', this.state)
    .then(responseFromApi => {
      console.log('sucesso');
    })
    .catch(error => console.log(error));
}

const store = createStore(courses);

export default store;
