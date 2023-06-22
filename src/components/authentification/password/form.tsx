import { useState } from 'react';

export default function LoginForm() {
  const [details, setDetails] = useState({
    email: '',
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <>
      <h1>Mot de passe oublié ?</h1>
      <form
        action=""
        id="Form-Forgotten-Password"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="email">
            Email
            <input
              type="text"
              name="email"
              onChange={e => setDetails({ ...details, email: e.target.value })}
              value={details.email}
            />
          </label>
        </div>
        <div>
          <input
            type="submit"
            value="Envoyer"
          />
        </div>
      </form>
    </>
  );
}
