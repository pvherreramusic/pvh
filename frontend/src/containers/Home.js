import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../lib/contextLib";
import "./Home.css";
import { API } from "aws-amplify";
import { BsPencilSquare } from "react-icons/bs";
import { LinkContainer } from "react-router-bootstrap";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Iframe from "react-iframe";
const pvherrreraimage1 = require("../images/PVHIMAGE1.jpg");

export default function Home() {
  let [links, setLinks] = useState([0]);
  let { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        const links = await loadNotes();
        setLinks(links);
      } catch (e) {}

      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

  function loadNotes() {
    return API.get("links", "/links");
  }

  function renderNotesList(links) {
    return (
      <>
        <LinkContainer to="/links/new">
          <ListGroup.Item action className="py-3 text-nowrap text-truncate">
            <BsPencilSquare size={17} />
            <span className="ml-2 font-weight-bold">Add/Update a new Link</span>
          </ListGroup.Item>
        </LinkContainer>
        {links.map(({ linkId, linkurl }) => (
          <LinkContainer key={linkId} to={`/links/${linkId}`}>
            <ListGroup.Item action>
              <span className="font-weight-bold">{linkurl[0]}</span>
            </ListGroup.Item>
          </LinkContainer>
        ))}
      </>
    );
  }

  function renderLander() {
    if ((isAuthenticated = true)) {
      return (
        <div>
          <CardGroup bg="dark">
            <Card>
              <Card.Body>
                <Card.Title>Featured Music</Card.Title>
                <Card.Text>
                  <Iframe
                    url={links[0].linkurl}
                    width="290"
                    height="470"
                    className="bandcampiframe"
                  />
                </Card.Text>
              </Card.Body>
            </Card>
            <Card>
              <Card.Title>Musician Pic</Card.Title>
              <Card.Img variant="bottom" src={pvherrreraimage1} />
              <Card.Body>
                <Card.Text>Picture by Richard Fussilo c. 2013 </Card.Text>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>About the Musician</Card.Title>
                <Card.Text>
                  PV Herrera was active in the music scene of the Central
                  Coast, CA from 2008 to 2023. Originally from Los Gatos. He
                  moved to the central coast for better health due to his restricted air way. He was given
                  guitar lessons at the age of 13 at a small music lesson
                  school. His first project was called The Danger Girl Starship
                  where he wrote the majority of his work. Under his personal stage
                  name, he has released three albums. Those albums are:
                  "Cigarettes and Weddings", "Xanax and Mercy", and "Linear
                  Sound Instrumentation".
                </Card.Text>
              </Card.Body>
            </Card>
          </CardGroup>
          <Card.Footer>
            <small className="text-muted">
              Website developed by P.V. Herrera 2023
            </small>
          </Card.Footer>
        </div>
      );
    }
  }

  function renderNotes() {
    return (
      <div className="notes">
        <Card>
          <Card.Body>
            <Card.Title>Link Format</Card.Title>
            <Card.Text>
              To add a new soundcloud link follow this format:
              https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1214737876&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true
              <br />
              <br />
              To add a new bandcamp link follow this format:
              https://bandcamp.com/EmbeddedPlayer/album=3802207141/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true
            </Card.Text>
          </Card.Body>
        </Card>

        <h2 className="pb-3 mt-4 mb-3 border-bottom">Links</h2>
        <ListGroup>{!isLoading && renderNotesList(links)}</ListGroup>
      </div>
    );
  }

  return <div>{!isAuthenticated ? renderLander() : renderNotes()}</div>;
}
