import { useEffect, useState } from "react"
import { db } from "./index"




export function useDocSubscribtion<T>( path: string ): T | undefined
{
	const [ doc, setDoc ] = useState<T>()
	
	useEffect( () =>
		db.doc( path )
			.onSnapshot( doc => {
				setDoc( {
					id: doc.id,
					...doc.data(),
				} as any )
			} ), [ path ] )
	
	return doc as any
}