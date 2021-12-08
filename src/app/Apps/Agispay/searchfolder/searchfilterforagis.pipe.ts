import { AgisModel } from './../model/agismodel';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchfilterforagis'
})
export class SearchfilterforagisPipe implements PipeTransform {

  transform( tableData: AgisModel[], searchValue: string ): AgisModel[] {
    if (!tableData || !searchValue) {
      return tableData;
    }
    return tableData.filter(details =>
      details.nameOfPlotOwner.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      details.depositorName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      details.paymentFor.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      details.amount.toString().includes(searchValue.toLocaleLowerCase())
    );
  }

}
