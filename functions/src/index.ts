import * as functions from "firebase-functions"




const admin = require( "firebase-admin" );

admin.initializeApp();

export const db = admin.firestore()

export const onUserStatusChanged = functions.database
	.ref( `status/{userId}` )
	.onUpdate( ( change, context ) => {
		
		const eventStatus = change.after.val() as { status: "online" | "offline", lastChanged: any }
		
		const userDoc = db.doc( `users/${context.params.userId}` )
		
		return change.after.ref.once( "value" ).then( snapshot => {
			const status = snapshot.val()
			if ( status.lastChanged > eventStatus.lastChanged )
				return
			
			eventStatus.lastChanged = new Date( eventStatus.lastChanged )
			
			userDoc.update( { status: eventStatus } )
		} )
	} )


