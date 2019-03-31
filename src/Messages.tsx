import React from "react"
import { message, user } from "./contracts"
import { useCollection, useDoc } from "./hooks"




export interface MessagesProps
{
	channel: string
}


export function Messages( { channel }: MessagesProps )
{
	const messages: message[] = useCollection<message>( `channels/${channel}/messages`, useCollection.orderByCollectionFilter( "createdAt" as keyof message ) )
	
	return (
		<div className="Messages">
			<div className="EndOfMessages">That's every message!</div>
			<div>
				
				<DayLine/>
				
				{messages.map( ( m, index ) =>
					!isFromSameUser( m, messages[ index - 1 ] ) ?
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
	
	
	function isFromSameUser( message: message, prevMessage: message | undefined ): boolean
	{
		return !!prevMessage && message.user.id === prevMessage.user.id
	}
}



function DayLine()
{
	return (
		<div className="Day">
			<div className="DayLine"/>
			<div className="DayText">12/6/2018</div>
			<div className="DayLine"/>
		</div>)
}


function MessageWithAvatar( { message }: { message: message } )
{
	const author: user = useDoc<user>( message.user.path )
	
	return (
		<div className="Message with-avatar">
			<div className="Avatar"
			     style={{
				     backgroundImage: author && author.photoURL ?
				                      `url(${author.photoURL})` :
				                      "",
			     }}/>
			<div className="Author">
				{author &&
				<div>
					<span className="UserName">{author.displayName || author.email}</span>
					<span className="TimeStamp">3:37 PM</span>
				</div>}
				
				<div className="MessageContent">{message.body}</div>
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
