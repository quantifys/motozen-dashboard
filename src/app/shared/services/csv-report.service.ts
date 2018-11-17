import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { Subscription } from 'rxjs';

import * as fromRoot from "../../shared/reducers";
import { Certificate } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CsvReportService {

  public certificates: Certificate[] = [];
  public certificateSubscription: Subscription = new Subscription();
  public poSummarySubscription: Subscription = new Subscription();
  public stockSummarySubscription: Subscription = new Subscription();
  public poDetailsSubscription: Subscription = new Subscription();

  constructor(
    private _store: Store<fromRoot.State>,
  ) { }

  subscribeToCertificateReport() {
    this.certificateSubscription = this._store.select(fromRoot.getReportCertificates).subscribe(certificates => {
      this.certificates = certificates;
      if (certificates.length > 0) {
        this.generateCertificateCsv();
      }
    });
  }

  subscribeToPOSummary() {
    this.poSummarySubscription = this._store.select(fromRoot.getPOSummary).subscribe(summary => {
      if (summary.length > 0) {
        this.generatePOSummary(summary, true);
      }
    });
  }

  subscribeToPODetails() {
    this.poDetailsSubscription = this._store.select(fromRoot.getPODetails).subscribe(details => {
      if (details.length > 0) {
        this.generatePODetails(details);
      }
    });
  }

  subscribeToStockSummary() {
    this.stockSummarySubscription = this._store.select(fromRoot.getStockSummary).subscribe(summary => {
      if (summary.length > 0) {
        this.generatePOSummary(summary, false);
      }
    });
  }

  unsubscribe() {
    this.certificateSubscription.unsubscribe();
    this.poSummarySubscription.unsubscribe();
    this.stockSummarySubscription.unsubscribe();
    this.poDetailsSubscription.unsubscribe();
  }

  generatePODetails(details: any[]) {
    let options = {
      showLabels: true,
      headers: [
        "Sr. No.",
        "Date",
        "Serial No.",
        "Distributor",
        "State",
        "GSTN",
        "Total",
        "Total Amount Paid",
        "SLD Nos",
        "Vehicles (quantity)"
      ]
    };
    let csvData: any[] = [];
    details.map((detail, index) => {
      let data: any = {
        srNo: index + 1,
        date: detail.created_at,
        serial_no: detail.serial_no,
        distributor: detail.user.name,
        state: detail.state,
        gstn: detail.user.details.gstn,
        total: detail.total_quantity,
        amount_paid: detail.amount_paid,
        sld: detail.devices.join(' '),
        vehicles: detail.particulars.map(particular => particular.vehicle.make + " " + particular.vehicle.model + " " + particular.vehicle.variant + "(" + particular.quantity + ")"),
      };
      csvData.push(data);
    });
    new Angular5Csv(csvData, 'po-list-report ' + new Date().toDateString(), options);
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

  generatePOSummary(summary: any, type: boolean) {
    let options = {
      showLabels: true,
      headers: summary[0]
    };
    new Angular5Csv(summary.filter((data, index) => index > 0), type ? 'po-summary ' : 'stock-summary' + new Date().toDateString(), options);
  }

}
