import React from "react"
import { channel } from "./contracts"
import { useDocSubscribtion } from "./useDocSubscription"




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