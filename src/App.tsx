import React from "react";
import { Nav } from "./Nav"
import { Channel } from "./Channel"




export interface channel
{
	id: string
	topic: string
}



function App()
{
	return (
		<div className="App">
			<Nav/>
			<Channel/>
		</div>)
}


export default App;
