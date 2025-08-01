import { UsersService } from '@modules/users/services/users.service';
import { Controller, Get } from '@nestjs/common';
import { GetAllUsersResponseDto } from './users-response.dto';

@Controller('users')
export class GetAllUsersEndpoint {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(): Promise<GetAllUsersResponseDto[]> {
    return this.usersService.findAll({
      username: 'ádasdasd2',
    });
  }
}
