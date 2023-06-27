import { MdNotificationsNone } from 'react-icons/md';

export interface TitleHomePageProps {
  title: string;
}

export default function TitleHomePage({ title }: TitleHomePageProps) {
  return (
    <div className="title-home-page">
      <div className="title home-page">{title}</div>
      <div className="notifications">
        <MdNotificationsNone />
      </div>
    </div>
  );
}
