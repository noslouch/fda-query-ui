import React, { Component } from 'react';
import { queryUrl } from '../lib/query-util';

export default class QueryOutput extends Component {
  render() {
    return (
      <pre className="pre entry">It will look something like:<br />{queryUrl(this.props.query, this.props.endpoint, this.props.otherParams)}</pre>
    )
  }
}
