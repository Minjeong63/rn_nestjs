import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from 'src/models/todo.entity';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('todos API')
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post()
  @ApiOperation({ summary: 'todo 추가' })
  async addToDo(@Body() todo: Todo): Promise<Todo> {
    return this.todoService.addTodo(todo);
  }

  @Get(':id')
  @ApiOperation({ summary: 'id에 해당하는 todos 반환' })
  @ApiParam({ name: 'id', description: `user의 id` })
  async getTodosById(@Param('id') id: string) {
    return this.todoService.getTodosById(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: '_id에 해당하는 todo 삭제' })
  @ApiParam({ name: 'id', description: `toDo의 _id` })
  async deleteTodoById(@Param('id') id: string) {
    return this.todoService.deleteTodoById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'todo 수정' })
  @ApiParam({ name: 'id', description: `toDo의 _id` })
  async patchTodoById(@Body() toDoInfo: Todo, @Param('id') id: string) {
    return this.todoService.patchTodoById(toDoInfo, id);
  }
}
