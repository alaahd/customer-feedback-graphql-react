import React from "react";
import styled from "styled-components";
import "./App.css";
import AddNewFeedback from "./components/AddNewFeedback";
import ListFeedbacks from "./components/ListFeedbacks";
import Panel from "./components/Panel";
import { CardsProvider } from "./contexts/global-context";
import { SnackbarProvider } from "notistack";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

// create a graphql client
const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
});

const Headline = styled.h3`
  flex: 1 1 100%;
  margin: 2rem 0;
`;
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
        >
          <main>
            <Headline>Customer Feedback Portal</Headline>
            <ApolloProvider client={client}>
              <CardsProvider>
                <Panel />
                <AddNewFeedback />
                <ListFeedbacks />
              </CardsProvider>
            </ApolloProvider>
          </main>
        </SnackbarProvider>
      </header>
    </div>
  );
}

export default App;
