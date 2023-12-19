import logo from './logo.svg';
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import './App.css';

function App() {

   // VVV below comment prevents lintor from marking google as undefined (it's defined in index.html)
  /*global google*/ 
  const [user, setUser] = useState({}) //temporary, don't use this normally, use context API or Redux

  function handleCallbackResponse(response){
    console.log("Signin Success, Encoded JWT ID token: " + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);

    setUser(userObject);

    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event){
    setUser({}); //set user to empty object, effectively signing out
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(()=> {
    google.accounts.id.initialize({
      client_id: "226902442258-hbu4p3v9q6gkhtnkpdbj8522uo4fr1l1.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large"}
    );

  }, []); //if anything in array is modified, it reloads the page
  
  

  return (
    <div className="App">
      <div id="signInDiv"></div>

      {Object.keys(user).length != 0 && //if user object is not empty, then show signout button
         <button onClick={ (e) => handleSignOut(e)}>Sign Out</button>
      }

      {user &&
        <div>
          <img src={user.picture}></img>
          <h3>{user.name}</h3>
        </div>
      
      }
    </div>
  );
}

export default App;
