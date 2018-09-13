import Router from 'next/router'
import { getDatabaseConnection } from 'libs/firebase'
import sha256 from 'crypto-js/sha256'
import hmacSHA512 from 'crypto-js/hmac-sha512'
import Base64 from 'crypto-js/enc-base64'

export const getKey = (name) => `_dd_${name}`

export const CREATE_USER = Symbol('CREATE_USER')
export function createUser ({ email }) {
  let db = getDatabaseConnection()
  return (dispatch) => {
    let nouce = Math.random().toString(32).slice(2, 9)
    const hashDigest = sha256(nouce + email)
    const hmacDigest = Base64.stringify(hmacSHA512(hashDigest, ''))

    db.collection('users').add({
      email,
      key: hmacDigest,
      createdAt: new Date().getTime() / 1000
    }).then(() => {
      console.warn(`This is your key, you will need to use it to sign in: ${hashDigest}`)
      dispatch({
        type: CREATE_USER,
        email
      })
      window.localStorage.setItem(
        getKey('email'),
        email
      )
      Router.push('/home')
    })
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
