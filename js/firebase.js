import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB5ZwOyYeqsPQR3wqTWNaHUGagp2NjHA04",
  authDomain: "project-summer-2026-12de8.firebaseapp.com",
  projectId: "project-summer-2026-12de8",
  storageBucket: "project-summer-2026-12de8.firebasestorage.app",
  messagingSenderId: "88294145095",
  appId: "1:88294145095:web:06736f99276fd1807c8562"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

console.log("Firestore接続成功");

async function testFirestore() {

  try {

    await setDoc(
      doc(db, "users", "test"),
      {
        goal: "Firestore成功"
      }
    );

    console.log("Firestore保存成功");

  } catch (error) {

    console.error("Firestoreエラー", error);

  }

}

testFirestore();

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const loginBtn =
document.getElementById("loginBtn");

console.log(loginBtn);

const userName =
document.getElementById("userName");
const logoutBtn =
document.getElementById("logoutBtn");
const loginScreen =
document.getElementById("loginScreen");

const mainApp =
document.getElementById("mainApp");

loginBtn.addEventListener(
  "click",
  async function(){

    console.log("ログインボタン押された");

    try{

      const result =
      await signInWithPopup(
        auth,
        provider
      );

      userName.textContent =
      result.user.displayName;

    }

    catch(error){

      console.error(error);

    }

  }
);

onAuthStateChanged(auth, (user) => {

  if (user) {

    loginScreen.style.display = "none";
    mainApp.style.display = "block";

    userName.textContent =
      user.displayName;

  } else {

    loginScreen.style.display = "block";
    mainApp.style.display = "none";

  }

});

logoutBtn.addEventListener(
  "click",
  async function(){

    await signOut(auth);

  }
);
