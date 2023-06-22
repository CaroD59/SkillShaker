import { NavLink } from 'react-router-dom';
import './index.scss';

export default function Footer() {
  return (
    <footer id="SkillShaker-Footer">
      <div className="version">1.0.8</div>
      <div className="CGU">
        <NavLink to="">CGU</NavLink>
      </div>
    </footer>
  );
}
