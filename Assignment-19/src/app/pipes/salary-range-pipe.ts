import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'salaryRange'
})
export class SalaryRangePipe
implements PipeTransform {

  transform(
    value: number | undefined
  ): string {

    if (
      value === undefined ||
      value === null
    ) {
      return 'N/A';
    }

    if (value >= 100000) {
      return 'Tier 1 (Senior)';
    }

    if (value >= 50000) {
      return 'Tier 2 (Mid-Level)';
    }

    return 'Tier 3 (Associate)';
  }

}