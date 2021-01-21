import { Timeline } from "../timelines/dreamsmpv1";
import AppState from "../ui/state/AppState";

interface Timestamp {
    action: "in" | "out" | "switch";
    twid?: number; //twitch vod id
    ytid?: string; //youtube watch id
    stamp?: number; //milliseconds into the video
    name?: string; // for debug purposes
}

export default class TimelineInst {
    static loadTimeline(tl: Timeline): TimelineInst {
        return new TimelineInst(tl);
    }

    loaded: Timeline;
    stamps: Map<number, Timestamp> = new Map();

    constructor(tl: Timeline) {
        this.loaded = tl;
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
            AppState.inst.emit("loadprogress", (done / total) * 100);
        };

        const keys = Object.keys(this.loaded.parts);
        for (const key of keys) {
            for (const video of this.loaded.parts[key].videos) {
                const videoin: Timestamp = {
                    action: "in",
                    stamp: video.cutin || 0,
                    name: video.name,
                };
                if ("youtube" in video) {
                    videoin.ytid = video.youtube.watchid;
                } else if ("twitch" in video) {
                    videoin.twid = video.twitch.vodid;
                }
                this.stamps.set(video.in, videoin);
                p(1);
            }
        }
        this.stamps = new Map(
            [...this.stamps.entries()].sort((a, b) => a[0] - b[0]),
        );
        p(1);
        console.log(this.stamps.entries());
        AppState.inst.loading = false;
        AppState.inst.loaded = true;
        AppState.inst.emit("loaded");
    }
}