import {writable} from "svelte/store";

export const session = writable('');
export const token = writable('');