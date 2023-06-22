import User from '../../contexts/userContext';
import Cookies from 'js-cookie';
import MessagesList from './messagesList/message-list';
import Conversations from './conversations';
import Tags from './tags';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import './index.scss';

export default function HomePage() {
  const authToken = Cookies.get('auth_token');

  return (
    <article id="SkillShaker-HP">
      {authToken ? (
        <section className="HP">
          <Conversations />
          <MessagesList />
          <Tags />
        </section>
      ) : (
        <section className="link-to-connexion">
          <button>
            <NavLink to="/">Me connecter</NavLink>
          </button>
        </section>
      )}
    </article>
  );
}
