import { Container, Row, Col } from 'react-bootstrap';
import Message from '../messagesList/message';
import Profile from '../conversations/profile';

export default function NavBar() {
  return (
    <Container
      fluid
      className="full-height-container"
    >
      <Row className="full-height-column">
        <Col
          sm={2}
          className="profil"
        >
          <Profile />
        </Col>
        <Col
          sm={true}
          className="write-tag"
        >
          <Message placeholder={'Rédiger un #tag'} />
        </Col>
      </Row>
    </Container>
  );
}
