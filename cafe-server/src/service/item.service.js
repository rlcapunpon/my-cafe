export const itemService = {
  add,
  getAll,
  delete: _delete
}

const apiUrl = 'http://localhost:4000'

function add (item, category) {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(item)
  }
  return fetch(`${apiUrl}/${category}/add`, requestOptions).then(handleResponse)
}

function getAll (category) {
  const requestOptions = {
    method: 'GET'
  }
  return fetch(`${apiUrl}/${category}`, requestOptions).then(handleResponse)
}

function _delete (id, category) {
  const requestOptions = {
    method: 'DELETE'
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
