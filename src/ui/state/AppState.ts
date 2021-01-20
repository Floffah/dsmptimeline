import { Theme } from "../theme/theme";

export default class AppState {
    static inst: AppState;
    theme: Theme;

    constructor(theme: Theme) {
        AppState.inst = this;
        this.theme = theme;
    }
}
