import React, { useEffect, useState } from "react"
import { message } from "./ChatInputBox"
import { db } from "./index"




export interface MessagesProps
{
	channel: string
}


function useCollection<T>( path: string ): T[]
{
	const [ docs, setDocs ] = useState<T[]>( [] )
	
	const mapSnapshotToDocuments = ( snapshot: firebase.firestore.QuerySnapshot ): any[] =>
		snapshot.docs
			.map( doc => ({
				id: doc.id,
				...doc.data(),
			}) )
	
	useEffect( () => {
		return db.collection( path )
			.orderBy( "createdAt" as keyof message )
			.onSnapshot( snapshot => setDocs( mapSnapshotToDocuments( snapshot ) ) )
	}, [] )
	
	return docs
}


export function Messages( { channel }: MessagesProps )
{
	const messages: message[] = useCollection<message>( `channels/${channel}/messages` )
	
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
