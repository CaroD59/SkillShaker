import Cookies from 'js-cookie';
import MessagesList from './messagesList/message-list';
import Conversations from './conversations';
import Tags from './tags';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './index.scss';

export default function HomePage() {
  const authToken = Cookies.get('auth_token');

  return (
    <article id="SkillShaker-HP">
      {authToken ? (
        <Container
          fluid
          className="full-height-container"
        >
          <Row className="full-height-column">
            <Col
              lg={3}
              xl={2}
              className="tags full-height-column"
            >
              <Tags />
            </Col>
            <Col
              lg={3}
              xl={2}
              className="conversations full-height-column"
            >
              <Conversations />
            </Col>
            <Col
              lg={true}
              className="messages full-height-column"
            >
              <MessagesList />
            </Col>
          </Row>
        </Container>
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
