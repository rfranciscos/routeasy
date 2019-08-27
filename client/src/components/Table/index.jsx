import React, { Component } from 'react';
import './index.css';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  resume = () => {
    let totalWeight = 0;
    for (let i = 0; i < this.props.deliveries.length; i++) {
      totalWeight += this.props.deliveries[i].weight;
    }
    this.setState({
      totalWeight: totalWeight
    });
  };

  componentDidMount() {
    setTimeout(() => {
      this.resume();
    }, 50);
  }

  render() {
    return (
      <div className='deliveries'>
        <h3>
          Total de clientes: {this.props.deliveries.length}; Peso Total:{' '}
          {this.state.totalWeight}
          kg; Ticket Médio*:{' '}
          {(this.state.totalWeight / this.props.deliveries.length).toFixed(1)}
        </h3>
        <table className='table'>
          <tbody>
            <tr>
              <th>Nome</th>
              <th>Rua</th>
              <th>Cidade</th>
              <th>País</th>
              <th>Peso</th>
              <th>Lat</th>
              <th>Lng</th>
            </tr>
            {this.props.deliveries.map((delivery, i) => {
              return (
                <tr key={i}>
                  <td>{delivery.customer}</td>
                  <td>
                    {delivery.address.route}, {delivery.address.number}
                  </td>
                  <td>{delivery.address.city}</td>
                  <td>{delivery.address.country}</td>
                  <td>{delivery.weight}</td>
                  <td>{delivery.geolocation.latitude}</td>
                  <td>{delivery.geolocation.longitude}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
