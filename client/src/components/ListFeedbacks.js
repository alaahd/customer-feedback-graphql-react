import React, { useEffect, useContext } from "react";
import Loader from "react-loader-spinner";
import { ctx } from "../contexts/global-context";
import styled from "styled-components";

import PropTypes from "prop-types";

const propTypes = {};

const defaultProps = {};

const EmptyList = styled.div`
  flex: 2;
  justify-content: center;
  font-size: 1rem;
  align-items: center;
`;
const List = styled.ul`
  list-style: none;
  margin: 1rem;
  padding: 0;
  font-size: 1rem;
  flex: 2;
  li {
    background-color: rgba(0, 0, 0, 0.2);
    padding: 1rem 2rem;
    margin: 5px 0;
    display: flex;
    justify-content: space-between;
    &:first-child {
      margin-top: 0;
    }
    span {
      flex: 1;
      text-align: left;
      &.wider {
        flex: 2;
      }
    }
  }
`;

const ListHeader = styled.li`
  font-weight: bold;
`;

export default function ListCards(props) {
  const { inputRef, setLoading, cards, loading } = useContext(ctx);

  const handleInputFocus = event => {
    event.preventDefault();

    if (inputRef) {
      inputRef.focus();
      inputRef.placeholder = "";
    }
  };

  if (cards) {
    setLoading(false);
  }

  const renderRowData = ({ comment, owner }) => (
    <>
      <span className="wider">{owner && owner.name}</span>
      <span className="wider">{owner && owner.email}</span>
      <span className="wider">{comment}</span>
    </>
  );
  if (loading) {
    return (
      <Loader
        className="loader"
        type="ThreeDots"
        color="#FFFFFF"
        height={15}
        width={60}
      />
    );
  }

  if (!cards.length) {
    return (
      <EmptyList>
        <List>
          <li>
            {`Empty list of customers feedback ! `}{" "}
            <a href={null} onClick={handleInputFocus}>
              Add New Feedback
            </a>
          </li>
        </List>
      </EmptyList>
    );
  }

  return (
    <React.Fragment>
      <List>
        <ListHeader>
          <span className="wider">Name</span>
          <span className="wider">Email</span>
          <span className="wider">Comment</span>
        </ListHeader>
        {cards.map(c => (
          <li key={c._id}>{renderRowData(c)}</li>
        ))}
      </List>
    </React.Fragment>
  );
}

ListCards.propTypes = propTypes;
ListCards.defaultProps = defaultProps;
