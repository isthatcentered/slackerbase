import { firebase } from "./index"




export interface message
{
	id: string
	body: string
	createdAt: firebase.firestore.Timestamp
	user: firebase.firestore.DocumentReference
}

export interface channel
{
	id: string
	topic: string
}

export interface user extends firebase.UserInfo
{
	id: string
	joined: {
		[ channel: string ]: boolean
	}
	status: {
		state: "online" | "offline"
		lastChanged: firebase.firestore.Timestamp
	}
}