import React, { MouseEvent as ReactMouseEvent, ReactNode } from "react";
import AppState from "../../state/AppState";
import { DSMPTimelineV1 } from "../../../timelines/dreamsmpv1";
import assert from "assert";
import YouTube from "react-youtube";
import { YouTubePlayer } from "youtube-player/dist/types";
import styled from "styled-components";
import { Button, Tooltip } from "antd";

interface ViewAreaState {
    height: number;
    dragging: boolean;
    mode: "choose" | "view";
    viewtype: "none" | "yt" | "tw";
    ytid?: string;
    ytc?: ReactNode;
}

export default class ViewArea extends React.Component<any, ViewAreaState> {
    last = 0;
    current: YouTubePlayer;

    constructor(p: any) {
        super(p);

        this.state = {
            height: 500,
            dragging: false,
            mode: "choose",
            viewtype: "none",
        };

        AppState.inst.on("timelineLoad", () => this.setState({ mode: "view" }));
        AppState.inst.on("loaded", () => this.calcNext());
    }

    calcNext() {
        for (let i = this.last; i < this.last + 10000; i++) {
            if (AppState.inst.tl.stamps.has(i)) {
                const stamp = AppState.inst.tl.stamps.get(i);
                assert(stamp !== undefined);
                if (stamp.action === "in") {
                    this.setState({
                        viewtype: "yt",
                        ytid: stamp.ytid,
                        ytc: (
                            <YTFrame
                                videoId={this.state.ytid}
                                opts={{
                                    playerVars: {
                                        autoplay: 1,
                                        controls: 0,
                                        disablekb: 1,
                                        enablejsapi: 1,
                                        fs: 0,
                                        iv_load_policy: 3,
                                        loop: 0,
                                        modestbranding: 1,
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        //@ts-ignore - i need to because this isnt defined in the package's type definitions but definitely works
                                        widget_referrer:
                                            "https://timeline.dreamsmp.live",
                                    },
                                    height: `100%`,
                                    width: `100%`,
                                }}
                                onReady={(e) => this.ytready(e)}
                            />
                        ),
                    });
                }
            }
        }
        this.last += 10000;

        AppState.inst.setAdaptiveTimeout(() => this.calcNext(), 10000);
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

    ytready(e: { target: YouTubePlayer }) {
        this.current = e.target;
    }

    ytstate(e: { target: YouTubePlayer; data: number }) {
        this.current = e.target;
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
                        style={{ top: this.state.height - 4 }}
                        onMouseDown={(e) => this.mousedown(e)}
                    />
                </>
            );
        }
        let vbc: ReactNode | string = "";
        const vw = this.state.height / (9 / 16);
        const vh = this.state.height;

        if (this.state.viewtype === "yt" && this.state.ytid !== undefined) {
            vbc = this.state.ytc;
        }

        return (
            <>
                <ViewAreaContainer style={{ height: this.state.height }}>
                    <ViewBox
                        style={{
                            height: vh,
                            width: vw,
                            left: window.innerWidth / 2 - vw / 2,
                        }}
                    >
                        {vbc}
                    </ViewBox>
                </ViewAreaContainer>
                <CAContainerDragBorder
                    draggable={true}
                    style={{ top: this.state.height - 4 }}
                    onMouseDown={(e) => this.mousedown(e)}
                />
            </>
        );
    }
}

export const YTFrame = styled(YouTube)`
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
