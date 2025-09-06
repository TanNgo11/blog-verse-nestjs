import { Expose, Type } from 'class-transformer';

export class GetProfileResponseDto {
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

export class GetAccountResponseDto {
  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  @Type(() => GetProfileResponseDto)
  profile: GetProfileResponseDto;
}
