import React, { useEffect, useState } from "react";
import { Nav } from "./Nav"
import { Channel } from "./Channel"
import { db, firebase } from "./index"




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
	const user = useAuthenticatedWatch()
	
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


function useAuthenticatedWatch()
{
	const [ user, setUser ] = useState<user | null>( null )
	
	useEffect(
		() =>
			firebase.auth().onAuthStateChanged( ( fbUser ) => {
				
				const user: user | null = fbUser ?
				                          {
					                          uid:         fbUser.uid,
					                          displayName: fbUser.displayName,
					                          email:       fbUser.email,
					                          phoneNumber: fbUser.phoneNumber,
					                          photoURL:    fbUser.photoURL,
					                          providerId:  fbUser.providerId,
				                          } :
				                          null
				if ( user )
					db.doc( `user/${user.uid}` )
						.set( user, { merge: true } )
						.catch( console.error )
				
				setUser( user )
			} ),
		[],
	)
	
	return user
}


export default App;
