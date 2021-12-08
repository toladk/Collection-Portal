import { PayarenaModel } from './../model/payarenamodel';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchfilterforarena'
})
export class SearchfilterforarenaPipe implements PipeTransform {

  transform( tableData: PayarenaModel[], searchValue: string ): PayarenaModel[] {
    if (!tableData || !searchValue) {
      return tableData;
    }
    return tableData.filter(details =>
      details.applicantName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      details.applicationType.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      details.branchName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      details.status.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      details.applicantId.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      details.tellerTill.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      details.amount.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );
  }

}
