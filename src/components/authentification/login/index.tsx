import Form from './form';
import ButtonRegister from './button-register';
import '../index.scss';

export default function Login() {
  return (
    <article id="SkillShaker-Auth">
      <section id="SkillShaker-Form">
        <Form />
        <ButtonRegister />
      </section>
    </article>
  );
}
