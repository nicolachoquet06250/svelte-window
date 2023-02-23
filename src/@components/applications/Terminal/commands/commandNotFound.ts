import { derived, get } from "svelte/store";
import type { Command } from "../composables";

export default ((
    command, commandHistory, 
    result, resultHistory,
    reset = () => {}
) => {
    const escapedCommand = derived(
        command, 
        $c => $c.replaceAll(/ /g, '&nbsp;')
    );
    result.set([`command "${get(escapedCommand)}" not found !`]);
    resultHistory.update(v => [
        ...v, 
        get(result)
    ]);
    reset();
}) as Command