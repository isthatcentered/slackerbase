import React, { HTMLAttributes, useEffect, useState } from "react"
import { db } from "./index"
import { channel } from "./App"




export interface NavProps extends HTMLAttributes<HTMLDivElement>
{

}


export function Nav( {}: NavProps )
{
	
	const [ channels, setChannels ] = useState<channel[]>( [] )
	
	useEffect( () => {
		return db.collection( "channels" )
			.onSnapshot( snapshot =>
				setChannels( mapSnapshotToDocuments<channel>( snapshot ) ) )
	}, [] )
	
	
	return (
		<div className="Nav">
			<div className="User">
				<img
					className="UserImage"
					alt="whatever"
					src="https://placekitten.com/64/64"
				/>
				<div>
					<div>Ryan Peterson Florence</div>
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


export function mapSnapshotToDocuments<T>( snapshot: firebase.firestore.QuerySnapshot ): T[]
{
	return snapshot
		.docs
		.map( doc => ({
			id: doc.id,
			...doc.data(),
		}) as any as T )
}
