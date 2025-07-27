import { SetMetadata } from '@nestjs/common';

export const MESSAGE_METADATA_KEY = 'custom:response_message';

export const SetMessage = (message: string) =>
  SetMetadata(MESSAGE_METADATA_KEY, message);
