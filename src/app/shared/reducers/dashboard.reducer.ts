import * as dashboardActions from '../actions/dashboard.actions';

export interface State {
  dataType: string;
  certificateChartData: any;
  certificateTableData: any;
  distributorData: any;
}

const initialState: State = {
  dataType: 'sld',
  certificateChartData: null,
  certificateTableData: null,
  distributorData: null
};

export function reducer(state = initialState, action: dashboardActions.Actions): State {
  switch (action.type) {
    case dashboardActions.FETCH_DASHBOARD_ACTION:
      return Object.assign({}, state, {
        dataType: action.payload
      });
    case dashboardActions.FETCH_DASHBOARD_COMPLETE_ACTION:
      const certificateChartData = state.dataType === 'sld'
        ? action.payload['certificates_graph'] : action.payload['tracker_certificates_graph'];
      const certificateTableData = state.dataType === 'sld'
        ? action.payload['certificates_table'] : action.payload['tracker_certificates_table'];
      return Object.assign({}, state, {
        certificateChartData: certificateChartData,
        certificateTableData: certificateTableData
      });
    case dashboardActions.FETCH_DIST_DASHBOARD_ACTION:
      return Object.assign({}, state, {
        distributorData: null
      });
    case dashboardActions.FETCH_DIST_DASHBOARD_COMPLETE_ACTION:
      return Object.assign({}, state, {
        distributorData: action.payload
      });
    case dashboardActions.FETCH_MFG_CERTIFICATE_GRAPH_DASHBOARD_COMPLETE_ACTION:
      return Object.assign({}, state, {
        certificateChartData: action.payload['certificates_graph'],
      });
    case dashboardActions.FETCH_MFG_CERTIFICATE_TABLE_DASHBOARD_COMPLETE_ACTION:
      return Object.assign({}, state, {
        certificateTableData: action.payload['certificates_table'],
      });
    case dashboardActions.FETCH_MFG_TRACKER_CERTIFICATE_GRAPH_DASHBOARD_COMPLETE_ACTION:
      return Object.assign({}, state, {
        certificateChartData: action.payload['certificates_graph'],
      });
    case dashboardActions.FETCH_MFG_TRACKER_CERTIFICATE_TABLE_DASHBOARD_COMPLETE_ACTION:
      return Object.assign({}, state, {
        certificateTableData: action.payload['certificates_table'],
      });
    default:
      return state;
  }
}
