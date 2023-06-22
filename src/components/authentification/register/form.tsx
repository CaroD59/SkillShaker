import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
  const navigate = useNavigate();
  const [users, setUsers] = useState({
    email: '',
    password: '',
    username: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(import.meta.env.VITE_BASE_URL + '/user/new', users)
      .then(() => {
        toast.info(`${users.username}, vous êtes maintenant inscrit à SkillShaker !`);
        navigate(`/`);
      })
      .catch(() => {
        toast.error(`Votre inscription a échoué...`);
      });
  };

  return (
    <>
      <h1>Inscription</h1>
      <form
        action=""
        id="Form-Register"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="email">
            Email
            <input
              type="text"
              name="email"
              onChange={e => setUsers({ ...users, email: e.target.value })}
              value={users.email}
            />
          </label>
        </div>
        <div>
          <label htmlFor="mdp">
            Mot de Passe
            <input
              type="password"
              name="mdp"
              onChange={e => setUsers({ ...users, password: e.target.value })}
              value={users.password}
            />
          </label>
        </div>
        <div>
          <label htmlFor="username">
            Nom d'utilisateur
            <input
              type="text"
              name="username"
              onChange={e => setUsers({ ...users, username: e.target.value })}
              value={users.username}
            />
          </label>
        </div>
        <div>
          <input
            type="submit"
            value="Inscription"
          />
        </div>
      </form>
    </>
  );
}
