import React, { HTMLAttributes } from "react"
import { useCollectionSubscription } from "./useCollectionSubscription"
import { channel, user } from "./contracts"
import { firebase } from "./index"
import { Link } from "@reach/router"




export interface NavProps extends HTMLAttributes<HTMLDivElement>
{
	user: user
}


export function Nav( { user }: NavProps )
{
	
	const channels = useCollectionSubscription<channel>( "channels" )
	
	
	function handleLogout()
	{
		firebase.auth().signOut()
	}
	
	
	return (
		<div className="Nav">
			<div className="User">
				<img
					className="UserImage"
					alt="whatever"
					src={user.photoURL || "https://placekitten.com/64/64"}
				/>
				<div>
					<div>{user.displayName}</div>
					<div>
						<button onClick={handleLogout}
						        className="text-button"
						>
							log out
						</button>
					</div>
				</div>
			</div>
			<nav className="ChannelNav">
				{channels.map( ( { id } ) =>
					<Link
						to={`/channels/${id}`}
						key={id}
					>
						# {id}
					</Link> )}
			</nav>
		</div>)
	
	
}



