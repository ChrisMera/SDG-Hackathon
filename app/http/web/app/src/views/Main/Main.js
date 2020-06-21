import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  ButtonGroup,
  Button,
} from "reactstrap";

import EventMap from "./EventMap";
import EventIcon from "../../components/EventIcon";
import "../../App.css";
import * as mockData from "../../data/skateboard-parks.json";

export default function Main() {
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     fetch("/testg")
  //       .then((res) => res.text()) // convert to plain text
  //       .then((text) => console.log(text));
  //   }, 2000);
  //   return () => clearInterval(interval);
  // }, []);
  const [activeEvent, setActiveEvent] = useState(null);
  const [eventData, setEventData] = useState(mockData.default);

  let activeEventIconName = "";
  let popupTitle = "";
  switch (activeEvent?.properties.TYPE) {
    case "fire":
      activeEventIconName = "whatshot";
      popupTitle = "Fire";
      break;
    case "electric":
      activeEventIconName = "power_off";
      popupTitle = "Power outage";
      break;

    default:
      break;
  }
  return (
    <>
      <Container>
        <EventMap
          eventData={eventData}
          setActiveEvent={setActiveEvent}
          activeEvent={activeEvent}
          activeEventIconName={activeEventIconName}
          popupTitle={popupTitle}
        />
      </Container>
      <div className="events-list-container">
        <Row>
          <Col>
            <Card className="events-list-card">
              <CardHeader>
                <CardTitle tag="h2">
                  Sensor Events (
                  {
                    eventData.features.filter((event) => event.properties.TYPE)
                      .length
                  }
                  )
                </CardTitle>
                <ButtonGroup>
                  <Button>
                    Fire (
                    {
                      eventData.features.filter(
                        (event) => event.properties.TYPE === "fire"
                      ).length
                    }
                    )
                  </Button>
                  <Button
                    onClick={() => {
                      let filteredData = eventData.features.filter(
                        (event) => event.properties.TYPE === "electric"
                      );
                      setEventData({ ...eventData, features: filteredData });
                    }}
                  >
                    Power Outage (
                    {
                      eventData.features.filter(
                        (event) => event.properties.TYPE === "electric"
                      ).length
                    }
                    )
                  </Button>
                </ButtonGroup>
              </CardHeader>
              <CardBody>
                <ul className="events-list">
                  {eventData.features
                    .filter((event) => event.properties.TYPE)
                    .map((event) => {
                      let iconName = "";
                      switch (event.properties.TYPE) {
                        case "fire":
                          iconName = "whatshot";
                          break;
                        case "electric":
                          iconName = "power_off";
                          break;

                        default:
                          break;
                      }
                      return (
                        <li
                          key={event.properties.ADDRESS}
                          className="events-list-item"
                          onClick={() => {
                            setActiveEvent(event);
                          }}
                        >
                          <span
                            className="event-icon-wrapper"
                            style={{ marginLeft: 10 }}
                          >
                            <EventIcon
                              iconName={iconName}
                              eventType={event.properties.TYPE}
                              style={{ marginLeft: 3 }}
                            />
                          </span>
                          {event.properties.ADDRESS}
                        </li>
                      );
                    })}
                </ul>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
