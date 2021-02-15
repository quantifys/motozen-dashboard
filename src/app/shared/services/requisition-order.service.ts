import { Injectable } from "@angular/core";
import { DatePipe } from "@angular/common";
import { Store } from "@ngrx/store";

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

import * as fromRoot from "../../shared/reducers";
import { RequisitionOrder } from "../models";

@Injectable({
  providedIn: "root",
})
export class RequisitionOrderService {
  public requisitionOrder: RequisitionOrder = new RequisitionOrder({});
  public requisitionDoc: any;

  constructor(
    private _store: Store<fromRoot.State>,
    private _datePipe: DatePipe
  ) {
    this._store
      .select(fromRoot.getCurrentRequisitionOrder)
      .subscribe((reqOrder) => (this.requisitionOrder = reqOrder));
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  createRequisition(requisition: RequisitionOrder): any {
    this.requisitionDoc = {
      pageSize: "A4",
      watermark: { text: "PIAN  ", color: "grey", opacity: 0.2 },
      header: function (currentPage, pageCount) {
        return {
          text: "Page " + currentPage.toString() + " of " + pageCount,
          alignment: "center",
          margin: [0, 10, 0, 0],
        };
      },
      footer: function (currentPage, pageCount) {
        if (currentPage == pageCount) {
          var modFooter = {
            columns: [
              {
                text: "________________\nPlant Supervisor",
                alignment: "center",
              },
              {
                text: "________________\nPlant Manager",
                alignment: "center",
              },
              {
                text: "________________\nStore Purchases",
                alignment: "center",
              },
            ],
          };
          return modFooter;
        }
      },
      content: [
        {
          table: {
            widths: ["*"],
            body: [
              [
                {
                  fillColor: "#eeeeee",
                  text: "Requisition Order",
                  bold: true,
                  fontSize: 20,
                  alignment: "center",
                },
              ],
            ],
          },
        },
        {
          text:
            "\nDate: " +
            this._datePipe.transform(requisition.created_at, "fullDate"),
          alignment: "right",
        },
        {
          text: "\nRequisition Order No.: " + requisition.serial_no,
          alignment: "right",
          fontSize: 13,
        },
        {
          text:
            "-----------------------------------------------------------------------------------------------------------------------------------------------------------",
        },
        this.table(requisition.req_particulars, [
          "Sr No.",
          "Item Code",
          "Description",
          "Quantity",
        ]),
      ],
    };
  }

  buildTableBody(data, columns) {
    var body = [];
    var header = [];
    var srno_itemcode = columns.slice(0, 2);
    srno_itemcode.forEach(function (column) {
      header.push({
        text: column.toString(),
        bold: true,
        fillColor: "#eeeeee",
      });
    });
    header.push({
      text: columns[2].toString(),
      bold: true,
      alignment: "center",
      fillColor: "#eeeeee",
    });
    header.push({
      text: columns[3].toString(),
      bold: true,
      fillColor: "#eeeeee",
    });
    body.push(header);

    var count = 1;
    data.forEach(function (row) {
      var dataRow = [];

      if (count == 31) {
        dataRow.push({ text: count, pageBreak: "before" });
        dataRow.push({
          text: row.inventory_item.item_code,
          pageBreak: "before",
        });
        dataRow.push({
          text: row.inventory_item.description,
          pageBreak: "before",
        });
        dataRow.push({ text: row.quantity, pageBreak: "before" });
      } else {
        dataRow.push(count);
        dataRow.push(row.inventory_item.item_code);
        dataRow.push(row.inventory_item.description);
        dataRow.push(row.quantity);
      }

      body.push(dataRow);
      count++;
    });

    return body;
  }

  table(data, columns) {
    return {
      table: {
        headerRows: 1,
        widths: ["auto", "auto", "*", "auto"],
        body: this.buildTableBody(data, columns),
      },
    };
  }

  downloadRequisition() {
    this.createRequisition(this.requisitionOrder);
    pdfMake
      .createPdf(this.requisitionDoc)
      .download(this.requisitionOrder.serial_no + ".pdf");
  }

  printRequisition() {
    this.createRequisition(this.requisitionOrder);
    pdfMake.createPdf(this.requisitionDoc).print();
  }
}
