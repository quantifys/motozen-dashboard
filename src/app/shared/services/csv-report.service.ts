import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';

import * as fromRoot from "../../shared/reducers";
import { Certificate } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CsvReportService {

  public certificates: Certificate[] = [];

  constructor(
    private _store: Store<fromRoot.State>,
  ) {
    this._store.select(fromRoot.getReportCertificates).subscribe(certificates => {
      this.certificates = certificates;
      if (certificates.length > 0) {
        this.generateCertificateCsv();
      }
    });
  }

  generateCertificateCsv() {
    let options = {
      showLabels: true,
      headers: [
        "Sr. No.",
        "Vehicle Registration No.",
        "Owner's Name",
        "Vehicle Make & Model",
        "Vehicle Manufacturing year",
        "Testing agency vehicle approval number",
        "Invoice No.",
        "Fitment Certificate No.",
        "Sr. No of Speed Governor",
        "Date of Fitment & date of Sealing",
        "Pre-Set speed"
      ]
    };
    let csvData: any[] = [];
    this.certificates.map((certificate, index) => {
      let data: any = {
        srNo: index + 1,
        regNo: certificate.car_reg_number,
        owner: certificate.customer_name,
        makeModel: certificate.vehicle.make + " - " + certificate.vehicle.model,
        mfgYear: certificate.mfg_month_year,
        approval: certificate.id,
        invoice: certificate.invoice_no,
        fitment: certificate.certificate_number,
        sld: certificate.device.sld_number,
        fitmentDate: certificate.date_generated,
        speed: certificate.cutoff_speed
      };
      csvData.push(data);
    });
    new Angular5Csv(csvData, 'certificate-report ' + new Date().toDateString(), options);
  }

}
