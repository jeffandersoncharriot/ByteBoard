import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

/** Component that displays one pane on the left and another on the right. */
function TwoPanes({ leftPane, rightPane }) {
    return (
        <Container>
            <Row>
                <Col sm={4}>{leftPane}</Col>
                <Col sm={8}>{rightPane}</Col>
            </Row>
        </Container>
    );
}
export default TwoPanes;


