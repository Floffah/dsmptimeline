import * as React from "react";
import styled from "styled-components";
import ChooseArea from "./ChooseArea";
import TimelineArea from "./TimelineArea";

interface BodyState {
    toparea: {
        visible: "choose" | "view";
    };
}

export default class Body extends React.Component<any, BodyState> {
    constructor(p: any) {
        super(p);

        this.state = {
            toparea: {
                visible: "choose",
            },
        };
    }

    render() {
        return (
            <BodyContainer>
                <ChooseArea />
                <TimelineArea />
            </BodyContainer>
        );
    }
}

export const BodyContainer = styled.div`
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    margin: 0;
    position: fixed;
    background-color: ${(props) => props.theme.bg};
`;
