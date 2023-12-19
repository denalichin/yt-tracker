import logo from './logo.svg';
import { useEffect } from 'react';
import './App.css';

function App() {
  /*global google*/ 
  // ^ above comment prevents lintor from marking google as undefined (it's defined in index.html)
  
  function handleCallbackResponse(response){
    console.log("Signin Success, Encoded JWT ID token: " + response.credential);
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
    </div>
  );
}

export default App;
