import { Pipe, PipeTransform } from '@angular/core';
import { NgModule } from '@angular/core';
/**
 * Generated class for the Testpipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */

@Pipe({
  name: 'testpipe',
})
export class Testpipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return value.toLowerCase();
  }
}
