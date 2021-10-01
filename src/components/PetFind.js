/* import React, { useState, useEffect } from "react";
import Card from './Card'
import LeftOptions from './LeftOptions';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function PetFind() {

    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [checked, setChecked] = React.useState(true);
   state = {
       animal: "",
   }

  const toggleChecked = () => {
      
    setChecked((prev) => !prev);
  };

    const getToken = async () => {
        const client_id = 'y7V34b8BNdSiCVGOk24WyWGmAqZlkRZhQTY42DNSsnCUYka1zk'
        const client_secret = '1PAZjrnkBx5Mwb7trEVVY9BIibHQjseCxPRZCGwS'


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
        
          const petRes = await fetch("https://api.petfinder.com/v2/animals?type=dog&location=wv&limit=20",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        const petJson = await petRes.json()

        console.log(petJson);
        setAnimals(petJson.animals)
        setLoading(false);

    }

     var animallist = [];
    useEffect(() => {
        getToken();
    }, []);
   
    
    console.log('animals in useState', animals)

    for (var i = 0; i < animals.length; i++) {
        
        animallist.push(
            <div className="cardBody">
                <Card name={animals[i].name} img={animals[i].photos[0]?.full }  description={animals[i].description} />
            </div>
        )

    }

    return (
        <>
            <div>
                <div className="mainContainer">
                    <div className="leftBox">
                        <FormGroup>
                        <FormControlLabel
        control={<Switch checked={checked} onChange={toggleChecked} />}
        label="Dogs"
      />
       <FormControlLabel
        control={<Switch checked={checked} onChange={toggleChecked} />}
        label="Cats"
      />
                            </FormGroup>
                        <LeftOptions />
                    </div>
                    <div className="cardBody ">
                        {loading ? (
                            <div>loading</div>) : (
                            <>
                                {animallist}
                            </>
                        )
                        }


                    </div>
                </div>
            </div>
        </>
    )
};

*/