import { Pipe, PipeTransform } from '@angular/core';
import {dictionary} from '../../../i18n/translation';

@Pipe({
  name: 'translate',
  pure: false
})

export class TranslatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
  	let lang = localStorage.getItem('lang');
    if(!value) return value;
    if(!dictionary
		[lang])
        lang = 'ar';
    return (dictionary[lang][value]) ? dictionary[lang][value] : value;
  }

}
