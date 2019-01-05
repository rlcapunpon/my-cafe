import {ADD_ITEM, REMOVE_ITEM, GET_ITEMS, REMOVE_ALL} from './ActionTypes'

export function addItem(item) {
  return { type: ADD_ITEM, payload: item }
}

export function removeItem(item) {
  return { type: REMOVE_ITEM, payload: item }
}

export function getAll() {
  return { type: GET_ITEMS, payload: {} }
}

export function deleteAll() {
  return { type: REMOVE_ALL, payload: {} }
}