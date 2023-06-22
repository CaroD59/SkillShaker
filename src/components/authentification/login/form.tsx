import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import User from '../../../contexts/userContext';

export default function LoginForm() {
  const navigate = useNavigate();

  const [details, setDetails] = useState({ username: '', password: '' });
  const { setUser } = useContext(User);
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(import.meta.env.VITE_BASE_URL + '/login_check', details)
      .then(({ data }) => {
        setUser(data);
        toast.success(`Vous êtes connecté ${details.username}`);
        const token = data.token;
        Cookies.set('auth_token', token, { expires: 7 });
        navigate(`/`);
      })
      .catch(() => {
        toast.error(`E-mail ou mot de passe incorrect...`);
        setError('E-mail ou mot de passe incorrect...');
      });
  };

  return (
    <>
      <h1>Connexion</h1>
      <form
        id="Form-Login"
        onSubmit={handleSubmit}
      >
        {error !== '' ? <div className="error">{error}</div> : ''}
        <div>
          <label htmlFor="username">
            E-mail
            <input
              type="text"
              name="username"
              onChange={e => setDetails({ ...details, username: e.target.value })}
              value={details.username}
            />
          </label>
        </div>
        <div>
          <label htmlFor="mdp">
            Mot de Passe
            <input
              type="password"
              name="mdp"
              onChange={e => setDetails({ ...details, password: e.target.value })}
              value={details.password}
            />
          </label>
        </div>
        <div>
          <input
            type="submit"
            value="Connexion"
          />
        </div>
      </form>
    </>
  );
}
