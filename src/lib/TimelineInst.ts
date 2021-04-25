import { Timeline } from "../timelines/dreamsmpv1";
import AppState from "../state/AppState";

interface Timestamp {
    action: "in" | "switch";
    twid?: number; //twitch vod id
    ytid?: string; //youtube watch id
    stamp?: number; //milliseconds into the video
    name?: string; // for debug purposes
    length?: number; // length of video when using in action
    associated?: string; // e.g. the author of the youtube video
}

export default class TimelineInst {
    static loadTimeline(tl: Timeline, state: AppState): TimelineInst {
        return new TimelineInst(tl, state);
    }

    loaded: Timeline;
    stamps: Map<number, Timestamp> = new Map();
    state: AppState;

    constructor(tl: Timeline, state: AppState) {
        this.loaded = tl;
        this.state = state;
    }

    getTotal(): number {
        let total = 0;
        const keys = Object.keys(this.loaded.parts);
        for (const key of keys) {
            for (const video of this.loaded.parts[key].videos) {
                total += 1 + video.cutins.length + video.cuts.length;
            }
        }
        return total;
    }

    load() {
        this.stamps.clear();

        const total = this.getTotal();
        let done = 1;

        const p = (u: number) => {
            done += u;
            this.state.emit("loadprogress", (done / total) * 100);
        };

        const keys = Object.keys(this.loaded.parts);
        let tlength = 0;

        for (const key of keys) {
            for (let i = 0; i < this.loaded.parts[key].videos.length; i++) {
                const video = this.loaded.parts[key].videos[i];
                const videoin: Timestamp = {
                    action: "in",
                    stamp: video.cutin || 0,
                    name: video.name,
                    length: video.length,
                    associated: video.author,
                };
                if ("youtube" in video) {
                    videoin.ytid = video.youtube.watchid;
                } else if ("twitch" in video) {
                    videoin.twid = video.twitch.vodid;
                }
                this.stamps.set(tlength, videoin);
                tlength += video.length;
                p(1);
            }
        }
        this.stamps = new Map(
            [...this.stamps.entries()].sort((a, b) => a[0] - b[0]),
        );
        p(1);
        console.log(this.stamps.entries());
        this.state.loading = false;
        this.state.loaded = true;
        this.state.emit("loaded");
    }
}
