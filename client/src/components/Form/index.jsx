import React, { Component, Fragment } from 'react';
import './index.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <div className='form'>
          <form action='' method='post'>
            <div align='center' className='part1-form'>
              <input
                className='input'
                type='text'
                name='customer'
                id=''
                placeholder='Nome do Cliente'
              />
              <input
                className='input'
                type='number'
                name='weight'
                id=''
                placeholder='Peso da Entrega'
              />
              <div className='input'>
                <input
                  className='inputAddress'
                  type='text'
                  name='address'
                  id=''
                  placeholder='Endereço Cliente'
                />
                <input className='addressBtn' type='button' value='Buscar' />
              </div>
            </div>
            <input
              className='geolocation'
              type='text'
              name='latitude'
              id=''
              placeholder='Latitude'
              disabled
            />
            <input
              className='geolocation'
              type='text'
              name='longitude'
              id=''
              placeholder='Longitude'
              disabled
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
