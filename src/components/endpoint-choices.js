import React, { Component } from 'react';

export default class EndpointChoices extends Component {
  constructor(props) {
    super(props);
    this.sendEndpoint = this.sendEndpoint.bind(this);
  }
  sendEndpoint() {
    this.props.chooseEndpoint(this.props.endpoint)
  }
  render() {
    return (
      <label className="radio-inline">
        <input
          name="endpoint"
          value={this.props.endpoint}
          onChange={this.sendEndpoint}
          type="radio" />
        {this.props.endpoint.replace('.', '/')}
      </label>
    )
  }
}
