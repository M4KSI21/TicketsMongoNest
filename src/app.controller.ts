import {Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getAllUsers(): string {
    return "hi";
  }
  @Get()
  getUsersById(@Param() param): string {
    return "hi";
  }
  @Post()
  sendUsers(): string {
    return "send Users";
  }
  @Put()
  updateUsers(): string {
    return "update Users";
  }
  @Delete()
  deleteAllUsers(): string {
    return "update Users";
  }
  @Delete()
  deleteUsersById(): string {
    return "update Users";
  }
}
