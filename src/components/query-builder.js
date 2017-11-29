import React, { Component } from 'react';
import BucketButtons from './bucket-buttons';
import CountField from './count-field';
import EndpointChoices from './endpoint-choices';
import EndpointFields from './endpoint-fields';

export default class QueryBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bucket: '',
      endpoints: [],
      fields: [],
    }
    this.updateBucket = this.updateBucket.bind(this);
    this.updateFields = this.updateFields.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
    this.removeTerm = this.removeTerm.bind(this);
    this.queryIfEnter = this.queryIfEnter.bind(this);
    this.toggleExact = this.toggleExact.bind(this);
    this.updateCount = this.updateCount.bind(this);
    this.clearCount = this.clearCount.bind(this);
    this.updateLimit = this.updateLimit.bind(this);
  }
  
  updateBucket(bucket) {
    let { endpoints } = this.props.data[bucket]
    this.setState({ bucket, endpoints });
    this.props.reset();
  }
  
  updateFields(endpoint) {
    let { bucket } = this.state
    let fields = this.props.data[bucket][endpoint]
    this.setState({
      fields: fields.length ? fields : [],
    })
    this.props.updateEndpoint(endpoint);
  }
  
  updateQuery(term, index) {
    let { query } = this.props;
    query[index] = term
    this.props.changeQuery(query);
  }
  
  removeTerm(index) {
    let { query } = this.props;
    delete query[index]
    this.props.changeQuery(query);
  }
  
  queryIfEnter({which}) {
    if (which === 13) {
      this.props.runQuery()
    }
  }
  
  toggleExact() {
    let { otherParams } = this.props;
    if (otherParams.count.exact) {
      otherParams.count.exact = false
    } else {
      otherParams.count.exact = true
    }
    this.props.changeOtherParams(otherParams);
  }
  
  updateCount({target}) {
    let { otherParams } = this.props;
    otherParams.count.value = target.value
    this.props.changeOtherParams(otherParams);
  }

  clearCount() {
    let { otherParams } = this.props;
    otherParams.count.value = ''
    this.props.changeOtherParams(otherParams);
  }
  
  updateLimit({target}) {
    let { otherParams } = this.props;
    otherParams.limit = target.value;
    this.props.changeOtherParams(otherParams);
  }
  
  render() {
    return (
      <div>
        <BucketButtons
          buckets={Object.keys(this.props.data)}
          onChange={this.updateBucket}
        />
        
        <div className="panel panel-default">
          <div className="panel-body">
            {this.state.endpoints.map(endpoint => {
              return (
                <EndpointChoices
                  key={endpoint}
                  endpoint={endpoint}
                  chooseEndpoint={this.updateFields} />
              )
            })}
          </div>
        </div>

        {this.state.fields.length > 0 &&
          <EndpointFields
            queryIfEnter={this.queryIfEnter}
            updateQuery={this.updateQuery}
            removeTerm={this.removeTerm}
            clearQuery={this.props.clearQuery}
            fields={this.state.fields} />
        }

        <div className="form-inline">
          <CountField
            fields={this.state.fields}
            toggleExact={this.toggleExact}
            countField={this.props.otherParams.count.value}
            updateCount={this.updateCount}
            clearCount={this.clearCount} />
          <div className="form-group">
            <label className="control-label" htmlFor="limit">Limit</label>
            <input onChange={this.updateLimit}
              defaultValue={this.props.otherParams.limit}
              className="form-control"
              type="text" />
          </div>

        </div>
      </div>
    );
  }
}
