import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import io, { Socket } from 'socket.io-client'
import Messageinput from './Messageinput'
import Messages from './Messages'

function App() {
	
	// allows to add state to functionnal component.
	const [socket, setSocket] = useState<Socket>() // useState returns a state and a function to return that state
  
	const [messages, setMessages] = useState<string[]>([])

	// this function will be triggered whenever we hit the "send" button.
	const send = (value: string) => {
		socket?.emit('message', value); // it emits an event called 'message'
	}

	// useEffect runs a function after the component has been rendered
	useEffect( () => {
		// after the component has been rendered, we want to create a new socket
		const newSocket = io("http://localhost:8001")
		setSocket(newSocket)
	}, [setSocket]);

	// this function will be listening for events coming from our NestJs backend.
	// whenever we emit an event called event from our Gateway, this function
	// will be run.
	const messageListener = (message: string) => {
		setMessages([...messages, message]);
	}

	useEffect(() => {
		// if we have a socket, then we want to listen to an event called 'message',
		// and when we receive a event called message, we want to run our messageListener
		socket?.on("message", messageListener)
		// we provide a clean up function that gets rid of the messageListener function
		return () => {
			socket?.off("message", messageListener)
		}
	}, [messageListener])

	return (
		<>
			{""}
			<Messageinput send = {send}/>
			<Messages messages = {messages} />
		</>
	)

}

export default App
