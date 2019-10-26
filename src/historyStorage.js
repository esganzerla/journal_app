import {getRefDateTimestamp} from './date.helper.js';

localStorage.clear();

const localStorageHistory =
  localStorage.getItem('history') &&
  JSON.parse(localStorage.getItem('history'));
const isHistoryInLocalStorage = !!localStorageHistory;
let storedHistory = localStorageHistory || [];

export function getStoredHistory() {
  if (isHistoryInLocalStorage) updateSchema();
}
export function updateStoredHistory(history = storedHistory) {
  localStorage.setItem('history', JSON.stringify(history));
}

function updateSchema() {
  /* ORIGINAL STORE */
  /* --- */
  /* localStorageHistory = [ */
  /*   { */
  /*     timestamp: 1571943662852, */
  /*     greatful_reasons: ['das', 'das', 'ewq'], */
  /*     contribution_ideas: 'daseqw', */
  /*     reframe_actions: 'das', */
  /*     todo_items: ['eqw', 'ewq', 'eqw', 'eqw', 'eqw'], */
  /*     todo_confidence: 3, */
  /*   }, */
  /* ]; */

  const updates = [updateDateSchema(), updateTodoListSchema()];

  if (updates.indexOf(true) > -1) {
    updateStoredHistory();
  }
}
function updateDateSchema() {
  storedHistory = storedHistory.map(answer => {
    if (answer.date) return answer;

    return {...answer, date: getRefDateTimestamp(answer.timestamp)};
  });
}
function updateTodoListSchema() {
  if (
    storedHistory[0] &&
    storedHistory[0].todo_items &&
    storedHistory[0].todo_items[0] &&
    typeof storedHistory[0].todo_items[0] === 'string'
  ) {
    storedHistory = storedHistory.map(answer => ({
      ...answer,
      todo_items: answer.todo_items.map(todo_item => ({
        is_done: false,
        value: todo_item,
      })),
    }));
  }
}
