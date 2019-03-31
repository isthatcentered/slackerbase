import React from "react"
import { message, user } from "./contracts"
import { useCollection, useDocWithCache } from "./hooks"
import { format } from "date-fns"




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
					shouldDisplayAvatar( m, messages[ index - 1 ] ) ?
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
	
	
	function shouldDisplayAvatar( message: message, prevMessage: message | undefined ): boolean
	{
		if ( !prevMessage )
			return true
		
		const isFromDifferentUser                   = message.user.id !== prevMessage.user.id,
		      sameUserButMoreThan3minutesHavePassed = (message.createdAt.seconds - prevMessage.createdAt.seconds) > 60 * 3
		
		return isFromDifferentUser || sameUserButMoreThan3minutesHavePassed
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
	const author: user = useDocWithCache<user>( message.user.path )
	
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
					{" "}
					<span className="TimeStamp">{format( message.createdAt.toMillis(), "h:mm A" )}</span>
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
