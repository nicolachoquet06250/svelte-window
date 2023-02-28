import { get } from "svelte/store";
import { createCommand, createCommandMatcher } from "../createCommand";

export const match = createCommandMatcher(({ command }) => get<string>(command).trim() === 'help');

export default createCommand(({ result, manualy }) => {
    result.set([
        `Help =>`,
        `&nbsp;&nbsp;• help &#60;name&#62;`,
        `&nbsp;&nbsp;• hello &#60;name&#62;`,
        `&nbsp;&nbsp;• ls`,
        `&nbsp;&nbsp;• ls -las`,
        `&nbsp;&nbsp;• clear`,
        `En appuillant une fois sur 'tab', votre commande se completera automatiquement`
    ]);

    return !manualy;
});