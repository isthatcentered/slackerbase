import React, { useEffect, useState } from "react";
import firebase, { firestore } from "firebase"




firebase.initializeApp( {
	apiKey:            "AIzaSyA6knUASvHehbo1hNQmWTFmG2WlszEROTg",
	authDomain:        "reach-slack.firebaseapp.com",
	databaseURL:       "https://reach-slack.firebaseio.com",
	projectId:         "reach-slack",
	storageBucket:     "reach-slack.appspot.com",
	messagingSenderId: "451211342052",
} );

const db = firestore()

interface Channel
{
	id: string
	topic: string
}


function App()
{
	
	const [ channels, setChannels ] = useState<Channel[]>( [
		{
			id:    "Random",
			topic: "Talking about random stuff",
		},
		{
			id:    "General",
			topic: "I ain't afraid of no ghotsts",
		},
	] )
	
	useEffect( () => {
		db.collection( "channels" ).onSnapshot( console.log )
	} )
	
	return (
		<div className="App">
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
			</div>
			<div className="Channel">
				<div className="ChannelMain">
					<div className="ChannelInfo">
						<div className="Topic">
							Topic: <input className="TopicInput"
							              defaultValue="Awesome stuff"/>
						</div>
						<div className="ChannelName">#general</div>
					</div>
					<div className="Messages">
						<div className="EndOfMessages">That's every message!</div>
						<div>
							<div className="Day">
								<div className="DayLine"/>
								<div className="DayText">12/6/2018</div>
								<div className="DayLine"/>
							</div>
							<div className="Message with-avatar">
								<div className="Avatar"/>
								<div className="Author">
									<div>
										<span className="UserName">Ryan Florence </span>
										<span className="TimeStamp">3:37 PM</span>
									</div>
									<div className="MessageContent">Alright, lets do this.</div>
								</div>
							</div>
						</div>
						<div>
							<div className="Message no-avatar">
								<div className="MessageContent">works now?</div>
							</div>
						</div>
					</div>
					<div className="ChatInputBox">
						<input className="ChatInput"
						       placeholder="Message #general"/>
					</div>
				</div>
				<div className="Members">
					<div>
						<div className="Member">
							<div className="MemberStatus offline"/>
							Ryan Florence
						</div>
						<div className="Member">
							<div className="MemberStatus online"/>
							cleverbot
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}


export default App;
