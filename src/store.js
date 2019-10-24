import {writable} from 'svelte/store';

/* export const history = writable([]); */
// export const history = writable([{"timestamp":1571943662852,"greatful_reasons":["das","das","ewq"],"contribution_ideas":"daseqw","reframe_actions":"das","todo_items":["eqw","ewq","eqw","eqw","eqw"],"todo_confidence":3}]);
const localStorageHistory =
  localStorage.getItem('history') &&
  JSON.parse(localStorage.getItem('history'));

export const history = writable(localStorageHistory || []);

history.subscribe(value => {
  localStorage.setItem('history', JSON.stringify(value));
  // normalize for dates
});