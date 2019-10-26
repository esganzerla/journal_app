import {writable} from 'svelte/store';
import {getStoredHistory, updateStoredHistory} from './historyStorage.js';

export const history = writable(getStoredHistory());

history.subscribe(updateStoredHistory);
