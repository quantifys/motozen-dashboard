import * as incomeActions from '../actions/income.actions';
import { Cost, PageData } from '../models';

export interface State {
  allIncomes: Cost[];
  currentIncome: Cost;
  currentIncomePageStatus: PageData;
}

const initialState: State = {
  allIncomes: [],
  currentIncome: new Cost({}),
  currentIncomePageStatus: new PageData({})
};

export function reducer(state = initialState, action: incomeActions.Actions): State {
  let inventories: Cost[] = [];
  switch (action.type) {
    case incomeActions.FETCH_ALL_INCOMES_ACTION:
      return Object.assign({}, state, {
        allIncomes: []
      });
    case incomeActions.FETCH_ALL_INCOMES_COMPLETE_ACTION:
      inventories = action.payload.data.map(income => new Cost(income));
      return Object.assign({}, state, {
        allIncomes: [...inventories],
        currentIncome: new Cost({}),
        currentIncomePageStatus: new PageData({
          total: action.payload.total,
          per_page: action.payload.per_page,
        })
      });
    case incomeActions.FETCH_INCOME_ACTION:
      return Object.assign({}, state, {
        currentIncome: new Cost({})
      });
    case incomeActions.CLEAR_INCOME_DATA_ACTION:
      return Object.assign({}, state, {
        currentIncome: new Cost({})
      });
    case incomeActions.FETCH_INCOME_COMPLETE_ACTION:
      return Object.assign({}, state, {
        currentIncome: new Cost(action.payload)
      });
    case incomeActions.DELETE_INCOME_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allIncomes: [...state.allIncomes.filter(income => income.id != action.payload ? income : null)]
      });
    case incomeActions.UPDATE_INCOME_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allIncomes: [...state.allIncomes.map(income => income.id != action.payload.id ? income : new Cost(action.payload))]
      });
    case incomeActions.CREATE_INCOME_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allIncomes: [...state.allIncomes, new Cost(action.payload)]
      });
    default:
      return state;
  }
}
