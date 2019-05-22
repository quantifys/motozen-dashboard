import { Certificate, PageData, User } from '../models';

import * as certificateActions from '../actions/certificate.actions';

export interface State {
  allCertificates: Certificate[];
  reportCertificates: Certificate[];
  currentCertificate: Certificate;
  certificateFormdata: any;
  vehicleFormData: any;
  certificateFilterUsers: User[];
  certificatePageStatus: PageData;
  isUnique: boolean;
}

const initialState: State = {
  allCertificates: [],
  reportCertificates: [],
  currentCertificate: new Certificate({}),
  certificateFormdata: null,
  vehicleFormData: null,
  certificateFilterUsers: [],
  certificatePageStatus: new PageData({}),
  isUnique: false
};

export function reducer(state = initialState, action: certificateActions.Actions): State {
  let certificates: Certificate[] = [];
  switch (action.type) {
    case certificateActions.FETCH_ALL_CERTIFICATES_ACTION:
      return Object.assign({}, state, {
        allCertificates: []
      });
    case certificateActions.FETCH_ALL_CERTIFICATES_COMPLETE_ACTION:
      certificates = action.payload.data.map(certificate => new Certificate(certificate));
      return Object.assign({}, state, {
        allCertificates: [...certificates],
        certificatePageStatus: new PageData({
          total: action.payload.total,
          per_page: action.payload.per_page,
        })
      });
    case certificateActions.FETCH_CERTIFICATE_ACTION:
      return Object.assign({}, state, {
        currentCertificate: new Certificate({})
      });
    case certificateActions.FETCH_CERTIFICATE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        currentCertificate: new Certificate(action.payload)
      });
    case certificateActions.RENEW_CERTIFICATE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        currentCertificate: new Certificate(action.payload)
      });
    case certificateActions.ISSUE_CERTIFICATE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        currentCertificate: new Certificate(action.payload)
      });
    case certificateActions.DELETE_CERTIFICATE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allCertificates: [...state.allCertificates.filter(certificate => certificate.id !== action.payload ? certificate : null)],
        currentCertificate: new Certificate({})
      });
    case certificateActions.UPDATE_CERTIFICATE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allCertificates: [...state.allCertificates.map(certificate =>
          certificate.id !== action.payload.id ? certificate : new Certificate(action.payload))]
      });
    case certificateActions.CREATE_CERTIFICATE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allCertificates: [...state.allCertificates, new Certificate(action.payload)]
      });
    case certificateActions.FETCH_CERTIFICATE_FORMDATA_COMPLETE_ACTION:
      return Object.assign({}, state, {
        certificateFormdata: action.payload
      });
    case certificateActions.FETCH_CREATE_CERTIFICATE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        vehicleFormData: action.payload
      });
    case certificateActions.CLEAR_CERTIFICATE_DATA_ACTION:
      return Object.assign({}, state, {
        currentCertificate: new Certificate({}),
        isUnique: false
      });
    case certificateActions.FETCH_CERTIFICATE_FILTER_FORMDATA_COMPLETE_ACTION:
      return Object.assign({}, state, {
        certificateFilterUsers: [...action.payload.customers.filter(user => new User(user))]
      });
    case certificateActions.FETCH_CERTIFICATE_CSV_REPORT_ACTION:
      return Object.assign({}, state, {
        reportCertificates: []
      });
    case certificateActions.FETCH_CERTIFICATE_CSV_REPORT_COMPLETE_ACTION:
      return Object.assign({}, state, {
        reportCertificates: [...action.payload.filter(certificate => new Certificate(certificate))]
      });
    case certificateActions.FETCH_CERTIFICATE_CSV_REPORT_FAILED_ACTION:
      return Object.assign({}, state, {
        reportCertificates: []
      });
    case certificateActions.CERTIFICATE_CHECK_UNIQUE_ACTION:
      return Object.assign({}, state, {
        isUnique: false
      });
    case certificateActions.CERTIFICATE_CHECK_UNIQUE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        isUnique: true
      });
    case certificateActions.CERTIFICATE_CHECK_UNIQUE_FAILED_ACTION:
      return Object.assign({}, state, {
        isUnique: false
      });
    default:
      return state;
  }
}
