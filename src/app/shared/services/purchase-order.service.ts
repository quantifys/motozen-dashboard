import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

import * as fromRoot from "../../shared/reducers";
import { PurchaseOrder } from "../models";

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {
  
  public poDoc: any;
  public purchaseOrder: PurchaseOrder = new PurchaseOrder({});

  constructor(
    private _store: Store<fromRoot.State>
  ) {
    this._store.select(fromRoot.getCurrentPurchaseOrder).subscribe(purchaseOrder => this.purchaseOrder = purchaseOrder);
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  table(data, columns) {
    return {
      table: {
        headerRows: 1,
        widths: ["auto", "*", "auto", "auto"],
        body: this.buildTableBody(data, columns)
      }
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
        fillColor: "#eeeeee"
      });
    });
    header.push({
      text: columns[2].toString(),
      bold: true,
      alignment: "center",
      fillColor: "#eeeeee"
    });
    header.push({
      text: columns[3].toString(),
      bold: true,
      fillColor: "#eeeeee"
    });
    body.push(header);

    var count = 1;
    data.forEach(function (row) {
      var dataRow = [];
      dataRow.push(count);
      dataRow.push(
        row.vehicle.make + "\t" + row.vehicle.model + "\t" + row.vehicle.variant
      );
      dataRow.push({
        text: row.vehicle.connector.item_code,
        alignment: "center"
      });
      dataRow.push(row.quantity);

      body.push(dataRow);
      count++;
    });

    return body;
  }

  createPo(purchase_order: PurchaseOrder) {
    this.poDoc = {
      pageSize: "A4",
      watermark: { text: "TEDI India Pvt. Ltd.", color: "grey", opacity: 0.2 },
      header: function (currentPage, pageCount) {
        return {
          text: "Page " + currentPage.toString() + " of " + pageCount,
          alignment: "center",
          margin: [0, 10, 0, 0]
        };
      },
      content: [
        {
          table: {
            widths: ["*"],
            body: [
              [
                {
                  fillColor: "#eeeeee",
                  text: "Delivery Note",
                  bold: true,
                  fontSize: 20,
                  alignment: "center"
                }
              ]
            ]
          }
        },
        {
          text: "\nDate: " + purchase_order.created_at,
          alignment: "right"
        },
        {
          text: "\nPurchase Order No.: " + purchase_order.serial_no,
          alignment: "right",
          fontSize: 13
        },
        {
          text:
            "-----------------------------------------------------------------------------------------------------------------------------------------------------------"
        },
        this.table(purchase_order.particulars, [
          "Sr No.",
          "Description",
          "Connector Item Code",
          "Quantity"
        ]),
        {
          margin: [0, 100, 0, 0],
          columns: [
            {},
            {},
            {
              text: "______________\nDispatch",
              alignment: "center",
              fontSize: 15
            }
          ]
        },
        {
          pageBreak: "before",
          text:
            "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Shipping Label - - - - - - - - - - - - - - - - - -  - - - - - - - - - - - - - - - - - ",
          alignment: "center",
          margin: [0, 0, 0, 25]
        },
        {
          table: {
            widths: [120, "auto", "*"],
            body: [
              [
                {
                  border: [true, true, false, false],
                  text:
                    "From: \n\nTEDI INDIA PRIVATE LIMITED\nNO. 14/33, Jubilee Road,\nWest Mambalam, Chennai - 600 033"
                },
                {
                  border: [false, true, false, false],
                  text: "To,",
                  fontSize: 15,
                  margin: [10, 100, 0, 0]
                },
                {
                  border: [false, true, true, false],
                  text: ""
                }
              ],
              [
                {
                  border: [true, false, false, true],
                  text: ""
                },
                {
                  border: [false, false, false, true],
                  margin: [10, 10, 0, 40],
                  text:
                    purchase_order.user.name +
                    "\n" +
                    purchase_order.address +
                    "\n\n" +
                    "Contact: " +
                    purchase_order.user.details.contact,
                  alignment: "left",
                  fontSize: "25",
                  bold: true
                },
                {
                  border: [false, false, true, true],
                  text: ""
                }
              ]
            ]
          }
        },
        {
          text:
            "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  - - - - - - - - - - - - - - - - - -  - - - - - - - - - - - - - - - - - ",
          alignment: "center",
          margin: [0, 20, 0, 0]
        }
      ]
    };
  }

  downloadPurchaseOrder() {
    this.createPo(this.purchaseOrder);
    pdfMake.createPdf(this.poDoc).download(this.purchaseOrder.serial_no + ".pdf");
  }

  printPurchaseOrder() {
    this.createPo(this.purchaseOrder);
    pdfMake.createPdf(this.poDoc).print();
  }

}
