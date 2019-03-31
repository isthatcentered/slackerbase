import React, { HTMLAttributes } from "react"
import { useCollection } from "./useCollectionHook"
import { channel, user } from "./App"




export interface NavProps extends HTMLAttributes<HTMLDivElement>
{
	user: user
}


export function Nav( { user }: NavProps )
{
	
	const channels = useCollection<channel>( "channels" )
	
	
	return (
		<div className="Nav">
			<div className="User">
				<img
					className="UserImage"
					alt="whatever"
					src={user.photoURL || "https://placekitten.com/64/64"}
				/>
				<div>
					<div>{user.displayName || user.uid}</div>
					<div>
						<button className="text-button">log out</button>
					</div>
				</div>
			</div>
			<nav className="ChannelNav">
				{channels.map( ( { id } ) =>
					<a href={`/channel/${id}`}
					   key={id}>
						# {id}
					</a> )}
			</nav>
		</div>)
	
	
}



