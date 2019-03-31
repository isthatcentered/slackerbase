import React from "react"
import { ChatInputBox } from "./ChatInputBox"
import { Messages } from "./Messages"
import { user } from "./contracts"
import { RouteComponentProps } from "@reach/router"




export interface ChannelProps extends RouteComponentProps<{ channelId: string }>
{
	user: user
}


export function Channel( { user, channelId }: ChannelProps )
{
	const _channelId: string = channelId || "general"
	
	return (
		<div className="Channel">
			<div className="ChannelMain">
				<ChannelInfos channelId={_channelId}/>
				
				<Messages channel={_channelId}/>
				
				<ChatInputBox channel={_channelId}
				              user={user}/>
			
			</div>
			<div className="Members">
				<div>
					<div className="Member">
						<div className="MemberStatus offline"/>
						Ryan Florence
					</div>
					<div className="Member">
						<div className="MemberStatus online"/>
						cleverbot
					</div>
				</div>
			</div>
		</div>)
}


function ChannelInfos( { channelId }: { channelId: string } )
{
	return (
		<div className="ChannelInfo">
			<div className="Topic">
				Topic: <input className="TopicInput"
				              defaultValue="Awesome stuff"/>
			</div>
			<div className="ChannelName">#{channelId}</div>
		</div>)
}