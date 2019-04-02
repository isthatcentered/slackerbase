import { user } from "./contracts"
import { db, firebase } from "./index"




export class Users
{
	
	static update( id: string, data: Partial<user> ): Promise<void>
	{
		return db.doc( `users/${id}` )
			.set( data, { merge: true } )
	}
	
	
	static get( id: string ): Promise<user | undefined>
	{
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
	
	
	static ref( id: string ): firebase.firestore.DocumentReference
	{
		return db.doc( `users/${id}` )
	}
}