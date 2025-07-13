import { CreateUserDto } from '@modules/users/dtos/create-user.dto';
import { UsersService } from '@modules/users/services/users.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('users')
export class UsersEndpoint {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
