import {db} from '@/services/firebase';
import {collection, getDocs,doc, setDoc  } from 'firebase/firestore'
import { useState } from 'react';
 
 const userpage =(props) => {
    console.log("Props",props.jsonData)
    
    
        return (
            <div>
                <h1>hello page </h1>
            </div>
        )
    }






  export const getServerSideProps = async () => {
   
        const querySnapshot = await getDocs(collection(db, "users"));
        const data = []
        querySnapshot.forEach((docs) => {
          data.push({id:docs.id, ...docs.data()})
          
        });
        const jsonData = JSON.stringify(data)
    return {
        props:{
            jsonData,

        }
        
    }
  }

    export default userpage