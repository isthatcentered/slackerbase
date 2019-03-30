import React, { useEffect, useState } from "react"
import { message } from "./ChatInputBox"
import { db } from "./index"
import { mapSnapshotToDocuments } from "./Nav"




export interface MessagesProps
{
	channel: string
}


export function Messages( { channel }: MessagesProps )
{
	const [ messages, setMessages ] = useState<message[]>( [] )
	
	useEffect( () => {
		return db.collection( `channels/${channel}/messages` )
			.onSnapshot( snapshot =>
				setMessages( mapSnapshotToDocuments<message>( snapshot ) ) )
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


function MessageWithAvatar( { message: { body } }: { message: message } )
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


export function MessageWithoutAvatar( { message: { body } }: { message: message } )
{
	
	return (
		<div>
			<div className="Message no-avatar">
				<div className="MessageContent">{body}</div>
			</div>
		</div>)
}
