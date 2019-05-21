import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { retry } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';

import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as pdfMake from 'pdfmake/build/pdfmake';

import * as fromRoot from '../../shared/reducers';
import { Certificate, PictureData } from './../models';

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
  private icats_global: PictureData[] = [];
  private picture_data: PictureData = new PictureData({});

  constructor(
    private _store: Store<fromRoot.State>,
    private _http: HttpClient,
    private _datePipe: DatePipe
  ) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    this._store.select(fromRoot.getCurrentCertificate).subscribe(certificate => this.certificate = certificate);
  }

  createCertificate(certificate: Certificate): any {
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
    const delhiCertificate = {
      pageSize: 'A4',
      watermark: {
        text: 'Gemeni',
        color: 'grey',
        opacity: 0.2,
        fontSize: 20
      },
      'content': [
        {
          'columns': [
            {
              'qr': 'GEMENI ENTERPRISES GOA\nSLD_NUMBER: ' + certificate.device.sld_number + '\nCERTIFICATE NUMBER: '
                + certificate.certificate_number + '\nDATE GENERATED: ' + this._datePipe.transform(certificate.date_generated, 'yyyy-MM-dd')
                + '\nDUE DATE: ' + this._datePipe.transform(certificate.due_date, 'yyyy-MM-dd') + '\nCHASSIS NUMBER: '
                + certificate.chassis_number + '\nENGINE NUMBER: ' + certificate.engine_number + '\nCUSTOMER NAME: '
                + certificate.customer_name + '\nCAR REG NUMBER: ' + certificate.car_reg_number + '\nTesting Report Number: '
                + certificate.vehicle.report_no,
              'fit': 120
            },
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
              }
            ],
            {
              'columns': [
                {

                },
                {
                  image: this.picture_data.data,
                  width: 100,
                  'alignment': 'right'
                }
              ]
            }
          ]
        },
        {
          'text': [
            'Certificate Serial No.: ',
            {
              'text': certificate.certificate_number,
              'bold': true
            }
          ],
          'fontSize': '11',
          'margin': [
            0,
            5,
            0,
            5
          ]
        },
        {
          'text': 'MAXIMUM PRE SET SPEED LIMIT TEST CERTIFICATE',
          'fontSize': '13',
          'alignment': 'center',
          'decoration': 'underline',
          'bold': true,
          'margin': [
            0,
            0,
            0,
            2
          ]
        },
        {
          'text': '(AS PER PROVISION OF PARA NO. 5 OF NOTIFICATION NO. MLO (VIU)/ TPT/2017/165/315 DATED 17.07.2018)',
          'fontSize': '9',
          'alignment': 'center',
          'bold': true,
          'margin': [
            0,
            0,
            0,
            10
          ]
        },
        {
          'columns': [
            {
              'text': [
                'Registration No.: ',
                {
                  'text': certificate.car_reg_number,
                  'bold': true
                },
                '\nChassis No.: ',
                {
                  'text': certificate.chassis_number,
                  'bold': true
                },
                '\nEngine No.: ',
                {
                  'text': certificate.engine_number,
                  'bold': true
                },
                '\n\nVehicle Type: ',
                {
                  'text': certificate.vehicle.category,
                  'bold': true
                },
                '\n(LMV/MHV/HMV/Taxi etc)\n(Passenger/goods)\n\nMake & Model: ',
                {
                  'text': certificate.vehicle.make + ', ' + certificate.vehicle.model + ' ' + certificate.vehicle.variant,
                  'bold': true
                },
                '\n\nDate of check: ',
                {
                  'text': this._datePipe.transform(certificate.date_generated, 'yyyy-MM-dd'),
                  'bold': true
                },
              ]
            },
            {
              'text': [
                'Dealer Name: ',
                {
                  'text': certificate.user.name,
                  'bold': true
                },
                '\nDealer Address:\n',
                {
                  'text': certificate.user.details.address,
                  'bold': true
                },
                '\n\n\nCut-off speed: ',
                {
                  'text': certificate.cutoff_speed + 'kmph',
                  'bold': true
                },
                '\n\nDue date: ',
                {
                  'text': this._datePipe.transform(certificate.due_date, 'yyyy-MM-dd'),
                  'bold': true
                },
              ]
            }
          ]
        },
        {
          'columns': [
            {
              'text': [
                '\nECU/SLD Identification No.: ',
                {
                  'text': certificate.device.sld_number,
                  'bold': true
                },
                '\n\nSpeed Governor type approval No.: ',
                {
                  'text': 'GESLD118',
                  'bold': true
                },
                '\n\nRoto seal serial No.: ',
                {
                  'text': certificate.seals,
                  'bold': true
                },
                {
                  'text': '\n\nTHE AFORESAID VEHICLE HAS BEEN CHECKED/TESTED FOR OPERATING SPEED LIMIT AS PER DELHI GAZETTE '
                    + 'NOTIFICATION F.NO. MLO(VIU)/TPT/20147/165/315 DATED 17.07.2018 AND SUBSEQUENT CIRCULAR ISSUED BY TRANSPORT '
                    + 'DEPARTMENT. IT IS CERTIFIED THAT THE VEHICLE HAS PASSED THE TEST AND IS NOT RUNNING MORE THAN 80KM/HR SPEED AS '
                    + 'PER THE PERMIT CONDITION i.e. __________________',
                  'alignment': 'justify',
                  'fontSize': '9'
                },
                {
                  'text': '\nNAME OF THE CENTRE\n\n...........................................',
                  'alignment': 'right',
                  'fontSize': '9'
                },
                {
                  'text': '\nSIGNATURE WITH STAMP\n(AUTHORIZED SIGNATORY)',
                  'alignment': 'right',
                  'bold': true
                }
              ]
            }
          ]
        },
        {
          'text': [
            {
              'text': '\nUndertaking',
              'alignment': 'center',
              'bold': true
            },
            {
              'text': '\nI have checked the function of Speed Governor and its sealing. I am satisfied with the Speed Limit test. '
                + 'I undertake that I will not tamper with Speed Governor or the seal.',
              'alignment': 'justify'
            },
            {
              'text': '\n\n\nSignature of Owner/Driver',
              'bold': true,
              'alignment': 'right'
            },
            {
              'text': '\n\nNote:- The vehicle should be produced for grant or renewal of Certificate of fitness within 15 days '
                + 'of issurance of this certificate.',
              'bold': true,
              'alignment': 'justify',
              'decoration': 'underline'
            }
          ],
          'pageBreak': 'after'
        },
        {
          'text': 'GUIDELINES FOR DRIVER/VEHICLE OWNER',
          'bold': true,
          'fontSize': 20,
          'alignment': 'center',
          'decoration': 'underline',
          'margin': [
            0,
            0,
            0,
            10
          ]
        },
        {
          'ol': [
            'THE DRIVER OF MOTOR VEHICLE WILL NOT TAMPER THE SPEED GOVERNOR IN ANY CIRCUMSTANCES. IN CASE, SPEED GOVERNOR OR ROTO SEAL '
            + 'OF THE VEHICLE IS FOUND TAMPERED WITH, IT SHALL BE PUNISHABLE UNDER THE PROVISIONS OF PERMIT CONDITION UNDER SECTION '
            + '66/192A OF MV ACT, 1988, WHICH MAY EXTEND TO IMPOUNDING OF VEHICLE AND CAN ALSO EXTEND TO IMPRISONMENT OF THE DRIVER '
            + 'OR THE OWNER OF THE VEHICLE.',
            'WHENEVER THE DRIVER/OWNER FINDS THAT THE VEHICLE IS RUNNING BEYOND PRESCRIBED SPEED LIMITS. IT MUST BE REPAIRED '
            + 'IMMEDIATELY FROM VEHICLE MANUFACTURER OF ITS AUTHORISED REPRESENTATIVE, AFTER OBTAINING PRIOR PERMISSION FROM VEHICLE '
            + 'INSPECTION UNIT BURARI, FAILING WHICH ACTION u/s 66 OF MV ACT, 1988 WILL BE TAKEN. THE DRIVER/OWNER CANNOT USE HIS VEHICLE '
            + 'FOR HIRE-REWARD PURPOSE WHEN THE SPEED GOVERNOR IS NOT FUNCTIONING OR IS DEFECTIVE.',
            'THE DRIVER/OWNER MUST TAKE ALL POSSIBLE PREVENTION TO PROTECT THE SPEED GOVERNOR MECHANISM DURING THE OPERATION OF '
            + 'VEHICLE OR REPAIRING FOR OTHER ASSEMBLES e.g. GEAR BOX, CLUTCH, ENGINE OR UNDER CARRIAGE.'
          ],
          'bold': true,
          'alignment': 'justify',
          'margin': [
            0,
            0,
            0,
            30
          ]
        },
        {
          'ul': [
            'मोटर वाहन का चालक किसी भी परिस्थिती में स्पीड त्रावर्लर जहींछेडछाड कोआ । मामले में, वाहन के स्पीड त्राबर्लर जा '
            + 'रौटो सील के खाद्य छेडछाड ठी त्रार्द्ध जाई है, यह श्रीश ३६/१९१ ए के तहत अनुमति शर्तों के प्रावधानों के तहत '
            + 'निर्विवाद होया, यदि एमवी उधिजिद्धम, है के ८८, जो कि वाहन ठी जब्त अले के लिए विस्तारित हो मलता है भी या '
            + 'भी समाप्त हो सकता है वाहन जो नकल और वाहन के मालिक ठी जब्त के लिए भी विस्तारित है ।',
            'जव भी चालक / मालिक पता चलता है कि वाहन क्योंड सिमित सीमाओं से आने बद रहा है । इसे अपने अधिकृत '
            + 'प्रतिनिधियों के वाहन निर्माता से तत्काल मरम्मत ठी जाली चाहिए, वाहन निरीक्षण युनिट बुरी से प्राथमिक अनुमति '
            + 'प्राप्त ठाले के जाव, एमएबी उशिजिद्धम, ८३ के तहत ठायंटाही ठी कास्तार्द होओ । चालक/स्वामी अपने रिवाड प्रयोजन '
            + 'के लिए अपने वाहन का उपयोग नहीं का सकते है जव ज्योंड बावजी बम नहीं ठा यहा है जा दोषपूर्ग है ।',
            'चालक/मालिक को वाहन के संचालन जा अन्य सहयोगियों के लिए मरम्मत के दौरान क्योंड डावर्लर र्मकेनिजम ठी सुरक्षा के '
            + 'लिए अभी संमावित शेमद्याम करजा होआ । शिखा बाँक्स, क्लच, इंजन जा केरीज के तहत ।'
          ],
          'bold': true,
          'alignment': 'justify'
        }
      ],
      defaultStyle: {
        font: 'NotoSans'
      },
      styles: {
        header: {
          bold: true,
          alignment: 'center',
          margin: [0, -15, 0, 0]
        }
      }
    };
    this.certificateDoc = general;
    if (this.certificate.location_state === 'Delhi') {
      this.certificateDoc = delhiCertificate;
    }
    this.certificateDoc['defaultStyle'] = {
      font: 'NotoSans',
      fontSize: 10
    };
    if (this.certificate.location_state !== 'Delhi') {
      this.printIcat(certificate);
    }
  }

  generateGeneralContent(certificate: Certificate, type: string): any[] {
    return [
      {
        'columns': [
          [
            {
              'qr': 'GEMENI ENTERPRISES GOA\nSLD_NUMBER: ' + certificate.device.sld_number + '\nCERTIFICATE NUMBER: '
                + certificate.certificate_number + '\nDATE GENERATED: ' + this._datePipe.transform(certificate.date_generated, 'yyyy-MM-dd')
                + '\nDUE DATE: ' + this._datePipe.transform(certificate.due_date, 'yyyy-MM-dd') + '\nCHASSIS NUMBER: '
                + certificate.chassis_number + '\nENGINE NUMBER: ' + certificate.engine_number + '\nCUSTOMER NAME: '
                + certificate.customer_name + '\nCAR REG NUMBER: ' + certificate.car_reg_number + '\nTesting Report Number: '
                + certificate.vehicle.report_no,
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
              'text': 'Fitment Assurance Certificate',
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
          ' of speed governer device with details:'
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
            'text': 'SLD Number: '
          },
          {
            'text': certificate.device.sld_number,
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
                    'text': certificate.vehicle.make,
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
                    'text': certificate.vehicle.model + ' ' + certificate.vehicle.variant,
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
                    'text': 'SLD Type.: ',
                    'alignment': 'left'
                  },
                  {
                    'text': 'Electronic speed limiting device',
                    'alignment': 'center',
                    'bold': true
                  }
                ]
              },
              {
                'text': [
                  {
                    'text': 'Model No.: ',
                    'alignment': 'left'
                  },
                  {
                    'text': 'GESLD118',
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
                    'text': 'Part No.: ',
                    'alignment': 'left'
                  },
                  {
                    'text': '1579GE',
                    'alignment': 'center',
                    'bold': true
                  }
                ]
              },
              {
                'text': [
                  {
                    'text': 'TAC No.: ',
                    'alignment': 'left'
                  },
                  {
                    'text': certificate.vehicle.tac_number,
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
                    'text': 'Cut-Off Speed: ',
                    'alignment': 'left'
                  },
                  {
                    'text': certificate.cutoff_speed + 'km/hr',
                    'alignment': 'center',
                    'bold': true
                  }
                ]
              },
              {
                'text': [
                  {
                    'text': 'Seal number / No of Seals.: ',
                    'alignment': 'left'
                  },
                  {
                    'text': certificate.seals,
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
                    'text': 'Testing Report No: ',
                    'alignment': 'left'
                  },
                  {
                    'text': certificate.vehicle.report_no,
                    'alignment': 'center',
                    'bold': true
                  }
                ]
              },
              {
                'text': [
                  {
                    'text': '',
                    'alignment': 'left'
                  },
                  {
                    'text': '',
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
        'text': 'was compconsted successfully.',
        'margin': [
          0,
          5,
          0,
          5
        ]
      },
      {
        'text': 'The above mentioned fitment complies with ISO standard 9001:2015 and is tamper proof to the best of the certifying '
          + 'authority\'s knowledge. Our fitments comply with ICAT norms AIS-018. The manufacturer is not responsible for any misuse '
          + 'or malpractice towards the certifcate. Any liability towards fitment made without iCAT vehicle approval or without following '
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
          ' fitted with Electronic Speed Limitation Device, manufactured by Gemeni Enterprises bearing SR.NO.: '
          + certificate.device.sld_number + ' & Model No.: GESLD118',
          'After fitting the Electronic speed limiter my vehicle speed is not exceeding more than 80 km/hr and are working satisfactory.',
          'We undertake not to raise any dispute or any legal claims against Gemeni Enterprises in the event that the above mentioned '
          + 'seals are found broken/torn/tampered and more specifically with the respect to any variation in the speed limit set after '
          + 'fitment, after expiry of warranty period of 12 months from the date of installation.'
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
        'pageBreak': 'after'
      }
    ];
  }

  printIcat(certificate: Certificate) {
    const icats = [];
    certificate.vehicle.icats.map((icat, indexIcat) => {
      icat.pages.map(page => {
        const base64 = this.icats_global.find(data => data.url === page.getPageUrl());
        const x: any = {
          image: base64.data,
          fit: [595, 842],
          margin: [-35, -30, 0, 0]
        };
        if (indexIcat > 0) {
          x['pageBreak'] = 'before';
        }
        icats.push(x);
      });
    });
    this.certificateDoc.content.push(icats);
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
    let count: number = this.getCertficateIcatPageCount(this.certificate);
    const totalPageCount = count;
    if (this.certificate.vehicle.icats.length === 0) {
      this.createCertificate(this.certificate);
      type ? pdfMake.createPdf(this.certificateDoc).download(this.certificate.certificate_number + '.pdf')
        : pdfMake.createPdf(this.certificateDoc).print();
      toast({
        type: 'success',
        title: (type ? 'Download' : 'Print') + 'ing...'
      });
    } else {
      if (this.certificate.location_state === 'Delhi') {
        this.getBase64ImageFromURL(this.certificate.picture_data.getPicUrl()).subscribe(data => {
          this.picture_data = data;
          if (data) {
            this.createCertificate(this.certificate);
            this.certificate.vehicle.icats.map(icat => {
              icat.pages.map(page => {
                this.getBase64ImageFromURL(page.getPageUrl()).subscribe(cont => {
                  toast({
                    title: 'Downloading ' + (totalPageCount - count + 1) + ' of ' + totalPageCount
                  });
                  toast.showLoading();
                  this.icats_global.push(cont);
                  if (count === 1) {
                    this.createCertificate(this.certificate);
                    this.printIcat(this.certificate);
                    type ? pdfMake.createPdf(this.certificateDoc).download(this.certificate.certificate_number + '.pdf')
                      : pdfMake.createPdf(this.certificateDoc).print();
                    toast({
                      type: 'success',
                      title: (type ? 'Download' : 'Print') + 'ing...'
                    });
                  } else {
                    count -= 1;
                  }
                });
              });
            });
          }
        });
      } else {
        this.certificate.vehicle.icats.map(icat => {
          icat.pages.map(page => {
            this.getBase64ImageFromURL(page.getPageUrl()).subscribe(data => {
              toast({
                title: 'Downloading ' + (totalPageCount - count + 1) + ' of ' + totalPageCount
              });
              toast.showLoading();
              this.icats_global.push(data);
              if (count === 1) {
                this.createCertificate(this.certificate);
                type ? pdfMake.createPdf(this.certificateDoc).download(this.certificate.certificate_number + '.pdf')
                  : pdfMake.createPdf(this.certificateDoc).print();
                toast({
                  type: 'success',
                  title: (type ? 'Download' : 'Print') + 'ing...'
                });
              } else {
                count -= 1;
              }
            });
          });
        });
      }
    }
  }

  getCertficateIcatPageCount(certificate: Certificate): number {
    let count = 0;
    certificate.vehicle.icats.map(icat => {
      icat.pages.map((page, index) => {
        count++;
      });
    });
    return count;
  }

  getBase64ImageFromURL(url: string): Observable<PictureData> {
    return Observable.create((observer: Observer<PictureData>) => {
      this._http.get(url, { responseType: 'blob', observe: 'response' }).pipe(retry(10)).subscribe(
        resp => {
          const reader: FileReader = new FileReader();
          reader.readAsDataURL(resp.body);
          reader.onloadend = function () {
            observer.next(new PictureData({
              url: url,
              data: reader.result
            }));
            observer.complete();
          };
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
