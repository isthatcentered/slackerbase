import React, { useEffect } from "react"
import { ChatInputBox } from "./ChatInputBox"
import { Messages } from "./Messages"
import { user } from "./contracts"
import { RouteComponentProps } from "@reach/router"
import { ChannelInfos } from "./ChannelInfos"
import { Members } from "./Members"
import { Users } from "./Users"




export interface ChannelProps extends RouteComponentProps<{ channelId: string }>
{
	user: user
}


export function Channel( { user, channelId }: ChannelProps )
{
	const _channel: string = channelId || "general"
	
	useEffect( () => {
		Users.update( user.uid, {
			joined: {
				[ _channel ]: true,
			},
		} )
		
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


