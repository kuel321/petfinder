import React, { Component } from "react"

import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import config from '../firebaseConfig';
import { useMediaQuery } from "@material-ui/core";

firebase.initializeApp(config);


class Itsatest extends Component {
    state = {
        isSignedIn: false,

    }
    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,

        ],
        callbacks: {
            signInSuccessWithAuthResult: () => false
        }
    }
    


    componentDidMount = () => {
    
 firebase.auth().onAuthStateChanged(user => {
    this.setState({isSignedin: !!user});
   
    if(user){
     const db = firebase.database();
     db.ref('users/' + user.uid + '/likedAnimals').once('value', (snapshot) => {
       
         if (snapshot.val() == null){
            
             db.ref('users/' + user.uid ).set({
                 name: user.displayName,
                 email: user.email,
                 likedAnimals: null,
             })
             this.setState({isSignedIn: !!user})
             
         }
         else {
  
           
             this.setState({isSignedIn: !!user})
       
         }
     })
    }
})

      

        
}


/*
<div>
<div>Signed In!</div>
<button onClick={() => firebase.auth().signOut()}>Sign out!</button>
<h1>Welcome {firebase.auth().currentUser.displayName}</h1>
<img
    alt="profile picture"
    src={firebase.auth().currentUser.photoURL}
/>
</div>
*/



render() {
    return (
        <div className="Aasdf">
            {this.state.isSignedIn ? (
               <></>
            ) : (
                <StyledFirebaseAuth
                    uiConfig={this.uiConfig}
                    firebaseAuth={firebase.auth()}

                />
            )}

        </div>
    )
}
}

export default Itsatest