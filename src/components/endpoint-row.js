import React, { Component } from 'react';

export default class EndpointRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldName: props.availableFields[0].name,
      value: '',
      notSearch: false
    }
    this.onSelectField = this.onSelectField.bind(this);
    this.onSelectFieldType = this.onSelectFieldType.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onToggleCombine = this.onToggleCombine.bind(this);
    this.onToggleGroup = this.onToggleGroup.bind(this);
    this.removeField = this.removeField.bind(this);
  }
  onSelectField({target}) {
    this.setState({fieldName: target.value})
  }
  onSelectFieldType({target}) {
    this.setState({
      fieldType: target.value,
      notSearch: target.value !== 'search'
    })
  }
  onChangeValue({target}) {
    this.setState({ value: target.value })
  }
  onToggleCombine() {
    let { combine } = this.state
    this.setState({ combine: !combine })
  }
  onToggleGroup({target}) {
    let { checked } = target
    let { value, fieldName } = this.state
    if (checked) {
      value = `${value})`
      fieldName = `(${fieldName}`
    } else {
      let valueMatch = value.match(/(.*)\)/)
      value = valueMatch ? valueMatch[1] : value
      let fieldMatch = fieldName.match(/\((.*)/)
      fieldName = fieldMatch ? fieldMatch[1] : fieldName
    }
    this.setState({ value, fieldName })
  }
  removeField() {
    this.props.removeMe(this.props.id)
  }
  componentDidUpdate() {
    let { state } = this
    let query = {
      combine: state.combine,
    }
    if (state.notSearch) {
      query.field = state.fieldType
      query.value = state.fieldName.match(/\(?(.*)/)[1]
    } else {
      query.field = state.fieldName
      query.value = state.value
    }
    this.props.updateQuery(query, this.props.id)
  }
  render() {
    return (
      <div className="form-group">
        <label className="col-md-2" aria-label="Choose a field">
          <select
            onChange={this.onSelectField}
            className="form-control">
            {this.props.availableFields.map(f => <option value={f.name} key={f.name}>{f.name}</option>)}
          </select>
        </label>

        <div className="col-md-2">
          <select
            onChange={this.onSelectFieldType}
            className="form-control">
            <option value="search">Search Term</option>
            <option value="_missing_">No value for this field?</option>
            <option value="_exists_">Any value for this field?</option>
          </select>
        </div>

        <div className="col-md-3">
          <input
            className="form-control"
            type={this.state.fieldType}
            disabled={this.state.notSearch}
            onKeyPress={this.props.queryIfEnter}
            onChange={this.onChangeValue} />
        </div>

        <div className="col-md-4">
          <label className="control-label">
            "OR" these terms?
            <input
              disabled={this.state.notSearch}
              onChange={this.onToggleGroup}
              type="checkbox" />
          </label>

          <label className="control-label">
            "AND" with the next?
            <input
              disabled={this.state.notSearch}
              onChange={this.onToggleCombine}
              type="checkbox" />
          </label>

        </div>

        <div className="col-md-1">
          <button
            onClick={this.removeField}
            className="btn btn-block btn-danger">X</button>
        </div>
      </div>
    )
  }
}
