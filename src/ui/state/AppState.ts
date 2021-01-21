import { Theme } from "../theme/theme";
import events from "events";
import { Timeline } from "../../timelines/dreamsmpv1";
import TimelineInst from "../../lib/TimelineInst";
import { notification } from "antd";

interface AppState {
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
    }
}

export default AppState;
