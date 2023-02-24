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
    for (const { match, command: commandFn } of routes().values()) {
        if (match(command, escapedCommand)) {
            const r = commandFn(
                command, result, resultHistory
            );
            if (r) {
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
