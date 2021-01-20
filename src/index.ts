import ui from "./ui/ui";

let ready = false;
document.addEventListener("DOMContentLoaded", () => {
    if (!ready) {
        ready = true;
        ui();
    }
});
