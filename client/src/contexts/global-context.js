import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

// create the global state context
export const ctx = React.createContext({});

const GET_FEEDBACKS = gql`
  query {
    feedbacks {
      id
      comment
      owner {
        id
        name
        email
      }
    }
  }
`;

export function CardsProvider({ children }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputRef, setInputRef] = useState(null);
  const { data } = useQuery(GET_FEEDBACKS);

  useEffect(() => {
    if (data && data.feedbacks) {
      setCards(data.feedbacks);
    }
  }, data);

  const globalState = {
    loading,
    cards,
    inputRef,
    resetData: () => {
      setCards([]);
    },
    updateRef: ref => {
      setInputRef(ref);
    },
    setLoading: loading => {
      setLoading(loading);
    },
    setCards: data => {
      setCards(cards => [data, ...cards]);
    }
  };

  return <ctx.Provider value={globalState}>{children}</ctx.Provider>;
}

export const CardsConsumer = ctx.Consumer;
