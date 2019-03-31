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
	
	const user = useUser()
	
	return user ?
	       <div className="App">
		       <Nav user={user}/>
		       <Channel/>
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


function useUser()
{
	const [ user, setUser ] = useState<user | null>( null )
	
	useEffect(
		() =>
			firebase.auth().onAuthStateChanged( ( user ) => setUser( user ) ),
		[],
	)
	
	return user
}


export default App;
