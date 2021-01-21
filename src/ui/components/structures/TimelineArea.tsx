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
            pieces.push(
                <TAPuzzlePiece style={{ left: entry[0] / 1000 }}>
                    <p>{entry[1].name}</p>
                </TAPuzzlePiece>,
            );
        }

        this.setState({
            content: <div>{pieces}</div>,
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

export const TAPuzzlePiece = styled.div`
    height: 100px;
    border: 1px solid black;
    border-radius: 10px;
    width: 400px;
    position: absolute;
    display: inline-block;
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
    overflow-y: auto;
    position: absolute;
    overflow-x: auto;
`;
