import { TrackerCertificate, PageData, User } from '../models';

import * as trackerCertificateActions from '../actions/tracker-certificate.actions';

export interface State {
  allTrackerCertificates: TrackerCertificate[];
  reportTrackerCertificates: TrackerCertificate[];
  currentTrackerCertificate: TrackerCertificate;
  trackerCertificateFormdata: any;
  trackerCertificateFilterUsers: User[];
  trackerCertificatePageStatus: PageData;
  isUnique: boolean;
}

const initialState: State = {
  allTrackerCertificates: [],
  reportTrackerCertificates: [],
  currentTrackerCertificate: new TrackerCertificate({}),
  trackerCertificateFormdata: null,
  trackerCertificateFilterUsers: [],
  trackerCertificatePageStatus: new PageData({}),
  isUnique: false
};

export function reducer(state = initialState, action: trackerCertificateActions.Actions): State {
  let trackerCertificates: TrackerCertificate[] = [];
  switch (action.type) {
    case trackerCertificateActions.FETCH_ALL_TRACKER_CERTIFICATES_ACTION:
      return Object.assign({}, state, {
        allTrackerCertificates: []
      });
    case trackerCertificateActions.FETCH_ALL_TRACKER_CERTIFICATES_COMPLETE_ACTION:
      trackerCertificates = action.payload.data.map(trackerCertificate => new TrackerCertificate(trackerCertificate));
      return Object.assign({}, state, {
        allTrackerCertificates: [...trackerCertificates],
        trackerCertificatePageStatus: new PageData({
          total: action.payload.total,
          per_page: action.payload.per_page,
        })
      });
    case trackerCertificateActions.FETCH_TRACKER_CERTIFICATE_ACTION:
      return Object.assign({}, state, {
        currentTrackerCertificate: new TrackerCertificate({})
      });
    case trackerCertificateActions.FETCH_TRACKER_CERTIFICATE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        currentTrackerCertificate: new TrackerCertificate(action.payload)
      });
    case trackerCertificateActions.RENEW_TRACKER_CERTIFICATE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        currentTrackerCertificate: new TrackerCertificate(action.payload)
      });
    case trackerCertificateActions.ISSUE_TRACKER_CERTIFICATE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        currentTrackerCertificate: new TrackerCertificate(action.payload)
      });
    case trackerCertificateActions.DELETE_TRACKER_CERTIFICATE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allTrackerCertificates: [...state.allTrackerCertificates.filter(trackerCertificate =>
          trackerCertificate.id !== action.payload ? trackerCertificate : null)],
        currentTrackerCertificate: new TrackerCertificate({})
      });
    case trackerCertificateActions.UPDATE_TRACKER_CERTIFICATE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allTrackerCertificates: [...state.allTrackerCertificates.map(trackerCertificate =>
          trackerCertificate.id !== action.payload.id ? trackerCertificate : new TrackerCertificate(action.payload))]
      });
    case trackerCertificateActions.CREATE_TRACKER_CERTIFICATE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allTrackerCertificates: [...state.allTrackerCertificates, new TrackerCertificate(action.payload)]
      });
    case trackerCertificateActions.FETCH_TRACKER_CERTIFICATE_FORMDATA_COMPLETE_ACTION:
      return Object.assign({}, state, {
        trackerCertificateFormdata: action.payload
      });
    case trackerCertificateActions.CLEAR_TRACKER_CERTIFICATE_DATA_ACTION:
      return Object.assign({}, state, {
        currentTrackerCertificate: new TrackerCertificate({}),
        isUnique: false
      });
    case trackerCertificateActions.FETCH_TRACKER_CERTIFICATE_FILTER_FORMDATA_COMPLETE_ACTION:
      return Object.assign({}, state, {
        trackerCertificateFilterUsers: [...action.payload.customers.filter(user => new User(user))]
      });
    case trackerCertificateActions.FETCH_TRACKER_CERTIFICATE_CSV_REPORT_ACTION:
      return Object.assign({}, state, {
        reportTrackerCertificates: []
      });
    case trackerCertificateActions.FETCH_TRACKER_CERTIFICATE_CSV_REPORT_COMPLETE_ACTION:
      return Object.assign({}, state, {
        reportTrackerCertificates: [...action.payload.filter(trackerCertificate => new TrackerCertificate(trackerCertificate))]
      });
    case trackerCertificateActions.FETCH_TRACKER_CERTIFICATE_CSV_REPORT_FAILED_ACTION:
      return Object.assign({}, state, {
        reportTrackerCertificates: []
      });
    case trackerCertificateActions.TRACKER_CERTIFICATE_CHECK_UNIQUE_ACTION:
      return Object.assign({}, state, {
        isUnique: false
      });
    case trackerCertificateActions.TRACKER_CERTIFICATE_CHECK_UNIQUE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        isUnique: true
      });
    case trackerCertificateActions.TRACKER_CERTIFICATE_CHECK_UNIQUE_FAILED_ACTION:
      return Object.assign({}, state, {
        isUnique: false
      });
    default:
      return state;
  }
}
