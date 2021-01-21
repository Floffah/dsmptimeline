import React from "react";
import styled from "styled-components";
import AppState from "../../state/AppState";
import { Progress } from "antd";

interface TAState {
    toppos: number;
    isfull: boolean;
}

export default class TimelineArea extends React.Component<any, TAState> {
    constructor(p: any) {
        super(p);

        this.state = {
            toppos: 500,
            isfull: false,
        };

        AppState.inst.on("topresize", (n) => this.onTopresize(n));
        AppState.inst.on("timelineLoad", () => this.forceUpdate());
    }

    onTopresize(newsize: number) {
        this.setState({
            toppos: newsize,
        });
    }

    render() {
        let content = <TAMidText>Loading...</TAMidText>;

        if (AppState.inst.loading) {
            content = (
                <TAMidText>
                    Doing some calculations...
                    <br />
                    <Progress percent={15} status="active" />
                </TAMidText>
            );
        } else if (!AppState.inst.loaded) {
            content = <TAMidText>Please load a timeline</TAMidText>;
        }

        return (
            <TimelineContainer
                style={{
                    top: this.state.toppos,
                    height: `calc(100% - ${this.state.toppos + 25}px)`,
                }}
                full={this.state.isfull}
            >
                {content}
            </TimelineContainer>
        );
    }
}

export const TAMidText = styled.p`
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
`;
