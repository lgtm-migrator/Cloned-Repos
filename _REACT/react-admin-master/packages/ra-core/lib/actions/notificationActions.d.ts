export declare const SHOW_NOTIFICATION = "RA/SHOW_NOTIFICATION";
export declare type NotificationType = 'info' | 'warning' | 'error';
interface NotificationOptions {
    autoHideDuration?: number;
    messageArgs?: any;
    undoable?: boolean;
}
export interface NotificationPayload {
    readonly message: string;
    readonly type: NotificationType;
    readonly notificationOptions?: NotificationOptions;
}
export interface ShowNotificationAction {
    readonly type: typeof SHOW_NOTIFICATION;
    readonly payload: NotificationPayload;
}
/**
 * Shows a snackbar/toast notification on the screen
 *
 * @see {@link https://material-ui.com/api/snackbar/|Material ui snackbar component}
 * @see {@link https://material.io/guidelines/components/snackbars-toasts.html|Material ui reference document on snackbar}
 */
export declare const showNotification: (message: string, type?: NotificationType, notificationOptions?: NotificationOptions) => ShowNotificationAction;
export declare const HIDE_NOTIFICATION = "RA/HIDE_NOTIFICATION";
export interface HideNotificationAction {
    readonly type: typeof HIDE_NOTIFICATION;
}
export declare const hideNotification: () => HideNotificationAction;
export declare const RESET_NOTIFICATION = "RA/RESET_NOTIFICATION";
export interface ResetNotificationAction {
    readonly type: typeof RESET_NOTIFICATION;
}
export declare const resetNotification: () => ResetNotificationAction;
export {};
