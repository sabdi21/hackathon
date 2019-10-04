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
  Button,
  Col,
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
  let heroCards = [];
  
  if (cardsRetrieved === false) {
    axios
      .get(
        "http://gateway.marvel.com/v1/public/characters?apikey=de18e4de195024efdd7546d1fe5b4a3b&limit=1"
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
            t.img = h.thumbnail.path + "/detail." + h.thumbnail.extension;
            herosArray.push(t)
          }

        });

        setCardsRetrieved(true);

      })
      .catch(err => {
        console.log(err);
      })
  }

  
  const handleFlip = (e, h) => {
    console.log(h);
  };



  if (cardsRetrieved === true) {
    // console.log(`Running cards tool`);
    // console.log("heros array", herosArray);
    heroCards = herosArray.map((h, idx) => (
      <Col className="ml-auto mr-auto" lg="11" key={idx}>
        <Card className="ml-auto mr-auto">
          <CardImg top width="100%" src={h.img} alt="Card Image" />
          <CardBody>
            <CardTitle>{h.name}</CardTitle>
            <hr />
            <CardText>{h.description}</CardText>
            <Button onClick={handleFlip}>Stats</Button>
          </CardBody>
        </Card>
      </Col>
    ));
  }

  return (
    <>
      <IndexNavbar />
      <div className="gradient"></div>
      <div id="stars"></div>
      <h1 className="title mx-auto">All your favorite heros!</h1>
      <CardColumns>{heroCards}</CardColumns>
      <McuFooter />
    </>
  );
};

export default CharacterCards;
