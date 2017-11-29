import React, { Component } from 'react';
import BucketButton from './bucket-button';

export default class BucketButtons extends Component {
  render() {
    return (
      <div className="btn-group btn-group-justified btn-group-spaced">
        {this.props.buckets.map(type => {
          return <BucketButton
            changeBucket={this.props.onChange}
            key={type}
            type={type}
            />
        })}
      </div>
    )
  }
}
