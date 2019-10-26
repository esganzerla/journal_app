import {getRefDateTimestamp} from './date.helper.js';

const localStorageHistory =
  localStorage.getItem('history') &&
  JSON.parse(localStorage.getItem('history'));
const isHistoryInLocalStorage = !!localStorageHistory;
let storedHistory = localStorageHistory || [];

export function getStoredHistory() {
  if (isHistoryInLocalStorage) updateSchema();

  return storedHistory;
}
export function updateStoredHistory(history = storedHistory) {
  localStorage.setItem('history', JSON.stringify(history));
}

function updateSchema() {
  /*

  ORIGINAL SCHEMA
  ---

  [
    {
      timestamp: Integer
      greatful_reasons: Array<String>
      contribution_ideas: String
      reframe_actions: String
      todo_items: Array<String>
      todo_confidence: String
    },
  ]
  */

  const updates = [updateDateSchema()];
  /* const updates = [updateDateSchema(), updateTodoListSchema()]; */

  if (updates.indexOf(true) > -1) {
    updateStoredHistory();
  }
}
function updateDateSchema() {
  let schemaUpdated = false;

  storedHistory = storedHistory.map(answer => {
    if (answer.date) return answer;

    schemaUpdated = true;
    return {...answer, date: getRefDateTimestamp(answer.timestamp)};
  });
}
/* function updateTodoListSchema() { */
/* let schemaUpdated = false; */
/*   if ( */
/*     storedHistory[0] && */
/*     storedHistory[0].todo_items && */
/*     storedHistory[0].todo_items[0] && */
/*     typeof storedHistory[0].todo_items[0] === 'string' */
/*   ) { */
/* schemaUpdated = true; */
/*     storedHistory = storedHistory.map(answer => ({ */
/*       ...answer, */
/*       todo_items: answer.todo_items.map(todo_item => ({ */
/*         is_done: false, */
/*         value: todo_item, */
/*       })), */
/*     })); */
/*   } */
/* } */
