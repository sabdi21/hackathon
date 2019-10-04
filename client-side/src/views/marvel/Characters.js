import React, { useState } from "react";
import axios from "axios";
// import { Redirect } from "react-router-dom";

// reactstrap components
// import { Button, Card, Container, Row, Col } from "reactstrap";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Container,
  Row,
  Col,
  Button,
  CardColumns
} from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
// import { BASE_URL } from "../../constants";
import "../../assets/css/starfield.css";
import McuFooter from "components/Footers/McuFooter";

let herosArray = [];

const CharacterCards = props => {
  const [cardsRetrieved, setCardsRetrieved] = useState(false);

  if (cardsRetrieved === false) {
    axios
      .get(
        "http://gateway.marvel.com/v1/public/characters?apikey=de18e4de195024efdd7546d1fe5b4a3b&limit=10"
      )
      .then(res => {
        // console.log(res.data);
        let heroList = res.data.data.results;

        console.log(heroList);

        heroList.forEach(h => {
          let t = [];
          t.name = h.name;
          if (h.description) {
            t.description = h.description;
          } else {
            t.description = "No Description Available";
          }

          if (!h.thumbnail.path.includes("image_not_available")) {
            t.img =
              h.thumbnail.path + "/standard_fantastic." + h.thumbnail.extension;
            herosArray.push(t);
          }
        });
      })
      .then(next => {
        // console.log(herosArray);
        setCardsRetrieved(true);
      });
  }

  let heroCards = [];
  if (cardsRetrieved === true) {
    // console.log(`Running cards tool`);
    // console.log("heros array", herosArray);
    heroCards = herosArray.map(h => (
      <Col className="ml-auto mr-auto" lg="12">
        <Card className="ml-auto mr-auto">
          <CardImg top width="100%" src={h.img} alt="Card Image" />
          <CardBody>
            <CardTitle>{h.name}</CardTitle>
            <hr />
            <CardText>{h.description}</CardText>
            <Button>Stats</Button>
          </CardBody>
        </Card>
     </Col>
    ));
  }

  return (
    <>
      <IndexNavbar />
      <div class="gradient"></div>
      <div id="stars"></div>
      <Row>
        <h1 className="title mx-auto">All your favorite heros!</h1>
      </Row>
      <div>
        <CardColumns>{heroCards}</CardColumns>
      </div>
      <McuFooter />
    </>
  );
};

export default CharacterCards;
