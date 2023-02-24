import { get } from "svelte/store";
import routes from "./routing/routes";

export default (
    command: CommandStore, 
    escapedCommand: EscapedCommandStore,
    commandHistory: ArrayStore<string>, 
    result: ArrayStore<string>, 
    resultHistory: MatrixStore<string>, 
    reset: ResetFunc
) => {
    result.subscribe((r: string[]) => 
        resultHistory.update((rh: string[][]) => [...rh, r]))

    for (const { match, command: execCommand } of routes().values()) {
        if (match(command, escapedCommand)) {
            if (execCommand(command, result, resultHistory)) {
                commandHistory.update((v: string[]) => [
                    ...v, 
                    get(command)
                ]);
            }
            break;
        }
    }

    reset();
}
