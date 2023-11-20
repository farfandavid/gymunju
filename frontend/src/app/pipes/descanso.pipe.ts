import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descanso'
})
export class DescansoPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    if(value<=59){
      return value+" segundos";
    }
    else{
      let v:number;
      v=(value/60);
      if (v % 1 == 0) {
        if (v==1){
          return v+" minuto";
        }
        return v+" minutos";
      } else {
        let resto:number;
        resto=(v % 1)*10;
        if (v<2){
          return v.toFixed()+" minuto y "+resto.toFixed()+" segundos";
        }
          return v.toFixed()+" minutos y "+resto.toFixed()+" segundos";
      }
    }
  }
}
