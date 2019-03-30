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


export interface ChannelProps
{

}


export function Channel( {}: ChannelProps )
{
	
	return (
		<div className="Channel">
			<div className="ChannelMain">
				<div className="ChannelInfo">
					<div className="Topic">
						Topic: <input className="TopicInput"
						              defaultValue="Awesome stuff"/>
					</div>
					<div className="ChannelName">#general</div>
				</div>
				<div className="Messages">
					<div className="EndOfMessages">That's every message!</div>
					<div>
						<div className="Day">
							<div className="DayLine"/>
							<div className="DayText">12/6/2018</div>
							<div className="DayLine"/>
						</div>
						<div className="Message with-avatar">
							<div className="Avatar"/>
							<div className="Author">
								<div>
									<span className="UserName">Ryan Florence </span>
									<span className="TimeStamp">3:37 PM</span>
								</div>
								<div className="MessageContent">Alright, lets do this.</div>
							</div>
						</div>
					</div>
					<div>
						<div className="Message no-avatar">
							<div className="MessageContent">works now?</div>
						</div>
					</div>
				</div>
				<ChatInputBox/>
			
			</div>
			<div className="Members">
				<div>
					<div className="Member">
						<div className="MemberStatus offline"/>
						Ryan Florence
					</div>
					<div className="Member">
						<div className="MemberStatus online"/>
						cleverbot
					</div>
				</div>
			</div>
		</div>)
}