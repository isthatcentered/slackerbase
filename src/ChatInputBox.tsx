import React, { FormEvent } from "react"
import { db } from "./index"




export interface message
{
	body: string
	createdAt: Date
}

export interface ChatInputBoxProps
{

}


export function ChatInputBox( {}: ChatInputBoxProps )
{
	
	function handleSubmit( e: FormEvent<HTMLFormElement> )
	{
		e.preventDefault()
		
		const data    = new FormData( e.target as HTMLFormElement ),
		      message = data.get( "message" ) as string || undefined
		
		
		if ( !message )
			return;
		
		
		(e.target as HTMLFormElement).reset()
		
		const post: message = {
			body:      message,
			createdAt: new Date(),
		}
		
		db.collection( "/channels/general/messages" )
			.add( post )
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