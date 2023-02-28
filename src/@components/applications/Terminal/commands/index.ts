import { get } from "svelte/store";
import routes from "./routing/routes";

export default (
    command: CommandStore, 
    escapedCommand: EscapedCommandStore,
    commandHistory: ArrayStore<string>, 
    result: ArrayStore<string>, 
    resultHistory: MatrixStore<string>, 
    reset: ResetFunc,
    manualy: boolean
) => {
    for (const { match, command: execCommand } of routes().values()) {
        if (match(command, escapedCommand)) {
            if (execCommand(command, result, resultHistory, manualy)) {
                commandHistory.update((v: string[]) => [
                    ...v, 
                    get(command)
                ]);
            }
            break;
        }
    }

    reset();

    let alreadyRunned = false;
    const unsubscribe = result.subscribe((r: string[]) => {
        if (!alreadyRunned) {
            resultHistory.update((rh: string[][]) => [...rh, r])
            try {
                alreadyRunned = true;
                unsubscribe()
            } catch(err) {}
        }
    })
}
