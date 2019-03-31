import React, { FormEvent } from "react"
import { db } from "./index"
import { message, user } from "./contracts"




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
				user:      db.doc( `users/${user.uid}` ),
				body:      message,
				createdAt: new Date(),
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