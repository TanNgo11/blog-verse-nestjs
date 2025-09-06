import { Expose, Type } from 'class-transformer';

class GetProfileResponseDto {
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

export class GetAccountByIdResponseDto {
  @Expose()
  email: string;

  @Expose()
  @Type(() => GetProfileResponseDto)
  profile: GetProfileResponseDto;
}
