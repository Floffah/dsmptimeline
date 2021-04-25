import React, { FC } from "react";
import styled from "styled-components";
import ViewArea from "./ViewArea";
import TimelineArea from "./TimelineArea";
import CreditBar from "../info/CreditBar";

const Body: FC = (_p) => {
    return (
        <BodyContainer>
            <ViewArea />
            <TimelineArea />
            <CreditBar />
        </BodyContainer>
    );
};

export default Body;

export const BodyContainer = styled.div`
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    margin: 0;
    position: fixed;
    background-color: ${(props) => props.theme.bg};
`;
