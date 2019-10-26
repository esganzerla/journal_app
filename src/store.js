import {writable} from 'svelte/store';
import {getRefDateTimestamp} from './date.helper.js';

let localStorageHistory =
  localStorage.getItem('history') &&
  JSON.parse(localStorage.getItem('history'));

upgradeStore();
function upgradeStore() {
  if (localStorageHistory) {
    localStorageHistory = localStorageHistory.map(answer => {
      if (answer.date) return answer;

      return {...answer, date: getRefDateTimestamp(answer.timestamp)};
    });
  }
}

export const history = writable(localStorageHistory || []);

history.subscribe(value => {
  localStorage.setItem('history', JSON.stringify(value));
});