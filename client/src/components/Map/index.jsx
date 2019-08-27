import React, { Component } from 'react';
import './index.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deliveries: {}
    };
  }

  componentDidMount() {}

  render() {
    return <div id='map'></div>;
  }
}

export default Form;
