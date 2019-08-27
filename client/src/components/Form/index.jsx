import React, { Component, Fragment } from 'react';
import './index.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange(event) {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  }

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
                value={this.props.customer}
                placeholder='Nome do Cliente'
                onChange={e => this.handleChange(e)}
              />
              <input
                className='input'
                type='number'
                name='weight'
                id=''
                value={this.props.weight}
                placeholder='Peso da Entrega'
                onChange={e => this.handleChange(e)}
              />
              <div className='input'>
                <input
                  className='inputAddress'
                  type='text'
                  name='address'
                  id=''
                  value={this.props.address}
                  placeholder='Endereço Cliente'
                  onChange={e => this.handleChange(e)}
                />
                <input
                  className='addressBtn'
                  type='button'
                  value='Buscar'
                  onClick={() => this.props.getAddress(this.state)}
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
              value={this.props.geolocation.latitude}
            />
            <input
              className='geolocation'
              type='text'
              name='longitude'
              id=''
              placeholder='Longitude'
              disabled
              value={this.props.geolocation.longitude}
            />
            <button
              className='registerBtn'
              type='button'
              onClick={() => this.props.saveDeliverie()}>
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
