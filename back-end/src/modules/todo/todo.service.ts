import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'kindagoose';
import { FilterQuery } from 'mongoose';
import { Todo } from 'src/models/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo)
    private readonly model: ReturnModelType<typeof Todo>,
  ) {}

  async addTodo(todo: Todo) {
    if (!todo) throw new BadRequestException();
    if (!todo.id) throw new UnauthorizedException();
    return await this.model.create(todo);
  }

  async getTodosById(id: string) {
    const filter: FilterQuery<Todo> = {
      id: id,
    };
    return await this.model.find(filter);
  }

  async deleteTodoById(id: string) {
    const filter: FilterQuery<Todo> = {
      _id: id,
    };
    return await this.model.findOneAndDelete(filter);
  }

  async patchTodoById(toDoInfo: Todo, id: string) {
    return await this.model.findByIdAndUpdate(id, toDoInfo);
  }
}
