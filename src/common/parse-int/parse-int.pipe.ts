// import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

// @Injectable()
// export class ParseIntPipe implements PipeTransform {
//   transform(value: any, metadata: ArgumentMetadata) {
//     return value;
//   }
// }

import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10);

    if (isNaN(val)) {
      throw new BadRequestException(`${value} is not a number`);
    }

    return val;
  }
}
