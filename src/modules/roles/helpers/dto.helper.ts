import { plainToInstance, ClassConstructor } from 'class-transformer';

export function mapToDto<T, V>(DtoClass: ClassConstructor<T>, data: V): T {
  return plainToInstance(DtoClass, data);
}

export function mapArrayToDto<T, V>(
  DtoClass: ClassConstructor<T>,
  data: V[],
): T[] {
  return plainToInstance(DtoClass, data, {
    excludeExtraneousValues: true,
  });
}

export function mapNullableToDto<T, V>(
  DtoClass: ClassConstructor<T>,
  data: V | null | undefined,
): T | null {
  return data ? plainToInstance(DtoClass, data) : null;
}
