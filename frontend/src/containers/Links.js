import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "aws-amplify";
import Form from "react-bootstrap/Form";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./Links.css";

export default function Links() {
  const file = useRef(null);
  const { id } = useParams();
  const nav = useNavigate();
  const [link, setLink] = useState(null);
  const [linkurl, setLinkurl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);


  useEffect(() => {
    function loadNote() {
      return API.get("links", `/links/${id}`);
    }

    async function onLoad() {
      try {
        const link = await loadNote();
        const { linkurl } = link;

        

        setLinkurl(linkurl);
        setLink(link);
      } catch (e) {
        
      }
    }

    onLoad();
  }, [id]);

  function validateForm() {
    return linkurl.length > 0;
  }
  
  function saveNote(link) {
    return API.put("links", `/links/${id}`, {
      body: link,
    });
  }
  
  async function handleSubmit(event) {
  
  
    event.preventDefault();
  
    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${
          config.MAX_ATTACHMENT_SIZE / 1000000
        } MB.`
      );
      return;
    }
  
    setIsLoading(true);
  
    try {
     
  
      await saveNote({
        linkurl,
      });
      nav("/");
    } catch (e) {
      setIsLoading(false);
    }
  }
  
  function deleteNote() {
    return API.del("links", `/links/${id}`);
  }
  
  async function handleDelete(event) {
    event.preventDefault();
  
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );
  
    if (!confirmed) {
      return;
    }
  
    setIsDeleting(true);
  
    try {
      await deleteNote();
      nav("/");
    } catch (e) {
      setIsDeleting(false);
    }
  }
  
  return (
    <div className="Notes">
      {link && (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="content">
            <Form.Control
              as="textarea"
              value={linkurl}
              onChange={(e) => setLinkurl(e.target.value)}
            />
          </Form.Group>
          <LoaderButton
            block="true"
            size="lg"
            type="submit"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Save
          </LoaderButton>
          <LoaderButton
            block="true"
            size="lg"
            variant="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete
          </LoaderButton>
        </Form>
      )}
    </div>
  );
}