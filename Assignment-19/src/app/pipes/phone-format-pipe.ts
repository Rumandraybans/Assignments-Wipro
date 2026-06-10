import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat'
})
export class PhoneFormatPipe
implements PipeTransform {

  transform(
    value: string | undefined
  ): string {

    if (
      !value ||
      value.length !== 10
    ) {
      return value || 'N/A';
    }

    return `+91 ${value.slice(0,4)}-${value.slice(4)}`;
  }

}