import * as React from "react";
import styled from "styled-components";

export default function Body() {
    return <BodyContainer />;
}

const BodyContainer = styled.div`
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    margin: 0;
    position: fixed;
    background-color: ${(props) => props.theme.bg};
`;
