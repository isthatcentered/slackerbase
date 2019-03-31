import React, { useEffect, useState } from "react"
import { db } from "./index"
import { channel } from "./contracts"




function useDocSubscribtion<T>( path: string ): T | undefined
{
	const [ doc, setDoc ] = useState<T>()
	
	useEffect( () =>
		db.doc( path )
			.onSnapshot( doc => {
				setDoc( {
					id: doc.id,
					...doc.data(),
				} as any )
			} ), [ path ] )
	
	return doc as any
}


export function ChannelInfos( { channelId }: { channelId: string } )
{
	const channelInfos: channel | undefined = useDocSubscribtion<channel>( `channels/${channelId}` )
	
	return (
		<div className="ChannelInfo">
			<div className="Topic">
				Topic: <input className="TopicInput"
				              defaultValue={channelInfos && channelInfos.topic}/>
			</div>
			<div className="ChannelName">#{channelId}</div>
		</div>)
}