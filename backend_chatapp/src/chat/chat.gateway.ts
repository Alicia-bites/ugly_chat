import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway(8001, {cors:'*'}) // we want every front and client to be able to connect with our gateway
export class ChatGateway {
	@WebSocketServer()
	server;

	// whenever we emit an event from our front end that is called
	@SubscribeMessage('message')
	handleMessage(@MessageBody() message: string): void { // we extract the string from the variable 'message' found in the body of the request
		console.log(message);
		this.server.emit('message', message); // whenever a client sends a message, we want to take this message and send it back to our client. So our clients that are connected to our gateway will receive the message.
	}
}
