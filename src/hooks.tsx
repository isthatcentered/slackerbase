import { useEffect, useState } from "react"
import { db } from "./index"




type collectionFilter = ( collection: firebase.firestore.CollectionReference ) => firebase.firestore.CollectionReference | firebase.firestore.Query


export function useCollection<T>( path: string, filter: collectionFilter = collection => collection ): T[]
{
	const [ docs, setDocs ] = useState<T[]>( [] )
	
	useEffect( () => {
		const collection = db.collection( path )
		
		return filter( collection )
			.onSnapshot( snapshot => setDocs( mapSnapshotToDocuments( snapshot ) ) )
	}, [ path ] )
	
	return docs
	
	
	function mapSnapshotToDocuments( snapshot: firebase.firestore.QuerySnapshot ): any[]
	{
		return snapshot.docs
			.map( doc => ({
				id: doc.id,
				...doc.data(),
			}) )
	}
}


useCollection.orderByCollectionFilter = ( key: string ): collectionFilter => {
	return collection =>
		collection.orderBy( key )
}



const cache: Map<string, any> = new Map()
const pendingCache: Map<string, Promise<firebase.firestore.DocumentSnapshot>> = new Map()


export function useDoc<T>( path: string ): T
{
	const [ doc, setDoc ] = useState<any | undefined>()
	
	useEffect( () => {
		let mounted = true
		
		if ( cache.has( path ) ) {
			mounted && setDoc( cache.get( path ) )
			return // We already have the data you asked for in memory
		}
		
		if ( !pendingCache.has( path ) )
			pendingCache.set( path, db.doc( path ).get() )
		
		pendingCache.get( path )!
			.then( doc => {
				
				let data = {
					uid: doc.id,
					...doc.data(),
				}
				
				cache.set( path, data )
				console.log( cache )
				
				mounted && setDoc( data )
			} )
		
		return () => {
			mounted = false
		}
	}, [ path ] )
	
	return doc as T
}