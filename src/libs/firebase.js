import firebase from 'firebase/app'
import 'firebase/firestore'

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
    let app = firebase.initializeApp(config)
    window.db = getDatabaseConnection()
    return app
  } catch (e) {
    let app = firebase.app()
    window.db = getDatabaseConnection()
    return app
  }
}

export function getDatabaseConnection () {
  const db = firebase.firestore()
  db.settings({
    timestampsInSnapshots: true
  })
  return db
}

export function getDreams () {

}
