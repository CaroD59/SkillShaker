import { NavLink } from 'react-router-dom';

export default function ButtonRegister() {
  return (
    <div id="Button-Auth">
      <button>
        <NavLink to="/register">S'inscrire</NavLink>
      </button>
      <NavLink to="/login/identity/forgotten-password">Mot de passe oublié ?</NavLink>
    </div>
  );
}
