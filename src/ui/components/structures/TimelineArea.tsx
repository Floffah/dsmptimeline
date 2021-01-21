import React from "react";
import styled from "styled-components";
import AppState from "../../state/AppState";

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
    }

    onTopresize(newsize: number) {
        this.setState({
            toppos: newsize,
        });
    }

    render() {
        let content = <TAMidText>Loading...</TAMidText>;

        if (!AppState.inst.loaded) {
            content = <TAMidText>Please load a timeline</TAMidText>;
        }

        return (
            <TimelineContainer
                toppos={this.state.toppos}
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

export const TimelineContainer = styled.div<{ toppos: number; full: boolean }>`
    width: 100%;
    top: ${(props) => props.toppos}px;
    height: calc(100% - ${(props) => props.toppos + 25}px);
    overflow-y: auto;
    position: absolute;
`;
