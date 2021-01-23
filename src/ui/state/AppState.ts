import { Theme } from "../theme/theme";
import events from "events";
import { Timeline } from "../../timelines/dreamsmpv1";
import TimelineInst from "../../lib/TimelineInst";
import { notification } from "antd";
import assert from "assert";

interface AppState {
    on(event: "loaded", listener: () => void): this;

    on(event: "loadprogress", listener: (progress: number) => void): this;

    on(event: "timelineLoad", listener: () => void): this;

    on(event: "topresize", listener: (newsize: number) => void): this;

    on(event: string, listener: (...args: any[]) => void): this;
}

// eslint-disable-next-line no-redeclare
class AppState extends events.EventEmitter {
    static inst: AppState;
    theme: Theme;

    loaded = false;
    loading = false;

    tl: TimelineInst;

    events: Map<number, (() => void)[]> = new Map();
    // eslint-disable-next-line no-undef
    int?: NodeJS.Timeout;
    paused = false;
    time = 0;

    constructor(theme: Theme) {
        super();
        AppState.inst = this;
        this.theme = theme;
    }

    startTimeline(tl: Timeline) {
        notification.warn({
            message: `Loading timeline: ${tl.name}`,
            description: `This app is unfinished! See console for debug information`,
        });
        this.tl = TimelineInst.loadTimeline(tl);
        this.loading = true;
        this.emit("timelineLoad");
        this.tl.load();
        this.startEventLoop();
    }

    startEventLoop() {
        if (!this.int) {
            this.time = 1;
            this.events = new Map();

            this.int = setInterval(() => {
                if (this.time <= 10000) {
                    if (this.events.has(this.time)) {
                        const events = this.events.get(this.time);
                        assert(events !== undefined);
                        for (const event of events) {
                            event();
                        }
                        this.events.delete(this.time);
                    }
                    this.time += 1;
                } else {
                    this.time = 1;
                }
            }, 1);
        } else {
            this.events.clear();
            clearInterval(this.int);
            this.int = undefined;
            this.startEventLoop();
        }
    }

    pause() {
        this.paused = !this.paused;
    }

    setAdaptiveTimeout(runner: () => void, timeout: number) {
        let to = this.time + timeout;
        if (to > 10000) {
            to -= 10000;
        }
        if (this.events.has(to)) {
            const has = this.events.get(to);
            assert(has !== undefined);
            has.push(runner);
            this.events.set(to, has);
        } else {
            this.events.set(to, [runner]);
        }
    }
}

export default AppState;
