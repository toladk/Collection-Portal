import { Pipe, PipeTransform } from '@angular/core';
import { EgsModel } from '../model/egsmodel';

@Pipe({
  name: 'searchfilterforegs'
})
export class SearchfilterforegsPipe implements PipeTransform {

  transform( tableData: EgsModel[], searchValue: string ): EgsModel[] {
    if (!tableData || !searchValue) {
      return tableData;
    }
    return tableData.filter(details =>
      details.applicantName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      details.amount.toString().toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      details.depositSlipNo.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      details.status.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      details.invoiceNo.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );
  }

}
