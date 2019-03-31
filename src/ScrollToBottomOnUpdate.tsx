import React, { HTMLAttributes, useEffect, useRef } from "react"




export function ScrollToBottomOnUpdate( props: HTMLAttributes<HTMLDivElement> )
{
	const wrapperRef       = useRef<HTMLDivElement>( null ),
	      acceptAutoScroll = useRef<boolean>( true )
	
	useEffect( () => {
		const wrapper = wrapperRef.current
		
		if ( acceptAutoScroll.current && wrapper ) {
			wrapper.scrollTop = wrapper.scrollHeight
		}
	} )
	
	
	function handleScroll( e: React.UIEvent<HTMLDivElement> )
	{
		const wrapper = wrapperRef.current
		
		if ( wrapper ) {
			const { scrollTop, scrollHeight, clientHeight } = wrapper,
			      atBottom: boolean                         = scrollHeight === clientHeight + scrollTop
			
			acceptAutoScroll.current = atBottom
		}
	}
	
	
	return <div{...props} ref={wrapperRef}
	           onScroll={handleScroll}/>
}