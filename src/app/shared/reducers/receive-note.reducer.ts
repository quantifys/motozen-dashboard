import { ReceiveNote, PageData } from '../models';

import * as receiveNoteActions from '../actions/receive-note.actions';

export interface State {
  allReceiveNotes: ReceiveNote[];
  currentReceiveNote: ReceiveNote;
  receiveNotePageStatus: PageData;
  receiveNoteFormData: any;
}

const initialState: State = {
  allReceiveNotes: [],
  currentReceiveNote: new ReceiveNote({}),
  receiveNotePageStatus: new PageData({}),
  receiveNoteFormData: null
};

export function reducer(state = initialState, action: receiveNoteActions.Actions): State {
  let receiveNotes: ReceiveNote[] = [];
  switch (action.type) {
    case receiveNoteActions.FETCH_ALL_RECEIVE_NOTES_COMPLETE_ACTION:
      receiveNotes = action.payload.data.map(receiveNote => new ReceiveNote(receiveNote));
      return Object.assign({}, state, {
        allReceiveNotes: [...receiveNotes],
        receiveNotePageStatus: new PageData({
          total: action.payload.total,
          per_page: action.payload.per_page,
        })
      });
    case receiveNoteActions.FETCH_RECEIVE_NOTE_ACTION:
      return Object.assign({}, state, {
        currentReceiveNote: new ReceiveNote({})
      });
    case receiveNoteActions.FETCH_RECEIVE_NOTE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        currentReceiveNote: new ReceiveNote(action.payload)
      });
    case receiveNoteActions.DELETE_RECEIVE_NOTE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allReceiveNotes: [...state.allReceiveNotes.filter(receiveNote => receiveNote.id != state.currentReceiveNote.id ? receiveNote : null)],
        currentReceiveNote: new ReceiveNote({})
      });
    case receiveNoteActions.UPDATE_RECEIVE_NOTE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allReceiveNotes: [...state.allReceiveNotes.map(receiveNote => receiveNote.id != action.payload.id ? receiveNote : new ReceiveNote(action.payload))]
      });
    case receiveNoteActions.CREATE_RECEIVE_NOTE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allReceiveNotes: [...state.allReceiveNotes, new ReceiveNote(action.payload)]
      });
    case receiveNoteActions.DELETE_RECEIVE_NOTE_FAILED_ACTION:
      return Object.assign({}, state, {
        currentReceiveNote: new ReceiveNote({})
      });
    case receiveNoteActions.CONFIRM_RECEIVE_NOTE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        currentReceiveNote: new ReceiveNote({})
      });
    case receiveNoteActions.FETCH_RECEIVE_NOTE_FORM_DATA_COMPLETE_ACTION:
      return Object.assign({}, state, {
        receiveNoteFormData: action.payload
      });
    default:
      return state;
  }
}
