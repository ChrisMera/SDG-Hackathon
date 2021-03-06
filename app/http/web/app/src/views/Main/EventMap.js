import React, { useState } from "react";
import ReactDOMServer from "react-dom/server";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Row,
} from "reactstrap";

import EventIcon from "../../components/EventIcon";

export default function EventMap({
  eventData,
  setActiveEvent,
  activeEvent,
  activeEventIconName,
  popupTitle,
}) {
  return (
    <Map center={[27.7676, -82.6403]} zoom={12}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {eventData?.events.map((event, index) => {
        let iconName = "";
        switch (event.type) {
          case "fire":
            iconName = "whatshot";
            break;
          case "electric":
            iconName = "power_off";
            break;

          default:
            break;
        }
        let IconComponent = (
          <EventIcon iconName={iconName} eventType={event.type} />
        );
        const icon = L.divIcon({
          className: "custom-icon",
          html: ReactDOMServer.renderToString(IconComponent),
        });
        return (
          <Marker
            key={index}
            position={[
              event.location.geometry.coordinates[0],
              event.location.geometry.coordinates[1],
            ]}
            onClick={() => {
              setActiveEvent(event);
            }}
            icon={icon}
          />
        );
      })}

      {activeEvent && (
        <Popup
          position={[
            activeEvent.location.geometry.coordinates[0],
            activeEvent.location.geometry.coordinates[1],
          ]}
          onClose={() => {
            setActiveEvent(null);
          }}
        >
          <Card>
            <CardHeader style={{ borderBottom: "1px solid" }}>
              <CardTitle tag="h2">
                <span className="event-icon-wrapper" style={{ marginLeft: 10 }}>
                  <EventIcon
                    iconName={activeEventIconName}
                    eventType={activeEvent.type}
                    style={{ marginTop: 4, marginLeft: 5, fontSize: 18 }}
                  />
                </span>
                {popupTitle || "Event"} detected!
                <Button
                  className="popup-close"
                  onClick={() => setActiveEvent(null)}
                >
                  <span className="material-icons f-s-18">close</span>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Row style={{ display: "flex", alignItems: "flex-end" }}>
                <span className="material-icons">explore</span>
                <CardText className="m-b-0 p-l-5 f-s-14">
                  {activeEvent.location.properties.name}
                </CardText>
              </Row>
              <Row style={{ display: "flex", alignItems: "flex-end" }}>
                <span className="material-icons">location_on</span>
                <CardText className="m-b-0 p-l-5 f-s-14">
                  {activeEvent.location.properties.address}
                </CardText>
              </Row>
              <Row style={{ display: "flex", alignItems: "flex-end" }}>
                <span className="material-icons">schedule</span>
                <CardText className="m-b-0 p-l-5 f-s-14">
                  {activeEvent.created}
                </CardText>
              </Row>
            </CardBody>
          </Card>
        </Popup>
      )}
    </Map>
  );
}
