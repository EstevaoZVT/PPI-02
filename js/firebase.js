/********************************************** 
* Renomeie este arquivo para firebase.js!
***********************************************/

// Cole as informações do seu RealTime Database do Firebase abaixo:
const firebaseConfig = {
  apiKey: "AIzaSyBqmRmE8Hp2hkJ7Z_-EWa49Pvp0CRF3EYE",
  authDomain: "projeto-nrmotos.firebaseapp.com",
  projectId: "projeto-nrmotos",
  storageBucket: "projeto-nrmotos.appspot.com",
  messagingSenderId: "1094502218941",
  appId: "1:1094502218941:web:afb504a6de07997629cbd4",
  measurementId: "G-2GVVZXBZ00"
};


/*
* Nas regras do Realtime Database, informe:
* {
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
*/

// Inicializando o Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
