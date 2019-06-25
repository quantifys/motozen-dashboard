import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { DatePipe } from '@angular/common';

import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as pdfMake from 'pdfmake/build/pdfmake';

import * as fromRoot from '../../shared/reducers';
import { TrackerCertificate } from './../models';

@Injectable({
  providedIn: 'root'
})
export class TrackerCertificateService {
  private certificate: TrackerCertificate = new TrackerCertificate({});
  public certificateDoc: any;

  constructor(
    private _store: Store<fromRoot.State>,
    private _datePipe: DatePipe
  ) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    this._store.select(fromRoot.getCurrentTrackerCertificate).subscribe(certificate => this.certificate = certificate);
  }

  createCertificate(certificate: TrackerCertificate): any {
    const general = {
      pageSize: 'A4',
      watermark: {
        text: 'Gemeni',
        color: 'grey',
        opacity: 0.2,
        fontSize: 20
      },
      content: [
        this.generateGeneralContent(certificate, 'RTA'),
        this.generateGeneralContent(certificate, 'Customer')
      ],
      styles: {
        header: {
          bold: true,
          alignment: 'center',
          margin: [0, -20, 0, 0]
        }
      }
    };
    this.certificateDoc = general;
    this.certificateDoc['defaultStyle'] = {
      font: 'NotoSans',
      fontSize: 10
    };
  }

  generateGeneralContent(certificate: TrackerCertificate, type: string): any[] {
    return [
      {
        'columns': [
          [
            {
              'qr': 'GEMENI ENTERPRISES GOA\nSERIAL_NUMBER: ' + certificate.device.serial_no + '\nCERTIFICATE NUMBER: '
                + certificate.certificate_number + '\nDATE GENERATED: ' + this._datePipe.transform(certificate.date_generated, 'yyyy-MM-dd')
                + '\nDUE DATE: ' + this._datePipe.transform(certificate.due_date, 'yyyy-MM-dd') + '\nCHASSIS NUMBER: '
                + certificate.chassis_number + '\nENGINE NUMBER: ' + certificate.engine_number + '\nCUSTOMER NAME: '
                + certificate.customer_name + '\nCAR REG NUMBER: ' + certificate.car_reg_number + '\nTesting Report Number: CTOG00090',
              'fit': 140
            },
            {
              'text': 'To,',
              'bold': true,
              'margin': [
                0,
                10,
                0,
                0
              ]
            },
            {
              'text': 'The Regional\n' + certificate.location_rto + ', ' + certificate.location_state,
            }
          ],
          [
            {
              'text': 'GEMENI',
              'style': 'header',
              'fontSize': 35
            },
            {
              'text': '309, 3rd Floor, Citi Centre,\nPatto, Panaji, Goa - 403001\ncustomercare@gemeniindia.com\nwww.gemeniindia.com',
              'alignment': 'center',
              'margin': [
                0,
                0,
                0,
                5
              ]
            },
            {
              'text': this.certificate.renewal_count === 0 ? 'Fitment Assurance' : 'Re-Calibration' + ' Certificate',
              'alignment': 'center',
              'fontSize': 14,
              'bold': true
            }
          ],
          [
            {
              'text': type + ' COPY',
              'background': 'grey',
              'color': 'white',
              'alignment': 'right'
            },
            {
              'text': [
                'Fitment Certificate No.: ',
                {
                  'text': certificate.certificate_number,
                  'bold': true
                }
              ],
              'fontSize': 11,
              'alignment': 'right',
              'margin': [
                0,
                50,
                0,
                0
              ]
            },
            {
              'text': [
                'Issuing Date: ',
                {
                  'text': this._datePipe.transform(certificate.date_generated, 'yyyy-MM-dd'),
                  'bold': true
                }
              ],
              'fontSize': 11,
              'alignment': 'right'
            },
            {
              'text': [
                'Renewal Date: ',
                {
                  'text': this._datePipe.transform(certificate.due_date, 'yyyy-MM-dd'),
                  'bold': true
                }
              ],
              'fontSize': 11,
              'alignment': 'right'
            }
          ]
        ]
      },
      {
        'text': [
          'This is to assure that fitment for customer ',
          {
            'text': certificate.customer_name,
            'bold': true
          },
          ' of VTS (Vehicle Tracking System) device with details:'
        ],
        'margin': [
          0,
          5,
          0,
          0
        ]
      },
      {
        text: [
          {
            'text': 'Serial Number: '
          },
          {
            'text': certificate.device.serial_no,
            bold: true
          }
        ],
        alignment: 'center',
        margin: [0, 0, 0, 5]
      },
      {
        'table': {
          'widths': [
            '*',
            '*'
          ],
          'body': [
            [
              {
                'text': [
                  {
                    'text': 'Customer Name: ',
                    'alignment': 'left'
                  },
                  {
                    'text': certificate.customer_name,
                    'alignment': 'center',
                    'bold': true
                  }
                ]
              },
              {
                'text': [
                  {
                    'text': 'Customer Contact: ',
                    'alignment': 'left'
                  },
                  {
                    'text': certificate.customer_telephone,
                    'alignment': 'center',
                    'bold': true
                  }
                ]
              }
            ],
            [
              {
                'text': [
                  {
                    'text': 'Customer Address:\n',
                    'alignment': 'left'
                  },
                  {
                    'text': certificate.customer_address,
                    'bold': true
                  }
                ],
                colSpan: 2
              }
            ],
            [
              {
                'text': [
                  {
                    'text': 'Vehicle make: ',
                    'alignment': 'left'
                  },
                  {
                    'text': certificate.make,
                    'alignment': 'center',
                    'bold': true
                  }
                ]
              },
              {
                'text': [
                  {
                    'text': 'Vehicle model: ',
                    'alignment': 'left'
                  },
                  {
                    'text': certificate.model,
                    'alignment': 'center',
                    'bold': true
                  }
                ]
              }
            ],
            [
              {
                'text': [
                  {
                    'text': 'Registration number: ',
                    'alignment': 'left'
                  },
                  {
                    'text': certificate.car_reg_number,
                    'alignment': 'center',
                    'bold': true
                  }
                ],
              },
              {
                'text': [
                  {
                    'text': 'Invoice No: ',
                    'alignment': 'left'
                  },
                  {
                    'text': certificate.invoice_no,
                    'alignment': 'center',
                    'bold': true
                  }
                ],
              }
            ],
            [
              {
                'text': [
                  {
                    'text': 'Engine No.: ',
                    'alignment': 'left'
                  },
                  {
                    'text': certificate.engine_number,
                    'alignment': 'center',
                    'bold': true
                  }
                ]
              },
              {
                'text': [
                  {
                    'text': 'Chassis No.: ',
                    'alignment': 'left'
                  },
                  {
                    'text': certificate.chassis_number,
                    'alignment': 'center',
                    'bold': true
                  }
                ]
              }
            ],
            [
              {
                'text': [
                  {
                    'text': 'Vehicle mfg date: ',
                    'alignment': 'left'
                  },
                  {
                    'text': this._datePipe.transform(certificate.mfg_month_year, 'yyyy-MM-dd'),
                    'alignment': 'center',
                    'bold': true
                  }
                ]
              },
              {
                'text': [
                  {
                    'text': 'Vehicle reg date: ',
                    'alignment': 'left'
                  },
                  {
                    'text': this._datePipe.transform(certificate.reg_month_year, 'yyyy-MM-dd'),
                    'alignment': 'center',
                    'bold': true
                  }
                ]
              }
            ],
            [
              {
                'text': [
                  {
                    'text': 'VTS Type.: ',
                    'alignment': 'left'
                  },
                  {
                    'text': 'AIS 140 - (IRNSS + GPS)',
                    'alignment': 'center',
                    'bold': true
                  }
                ]
              },
              {
                'text': [
                  {
                    'text': 'IMEI No.: ',
                    'alignment': 'left'
                  },
                  {
                    'text': certificate.device.imei,
                    'alignment': 'center',
                    'bold': true
                  }
                ]
              }
            ],
            [
              {
                'text': [
                  {
                    'text': 'TAC No.: ',
                    'alignment': 'left'
                  },
                  {
                    'text': 'CK8066',
                    'alignment': 'center',
                    'bold': true
                  }
                ]
              },
              {
                'text': [
                  {
                    'text': 'Testing Report No.: ',
                    'alignment': 'left'
                  },
                  {
                    'text': 'CTOG00090',
                    'alignment': 'center',
                    'bold': true
                  }
                ]
              }
            ],
            [
              {
                'text': [
                  {
                    'text': 'Model No: ',
                    'alignment': 'left'
                  },
                  {
                    'text': 'GEMVTS118',
                    'alignment': 'center',
                    'bold': true
                  }
                ]
              },
              {
                'text': [
                  {
                    'text': 'Part No.',
                    'alignment': 'left'
                  },
                  {
                    'text': 'VTS1579',
                    'alignment': 'center',
                    'bold': true
                  }
                ]
              }
            ],
            [
              {
                'text': [
                  {
                    'text': 'ESIM 1 No.: ',
                    'alignment': 'left'
                  },
                  {
                    'text': certificate.device.esim1,
                    'alignment': 'center',
                    'bold': true
                  }
                ]
              },
              {
                'text': [
                  {
                    'text': 'ESIM 2 No.',
                    'alignment': 'left'
                  },
                  {
                    'text': certificate.device.esim2,
                    'alignment': 'center',
                    'bold': true
                  }
                ]
              }
            ]
          ]
        }
      },
      {
        'text': this.certificate.renewal_count === 0 ? 'was completed successfully.' : 'is renewed successfully.',
        'margin': [
          0,
          5,
          0,
          5
        ]
      },
      {
        'text': 'The above mentioned fitment complies with ISO standard 9001:2015 and is tamper proof to the best of the certifying '
          + 'authority\'s knowledge. Our fitments comply with ICAT norms AIS-140. The manufacturer is not responsible for any misuse '
          + 'or malpractice towards the' + (this.certificate.renewal_count === 0 ? '' : ' renewal')
          + ' certificate. Any liability towards fitment made without iCAT vehicle approval or without following '
          + 'manufacturers T&C will borne solely by the dealer.',
        'alignment': 'justify',
        'fontSize': 9
      },
      {
        columns: [
          {
            'text': [
              'Dealer Name:\n',
              {
                text: certificate.user.name,
                bold: true
              }
            ]
          },
          {
            'text': [
              'Dealer Address:\n',
              {
                text: certificate.user.details.address,
                bold: true
              }
            ]
          }
        ],
        fontSize: 11,
        margin: [0, 5, 0, 5]
      },
      {
        'canvas': [
          {
            'type': 'line',
            'x1': 0,
            'y1': 5,
            'x2': 515,
            'y2': 5,
            'lineWidth': 1
          }
        ]
      },
      {
        'text': 'PRODUCT SATISFACTION REPORT',
        'bold': true,
        'fontSize': 12,
        'alignment': 'center',
        'decoration': 'underline',
        'margin': [
          0,
          5,
          0,
          5
        ]
      },
      {
        'ol': [
          'This is to acknowledge and confirm that we have got our vehicle bearing above Registration No.: '
          + certificate.car_reg_number +
          ' fitted with VTS Device, manufactured by Gemeni Enterprises bearing SR.NO.: '
          + certificate.device.serial_no + ' & Model No.: GEMVTS118'
          + (this.certificate.renewal_count === 0 ? '' : ' and same has been re-calibrated.'),
          'After ' + (this.certificate.renewal_count === 0 ? 'fitting' : 're-calibrating')
          + ' the VTS my vehicle is working satisfactorily.',
          'We undertake not to raise any dispute or any legal claims against Gemeni Enterprises in the event that the above mentioned '
          + 'seals are found broken/torn/tampered after expiry of warranty period of 12 months from the date of installation'
          + (this.certificate.renewal_count === 0 ? '.' : ' and renewal.')
        ],
        'fontSize': 9
      },
      {
        'columns': [
          {
            'text': 'Department of Transport',
            'alignment': 'center',
            'bold': true
          },
          {
            'text': 'Dealer stamp & sign',
            'alignment': 'center',
            'bold': true
          },
          {
            'text': 'Customer sign',
            'alignment': 'center',
            'bold': true
          }
        ],
        'margin': [
          0,
          30,
          0,
          0
        ],
        'pageBreak': type === 'RTA' ? 'after' : null
      }
    ];
  }

  certificateActions(type: boolean) {
    pdfMake.fonts = {
      NotoSans: {
        normal: 'NotoSans-Regular.ttf',
        bold: 'NotoSans-Bold.ttf',
        italics: 'NotoSans-Regular.ttf',
        bolditalics: 'NotoSans-Regular.ttf'
      }
    };
    this.createCertificate(this.certificate);
    type ? pdfMake.createPdf(this.certificateDoc).download(this.certificate.certificate_number + '.pdf')
      : pdfMake.createPdf(this.certificateDoc).print();
  }
}
