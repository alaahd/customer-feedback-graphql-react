import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import Loader from "react-loader-spinner";

import { ctx } from "../contexts/global-context";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const StyledPanel = styled.div`
  display: flex;
  flex: 0 1 100%;
  justify-content: flex-end;
  padding-bottom: 1rem;
  button {
    font-size: 0.9rem;
  }
`;

const RESET_DATA = gql`
  mutation resetAllData {
    resetData {
      success
      count
    }
  }
`;

export default function Panel(props) {
  const { loading, cards, resetData } = useContext(ctx);

  const [executeResetData, { loading: posting, error, data }] = useMutation(
    RESET_DATA
  );

  useEffect(() => {
    if (data && data.resetData && data.resetData.success) {
      resetData();
    }
  }, [data]);

  return (
    <StyledPanel>
      <button onClick={e => executeResetData()} disabled={!cards.length}>
        {loading || posting ? (
          <Loader
            className="loader"
            type="ThreeDots"
            color="#282c34"
            height={15}
            width={60}
          />
        ) : (
          "Reset Data"
        )}
      </button>
    </StyledPanel>
  );
}
