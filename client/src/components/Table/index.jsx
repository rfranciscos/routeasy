import React, { Component } from 'react';
import './index.css';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='deliveries'>
        <h3>
          Total de clientes: 15; Peso Total: 4.521 kg; Ticket Médio*: 301,4
        </h3>
        <table className='table'>
          <tr>
            <th>Nome</th>
            <th>Rua</th>
            <th>Cidade</th>
            <th>País</th>
            <th>Peso</th>
            <th>Lat</th>
            <th>Lng</th>
          </tr>
          <tr>
            <td>Renan</td>
            <td>Av. Sanatório, 1053</td>
            <td>São Paulo</td>
            <td>Brasil</td>
            <td>10.000 kg</td>
            <td>-231234</td>
            <td>-401234</td>
          </tr>
        </table>
      </div>
    );
  }
}

export default Table;
