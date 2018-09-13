import Router from 'next/router'

export const getKey = (name) => `_dd_${name}`

export const CREATE_USER = Symbol('CREATE_USER')
export function createUser ({ email }) {
  return (dispatch) => {
    dispatch({
      type: CREATE_USER,
      email
    })
    window.localStorage.setItem(
      getKey('email'),
      email
    )
    Router.push('/home')
  }
}

export const CHECK_USER = Symbol('CHECK_USER')
export function checkUser () {
  return (dispatch) => {
    let email = window.localStorage.getItem(
      getKey('email')
    )
    dispatch({
      type: CREATE_USER,
      email
    })
  }
}
