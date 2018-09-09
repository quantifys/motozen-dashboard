import { SalarySlip, PageData, User } from '../models';
import * as salarySlipActions from '../actions/salary-slip.actions';

export interface State {
  allSalarySlips: SalarySlip[];
  currentSalarySlip: SalarySlip;
  salarySlipPageStatus: PageData;
  employees: User[]
}

const initialState: State = {
  allSalarySlips: [],
  currentSalarySlip: new SalarySlip({}),
  salarySlipPageStatus: new PageData({}),
  employees: []
};

export function reducer(state = initialState, action: salarySlipActions.Actions): State {
  let salarySlips: SalarySlip[] = [];
  switch (action.type) {
    case salarySlipActions.FETCH_ALL_SALARY_SLIPS_ACTION:
      return Object.assign({}, state, {
        allSalarySlips: []
      });
    case salarySlipActions.FETCH_ALL_SALARY_SLIPS_COMPLETE_ACTION:
      salarySlips = action.payload.data.map(salarySlip => new SalarySlip(salarySlip));
      return Object.assign({}, state, {
        allSalarySlips: [...salarySlips],
        salarySlipPageStatus: new PageData({
          total: action.payload.total,
          per_page: action.payload.per_page,
        })
      });
    case salarySlipActions.FETCH_SALARY_SLIP_ACTION:
      return Object.assign({}, state, {
        currentSalarySlip: new SalarySlip({})
      });
    case salarySlipActions.FETCH_SALARY_SLIP_COMPLETE_ACTION:
      return Object.assign({}, state, {
        currentSalarySlip: new SalarySlip(action.payload)
      });
    case salarySlipActions.DELETE_SALARY_SLIP_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allSalarySlips: [...state.allSalarySlips.filter(salarySlip => salarySlip.id != state.currentSalarySlip.id ? salarySlip : null)],
        currentSalarySlip: new SalarySlip({})
      });
    case salarySlipActions.UPDATE_SALARY_SLIP_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allSalarySlips: [...state.allSalarySlips.map(salarySlip => salarySlip.id != action.payload.id ? salarySlip : new SalarySlip(action.payload))]
      });
    case salarySlipActions.CREATE_SALARY_SLIP_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allSalarySlips: [...state.allSalarySlips, new SalarySlip(action.payload)]
      });
    case salarySlipActions.DELETE_SALARY_SLIP_FAILED_ACTION:
      return Object.assign({}, state, {
        currentSalarySlip: new SalarySlip({})
      });
    case salarySlipActions.CONFIRM_SALARY_SLIP_COMPLETE_ACTION:
      return Object.assign({}, state, {
        currentSalarySlip: new SalarySlip({})
      });
    case salarySlipActions.PAY_SALARY_SLIP_COMPLETE_ACTION:
      return Object.assign({}, state, {
        currentSalarySlip: new SalarySlip({})
      });
    case salarySlipActions.FETCH_SALARY_SLIP_FORMDATA_COMPLETE_ACTION:
      return Object.assign({}, state, {
        employees: [...action.payload.employees.filter(user => new User(user))]
      });
    case salarySlipActions.FETCH_SALARY_SLIP_FILTER_FORMDATA_COMPLETE_ACTION:
      return Object.assign({}, state, {
        employees: [...action.payload.employees.filter(user => new User(user))]
      });
    default:
      return state;
  }
}
