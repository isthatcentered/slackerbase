import React, { useState } from "react";
import { Nav } from "./Nav"
import { Channel } from "./Channel"
import { firebase } from "./index"




export interface channel
{
	id: string
	topic: string
}



function App()
{
	const [ user, setUser ] = useState<object | undefined>( undefined )
	
	
	function handleSignIn()
	{
		firebase.auth()
			.signInWithPopup( new firebase.auth.GoogleAuthProvider() )
			.then( setUser )
			.then( console.log )
	}
	
	
	return user ?
	       (<div className="App">
		       <Nav/>
		       <Channel/>
	       </div>) :
	       (<div className="Login">
		       <h1>Chat!</h1>
		       <button onClick={handleSignIn}>Sign in with Google</button>
	       </div>)
}


export default App;
