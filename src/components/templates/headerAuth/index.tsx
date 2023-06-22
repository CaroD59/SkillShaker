import { NavLink } from 'react-router-dom';
import './index.scss';

export default function HeaderAuth() {
  return (
    <header id="SkillShaker-Header-Auth">
      <NavLink to="/">
        <img
          src="assets/img/logo_skillshaker.png"
          alt="SkillShaker Logo"
        />
      </NavLink>
    </header>
  );
}
