export const itemService = {
  add,
  getAll,
  changeStatus,
  delete: _delete
}

const apiUrl = 'http://localhost:4000'

function add (item) {
  var category = item.relativeCategory
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  }
  console.log('item: ' + JSON.stringify(item))
  console.log('adding: ' + `${apiUrl}/${category}/add`)
  return fetch(`${apiUrl}/${category}/add`, requestOptions).then(handleResponse)
}

function changeStatus (id) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' }
  }

  return fetch(`${apiUrl}/orders/status/${id}`, requestOptions).then(handleResponse)
}

function getAll (category) {
  console.log('Service: getting all under ' + category)
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
  return fetch(`${apiUrl}/${category}`, requestOptions).then(handleResponse)
}

function _delete (id, category) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  }

  return fetch(`${apiUrl}/${category}/${id}`, requestOptions).then(handleResponse)
}

function handleResponse (response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }
    return data
  })
}
