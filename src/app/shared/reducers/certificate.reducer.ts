import { Certificate, PageData } from '../models';

import * as certificateActions from '../actions/certificate.actions';

export interface State {
  allCertificates: Certificate[];
  currentCertificate: Certificate;
  certificateFormdata: any;
  currentCertificatePageStatus: PageData;
}

const initialState: State = {
  allCertificates: [],
  currentCertificate: new Certificate({}),
  certificateFormdata: null,
  currentCertificatePageStatus: new PageData({})
};

export function reducer(state = initialState, action: certificateActions.Actions): State {
  let certificates: Certificate[] = [];
  switch (action.type) {
    case certificateActions.FETCH_ALL_CERTIFICATES_COMPLETE_ACTION:
      certificates = action.payload.data.map(certificate => new Certificate(certificate));
      return Object.assign({}, state, {
        allCertificates: [...certificates],
        currentCertificatePageStatus: new PageData({
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
    case certificateActions.ISSUE_CERTIFICATE_ACTION:
      certificates = action.payload.map(certificate => new Certificate(certificate));
      return Object.assign({}, state, {
        allCertificates: [...state.allCertificates.map(certificate => certificate.id != action.payload.id ? certificate : new Certificate(action.payload))]
      });
    case certificateActions.DELETE_CERTIFICATE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allCertificates: [...state.allCertificates.filter(certificate => certificate.id != state.currentCertificate.id ? certificate : null)],
        currentCertificate: new Certificate({})
      });
    case certificateActions.DELETE_CERTIFICATE_ACTION:
      return Object.assign({}, state, {
        currentCertificate: new Certificate({
          id: action.payload
        })
      });
    case certificateActions.UPDATE_CERTIFICATE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allCertificates: [...state.allCertificates.map(certificate => certificate.id != action.payload.id ? certificate : new Certificate(action.payload))]
      });
    case certificateActions.CREATE_CERTIFICATE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allCertificates: [...state.allCertificates, new Certificate(action.payload)]
      });
    case certificateActions.DELETE_CERTIFICATE_FAILED_ACTION:
      return Object.assign({}, state, {
        currentCertificate: new Certificate({})
      });
    case certificateActions.FETCH_CERTIFICATE_FORMDATA_COMPLETE_ACTION:
      return Object.assign({}, state, {
        certificateFormdata: action.payload
      });
    default:
      return state;
  }
}
