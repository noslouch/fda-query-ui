import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import QueryOutput from './components/query-output';
import QueryBuilder from './components/query-builder';
import { queryUrl } from './lib/query-util';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: '',
      query: {},
      otherParams: {
        count: { exact: false, value: '' },
        limit: 25
      }
    }
    this.reset = this.reset.bind(this);
    this.updateEndpoint = this.updateEndpoint.bind(this);
    this.changeQuery = this.changeQuery.bind(this);
    this.changeOtherParams = this.changeOtherParams.bind(this);
    this.clearQuery = this.clearQuery.bind(this);
    this.runQuery = this.runQuery.bind(this);
  }
  
  updateEndpoint(endpoint) {
    this.setState({ endpoint })
  }
  
  changeQuery(query) {
    this.setState({ query });
  }
  
  changeOtherParams(otherParams) {
    this.setState({ otherParams });
  }
  
  clearQuery() {
    this.setState({ query: {} });
  }
  runQuery() {
    let { query, endpoint, otherParams } = this.state;
    let url = queryUrl(query, endpoint, otherParams);
    fetch(url).then(r => r.json().then(j => this.setState({results: JSON.stringify(j, null, 2)})))
  }
  
  reset() {
    this.setState({ fields: [], query: {} });
  }
  
  render() {
    return (
      <div className="container">
        
        <QueryBuilder
          data={this.props.data}
          query={this.state.query}
          otherParams={this.state.otherParams}
          runQuery={this.runQuery}
          changeQuery={this.changeQuery}
          clearQuery={this.clearQuery}
          changeOtherParams={this.changeOtherParams}
          updateEndpoint={this.updateEndpoint}
          reset={this.reset}
        />

        <QueryOutput
          endpoint={this.state.endpoint}
          otherParams={this.state.otherParams}
          query={this.state.query} />

        <div className="form-group">
          <button onClick={this.runQuery} className="btn btn-primary btn-lg">Run Query</button>
        </div>

        <pre className="pre output">{this.state.results}</pre>
      </div>
    )
  }
}

export default App;
