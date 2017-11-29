import React, { Component } from 'react';

export default class BucketButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.props.changeBucket(this.props.type)
  }
  render() {
    return (
      <div className="btn-group btn-group-lg">
        <button
          type="button"
          className="btn btn-default"
          onClick={this.handleClick}>{this.props.type}</button>
      </div>
    )
  }
}
