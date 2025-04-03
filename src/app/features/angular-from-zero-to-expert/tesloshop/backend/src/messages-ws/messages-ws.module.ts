import { Module } from '@nestjs/common';
import { MessagesWsGateway } from './messages-ws.gateway';

import { AuthModule } from '../auth/auth.module';
import { MessagesWsService } from './services/messages-ws.service';

@Module({
  providers: [MessagesWsGateway, MessagesWsService],
  imports: [ AuthModule ]
})
export class MessagesWsModule {}
