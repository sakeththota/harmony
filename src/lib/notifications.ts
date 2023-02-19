import { writable } from 'svelte/store';

interface Notification {
	type: 'success' | 'warning' | 'error' | 'info';
	message: string;
}

export const notifications = writable<Notification[]>([]);

export function toast(notification: Notification) {
	notifications.update((state) => [notification, ...state]);
	setTimeout(removeToast, 3000);
}

function removeToast() {
	notifications.update((state) => {
		return [...state.slice(0, state.length - 1)];
	});
}
