import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class ProfileDTO {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  @IsString()
  middleName?: string;

  @IsOptional()
  @Matches(/^\+?[0-9]{7,15}$/, {
    message: 'Phone number must be valid.',
  })
  phoneNumber?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Date of birth must be a valid ISO date.' })
  dateOfBirth?: Date;

  @IsOptional()
  @IsString()
  address?: string;
}
