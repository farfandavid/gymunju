import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'series'
})
export class SeriesPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value+" series";
  }

}