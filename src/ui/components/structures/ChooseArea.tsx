import React, { MouseEvent as ReactMouseEvent } from "react";
import styled from "styled-components";
import { Button } from "antd";

interface ChooseAreaState {
    height: number;
    dragging: boolean;
}

export default class ChooseArea extends React.Component<any, ChooseAreaState> {
    constructor(p: any) {
        super(p);

        this.state = {
            height: 500,
            dragging: false,
        };
    }

    componentDidMount() {
        document.addEventListener("mousemove", (e) => this.mousemove(e));
        document.addEventListener("mouseup", (e) => this.mouseup(e));
    }

    componentWillUnmount() {
        document.removeEventListener("mousemove", (e) => this.mousemove(e));
        document.removeEventListener("mouseup", (e) => this.mouseup(e));
    }

    mousedown(e: ReactMouseEvent) {
        this.setState({
            dragging: true,
        });
        e.stopPropagation();
        e.preventDefault();
    }

    mouseup(e: MouseEvent) {
        this.setState({
            dragging: false,
        });
        e.stopPropagation();
        e.preventDefault();
    }

    mousemove(e: MouseEvent) {
        this.setState({
            height: e.pageY,
        });
        e.stopPropagation();
        e.preventDefault();
    }

    render() {
        return (
            <ChooseAreaContainer height={this.state.height}>
                <ChooseButtonContainer>
                    <StyledButton type="primary" size="large">
                        Load DreamSMP timeline
                    </StyledButton>
                    <br />
                    <StyledButton size="large">
                        Use external timeline
                    </StyledButton>
                </ChooseButtonContainer>
                <CAContainerDragBorder
                    draggable={true}
                    cacheight={this.state.height}
                    onMouseDown={(e) => this.mousedown(e)}
                />
            </ChooseAreaContainer>
        );
    }
}

export const StyledButton = styled(Button)``;

export const CAContainerDragBorder = styled.div<{ cacheight: number }>`
    height: 4px;
    background-color: unset;
    position: absolute;
    top: ${(props) => props.cacheight - 2}px;
    cursor: n-resize;
    width: 100%;
`;

export const ChooseButtonContainer = styled.div`
    position: absolute;
    top: 200px;
    display: block;
    left: 200px;

    ${StyledButton} {
        margin-top: 20px;
    }

    ${StyledButton}:first-child {
        margin-top: 0;
    }
`;

export const ChooseAreaContainer = styled.div<{ height: number }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: ${(props) => props.height}px;
    background-color: ${(props) => props.theme.topareas.bg};
    resize: vertical;
`;
