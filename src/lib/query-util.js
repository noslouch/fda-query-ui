export function serializeInputs(query) {
  var toString = []

  Object.keys(query).forEach(q => {
    toString.push(`${query[q].field}:"${query[q].value}"`)
    if (query[q].combine) {
      toString.push('AND')
    }
  })

  return toString.join('+').replace(/\s/g, '+')
}

export function serializeOtherParams({count, limit}) {
  var toString = []
  if (limit) {
    toString.push(`limit=${limit}`)
  }

  if (count.value) {
    toString.push(`count=${count.exact ? `${count.value}.exact` : count.value}`)
  }
  return toString.join('&').replace(' ', '+')
}


export function queryUrl(query, endpoint, otherParams) {
  otherParams = serializeOtherParams(otherParams)
  endpoint = endpoint.replace('.', '/');
  let root = 'https://api.fda.gov'
  let search = serializeInputs(query)
  let base = `${root}/${endpoint}.json`

  return `${base}?search=${search}${otherParams ? `&${otherParams}` : ''}`
}
