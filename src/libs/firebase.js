import firebase from 'firebase/app'
import 'firebase/firestore'

let _init = false
export function initFirebase () {
  const config = {
    apiKey: 'AIzaSyC4rlTyBjRIB4pr7zaSWgtSuHQUWV1DV1g',
    authDomain: 'dreamer-8249f.firebaseapp.com',
    databaseURL: 'https://dreamer-8249f.firebaseio.com',
    projectId: 'dreamer-8249f',
    storageBucket: 'dreamer-8249f.appspot.com',
    messagingSenderId: '902182608097'
  }
  try {
    _init = true
    return firebase.initializeApp(config)
  } catch (e) {
    return firebase.app(config)
  }
}

export function getDatabaseConnection () {
  if (!_init) {
    initFirebase()
  }

  const db = firebase.firestore()
  db.settings({
    timestampsInSnapshots: true
  })
  if (typeof window !== 'undefined') {
    window.db = db
  }

  return db
}

export function getDreams () {

}
