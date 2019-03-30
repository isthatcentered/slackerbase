import React from "react"
import { ChatInputBox } from "./ChatInputBox"
import { Messages } from "./Messages"




export interface ChannelProps
{

}


export function Channel( {}: ChannelProps )
{
	
	return (
		<div className="Channel">
			<div className="ChannelMain">
				<div className="ChannelInfo">
					<div className="Topic">
						Topic: <input className="TopicInput"
						              defaultValue="Awesome stuff"/>
					</div>
					<div className="ChannelName">#general</div>
				</div>
				
				<Messages channel={"general"}/>
				
				<ChatInputBox/>
			
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