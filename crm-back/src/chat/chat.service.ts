import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/chat.entity';

@Injectable()
export class ChatService {
    constructor(
        // @InjectRepository(Message)
        // private readonly messageRepository: Repository<Message>,
    ) { }


    // async getMessages(): Promise<Message[]> {
    // return await this.messageRepository.find()
    // }
    //   async getMessages(): Promise<Message[]> {
    //     return await this.messageRepository.find();
    //   }

}
