import React, {
    ContextType,
    MouseEvent as ReactMouseEvent,
    ReactNode,
} from "react";
import { AppContext } from "../../state/AppState";
import { DSMPTimelineV1 } from "../../timelines/dreamsmpv1";
import assert from "assert";
import { YouTubePlayer } from "youtube-player/dist/types";
import {
    CAContainerDragBorder,
    StyledButton,
    TooltipRef,
    ViewAreaContainer,
    ViewBox,
    ViewButtonContainer,
    YTFrame,
} from "./ViewArea.styles";

interface ViewAreaState {
    height: number;
    dragging: boolean;
    mode: "choose" | "view";
    viewtype: "none" | "yt" | "tw";
    ytid?: string;
    ytc?: ReactNode;
}

export default class ViewArea extends React.Component<any, ViewAreaState> {
    winresizing = false;
    last = 0;
    current!: YouTubePlayer;

    timeinvideo = 0;

    context!: ContextType<typeof AppContext>;
    static contextType = AppContext;

    utimeint!: NodeJS.Timeout;
    resizeint!: NodeJS.Timeout;

    listeners = {
        timelineLoad: () => this.setState({ mode: "view" }),
        loaded: () => this.calcNext(),
        mousemove: (e: MouseEvent) => this.mousemove(e),
        mouseup: (e: MouseEvent) => this.mouseup(e),
        windowresize: () => {
            this.winresizing = true;
        },
    };

    constructor(p: any) {
        super(p);

        this.state = {
            height: 500,
            dragging: false,
            mode: "choose",
            viewtype: "none",
        };
    }

    calcNext() {
        if (!this.context.tl) return;

        for (let i = this.last; i < this.last + 10000; i++) {
            if (this.context.tl.stamps.has(i)) {
                const stamp = this.context.tl.stamps.get(i);
                assert(stamp !== undefined);
                if (stamp.action === "in") {
                    this.setState({
                        viewtype: "yt",
                        ytid: stamp.ytid,
                        ytc: (
                            <YTFrame
                                videoId={stamp.ytid}
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

        this.context.setAdaptiveTimeout(() => this.calcNext(), 10000);
    }

    componentDidMount() {
        window.addEventListener("resize", this.listeners.windowresize);
        document.addEventListener("mousemove", this.listeners.mousemove);
        document.addEventListener("mouseup", this.listeners.mouseup);
        this.context.on("timelineLoad", this.listeners.timelineLoad);
        this.context.on("loaded", this.listeners.loaded);

        this.utimeint = setInterval(() => {
            if (this.current) {
                this.timeinvideo = Math.round(
                    this.current.getCurrentTime() * 1000,
                );
            }
        }, 100);

        this.resizeint = setInterval(() => {
            if (this.winresizing) {
                this.winresizing = false;
                this.forceUpdate();
            }
        }, 500);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.listeners.windowresize);
        document.removeEventListener("mousemove", this.listeners.mousemove);
        document.removeEventListener("mouseup", this.listeners.mouseup);
        this.context.removeListener(
            "timelineLoad",
            this.listeners.timelineLoad,
        );
        this.context.removeListener("loaded", this.listeners.loaded);
        clearInterval(this.utimeint);
        clearInterval(this.resizeint);
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
            this.context.emit("topresize", newheight);
            e.stopPropagation();
            e.preventDefault();
        }
    }

    chose(what: "dsmp" | "custom", _customurl?: string) {
        if (what === "dsmp") {
            this.context.startTimeline(DSMPTimelineV1);
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
