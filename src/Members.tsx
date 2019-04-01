import React from "react"
import { useCollectionSubscription } from "./useCollectionSubscription"
import { user } from "./contracts"




export function Members( { channel }: { channel: string } )
{
	
	const members = useCollectionSubscription<user>( `users`, query =>
		query.where( `joined.${channel}`, "==", true ) )
		.sort( orderUsersAlphabetically )
	
	return (
		<div className="Members">
			<div>
				{members.map( user =>
					<Member key={user.id}
					        user={user}
					/> )}
			</div>
		</div>)
}


function Member( { user }: { user: user } )
{
	return (
		<div className="Member">
			<div className="MemberStatus offline"/>
			{user.displayName || user.email}
		</div>)
}


function orderUsersAlphabetically( a: user, b: user ): number
{
	return a.displayName! > b.displayName! ?
	       1 :
	       a.displayName! < b.displayName! ?
	       -1 :
	       0
}
