import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'repe'
})
export class RepePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value+" repeticiones";
  }

}
