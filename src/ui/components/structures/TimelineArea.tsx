import React, { ReactNode } from "react";
import styled from "styled-components";
import AppState from "../../state/AppState";
import { Progress } from "antd";

interface TAState {
    toppos: number;
    isfull: boolean;
    loadpercent: number;
    content?: ReactNode;
}

export default class TimelineArea extends React.Component<any, TAState> {
    constructor(p: any) {
        super(p);

        this.state = {
            toppos: 500,
            isfull: false,
            loadpercent: 0,
        };

        AppState.inst.on("loaded", () => this.doAJigSawPuzzle());
        AppState.inst.on("topresize", (n) => this.onTopresize(n));
        AppState.inst.on("timelineLoad", () => this.forceUpdate());
        AppState.inst.on("loadprogress", (percent) =>
            this.setState({ loadpercent: percent }),
        );
    }

    onTopresize(newsize: number) {
        this.setState({
            toppos: newsize,
        });
    }

    doAJigSawPuzzle() {
        const pieces: ReactNode[] = [];

        for (const entry of AppState.inst.tl.stamps.entries()) {
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

            if (AppState.inst.loading) {
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
            } else if (!AppState.inst.loaded) {
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

export const Track = styled.div`
    height: 42px;
    border-bottom: 2px solid ${(props) => props.theme.bg};
    display: block;
`;

export const TrackLike = styled.div`
    display: inline-block;
    height: 100%;
    width: 200px;
    border-top: 2px solid ${(props) => props.theme.bg};
    border-bottom: 2px solid ${(props) => props.theme.bg};
    position: absolute;
    left: 0;
    top: 0;
    background-color: ${(props) => props.theme.timeline.tracklikebg};
    padding: 5px;
`;

export const TAJigSaw = styled.div`
    display: inline-block;
    position: absolute;
    overflow-x: auto;
    left: 200px;
    top: 0;
    height: 100%;
    width: calc(100% - 200px);
`;

export const TAPuzzleDetails = styled.p`
    margin: 0;
    padding-left: 5px;
`;
export const TAPuzzlePiece = styled.div`
    height: 50px;
    border-radius: 5px;
    position: absolute;
    top: 0;
    background-color: ${(props) => props.theme.timeline.clipbg};
    border: 2px solid ${(props) => props.theme.bg};
    display: inline-block;

    p {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    p:not(${TAPuzzleDetails}) {
        width: 100%;
        background-color: ${(props) => props.theme.timeline.cliptxtbg};
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        padding-left: 5px;
        margin-bottom: 2px;
    }
`;

export const TAMidText = styled.div`
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    font-size: 20px;
`;

export const TimelineContainer = styled.div<{ full: boolean }>`
    width: 100%;
    position: absolute;
    overflow-y: auto;
`;
