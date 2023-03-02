import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { Todo } from 'src/models/todo.entity';
import { KindagooseModule } from 'kindagoose';

@Module({
  imports: [KindagooseModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
