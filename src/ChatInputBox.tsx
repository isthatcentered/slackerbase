import React, { FormEvent } from "react"
import { db } from "./index"
import { message } from "./contracts"




export interface ChatInputBoxProps
{
	channel: string
}


export function ChatInputBox( { channel }: ChatInputBoxProps )
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
				body:      message,
				createdAt: new Date(),
			} as message )
	}
	
	
	return (
		<form onSubmit={handleSubmit}
		      className="ChatInputBox">
			<input
				name="message"
				className="ChatInput"
				placeholder="Message #general"
			/>
		</form>
	)
}