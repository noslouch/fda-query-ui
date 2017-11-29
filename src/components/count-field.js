import React, { Component } from 'react';

export default class CountField extends Component {
  render() {
    return (
      <div className="form-group">
        <label className="control-label" htmlFor="count">Count Field (optional)</label>
        <div className="input-group">
          <span className="input-group-addon">
            <button className="close" onClick={this.props.clearCount}>&times;</button>
          </span>
          <select onChange={this.props.updateCount}
            className="form-control"
            value={this.props.countField}>
            <option disabled value="default">Pick an Optional Field to Count</option>
            {this.props.fields.map(f => {
              return (
                <option
                  key={f.name}
                  value={f.name}>
                  {f.name}
                </option>
            )})}
          </select>
          <span className="input-group-addon">
            <label className="control-label">
              <input
                value={this.props.isExact}
                onChange={this.props.toggleExact}
                type="checkbox"
                aria-label="exact" />
              Exact?
            </label>
          </span>
        </div>
      </div>
    )
  }
}
