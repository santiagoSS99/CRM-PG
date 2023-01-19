import { Controller, Get, Res } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {

    constructor(private chatService: ChatService) { }

    // @Get()
    // async getMessages(@Res() res: Response) {
    // const messages = await this.chatService.getMessages();
    // return messages;
    // }
}
