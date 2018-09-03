import { Transaction, PageData } from '../models';

import * as transactionActions from '../actions/transaction.actions';

export interface State {
  allTransactions: Transaction[];
  currentTransaction: Transaction;
  transactionPageStatus: PageData;
}

const initialState: State = {
  allTransactions: [],
  currentTransaction: new Transaction({}),
  transactionPageStatus: new PageData({})
};

export function reducer(state = initialState, action: transactionActions.Actions): State {
  let transactions: Transaction[] = [];
  switch (action.type) {
    case transactionActions.FETCH_ALL_TRANSACTIONS_COMPLETE_ACTION:
      transactions = action.payload.data.map(transaction => new Transaction(transaction));
      return Object.assign({}, state, {
        allTransactions: [...transactions],
        transactionPageStatus: new PageData({
          total: action.payload.total,
          per_page: action.payload.per_page,
        })
      });
    case transactionActions.FETCH_TRANSACTION_COMPLETE_ACTION:
      return Object.assign({}, state, {
        currentTransaction: new Transaction(action.payload)
      });
    default:
      return state;
  }
}
