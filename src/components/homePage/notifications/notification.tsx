export interface NotificationsProps {
  numberOfNotifications: number;
}

export default function Notification({ numberOfNotifications }: NotificationsProps) {
  return <div className="pop-notif">{numberOfNotifications}</div>;
}
