import Form from './form';
import ButtonLogin from './button-login';
import '../index.scss';

export default function Register() {
  return (
    <article id="SkillShaker-Auth">
      <section id="SkillShaker-Form">
        <Form />
        <ButtonLogin />
      </section>
    </article>
  );
}
