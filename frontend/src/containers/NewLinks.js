import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import "./NewNotes.css";
import { API } from "aws-amplify";


export default function NewLink() {
  const file = useRef(null);
  const nav = useNavigate();
  const [linkurl, setLinkurl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return linkurl.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      await createNote({ linkurl });
      nav("/");
    } catch (e) {
      setIsLoading(false);
    }
  }

  
  function createNote(link) {
    return API.post("links", "/links", {
      body: link,
    });
  }
  
  
  return (
    <div className="NewNote">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="content">
          <Form.Control
            value={linkurl}
            as="textarea"
            onChange={(e) => setLinkurl(e.target.value)}
          />
        </Form.Group>
        <LoaderButton
          block
          type="submit"
          size="lg"
          variant="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoaderButton>
      </Form>
    </div>
  );
  }