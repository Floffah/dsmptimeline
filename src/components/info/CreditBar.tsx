import * as React from "react";
import styled from "styled-components";

export default function CreditBar() {
    return (
        <CBContainer>
            <p>DSMPTIMELINE v0.0.1-alpha</p>
            <p>
                (c) 2021 Floffah & Contributors. Not affiliated with Dream SMP
                or anyone part of it. Licensed under GPL-3.0{" "}
                <a
                    href="https://github.com/Floffah/dsmptimeline"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    See source
                </a>
            </p>
        </CBContainer>
    );
}

export const CBContainer = styled.div`
    background-color: ${(props) => props.theme.creditbar.bg};
    height: 25px;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    display: inline-block;

    p {
        display: inline-block;
        margin-left: 10px;
        margin-right: 10px;
        right: 0;
        position: absolute;
    }

    p:first-child {
        left: 0;
    }
`;
