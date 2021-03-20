import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';
import { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from "react-router";


// firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name:'',
    email:'',
    photo:'',
    password:'',
    error: '',
    success: false,
  })

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();

  const handleGoogleSignIn = () => {
    firebase.auth().signInWithPopup(googleProvider)
    .then(result => {
      const {displayName, email, photoURL} = result.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
      }
      setUser(signedInUser);
      setLoggedInUser(signedInUser);
      history.replace(from);
    })
    .catch(err => console.log(err.message))
  }

  const handleFbSignIn = () => {
    firebase
    .auth()
    .signInWithPopup(fbProvider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      const {displayName, email, photoURL} = result.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
      }
      setUser(signedInUser);
      setLoggedInUser(signedInUser);
      history.replace(from);
    })
    .catch((error) => console.log(error.message));
  }

  const handleSignOut = () => {
    firebase.auth().signOut()
    .then(() => {
      const signedOUtUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
      }
      setUser(signedOUtUser);
      console.log(signedOUtUser);
    }).catch((error) => {
      // An error happened.
    });
  }

  const handleSubmit = e => {
      if(newUser && user.email && user.password){
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = {...user};
          newUserInfo.success = true;
          newUserInfo.error = '';
          setUser(newUserInfo);
          updateUserName(user.name);
          setLoggedInUser(newUserInfo);
          history.replace(from);
        })
        .catch((error) => {
          const newUser = {...user};
          newUser.success = false;
          newUser.error = error.message;
          setUser(newUser);
        });
      }

      if(!newUser && user.email && user.password){
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = {...user};
          newUserInfo.success = true;
          newUserInfo.error = '';
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
        })
        .catch((error) => {
          const newUser = {...user};
          newUser.success = false;
          newUser.error = error.message;
          setUser(newUser);
          console.log(error.message);
        });
      }
      e.preventDefault();
  }

  const handleBlur = (e) => {
    // console.log(e.target.name, e.target.value)
    let isFiledValid = true;
    if(e.target.name === "email"){
      isFiledValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if(e.target.name === "password"){
      isFiledValid = /^(?=.*\d).{6,}$/.test(e.target.value);
    }
    if(isFiledValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,
    }).then((res)=> {
      console.log("user name successfully added to firebase")
    }).catch((error)=> {
      console.log(error);
    });
  }

  return (
    <div style={{textAlign: 'center'}}>
      {
        user.isSignedIn 
        ? <button onClick={handleSignOut}>Sing out</button>
        : <button onClick={handleGoogleSignIn}>Sing In</button>
      }
      <br/>
      <button onClick={handleFbSignIn}>Sing in using Facebook</button>
      {
        user.isSignedIn && <div>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <img src={user.photo} alt=""/>
        </div>
      }

      {/* <h1>Our Own Authentication</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p> */}
      <h1>Our Own Authentication</h1>
      <form onSubmit={handleSubmit}>
        <input type="checkbox" onChange={()=> setNewUser(!newUser)} name="newUser" id=""/>
        <label htmlFor="newUser">New User Sign up</label>
        <br/>
        {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Your Name"/>}
        <br/>
        <input type="text" name="email" onBlur={handleBlur} placeholder="Your Email" required/>
        <br/>
        <input type="password" name="password" onBlur={handleBlur} placeholder="Your Password" required/>
        <br/>
        <input type="submit" value={newUser ? "Sign up" : "Sign in"}/>
      </form>
      <p style={{color: 'red'}}>{user.error}</p>
      {
        user.success && <p style={{color: 'green'}}>Successfully {newUser ? "Created Account" : "Signed In"}</p>
      }
    </div>
  );
}

export default Login;
