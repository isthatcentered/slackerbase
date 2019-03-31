import React, { useEffect, useState } from "react";
import { Nav } from "./Nav"
import { Channel } from "./Channel"
import { firebase } from "./index"




export interface channel
{
	id: string
	topic: string
}



export interface user extends firebase.UserInfo
{
}


function App()
{
	const [ user, setUser ] = useState<user | null>( null )
	
	useEffect(
		() =>
			firebase.auth().onAuthStateChanged( ( user ) => setUser( user ) ),
		[],
	)
	
	
	function handleSignIn()
	{
		firebase.auth()
			.signInWithPopup( new firebase.auth.GoogleAuthProvider() )
			.then( console.log )
	}
	
	
	return user ?
	       (<div className="App">
		       <Nav user={user}/>
		       <Channel/>
	       </div>) :
	       (<div className="Login">
		       <h1>Chat!</h1>
		       <button onClick={handleSignIn}>Sign in with Google</button>
	       </div>)
}


export default App;
