import React from 'react'
import PropTypes from 'prop-types'
​
const Item = ({ item }) => (
  <li>
    {item.name}
  </li>
)
​
Todo.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  optionName: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
}
​
export default Todo