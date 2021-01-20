import { Theme } from "../theme/theme";
import events from "events";

interface AppState {
    on(event: string, listener: (...args: any[]) => void): this;
}

// eslint-disable-next-line no-redeclare
class AppState extends events.EventEmitter {
    static inst: AppState;
    theme: Theme;

    constructor(theme: Theme) {
        super();
        AppState.inst = this;
        this.theme = theme;
    }
}

export default AppState;
