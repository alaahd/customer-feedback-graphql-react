import React, { useState, useContext, useEffect } from "react";
import Loader from "react-loader-spinner";
import { ctx } from "../contexts/global-context";
import styled from "styled-components";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const propTypes = {};

const defaultProps = {};

const StyledInput = styled.input`
  padding: 1rem;
  font-size: 14px;
  border: none;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
`;

const CardForm = styled.form`
  border: 2px dashed #e1e1e1;
  margin: 1rem;
  padding: 3rem;
  background: darkcyan;
  flex: 1;
  max-width: 466px;
  div {
    margin: 0 0 1rem;
    display: flex;
    flex-direction: column;
    align-items: start;
  }
  label {
    font-size: 0.9rem;
    padding-bottom: 0.5rem;
  }
  button {
    margin-top: 1rem;
  }
`;

const ADD_FEEDBACK = gql`
  mutation insertNewFeedback(
    $name: String!
    $email: String!
    $comment: String!
  ) {
    createFeedback(data: { name: $name, email: $email, comment: $comment }) {
      id
      comment
      owner {
        email
        name
      }
    }
  }
`;

export default function AddNewCard(props) {
  const context = useContext(ctx);
  const [executeFeedbackMutation, { loading, data, error }] = useMutation(
    ADD_FEEDBACK
  );

  const { posting, updateRef, setCards } = context;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const nameRef = React.createRef();
  const emailRef = React.createRef();
  const commentRef = React.createRef();

  useEffect(() => {
    if (data && data.createFeedback) {
      setCards(data.createFeedback);
      nameRef.current.value = "";
      emailRef.current.value = "";
      commentRef.current.value = "";
      nameRef.current.focus();
    }
  }, data);

  const submitForm = () => {
    executeFeedbackMutation({
      variables: {
        name,
        email,
        comment
      }
    });
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    submitForm();
  };

  return (
    <CardForm onSubmit={e => handleFormSubmit(e)}>
      <div>
        <h3>Add New Feedback</h3>
      </div>
      <div>
        <label htmlFor="name">Name</label>
        <StyledInput
          ref={nameRef}
          type="text"
          placeholder="Insert your name here"
          name="name"
          onChange={({ target }) => setName(target.value)}
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <StyledInput
          ref={emailRef}
          type="text"
          placeholder="Insert your email address"
          name="email"
          onChange={({ target }) => setEmail(target.value)}
        />
      </div>

      <div>
        <label htmlFor="limit">Comment</label>
        <StyledInput
          ref={commentRef}
          type="text"
          placeholder="Insert your comment"
          name="limit"
          onChange={({ target }) => setComment(target.value)}
        />
      </div>

      <div>
        <button type="submit" disabled={loading}>
          {loading ? (
            <Loader type="ThreeDots" color="#282c34" height={15} width={60} />
          ) : (
            "Add"
          )}
        </button>
      </div>
    </CardForm>
  );
}

AddNewCard.propTypes = propTypes;
AddNewCard.defaultProps = defaultProps;
