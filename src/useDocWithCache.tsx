import { useEffect, useState } from "react"
import { db } from "./index"




const cache: Map<string, any> = new Map()
const pendingCache: Map<string, Promise<firebase.firestore.DocumentSnapshot>> = new Map()


export function useDocWithCache<T>( path: string ): T
{
	const [ doc, setDoc ] = useState<any | undefined>()
	
	useEffect( () => {
		let mounted = true
		
		if ( alreadyInCache( path ) ) {
			mounted && setDoc( cache.get( path ) )
			return
		}
		
		if ( !alreadyFetching( path ) )
			pendingCache.set( path, db.doc( path ).get() )
		
		
		pendingCache
			.get( path )!
			.then( doc => {
				
				let data = {
					uid: doc.id,
					...doc.data(),
				}
				
				cache.set( path, data )
				
				mounted && setDoc( data )
			} )
		
		
		return () => {
			mounted = false
		}
	}, [ path ] )
	
	return doc as T
	
	
	function alreadyInCache( path: string ): boolean
	{
		return cache.has( path )
	}
	
	
	function alreadyFetching( path: string ): boolean
	{
		return pendingCache.has( path )
	}
}