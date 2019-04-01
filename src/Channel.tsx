import React, { useEffect } from "react"
import { ChatInputBox } from "./ChatInputBox"
import { Messages } from "./Messages"
import { user } from "./contracts"
import { RouteComponentProps } from "@reach/router"
import { ChannelInfos } from "./ChannelInfos"
import { db } from "./index"
import { Members } from "./Members"




export interface ChannelProps extends RouteComponentProps<{ channelId: string }>
{
	user: user
}


export function Channel( { user, channelId }: ChannelProps )
{
	const _channel: string = channelId || "general"
	
	useEffect( () => {
		db.doc( `users/${user.uid}` )
			.set( {
				joined: {
					[ _channel ]: true,
				},
			} as user, { merge: true } )
	}, [ channelId, user.uid ] )
	
	return (
		<div className="Channel">
			<div className="ChannelMain">
				<ChannelInfos channelId={_channel}/>
				
				<Messages channel={_channel}/>
				
				<ChatInputBox channel={_channel}
				              user={user}/>
			
			</div>
			
			<Members channel={_channel}/>
		</div>)
}


