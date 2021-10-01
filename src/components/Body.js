import React, { Component, useState } from 'react'
import Card from './Card'
import LeftOptions from './LeftOptions';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CardMore from './CardMore';
import Login from './Login';
import firebase from "firebase/app";
import Navbar from './Navbar';
import Loading from '../media/Loading'
import CardLiked from './CardLiked';
import { Alert } from '@mui/material';

export class Body extends Component {
    state = {
        loading: true,
        animals: null,
        checkedDog: true,
        checkedFemale: true,
        checkedCat: true,
        checkedLike: false,
        checkedMale: true,
        disabledDog: false,
        disabledCat: false,
        disabledFemale: false,
        disabledMale: false,
        type: '',
        gender: '',
       mainUrl: "https://api.petfinder.com/v2/animals?location=wv&limit=20",
        animalList: null,
        loadingAnimals: true,
        outline: "outlined",
        errorfield: '',
        value: null,
        errortext: null,
        distance: null,
        locationState: 'wv',
        miles: null,
        buttonvalue1: 10,
        buttonvalue2: 30,
        buttonvalue3: 50,
        buttonvalue4: 100,
        limit: 20,
        likedPets: null,
        userData: null,
        likedAnimals: null,
        finalPets: null,
        liked: false,
        keys: null,
    }
    onChange = event => {
        this.setState({ locationState: event.target.value });
     
      };


    
    
   changeItDog = () => {
    if(this.state.checkedDog == true){
       this.setState({
           type: "type=cat",
           checkedDog:  false,
           disabledCat: true,
       })

       this.fetchApi();
    }
    else {
        this.setState({
            type: '',
            checkedDog: true,
            disabledCat: false,
        })
        this.fetchApi();
    }
   }
   toggleCheckedCat = () => {
    if(this.state.checkedCat == true){
       this.setState({
           type: 'type=dog',
           checkedCat:  false,
           disabledDog: true,
       })

       this.fetchApi();
      
    }
    else {
        this.setState({
            type: "",
            checkedCat: true,
            disabledDog: false,
        })
        this.fetchApi();
       
    }
   }
   toggleCheckedMale = () => {
    if(this.state.checkedMale == true){
       this.setState({
           type: "gender=female",
           checkedMale:  false,
           disabledFemale: true,
       })

       this.fetchApi();
    }
    else {
        this.setState({
            type: '',
            checkedMale: true,
            disabledFemale: false,
        })
        this.fetchApi();
    }
   }
   toggleCheckedFemale = () => {
    if(this.state.checkedFemale == true){
       this.setState({
           type: "gender=male",
           checkedFemale:  false,
           disabledMale: true,
       })

       this.fetchApi();
    }
    else {
        this.setState({
            type: '',
            checkedFemale: true,
            disabledMale: false,
        })
        this.fetchApi();
    }
   }
   toggleCheckedLiked = () => {
       this.setState({
           checkedDog: false,

           checkedCat: false,
           checkedLiked: true,
       })
   }
   buttonclick1 = () => {
       this.setState({
           distance: "distance=",
           miles: this.state.buttonvalue1
       })
       this.fetchApi();
   }
   buttonclick2 = () => {
    this.setState({
        distance: "distance=",
        miles: this.state.buttonvalue2
    })
    this.fetchApi();
}
buttonclick3 = () => {
    this.setState({
        distance: "distance=",
        miles: this.state.buttonvalue3
    })
    this.fetchApi();
}
buttonclick4 = () => {
    this.setState({
        distance: "distance=",
        miles: this.state.buttonvalue4
    })
    this.fetchApi();
}
   seeMore = () => {
           this.setState({
               limit: this.state.limit+20
           })
           this.fetchApi();
           
   }
  addToFavorites = (i) => {
     const  db = firebase.database();
     const user = firebase.auth().currentUser
     //const ref = db.ref('users/' + user.uid + '/likedAnimals');
     // this.setState({
       //   likedPets: this.state.animals[0].name,
     // })
       if(user == null){
        window.scrollTo({top:0,behavior:'smooth'});
       }
       else {
       db.ref('users/' + user.uid + '/likedAnimals').push(this.state.animals[i].id);
      
      
       }
      //db.ref('users/' + user.uid +'/likedAnimals') 
      
     /*  
    firebase.auth().onAuthStateChanged(user => {
       
        if(user){
        this.setState({
            userPerson: user,
            likedPets: this.state.animals[1].name
        })
        const db = firebase.database();
        const ref = db.ref('users/' + user.uid + '/likedAnimals');
        const oldData = [];
        
        // Attach an asynchronous callback to read the data at our posts reference
    
        firebase.database().ref('users/' + user.uid + '/likedAnimals').set(oldData.map);
        console.log(user.uid);
        /* 
        
    }
    else{
        console.log("no user");
    }
    })
    */
   }
   
  
  getLikedData = () => { 
      const user = firebase.auth().currentUser
    firebase.database().ref('users/' + user.uid + '/likedAnimals').on('value', (snapshot) => {
        //console.log(snapshot.val());
       
        
        
  });
   var query = firebase.database().ref('users/' + user.uid + '/likedAnimals').orderByKey();
   var thisList = [];
   var keyData = [];
   query.once("value").then(function(snapshot) {
       snapshot.forEach(function(childSnapshot) {
           var key = childSnapshot.key;
           var childData = childSnapshot.val();
           

           keyData.push(key);
           thisList.push(childData);      
       })
    
   })
   this.setState({ likedPets: thisList, keys: keyData});
   this.fetchLiked();
   };



   handleFavorite = () => {
       if (firebase.auth().currentUser == null){
           alert("Please Sign in to see liked pets!");
           
       }
       else {
        this.setState({loadingAnimals: true});
        
        this.getLikedData();

        

       }
      
     // this.fetchLiked();
   }
  

///////////// FETCH LIKED PET



  async fetchLiked () {
      
    const client_id = 'y7V34b8BNdSiCVGOk24WyWGmAqZlkRZhQTY42DNSsnCUYka1zk'
    const client_secret = '1PAZjrnkBx5Mwb7trEVVY9BIibHQjseCxPRZCGwS'
    
    //var url = 'https://api.petfinder.com/v2/animals?'+this.state.type+this.state.gender+'&location=wv&limit='+this.state.limit

    // FIRST FETCH CALL
    const res = await fetch("https://api.petfinder.com/v2/oauth2/token", {
        body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
    })
    const json = await res.json()
    const token = json.access_token
    

    // SECOND FETCH CALL

    
    const petRes = await fetch('https://api.petfinder.com/v2/animals/53016325',
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    const petJson = await petRes.json()
      
  
  
 /* this.setState({
    likedAnimals: petJson.animal
  })
  */
  var pushedPets = [];
  for (var i = 0; i < this.state.likedPets.length; i++) {
    const petRes = await fetch('https://api.petfinder.com/v2/animals/'+this.state.likedPets[i],
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
const petJson = await petRes.json();
pushedPets.push(petJson.animal);
    

  }



this.setState({
    likedAnimals: pushedPets
})
var finalpushedPets = [];

for (var i = 0; i <this.state.likedPets.length; i++){
    finalpushedPets.push(
        <div className="cardBody">
            <CardLiked name={pushedPets[i]?.name ?? "Pet not listed"} img={pushedPets[i]?.photos[0]?.full ?? "https://demofree.sirv.com/nope-not-here.jpg" }  description={pushedPets[i]?.description ?? "Pet no longer listed"} delete={this.handleDelete.bind(null, i) ?? alert("Cannot Delete")}/>
        </div>
    )
}
this.setState({
    finalPets: finalpushedPets,
    liked: true,
    loadingAnimals: false
})
      }
      
      handleHome = () => {
          this.setState({liked:false});
      }

     handleDelete = (i) => {
    
    const user = firebase.auth().currentUser
    firebase.database().ref('users/' + user.uid + '/likedAnimals/' + this.state.keys[i]).remove();
    this.getLikedData();
     }
///////////////////// FETCH MAIN


  async fetchApi (){
      
    const client_id = 'y7V34b8BNdSiCVGOk24WyWGmAqZlkRZhQTY42DNSsnCUYka1zk'
    const client_secret = '1PAZjrnkBx5Mwb7trEVVY9BIibHQjseCxPRZCGwS'
    
    var url = 'https://api.petfinder.com/v2/animals?'+this.state.type+this.state.gender+'&location=wv&limit='+this.state.limit
    // FIRST FETCH CALL
    const res = await fetch("https://api.petfinder.com/v2/oauth2/token", {
        body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
    })
    const json = await res.json()
    const token = json.access_token


    // SECOND FETCH CALL
   
    const petRes = await fetch('https://api.petfinder.com/v2/animals?'+this.state.type+this.state.gender+'&location='+this.state.locationState+'&'+this.state.distance+this.state.miles+'&limit='+this.state.limit,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    const petJson = await petRes.json()


    
    this.setState({

        animals: petJson.animals,
        loadingAnimals: false,
        loading: false,

    })
    
    var animallist = [];
   
    
    
    for (var i = 0; i < this.state.animals.length; i++) {
    
        animallist.push(
            <div className="cardBody">
                <Card name={this.state.animals[i].name} img={this.state.animals[i].photos[0]?.full ?? "https://demofree.sirv.com/nope-not-here.jpg" }  link={this.state.animals[i].url}description={this.state.animals[i].description} like={this.addToFavorites.bind(null, i)}/>
            </div>
        )

    }
    this.setState({
        loadingAnimals: false,
        animalList: animallist,
    })
  
   

}

    async componentDidMount() {
      await this.fetchApi();
      //await this.getLikedData();
      
    }
    

   
    render() {
        if (this.state.loading) {
            return <div className="loading"><Loading /></div>;
        }
        return (
            <div>
                <Navbar favorite={this.handleFavorite} home={this.handleHome} />
                
                <div className="mainContainer">
                   
                    <div className="leftBox">
                       
                      { this.state.liked ? (<></>) : (  <LeftOptions checkedDog={this.state.checkedDog} toggleCheckedDog={this.changeItDog} checkedCat={this.state.checkedCat} toggleCheckedCat={this.toggleCheckedCat}
                                     checkedMale={this.state.checkedMale}  toggleCheckedMale={this.toggleCheckedMale} checkedFemale={this.state.checkedFemale} toggleCheckedFemale={this.toggleCheckedFemale}
                                     disabledDog={this.state.disabledDog} disabledFemale={this.state.disabledFemale} disabledMale={this.state.disabledMale} disabledCat={this.state.disabledCat}
                                     errorfield={this.state.errorfield} outline={this.state.outline}
                                     buttonvalue1={this.state.buttonvalue1} buttonclick1={this.buttonclick1}
                                     buttonvalue2={this.state.buttonvalue2} buttonclick1={this.buttonclick2}
                                     buttonvalue3={this.state.buttonvalue3} buttonclick1={this.buttonclick3}
                                     checkedLiked={this.state.checkedLiked} toggleLiked={this.toggleCheckedLiked}
                                     buttonvalue4={this.state.buttonvalue4} buttonclick1={this.buttonclick4}
                                     value={this.state.value} handleChange={this.onChange} errortext={this.state.errortext}
                         /> ) }
                         {this.state.value}
                    </div>
                    <div className="cardBody ">
                        {this.state.loadingAnimals ? (
                            <div className="loading"><Loading /></div>) : (
                            <>
                              {
                                  this.state.liked ? (<>{this.state.finalPets}</>) : (<>{this.state.animalList}</>)
                              }
                            
                             {!this.state.liked ? (<CardMore className="cardBodyMore" seeMore={this.seeMore}  />) : (<></>) } 
                            </>
                        )
                        }


                    </div>
                </div>
            </div>
        )
    }
}



export default Body;