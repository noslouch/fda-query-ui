import React, { Component } from 'react';
import EndpointRow from './endpoint-row';

let counter = 0;

export default class EndpointFields extends Component {
  constructor(props) {
    super(props)
    this.state = {fieldInputs: []};
    this.removeRow = this.removeRow.bind(this);
    this.addRow = this.addRow.bind(this);
    this.newRow = this.newRow.bind(this);
  }
  
  componentWillMount() {
    this.setState({ fieldInputs: [this.newRow(this.props.fields, counter++)] })
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.fields !== this.props.fields) {
      this.resetRows(nextProps);
    }
  }

  removeRow(id) {
    let { fieldInputs } = this.state
    if (fieldInputs.length === 1) {
      this.props.clearQuery();
      this.resetRows(this.props);
      return;
    }
    this.setState({ fieldInputs: fieldInputs.filter(f => f.props.id !== id) })
    this.props.removeTerm(id)
  }
  
  addRow() {
    let { fieldInputs } = this.state
    let { fields } = this.props
    this.setState({
      fieldInputs: fieldInputs.concat(this.newRow(fields, counter++))
    })
  }
  
  resetRows(props) {
    counter = 0;
    this.setState({ fieldInputs: [this.newRow(props.fields, counter++)] })
  }
  
  newRow(fields, key) {
    return <EndpointRow
            updateQuery={this.props.updateQuery}
            queryIfEnter={this.props.queryIfEnter}
            removeMe={this.removeRow}
            id={key}
            key={key}
            availableFields={fields} />
  }
  render() {
    return (
      <div className="form-horizontal">
        {this.state.fieldInputs}

        <div className="form-group">
          <div className="col-md-12">
            <button onClick={this.addRow} className="btn btn-primary">+ Add New Field</button>
          </div>
        </div>
      </div>
    )
  }
}
