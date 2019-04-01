import React from "react"
import { useCollectionSubscription } from "./useCollectionSubscription"




export function Members( { channel }: { channel: string } )
{
	
	const members = useCollectionSubscription( `users`, query => query.where( `joinded.${channel}`, "==", true ) )
	
	console.log( members, `joinded.${channel}` )
	return (
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
		</div>)
}