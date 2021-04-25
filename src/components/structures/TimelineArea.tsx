import React, { ContextType, ReactNode } from "react";
import { AppContext } from "../../state/AppState";
import { Progress } from "antd";
import {
    TAJigSaw,
    TAMidText,
    TAPuzzleDetails,
    TAPuzzlePiece,
    TimelineContainer,
    Track,
    TrackLike,
} from "./TimelineArea.styles";

interface TAState {
    toppos: number;
    isfull: boolean;
    loadpercent: number;
    content?: ReactNode;
}

export default class TimelineArea extends React.Component<any, TAState> {
    static contextType = AppContext;
    context!: ContextType<typeof AppContext>;

    listeners = {
        loaded: () => this.doAJigSawPuzzle(),
        topresize: (n: number) => this.onTopresize(n),
        timelineLoad: () => this.forceUpdate(),
        loadprogress: (percent: number) =>
            this.setState({ loadpercent: percent }),
    };

    constructor(p: any) {
        super(p);

        this.state = {
            toppos: 500,
            isfull: false,
            loadpercent: 0,
        };
    }

    componentDidMount() {
        this.context.on("loaded", this.listeners.loaded);
        this.context.on("topresize", this.listeners.topresize);
        this.context.on("timelineLoad", this.listeners.timelineLoad);
        this.context.on("loadprogress", this.listeners.loadprogress);
    }

    componentWillUnmount() {
        this.context.removeListener("loaded", this.listeners.loaded);
        this.context.removeListener("topresize", this.listeners.topresize);
        this.context.removeListener(
            "timelineLoad",
            this.listeners.timelineLoad,
        );
        this.context.removeListener(
            "loadprogress",
            this.listeners.loadprogress,
        );
    }

    onTopresize(newsize: number) {
        this.setState({
            toppos: newsize,
        });
    }

    doAJigSawPuzzle() {
        if (!this.context.tl) return;

        const pieces: ReactNode[] = [];

        for (const entry of this.context.tl.stamps.entries()) {
            if (entry[1].action === "in") {
                pieces.push(
                    <TAPuzzlePiece
                        style={{
                            left: entry[0] / 1000,
                            width: (entry[1].length || 100) / 1000,
                        }}
                        key={pieces.length}
                    >
                        <p>{entry[1].name}</p>
                        <TAPuzzleDetails>
                            Via YouTube@{entry[1].associated || "unknown"}
                        </TAPuzzleDetails>
                    </TAPuzzlePiece>,
                );
            }
        }

        this.setState({
            content: (
                <>
                    <TrackLike>
                        <Track>
                            <p>Placeholder Track</p>
                        </Track>
                    </TrackLike>
                    <TAJigSaw>{pieces}</TAJigSaw>
                </>
            ),
        });
    }

    render() {
        let content;
        if (!this.state.content) {
            content = (
                <TAMidText>
                    <p>Loading...</p>
                </TAMidText>
            );

            if (this.context.loading) {
                content = (
                    <TAMidText>
                        <p>Doing some calculations...</p>
                        <br />
                        <Progress
                            percent={this.state.loadpercent}
                            status="active"
                        />
                    </TAMidText>
                );
            } else if (!this.context.loaded) {
                content = (
                    <TAMidText>
                        <p>No timeline loaded.</p>
                    </TAMidText>
                );
            }
        }

        return (
            <TimelineContainer
                style={{
                    top: this.state.toppos,
                    height: `calc(100% - ${this.state.toppos + 25}px)`,
                }}
                full={this.state.isfull}
            >
                {this.state.content || content}
            </TimelineContainer>
        );
    }
}
