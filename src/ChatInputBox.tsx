import React, { FormEvent } from "react"
import { db, firebase } from "./index"
import { message, user } from "./contracts"
import { Users } from "./Users"




export interface ChatInputBoxProps
{
	channel: string
	user: user
}


export function ChatInputBox( { channel, user }: ChatInputBoxProps )
{
	
	function handleSubmit( e: FormEvent<HTMLFormElement> )
	{
		e.preventDefault()
		
		const data    = new FormData( e.target as HTMLFormElement ),
		      message = data.get( "message" ) as string || undefined
		
		
		if ( !message )
			return;
		
		
		(e.target as HTMLFormElement).reset()
		
		db.collection( `/channels/${channel}/messages` )
			.add( {
				user:      Users.ref( user.uid ),
				body:      message,
				createdAt: firebase.firestore.Timestamp.now(),
			} as message )
	}
	
	
	return (
		<form onSubmit={handleSubmit}
		      className="ChatInputBox">
			<input
				autoFocus
				name="message"
				className="ChatInput"
				placeholder={`Message #${channel}`}
			/>
		</form>
	)
}