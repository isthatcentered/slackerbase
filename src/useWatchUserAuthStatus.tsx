import { useEffect, useState } from "react"
import { user } from "./contracts"
import { db, firebase } from "./index"




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
			
			useWatchUserAuthStatus.updateUser( user.uid, user )
				.then( () => useWatchUserAuthStatus.getUserById( user.uid ) )
				.then( setUser )
				.catch( console.error )
		} ), [] )
	
	return user
}


useWatchUserAuthStatus.updateUser = ( id: string, data: Partial<user> ): Promise<void> => {
	return db.doc( `users/${id}` )
		.set( data, { merge: true } )
}

useWatchUserAuthStatus.getUserById = ( id: string ): Promise<user | undefined> => {
	return db.doc( `users/${id}` )
		.get()
		.then( doc =>
			doc.exists ?
			{
				id: doc.id,
				...doc.data(),
			} as user :
			undefined )
}