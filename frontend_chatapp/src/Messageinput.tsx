import React, { useState } from "react";

export default function MessageInput({ send }: { 
	send: (val: string) => void
}) {
	// this value will be modified whenever the onChange event is triggered
	const [value, setValue] = useState("")
	return (
		<>
			<input 
				// whenever the onChange event is triggered,
				// we want to change the state (update the value)
				onChange = {(e) => setValue(e.target.value)}
				placeholder = "Type your message..." 
				value = {value} />
			<button onClick={() => send(value)}>Send your message !</button>
		</>
	)
}