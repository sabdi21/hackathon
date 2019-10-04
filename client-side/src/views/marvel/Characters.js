import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactCardFlip from "react-card-flip";

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
  const [isFlipped, setIsFlipped] = useState(false);

  let heroCards = [];

  const handleFlip = (e, h) => {
    e.preventDefault();
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    if (cardsRetrieved === false) {
      getHeros();
    }
  }, [cardsRetrieved]);

  const getHeros = () => {
    axios
      .get(
        "http://gateway.marvel.com/v1/public/characters?apikey=de18e4de195024efdd7546d1fe5b4a3b&limit=50"
      )
      .then(res => {
        // console.log(res.data);
        let heroList = res.data.data.results;

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
            herosArray.push(t);
          }
        });

        setCardsRetrieved(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  if (cardsRetrieved === true) {
    // console.log(`Running cards tool`);
    // console.log("heros array", herosArray);
    heroCards = herosArray.map((h, idx) => (
      <Col className="ml-auto mr-auto" lg="11" key={idx}>
        <ReactCardFlip isFlipped={isFlipped}>
          <Card className="ml-auto mr-auto" key="front">
            <CardImg top width="100%" src={h.img} alt="Card Image" />
            <CardBody>
              <CardTitle>{h.name}</CardTitle>
              <hr />
              <CardText>{h.description}</CardText>
              <Button onClick={handleFlip}>Stats</Button>
            </CardBody>
          </Card>

          <Card className="ml-auto mr-auto" key="back">
            <CardImg top width="100%" src={h.img} alt="Card Image" />
            <CardBody>
              <CardTitle>Stats</CardTitle>
              <hr />
              <CardText>Strengths</CardText>
              <CardText>Weaknesses</CardText>
              <CardText>Friends</CardText>
              <CardText>Enemy</CardText>
              <Button onClick={handleFlip}>Stats</Button>
            </CardBody>
          </Card>
        </ReactCardFlip>
      </Col>
    ));
  }

  return (
    <>
      <IndexNavbar />
      <div className="gradient"></div>
      <div id="stars"></div>
      {/* <h1 className="title mx-auto"> </h1>
      <h1 className="title mx-auto"> </h1> */}
      <CardColumns>{heroCards}</CardColumns>
      <McuFooter />
    </>
  );
};

export default CharacterCards;
