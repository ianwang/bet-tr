import { getDatabaseConnection } from 'libs/firebase'

export const getKey = (name) => `_dd_${name}`

export const CREATE_DREAM = Symbol('CREATE_DREAM')
export function createDream ({ title, deadline, deposite }) {
  return (dispatch) => {
    dispatch({
      type: CREATE_DREAM,
      title,
      deadline,
      deposite
    })
  }
}

export const GET_ALL_DREAMS = Symbol('GET_ALL_DREAMS')
export function getAllDreams () {
  let db = getDatabaseConnection()
  return (dispatch) => {
    db.collection('dreams').get().then((querySnapshot) => {
      dispatch({
        type: GET_ALL_DREAMS,
        dreams: querySnapshot.docs.map(d => d.data())
      })
    })
  }
}

export const GET_DREAM_BETTINGS = Symbol('GET_DREAM_BETTINGS')
export function getDreamBettings ({ dreamId }) {
  let db = getDatabaseConnection()
  return (dispatch) => {
    let ref = db.collection('bettings')
    let query = ref.where('dreamId', '==', dreamId)

    query.onSnapshot((querySnapshot) => {
      dispatch({
        type: GET_DREAM_BETTINGS,
        response: querySnapshot.docs.map(d => d.data())
      })
    })
  }
}

export const BET_ON_DREAM = Symbol('BET_ON_DREAM')
export function betOnDream ({
  userEmail, dreamId, amount, positive
}) {
  let db = getDatabaseConnection()
  return (dispatch) => {
    db.collection('bettings').add({
      dreamId,
      amount,
      createdAt: new Date().getTime() / 1000,
      userEmail,
      positive
    })
  }
}
