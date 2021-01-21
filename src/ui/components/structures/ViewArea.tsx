import React, { MouseEvent as ReactMouseEvent } from "react";
import styled from "styled-components";
import { Button, Tooltip } from "antd";
import AppState from "../../state/AppState";
import { DSMPTimelineV1 } from "../../../timelines/dreamsmpv1";

interface ViewAreaState {
    height: number;
    dragging: boolean;
    mode: "choose" | "view";
}

export default class ViewArea extends React.Component<any, ViewAreaState> {
    constructor(p: any) {
        super(p);

        this.state = {
            height: 500,
            dragging: false,
            mode: "choose",
        };

        AppState.inst.on("timelineLoad", () => this.setState({ mode: "view" }));
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
        if (!this.state.dragging) {
            this.setState({
                dragging: true,
            });
            e.stopPropagation();
            e.preventDefault();
        }
    }

    mouseup(e: MouseEvent) {
        if (this.state.dragging) {
            this.setState({
                dragging: false,
            });
            e.stopPropagation();
            e.preventDefault();
        }
    }

    mousemove(e: MouseEvent) {
        if (this.state.dragging) {
            let newheight = e.pageY;
            if (e.pageY <= 100) newheight = 100;
            if (e.pageY >= window.innerHeight - 100)
                newheight = window.innerHeight - 100;

            this.setState({
                height: newheight,
            });
            AppState.inst.emit("topresize", newheight);
            e.stopPropagation();
            e.preventDefault();
        }
    }

    chose(what: "dsmp" | "custom", _customurl?: string) {
        if (what === "dsmp") {
            AppState.inst.startTimeline(DSMPTimelineV1);
        }
    }

    render() {
        if (this.state.mode === "choose") {
            return (
                <>
                    <ViewAreaContainer style={{ height: this.state.height }}>
                        <ViewButtonContainer>
                            <StyledButton
                                type="primary"
                                size="large"
                                onClick={() => this.chose("dsmp")}
                            >
                                Load DreamSMP timeline
                            </StyledButton>
                            <br />
                            <TooltipRef title="Currently not supported">
                                <StyledButton size="large" disabled={true}>
                                    Use external timeline
                                </StyledButton>
                            </TooltipRef>
                        </ViewButtonContainer>
                    </ViewAreaContainer>
                    <CAContainerDragBorder
                        draggable={true}
                        style={{ top: this.state.height - 2 }}
                        onMouseDown={(e) => this.mousedown(e)}
                    />
                </>
            );
        }
        return (
            <>
                <ViewAreaContainer style={{ height: this.state.height }}>
                    <ViewBox
                        style={{
                            height: this.state.height,
                            width: this.state.height / (9 / 16),
                            left:
                                window.innerWidth / 2 -
                                this.state.height / (9 / 16) / 2,
                        }}
                    />
                </ViewAreaContainer>
                <CAContainerDragBorder
                    draggable={true}
                    style={{ top: this.state.height - 2 }}
                    onMouseDown={(e) => this.mousedown(e)}
                />
            </>
        );
    }
}

export const ViewBox = styled.div`
    background-color: black;
    position: absolute;
`;

export const StyledButton = styled(Button)``;
export const TooltipRef = styled(Tooltip)``;

export const CAContainerDragBorder = styled.div`
    height: 4px;
    background-color: unset;
    position: fixed;
    cursor: n-resize;
    width: 100%;
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
    resize: vertical;
    overflow-y: auto;
`;
