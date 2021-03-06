import { useEffect, useState } from "react"
import { db } from "./index"




type collectionFilter = ( collection: firebase.firestore.CollectionReference ) => firebase.firestore.CollectionReference | firebase.firestore.Query


export function useCollectionSubscription<T>( path: string, filter: collectionFilter = collection => collection ): T[]
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


useCollectionSubscription.orderByCollectionFilter = ( key: string ): collectionFilter => {
	return collection =>
		collection.orderBy( key )
}



