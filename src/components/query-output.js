import React, { Component } from 'react';

function serializeInputs(query) {
  var toString = []

  Object.keys(query).forEach(q => {
    toString.push(`${query[q].field}:"${query[q].value}"`)
    if (query[q].combine) {
      toString.push('AND')
    }
  })

  return toString.join('+').replace(/\s/g, '+')
}

function serializeOtherParams({count, limit}) {
  var toString = []
  if (limit) {
    toString.push(`limit=${limit}`)
  }

  if (count.value) {
    toString.push(`count=${count.exact ? `${count.value}.exact` : count.value}`)
  }
  return toString.join('&').replace(' ', '+')
}


function queryUrl(query, endpoint, otherParams) {
  otherParams = serializeOtherParams(otherParams)
  endpoint = endpoint.replace('.', '/');
  let root = 'https://api.fda.gov'
  let search = serializeInputs(query)
  let base = `${root}/${endpoint}.json`

  return `${base}?search=${search}${otherParams ? `&${otherParams}` : ''}`
}

export default class QueryOutput extends Component {
  render() {
    return (
      <pre className="pre entry">It will look something like:<br />{queryUrl(this.props.query, this.props.endpoint, this.props.otherParams)}</pre>
    )
  }
}
