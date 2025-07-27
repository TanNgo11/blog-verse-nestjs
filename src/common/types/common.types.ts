export class PaginatedApiResponseDto<T> {
  skippedRecords: number;
  totalRecords: number;
  data: T[];
  payloadSize: number;
  hasNext: boolean;
}

export class ApiResponseDto<T = void> {
  success: boolean;
  code: number;
  data?: T;
  timestamp: number;
}

export class ApiListResponseDto<T> {
  success: boolean;
  code: number;
  data: T[];
  timestamp: number;
}
