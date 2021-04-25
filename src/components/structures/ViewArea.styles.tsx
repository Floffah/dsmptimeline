import styled from "styled-components";
import YouTube, { YouTubeProps } from "react-youtube";
import { Button, Tooltip } from "antd";
import React, { FC } from "react";

export const IYTFrame: FC<YouTubeProps> = (p) => {
    return <YouTube {...p} containerClassName={p.className} />;
};

export const YTFrame = styled(IYTFrame)`
    width: 100%;
    height: 100%;
`;

export const ViewBox = styled.div`
    background-color: black;
    position: absolute;
`;

export const StyledButton = styled(Button)``;
export const TooltipRef = styled(Tooltip)``;

export const CAContainerDragBorder = styled.div`
    height: 8px;
    background-color: unset;
    position: fixed;
    cursor: n-resize;
    width: 100%;
    z-index: 1000;
`;

export const ViewButtonContainer = styled.div`
    position: absolute;
    top: 200px;
    display: block;
    left: 200px;

    ${StyledButton}, ${TooltipRef} {
        margin-top: 20px;
    }

    ${StyledButton}:first-child {
        margin-top: 0;
    }
`;

export const ViewAreaContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: ${(props) => props.theme.topareas.bg};
    overflow-y: auto;
`;
