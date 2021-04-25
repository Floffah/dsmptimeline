import styled from "styled-components";

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
