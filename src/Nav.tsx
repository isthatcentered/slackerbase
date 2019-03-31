import React, { HTMLAttributes } from "react"
import { useCollection } from "./hooks"
import { channel} from "./contracts"
import { firebase } from "./index"
import { user } from "./contracts"




export interface NavProps extends HTMLAttributes<HTMLDivElement>
{
	user: user
}


export function Nav( { user }: NavProps )
{
	
	const channels = useCollection<channel>( "channels" )
	
	
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
					<a href={`/channel/${id}`}
					   key={id}>
						# {id}
					</a> )}
			</nav>
		</div>)
	
	
}



