export interface Timeline {
    name: string; // timeline name
    parts: {
        [k: string]: TimelineSection; // sections (e.g. season 1)
    };
}

export interface TimelineSection {
    videos: TimelineVideo[]; // videos in section
}

export type TimelineVideo = TimelineVideoTwitch | TimelineVideoYoutube;

export interface TimelineVideoCommon {
    cutins: number[]; // when in the timeline the active video should be switched to this one (milliseconds)
    cuts: { from: number; to: number }[]; // which parts of the video should be skipped (millseconds)
    name: string; // video name
    author: string; // video author
    cutin?: number; // how many seconds into the video should be cut (e.g. unrelated intro for 21000ms (21s))
    //in: number; // when in the timeline the video should start (milliseconds). the 1st one in each second should be 0 (automatically calculated). wont automatically cut to the video, must specify a cut to in cutins. will automatically cut to video if and only if its the only thing currently playing or available
    endcutoff?: number; // milliseconds before the end that should be cut off (e.g. during end title stuff)
    length: number; // length of video in milliseconds
}

export interface TimelineVideoTwitch extends TimelineVideoCommon {
    twitch: {
        vodid: number; // the number at the end of a vod url
    };
}

export interface TimelineVideoYoutube extends TimelineVideoCommon {
    youtube: {
        watchid: string; // the id at the end of a youtube video url
    };
}

// For generating json schema, use https://www.convertjson.com/javascript-object-to-json.htm then to https://jsonschema.net/home

// Version 1 is based off of https://docs.google.com/document/d/1xOsi4EgUKH5Usnzp6yLiF-sQF_l1z6W5Bjnib-fM6q4/edit?usp=sharing
export const DSMPTimelineV1: Timeline = {
    name: "Dream SMP",
    parts: {
        Prologue: {
            videos: [
                {
                    name: "Disc War PT1",
                    youtube: {
                        watchid: "sWPvdw7bOak",
                    },
                    author: "TommyInnit",
                    cutins: [],
                    cuts: [],
                    //in: 0,
                    cutin: 21870,
                    length: 1099000,
                },
                {
                    name: "Disc War PT2",
                    youtube: {
                        watchid: "tzh1AHgH3QI",
                    },
                    author: "TommyInnit",
                    cutins: [],
                    cuts: [],
                    //in: 1099000,
                    length: 1312000,
                },
                {
                    name: "Disc War PT3",
                    youtube: {
                        watchid: "rVZgGARFfIE",
                    },
                    author: "TommyInnit",
                    cutins: [],
                    cuts: [],
                    //in: 2411000,
                    length: 1231000,
                },
                {
                    name: "Jschlatt Joins",
                    youtube: {
                        watchid: "s7KfXa1WSFo",
                    },
                    author: "TommyInnit",
                    cutins: [],
                    cuts: [],
                    //in: 3642000,
                    length: 1123000,
                },
            ],
        },
        "Season One": {
            videos: [
                {
                    name: "War Arc PT1",
                    youtube: {
                        watchid: "zTs1uMdoVww",
                    },
                    author: "Wilbur Soot",
                    cutins: [],
                    cuts: [],
                    //in: 0,
                    length: 2030000,
                },
                {
                    name: "Dream's speech to George",
                    youtube: {
                        watchid: "tGUODpZKmEI",
                    },
                    author: "Mixii",
                    cutins: [],
                    cuts: [],
                    //in: 2030000,
                    length: 28000,
                },
            ],
        },
    },
};
