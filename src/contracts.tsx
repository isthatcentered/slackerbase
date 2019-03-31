import { firebase } from "./index"




export interface message
{
	id: string
	body: string
	createdAt: Date
	user: firebase.firestore.DocumentReference
}

export interface channel
{
	id: string
	topic: string
}

export interface user extends firebase.UserInfo
{
}