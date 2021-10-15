import {Card} from "react-bootstrap";
import "../../assets/css/navigation/Navigation.css";

const Navigation = (props) => (
    <Card className={"navigation flex-row p-3"}>
        <Card className={"navigation__item mx-auto block-round"}></Card>
        <Card className={"navigation__item active mx-auto block-round"}></Card>
        <Card className={"navigation__item mx-auto block-round"}></Card>
        <Card className={"navigation__item mx-auto block-round"}></Card>
    </Card>
);

export default Navigation;