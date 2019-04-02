import { useEffect, useState } from "react"
import { user } from "./contracts"
import { firebase, rtdb } from "./index"
import { Users } from "./Users"




export function useWatchUserAuthStatus()
{
	const [ user, setUser ] = useState<user | null | undefined>( null )
	
	useEffect( () => firebase.auth()
		.onAuthStateChanged( ( fbUser ) => {
			
			if ( !fbUser ) {
				setUser( null )
				return
			}
			
			const { uid, displayName, email, phoneNumber, photoURL, providerId } = fbUser,
			      user: user                                                     = {
				      uid,
				      displayName,
				      email,
				      phoneNumber,
				      photoURL,
				      providerId,
			      } as user
			
			Users.update( user.uid, user )
				.then( () => Users.get( user.uid ) )
				.then( user => {
					watchAndSetOnlineStatus( user! )
					setUser( user )
				} )
				.catch( console.error )
		} ), [] )
	
	return user
}


function watchAndSetOnlineStatus( user: user )
{
	
	rtdb.ref( ".info/connected" )
		.on( "value", snapshot => {
			if ( isDisconnected( snapshot ) ) {
				setFirestoreStatus( "offline" )
				return
			}
			
			setRTDBStatusConnected()
			
			setFirestoreStatus( "online" )
			
			updateRTDBStatusOnDisconnect()
		} )
	
	
	function isDisconnected( snapshot: firebase.database.DataSnapshot | null )
	{
		return !snapshot || snapshot!.val() === false
	}
	
	
	function setRTDBStatusConnected()
	{
		rtdb.ref( `status/${user.uid}` ).set( {
			state:       "online",
			lastChanged: firebase.database.ServerValue.TIMESTAMP,
		} )
	}
	
	
	function updateRTDBStatusOnDisconnect()
	{
		rtdb.ref( `status/${user.uid}` )
			.onDisconnect()
			.set( {
				state:       "offline",
				lastChanged: firebase.database.ServerValue.TIMESTAMP,
			} )
	}
	
	
	function setFirestoreStatus( state: user["status"]["state"] )
	{
		Users.update( user.uid, {
			status: {
				state,
				lastChanged: firebase.firestore.Timestamp.now(),
			},
		} )
		
	}
}