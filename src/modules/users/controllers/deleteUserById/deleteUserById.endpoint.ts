import { UsersService } from '@modules/users/services/users.service';
import { Controller, Delete, Param } from '@nestjs/common';

@Controller('users')
export class DeleteUserByIdEndpoint {
  constructor(private readonly usersService: UsersService) {}

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return this.usersService.permanentlyDelete(id);
  }
}
