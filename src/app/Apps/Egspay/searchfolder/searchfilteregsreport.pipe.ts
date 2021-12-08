import { Pipe, PipeTransform } from '@angular/core';
import { EgsReportModel } from '../model/egsmodelreport';

@Pipe({
  name: 'searchfilteregsreport'
})
export class SearchfilteregsreportPipe implements PipeTransform {

  transform( tableData: EgsReportModel[], searchValue: string ): EgsReportModel[] {
    if (!tableData || !searchValue) {
      return tableData;
    }
    return tableData.filter(details =>
      details.applicantName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      details.amount.toString().toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      details.depositSlipNo.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      details.status.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      details.invoiceNo.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      details.branchName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      details.referenceNo.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      details.createdOn.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );
  }

}
