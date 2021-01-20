import React from "react";
import styled from "styled-components";
import { Button } from "antd";

export default function ChooseArea() {
    return (
        <ChooseAreaContainer>
            <Button>Load DreamSMP Timeline</Button>
        </ChooseAreaContainer>
    );
}

export const ChooseAreaContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 400px;
    background-color: ${(props) => props.theme.topareas.bg};
`;
