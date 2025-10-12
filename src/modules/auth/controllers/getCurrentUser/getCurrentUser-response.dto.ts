import { Expose, Type } from 'class-transformer';

class GetCurrentUserProfileResponseDto {
  @Expose()
  firstName: string;

  @Expose()
  middleName?: string;

  @Expose()
  lastName: string;

  @Expose()
  bio?: string;

  @Expose()
  dateOfBirth?: Date;
}

class GetCurrentUserRoleResponseDto {
  @Expose()
  roleName: string;

  @Expose()
  description?: string;
}

export class GetCurrentUserResponseDto {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  lastLogin?: Date;

  @Expose()
  @Type(() => GetCurrentUserProfileResponseDto)
  profile: GetCurrentUserProfileResponseDto;

  @Expose()
  @Type(() => GetCurrentUserRoleResponseDto)
  roles: GetCurrentUserRoleResponseDto[];
}
