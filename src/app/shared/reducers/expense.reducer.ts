import * as expenseActions from '../actions/expense.actions';
import { Cost, PageData } from '../models';

export interface State {
  allExpenses: Cost[];
  currentExpense: Cost;
  currentExpensePageStatus: PageData;
}

const initialState: State = {
  allExpenses: [],
  currentExpense: new Cost({}),
  currentExpensePageStatus: new PageData({})
};

export function reducer(state = initialState, action: expenseActions.Actions): State {
  let inventories: Cost[] = [];
  switch (action.type) {
    case expenseActions.FETCH_ALL_EXPENSES_COMPLETE_ACTION:
      inventories = action.payload.data.map(expense => new Cost(expense));
      return Object.assign({}, state, {
        allExpenses: [...inventories],
        currentExpensePageStatus: new PageData({
          total: action.payload.total,
          per_page: action.payload.per_page,
        })
      });
    case expenseActions.FETCH_EXPENSE_ACTION:
      return Object.assign({}, state, {
        currentExpense: new Cost({})
      });
    case expenseActions.FETCH_EXPENSE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        currentExpense: new Cost(action.payload)
      });
    case expenseActions.DELETE_EXPENSE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allExpenses: [...state.allExpenses.filter(expense => expense.id != action.payload ? expense : null)]
      });
    case expenseActions.UPDATE_EXPENSE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allExpenses: [...state.allExpenses.map(expense => expense.id != action.payload.id ? expense : new Cost(action.payload))]
      });
    case expenseActions.CREATE_EXPENSE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allExpenses: [...state.allExpenses, new Cost(action.payload)]
      });
    case expenseActions.CLEAR_EXPENSE_ACTION:
      return Object.assign({}, state, {
        currentExpense: new Cost({})
      });
    default:
      return state;
  }
}
