import React, { useEffect } from "react"
import { ChatInputBox } from "./ChatInputBox"
import { Messages } from "./Messages"
import { user } from "./contracts"
import { RouteComponentProps } from "@reach/router"
import { ChannelInfos } from "./ChannelInfos"
import { db } from "./index"




export interface ChannelProps extends RouteComponentProps<{ channelId: string }>
{
	user: user
}


export function Channel( { user, channelId }: ChannelProps )
{
	const _channelId: string = channelId || "general"
	
	useEffect( () => {
		
		db.doc( `users/${user.uid}` )
			.set( {
				joined: {
					[ _channelId ]: true,
				},
			} as user, { merge: true } )
		
	}, [ channelId, user.uid ] )
	
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


