import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { retry } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import moment from 'moment';
import swal from 'sweetalert2';

import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as pdfMake from 'pdfmake/build/pdfmake';

import * as fromRoot from "../../shared/reducers";
import { Certificate, User, IcatData } from './../models';
import { environment } from '../../../environments/environment';

const toast = (swal as any).mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000
});

@Injectable()
export class CertificateService {

  private certificate: Certificate = new Certificate({});
  public certificateDoc: any;
  private icats_global: IcatData[] = [];
  private loggedUser: User = new User({});

  constructor(
    private _store: Store<fromRoot.State>,
    private _http: HttpClient,
    private _datePipe: DatePipe
  ) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    this._store.select(fromRoot.getCurrentCertificate).subscribe(certificate => this.certificate = certificate);
    this._store.select(fromRoot.getLoggedUser).subscribe(user => this.loggedUser = user);
  }

  createCertificate(certificate: Certificate): any {
    this.certificateDoc = {
      pageSize: "A4",
      watermark: {
        text: "Gemeni",
        color: "grey",
        opacity: 0.2,
        fontSize: 20
      },
      content: [
        {
          "columns": [
            [
              {
                "qr": "GEMENI ENTERPRISES GOA\nSLD_NUMBER: " + certificate.device.sld_number + "\nCERTIFICATE NUMBER: " + certificate.certificate_number + "\nDATE GENERATED: " + this._datePipe.transform(certificate.date_generated, 'mediumDate') + "\nDUE DATE: " + this._datePipe.transform(certificate.due_date, 'mediumDate') + "\nCHASSIS NUMBER: " + certificate.chassis_number + "\nENGINE NUMBER: " + certificate.engine_number + "\nCUSTOMER NAME: " + certificate.customer_name + "\nCAR REG NUMBER: " + certificate.car_reg_number,
                "fit": 120
              },
              {
                "text": "To,",
                "bold": true,
                "fontSize": 10,
                "margin": [
                  0,
                  10,
                  0,
                  0
                ]
              },
              {
                "text": "The Regional\n" + certificate.location_rto + ", " + certificate.location_state,
                "fontSize": 10
              }
            ],
            [
              {
                "text": "GEMENI",
                "style": "header",
                "fontSize": 35
              },
              {
                "text": "309, 3rd Floor, Citi Centre,\nPatto, Panaji, Goa - 403001\ncustomercare@gemeniindia.com\nwww.gemeniindia.com",
                "alignment": "center",
                "fontSize": 10,
                "margin": [
                  0,
                  0,
                  0,
                  5
                ]
              },
              {
                "text": "Fitment Assurance Certificate",
                "alignment": "center",
                "fontSize": 14,
                "bold": true
              }
            ],
            [
              {
                "text": "RTA COPY",
                "background": "grey",
                "color": "white",
                "alignment": "right"
              },
              {
                "text": [
                  "Fitment Certificate No.: ",
                  {
                    "text": certificate.certificate_number,
                    "bold": true
                  }
                ],
                "fontSize": 11,
                "alignment": "right",
                "margin": [
                  0,
                  50,
                  0,
                  10
                ]
              },
              {
                "text": [
                  "Issuing Date: ",
                  {
                    "text": this._datePipe.transform(certificate.date_generated, 'mediumDate'),
                    "bold": true
                  }
                ],
                "fontSize": 11,
                "alignment": "right"
              },
              {
                "text": [
                  "Renewal Date: ",
                  {
                    "text": this._datePipe.transform(certificate.due_date, 'mediumDate'),
                    "bold": true
                  }
                ],
                "fontSize": 11,
                "alignment": "right"
              }
            ]
          ]
        },
        {
          "text": [
            "This is to assure that fitment for customer ",
            {
              "text": certificate.customer_name,
              "bold": true
            },
            " of speed governer device with details:"
          ],
          fontSize: '11',
          "margin": [
            0,
            5,
            0,
            5
          ]
        },
        {
          text: [
            {
              "text": "SLD Number: "
            },
            {
              "text": certificate.device.sld_number,
              bold: true
            }
          ],
          alignment: "center",
          margin: [0, 0, 0, 5]
        },
        {
          "table": {
            "widths": [
              "*",
              "*"
            ],
            "body": [
              [
                {
                  "text": [
                    {
                      "text": "Customer Name: ",
                      "alignment": "left"
                    },
                    {
                      "text": certificate.customer_name,
                      "alignment": "center",
                      "bold": true
                    }
                  ]
                },
                {
                  "text": [
                    {
                      "text": "Customer Contact: ",
                      "alignment": "left"
                    },
                    {
                      "text": certificate.customer_telephone,
                      "alignment": "center",
                      "bold": true
                    }
                  ]
                }
              ],
              [
                {
                  "text": [
                    {
                      "text": "Customer Address:\n",
                      "alignment": "left"
                    },
                    {
                      "text": certificate.customer_address,
                      "bold": true
                    }
                  ],
                  colSpan: 2
                }
              ],
              [
                {
                  "text": [
                    {
                      "text": "Vehicle make: ",
                      "alignment": "left"
                    },
                    {
                      "text": certificate.vehicle.make,
                      "alignment": "center",
                      "bold": true
                    }
                  ]
                },
                {
                  "text": [
                    {
                      "text": "Vehicle model: ",
                      "alignment": "left"
                    },
                    {
                      "text": certificate.vehicle.model,
                      "alignment": "center",
                      "bold": true
                    }
                  ]
                }
              ],
              [
                {
                  "text": [
                    {
                      "text": "Registration number: ",
                      "alignment": "left"
                    },
                    {
                      "text": certificate.car_reg_number,
                      "alignment": "center",
                      "bold": true
                    }
                  ],
                },
                {
                  "text": [
                    {
                      "text": "Invoice No: ",
                      "alignment": "left"
                    },
                    {
                      "text": certificate.invoice_no,
                      "alignment": "center",
                      "bold": true
                    }
                  ],
                }
              ],
              [
                {
                  "text": [
                    {
                      "text": "Engine No.: ",
                      "alignment": "left"
                    },
                    {
                      "text": certificate.engine_number,
                      "alignment": "center",
                      "bold": true
                    }
                  ]
                },
                {
                  "text": [
                    {
                      "text": "Chassis No.: ",
                      "alignment": "left"
                    },
                    {
                      "text": certificate.chassis_number,
                      "alignment": "center",
                      "bold": true
                    }
                  ]
                }
              ],
              [
                {
                  "text": [
                    {
                      "text": "Vehicle mfg date: ",
                      "alignment": "left"
                    },
                    {
                      "text": this._datePipe.transform(certificate.mfg_month_year, 'mediumDate'),
                      "alignment": "center",
                      "bold": true
                    }
                  ]
                },
                {
                  "text": [
                    {
                      "text": "Vehicle reg date: ",
                      "alignment": "left"
                    },
                    {
                      "text": this._datePipe.transform(certificate.reg_month_year, 'mediumDate'),
                      "alignment": "center",
                      "bold": true
                    }
                  ]
                }
              ],
              [
                {
                  "text": [
                    {
                      "text": "SLD Type.: ",
                      "alignment": "left"
                    },
                    {
                      "text": "Electronic speed limiting device",
                      "alignment": "center",
                      "bold": true
                    }
                  ]
                },
                {
                  "text": [
                    {
                      "text": "Model No.: ",
                      "alignment": "left"
                    },
                    {
                      "text": "GESLD118",
                      "alignment": "center",
                      "bold": true
                    }
                  ]
                }
              ],
              [
                {
                  "text": [
                    {
                      "text": "Part No.: ",
                      "alignment": "left"
                    },
                    {
                      "text": "1579GE",
                      "alignment": "center",
                      "bold": true
                    }
                  ]
                },
                {
                  "text": [
                    {
                      "text": "TAC No.: ",
                      "alignment": "left"
                    },
                    {
                      "text": certificate.vehicle.tac_number,
                      "alignment": "center",
                      "bold": true
                    }
                  ]
                }
              ],
              [
                {
                  "text": [
                    {
                      "text": "Cut-Off Speed: ",
                      "alignment": "left"
                    },
                    {
                      "text": certificate.cutoff_speed + "km/hr",
                      "alignment": "center",
                      "bold": true
                    }
                  ]
                },
                {
                  "text": [
                    {
                      "text": "Seal number / No of Seals.: ",
                      "alignment": "left"
                    },
                    {
                      "text": certificate.seals,
                      "alignment": "center",
                      "bold": true
                    }
                  ]
                }
              ]
            ]
          }
        },
        {
          "text": "was completed successfully.",
          fontSize: '11',
          "margin": [
            0,
            5,
            0,
            5
          ]
        },
        {
          "text": "The above mentioned fitment complies with ISO standard 9001:2015 and is tamper proof to the best of the certifying authority's knowledge. Our fitments comply with ICAT norms AIS-018. The manufacturer is not responsible for any misuse or malpractice towards the certifcate. Any liability towards fitment made without iCAT vehicle approval or without following manufacturers T&C will borne solely by the dealer.",
          "alignment": "justify",
          "fontSize": 10
        },
        {
          columns: [
            {
              "text": [
                "Dealer Name:\n",
                {
                  text: this.loggedUser.name,
                  bold: true
                }
              ]
            },
            {
              "text": [
                "Dealer Address:\n",
                {
                  text: this.loggedUser.details.address,
                  bold: true
                }
              ]
            }
          ],
          fontSize: 11,
          margin: [0, 10, 0, 5]
        },
        {
          "canvas": [
            {
              "type": "line",
              "x1": 0,
              "y1": 5,
              "x2": 515,
              "y2": 5,
              "lineWidth": 1
            }
          ]
        },
        {
          "text": "PRODUCT SATISFACTION REPORT",
          "bold": true,
          "fontSize": 12,
          "alignment": "center",
          "decoration": "underline",
          "margin": [
            0,
            5,
            0,
            5
          ]
        },
        {
          "ol": [
            "This is to acknowledge and confirm that we have got our vehicle bearing above Registration No.: " + certificate.car_reg_number + " fitted with Electronic Speed Limitation Device, manufactured by Gemeni Enterprises bearing SR.NO.: " + certificate.device.sld_number + " & Model No.: GESLD118",
            "After fitting the Electronic speed limiter my vehicle speed is not exceeding more than 80 km/hr and are working satisfactory.",
            "We undertake not to raise any dispute or any legal claims against Gemeni Enterprises in the event that the above mentioned seals are found broken/torn/tampered and more specifically with the respect to any variation in the speed limit set after fittment, after expiry of warranty period of 12 months from the date of installation."
          ],
          "fontSize": 9
        },
        {
          "columns": [
            {
              "text": "Department of Transport",
              "alignment": "center",
              "bold": true
            },
            {
              "text": "Dealer stamp & sign",
              "alignment": "center",
              "bold": true
            },
            {
              "text": "Customer sign",
              "alignment": "center",
              "bold": true
            }
          ],
          "margin": [
            0,
            60,
            0,
            0
          ]
        },
        {
          "columns": [
            [
              {
                "qr": "GEMENI ENTERPRISES GOA\nSLD_NUMBER: " + certificate.device.sld_number + "\nCERTIFICATE NUMBER: " + certificate.certificate_number + "\nDATE GENERATED: " + this._datePipe.transform(certificate.date_generated, 'mediumDate') + "\nDUE DATE: " + this._datePipe.transform(certificate.due_date, 'mediumDate') + "\nCHASSIS NUMBER: " + certificate.chassis_number + "\nENGINE NUMBER: " + certificate.engine_number + "\nCUSTOMER NAME: " + certificate.customer_name + "\nCAR REG NUMBER: " + certificate.car_reg_number,
                "fit": 120
              },
              {
                "text": "To,",
                "bold": true,
                "fontSize": 10,
                "margin": [
                  0,
                  10,
                  0,
                  0
                ]
              },
              {
                "text": "The Regional\n" + certificate.location_rto + ", " + certificate.location_state,
                "fontSize": 10
              }
            ],
            [
              {
                "text": "GEMENI",
                "style": "header",
                "fontSize": 35
              },
              {
                "text": "309, 3rd Floor, Citi Centre,\nPatto, Panaji, Goa - 403001\ncustomercare@gemeniindia.com\nwww.gemeniindia.com",
                "alignment": "center",
                "fontSize": 10,
                "margin": [
                  0,
                  0,
                  0,
                  5
                ]
              },
              {
                "text": "Fitment Assurance Certificate",
                "alignment": "center",
                "fontSize": 14,
                "bold": true
              }
            ],
            [
              {
                "text": "CUSTOMER COPY",
                "background": "grey",
                "color": "white",
                "alignment": "right"
              },
              {
                "text": [
                  "Fitment Certificate No.: ",
                  {
                    "text": certificate.certificate_number,
                    "bold": true
                  }
                ],
                "fontSize": 11,
                "alignment": "right",
                "margin": [
                  0,
                  50,
                  0,
                  10
                ]
              },
              {
                "text": [
                  "Issuing Date: ",
                  {
                    "text": this._datePipe.transform(certificate.date_generated, 'mediumDate'),
                    "bold": true
                  }
                ],
                "fontSize": 11,
                "alignment": "right"
              },
              {
                "text": [
                  "Renewal Date: ",
                  {
                    "text": this._datePipe.transform(certificate.due_date, 'mediumDate'),
                    "bold": true
                  }
                ],
                "fontSize": 11,
                "alignment": "right"
              }
            ]
          ],
          pageBreak: "before"
        },
        {
          "text": [
            "This is to assure that fitment for customer ",
            {
              "text": certificate.customer_name,
              "bold": true
            },
            " of speed governer device with details:"
          ],
          fontSize: '11',
          "margin": [
            0,
            5,
            0,
            5
          ]
        },
        {
          text: [
            {
              "text": "SLD Number: "
            },
            {
              "text": certificate.device.sld_number,
              bold: true
            }
          ],
          alignment: "center",
          margin: [0, 0, 0, 5]
        },
        {
          "table": {
            "widths": [
              "*",
              "*"
            ],
            "body": [
              [
                {
                  "text": [
                    {
                      "text": "Customer Name: ",
                      "alignment": "left"
                    },
                    {
                      "text": certificate.customer_name,
                      "alignment": "center",
                      "bold": true
                    }
                  ]
                },
                {
                  "text": [
                    {
                      "text": "Customer Contact: ",
                      "alignment": "left"
                    },
                    {
                      "text": certificate.customer_telephone,
                      "alignment": "center",
                      "bold": true
                    }
                  ]
                }
              ],
              [
                {
                  "text": [
                    {
                      "text": "Customer Address:\n",
                      "alignment": "left"
                    },
                    {
                      "text": certificate.customer_address,
                      "bold": true
                    }
                  ],
                  colSpan: 2
                }
              ],
              [
                {
                  "text": [
                    {
                      "text": "Vehicle make: ",
                      "alignment": "left"
                    },
                    {
                      "text": certificate.vehicle.make,
                      "alignment": "center",
                      "bold": true
                    }
                  ]
                },
                {
                  "text": [
                    {
                      "text": "Vehicle model: ",
                      "alignment": "left"
                    },
                    {
                      "text": certificate.vehicle.model,
                      "alignment": "center",
                      "bold": true
                    }
                  ]
                }
              ],
              [
                {
                  "text": [
                    {
                      "text": "Registration number: ",
                      "alignment": "left"
                    },
                    {
                      "text": certificate.car_reg_number,
                      "alignment": "center",
                      "bold": true
                    }
                  ],
                },
                {
                  "text": [
                    {
                      "text": "Invoice No: ",
                      "alignment": "left"
                    },
                    {
                      "text": certificate.invoice_no,
                      "alignment": "center",
                      "bold": true
                    }
                  ],
                }
              ],
              [
                {
                  "text": [
                    {
                      "text": "Engine No.: ",
                      "alignment": "left"
                    },
                    {
                      "text": certificate.engine_number,
                      "alignment": "center",
                      "bold": true
                    }
                  ]
                },
                {
                  "text": [
                    {
                      "text": "Chassis No.: ",
                      "alignment": "left"
                    },
                    {
                      "text": certificate.chassis_number,
                      "alignment": "center",
                      "bold": true
                    }
                  ]
                }
              ],
              [
                {
                  "text": [
                    {
                      "text": "Vehicle mfg date: ",
                      "alignment": "left"
                    },
                    {
                      "text": this._datePipe.transform(certificate.mfg_month_year, 'mediumDate'),
                      "alignment": "center",
                      "bold": true
                    }
                  ]
                },
                {
                  "text": [
                    {
                      "text": "Vehicle reg date: ",
                      "alignment": "left"
                    },
                    {
                      "text": this._datePipe.transform(certificate.reg_month_year, 'mediumDate'),
                      "alignment": "center",
                      "bold": true
                    }
                  ]
                }
              ],
              [
                {
                  "text": [
                    {
                      "text": "SLD Type.: ",
                      "alignment": "left"
                    },
                    {
                      "text": "Electronic speed limiting device",
                      "alignment": "center",
                      "bold": true
                    }
                  ]
                },
                {
                  "text": [
                    {
                      "text": "Model No.: ",
                      "alignment": "left"
                    },
                    {
                      "text": "GESLD118",
                      "alignment": "center",
                      "bold": true
                    }
                  ]
                }
              ],
              [
                {
                  "text": [
                    {
                      "text": "Part No.: ",
                      "alignment": "left"
                    },
                    {
                      "text": "1579GE",
                      "alignment": "center",
                      "bold": true
                    }
                  ]
                },
                {
                  "text": [
                    {
                      "text": "TAC No.: ",
                      "alignment": "left"
                    },
                    {
                      "text": certificate.vehicle.tac_number,
                      "alignment": "center",
                      "bold": true
                    }
                  ]
                }
              ],
              [
                {
                  "text": [
                    {
                      "text": "Cut-Off Speed: ",
                      "alignment": "left"
                    },
                    {
                      "text": certificate.cutoff_speed + "km/hr",
                      "alignment": "center",
                      "bold": true
                    }
                  ]
                },
                {
                  "text": [
                    {
                      "text": "Seal number / No of Seals.: ",
                      "alignment": "left"
                    },
                    {
                      "text": certificate.seals,
                      "alignment": "center",
                      "bold": true
                    }
                  ]
                }
              ]
            ]
          }
        },
        {
          "text": "was completed successfully.",
          fontSize: '11',
          "margin": [
            0,
            5,
            0,
            5
          ]
        },
        {
          "text": "The above mentioned fitment complies with ISO standard 9001:2015 and is tamper proof to the best of the certifying authority's knowledge. Our fitments comply with ICAT norms AIS-018. The manufacturer is not responsible for any misuse or malpractice towards the certifcate. Any liability towards fitment made without iCAT vehicle approval or without following manufacturers T&C will borne solely by the dealer.",
          "alignment": "justify",
          "fontSize": 10
        },
        {
          columns: [
            {
              "text": [
                "Dealer Name:\n",
                {
                  text: this.loggedUser.name,
                  bold: true
                }
              ]
            },
            {
              "text": [
                "Dealer Address:\n",
                {
                  text: this.loggedUser.details.address,
                  bold: true
                }
              ]
            }
          ],
          fontSize: 11,
          margin: [0, 10, 0, 5]
        },
        {
          "canvas": [
            {
              "type": "line",
              "x1": 0,
              "y1": 5,
              "x2": 515,
              "y2": 5,
              "lineWidth": 1
            }
          ]
        },
        {
          "text": "PRODUCT SATISFACTION REPORT",
          "bold": true,
          "fontSize": 12,
          "alignment": "center",
          "decoration": "underline",
          "margin": [
            0,
            5,
            0,
            5
          ]
        },
        {
          "ol": [
            "This is to acknowledge and confirm that we have got our vehicle bearing above Registration No.: " + certificate.car_reg_number + " fitted with Electronic Speed Limitation Device, manufactured by Gemeni Enterprises bearing SR.NO.: " + certificate.device.sld_number + " & Model No.: GESLD118",
            "After fitting the Electronic speed limiter my vehicle speed is not exceeding more than 80 km/hr and are working satisfactory.",
            "We undertake not to raise any dispute or any legal claims against Gemeni Enterprises in the event that the above mentioned seals are found broken/torn/tampered and more specifically with the respect to any variation in the speed limit set after fittment, after expiry of warranty period of 12 months from the date of installation."
          ],
          "fontSize": 9
        },
        {
          "columns": [
            {
              "text": "Department of Transport",
              "alignment": "center",
              "bold": true
            },
            {
              "text": "Dealer stamp & sign",
              "alignment": "center",
              "bold": true
            },
            {
              "text": "Customer sign",
              "alignment": "center",
              "bold": true
            }
          ],
          "margin": [
            0,
            60,
            0,
            0
          ]
        }
      ],
      styles: {
        header: {
          bold: true,
          alignment: "center",
          margin: [0, -10, 0, 0]
        }
      }
    }
    this.printIcat(certificate);
  }

  printIcat(certificate: Certificate) {
    let icats = [];
    certificate.vehicle.icats.map(icat => {
      icat.pages.map(page => {
        let base64 = this.icats_global.find(data => data.url == page.page_url);
        icats.push({
          image: base64.data,
          fit: [595, 842],
          margin: [-35, -30, 0, 0],
          pageBreak: 'before'
        });
      });
    });
    this.certificateDoc.content.push(icats);
  }

  certificateActions(type: boolean) {
    let count: number = this.getCertficateIcatPageCount(this.certificate);
    let totalPageCount = count;
    if (this.certificate.vehicle.icats.length == 0) {
      this.certificate.due_date = moment(this.certificate.due_date).subtract(1, 'day').toDate();
      this.createCertificate(this.certificate);
      type ? pdfMake.createPdf(this.certificateDoc).download(this.certificate.certificate_number + ".pdf") : pdfMake.createPdf(this.certificateDoc).print();
      toast({
        type: 'success',
        title: (type ? "Download" : "Print") + "ing..."
      });
    } else {
      this.certificate.vehicle.icats.map(icat => {
        icat.pages.map(page => {
          this.getBase64ImageFromURL(page.page_url).subscribe(data => {
            toast({
              title: 'Downloading ' + (totalPageCount - count + 1) + ' of ' + totalPageCount
            });
            toast.showLoading();
            this.icats_global.push(data);
            if (count == 1) {
              this.certificate.due_date = moment(this.certificate.due_date).subtract(1, 'day').toDate();
              this.createCertificate(this.certificate);
              type ? pdfMake.createPdf(this.certificateDoc).download(this.certificate.certificate_number + ".pdf") : pdfMake.createPdf(this.certificateDoc).print();
              toast({
                type: 'success',
                title: (type ? "Download" : "Print") + "ing..."
              });
            } else {
              count -= 1;
            }
          })
        });
      });
    }
  }

  getCertficateIcatPageCount(certificate: Certificate): number {
    let count: number = 0;
    certificate.vehicle.icats.map(icat => {
      icat.pages.map((page, index) => {
        count++;
      });
    });
    return count;
  }

  getBase64ImageFromURL(url: string): Observable<IcatData> {
    return Observable.create((observer: Observer<IcatData>) => {
      this._http.get(environment.token_auth_config.apiBase + url, { responseType: 'blob', observe: 'response' }).pipe(retry(10)).subscribe(
        resp => {
          var reader = new FileReader();
          reader.readAsDataURL(resp.body);
          reader.onloadend = function () {
            observer.next(new IcatData({
              url: url,
              data: reader.result
            }));
            observer.complete();
          }
        },
        err => {
          toast({
            type: 'error',
            title: err.name
          });
        }
      );
    });
  }
}