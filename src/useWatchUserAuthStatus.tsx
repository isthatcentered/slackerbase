import { useEffect, useState } from "react"
import { user } from "./contracts"
import { firebase } from "./index"
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
				.then( setUser )
				.catch( console.error )
		} ), [] )
	
	return user
}


