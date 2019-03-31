import React, { RefObject, useEffect, useRef } from "react"
import { message, user } from "./contracts"
import { useCollectionSubscription } from "./useCollectionSubscription"
import { distanceInWords, format, isSameDay } from "date-fns"
import { useDocWithCache } from "./useDocWithCache"




function useScrollToBottomOnUpdate( ref: RefObject<HTMLElement> )
{
	useEffect( () => {
		const node = ref.current
		if ( node )
			node.scrollTop = node.scrollHeight
	} )
}


export interface MessagesProps
{
	channel: string
}


export function Messages( { channel }: MessagesProps )
{
	const messages: message[] = useCollectionSubscription<message>( `channels/${channel}/messages`, useCollectionSubscription.orderByCollectionFilter( "createdAt" as keyof message ) )
	
	const scrollRef = useRef<HTMLDivElement>( null )
	useScrollToBottomOnUpdate( scrollRef )
	
	return (
		<div ref={scrollRef}
		     className="Messages">
			<div className="EndOfMessages">That's every message!</div>
			<div>
				{messages.map( ( message, index ) => (
					<div key={message.id}>
						{shouldShowDay( message, messages[ index - 1 ] ) && <DayLine date={message.createdAt}/>}
						
						{shouldDisplayAvatar( message, messages[ index - 1 ] ) ?
						 <MessageWithAvatar message={message}/> :
						 <MessageWithoutAvatar message={message}/>}
					</div>) )}
			</div>
		</div>)
}


function DayLine( { date }: { date: firebase.firestore.Timestamp } )
{
	return (
		<div className="Day">
			<div className="DayLine"/>
			<div className="DayText">{distanceInWords( date.toMillis(), Date.now() )} ago</div>
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


function shouldShowDay( message: message, prevMessage: message | undefined ): boolean
{
	if ( !prevMessage )
		return true
	
	return !isSameDay( message.createdAt.toMillis(), prevMessage.createdAt.toMillis() )
}


function shouldDisplayAvatar( message: message, prevMessage: message | undefined ): boolean
{
	if ( !prevMessage )
		return true
	
	const isFromDifferentUser                   = message.user.id !== prevMessage.user.id,
	      sameUserButMoreThan3minutesHavePassed = (message.createdAt.seconds - prevMessage.createdAt.seconds) > 60 * 3
	
	return isFromDifferentUser || sameUserButMoreThan3minutesHavePassed
}
