import React, { useState } from "react";
import { Nav } from "./Nav"
import { Channel } from "./Channel"
import { firebase } from "./index"
import { Redirect, Router } from "@reach/router"
import { useWatchUserAuthStatus } from "./useWatchUserAuthStatus"




function App()
{
	const user = useWatchUserAuthStatus()
	
	return user ?
	       <div className="App">
		       <Nav user={user}/>
		       <Router>
			       <Channel
				       user={user}
				       path="channels/:channelId"
			       />
			
			       <Redirect
				       from="/"
				       to="channels/general"
				       noThrow={true}
			       />
		       </Router>
	       </div> :
	       <Login/>
}


function Login()
{
	const [ error, setError ] = useState<string | undefined>( undefined )
	
	
	function handleSignIn()
	{
		firebase.auth()
			.signInWithPopup( new firebase.auth.GoogleAuthProvider() )
			.then( console.log )
			.catch( err => setError( err.message ) )
	}
	
	
	return (
		<div className="Login">
			
			{error && <p>💩 happenned, "{error}"</p>}
			
			<h1>Chat!</h1>
			<button onClick={handleSignIn}>Sign in with Google</button>
		</div>
	)
}


export default App;
