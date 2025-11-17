import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyName'
})
export class PrettyNamePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    return value
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }
}
