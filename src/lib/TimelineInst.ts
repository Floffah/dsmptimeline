import { Timeline } from "../timelines/dreamsmpv1";

export default class TimelineInst {
    static loadTimeline(tl: Timeline): TimelineInst {
        const t = new TimelineInst(tl);
        return t;
    }

    loaded: Timeline;

    constructor(tl: Timeline) {
        this.loaded = tl;
    }
}
