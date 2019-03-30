import React, { useEffect, useState } from "react"
import { message } from "./ChatInputBox"
import { db } from "./index"




export interface MessagesProps
{
	channel: string
}


export function Messages( { channel }: MessagesProps )
{
	const [ messages, setMessages ] = useState<message[]>( [] )
	
	useEffect( () => {
		return db.collection( `channels/${channel}/messages` )
			.onSnapshot( snapshot => {
				
				const messages = snapshot.docs.map( doc => ({
					...doc.data(),
					id: doc.id,
				}) ) as message[]
				console.log( messages )
				setMessages( messages )
			} )
	}, [] )
	
	return (
		<div className="Messages">
			<div className="EndOfMessages">That's every message!</div>
			<div>
				
				<div className="Day">
					<div className="DayLine"/>
					<div className="DayText">12/6/2018</div>
					<div className="DayLine"/>
				</div>
				
				{messages.map( ( m, index ) =>
					index === 0 ?
					<MessageWithAvatar
						key={m.id}
						message={m}
					/> :
					<MessageWithoutAvatar
						key={m.id}
						message={m}
					/> )}
			</div>
		</div>)
}


interface MessageWithAvatarProps
{
	message: message
}


function MessageWithAvatar( { message: { body } }: MessageWithAvatarProps )
{
	
	return (
		<div className="Message with-avatar">
			<div className="Avatar"/>
			
			<div className="Author">
				<div>
					<span className="UserName">Ryan Florence </span>
					<span className="TimeStamp">3:37 PM</span>
				</div>
				
				<div className="MessageContent">{body}</div>
			</div>
		</div>)
}


export interface MessageWithoutAvatarProps
{
	message: message
}


export function MessageWithoutAvatar( { message: { body } }: MessageWithoutAvatarProps )
{
	
	return (
		<div>
			<div className="Message no-avatar">
				<div className="MessageContent">{body}</div>
			</div>
		</div>)
}
