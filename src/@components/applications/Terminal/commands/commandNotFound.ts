import { derived, get } from "svelte/store";

export default ((
    command, commandHistory, 
    result, resultHistory,
    reset = () => {}
) => {
    const escapedCommand = derived(
        command, 
        ($c: string) => $c.replaceAll(/ /g, '&nbsp;')
    );
    result.set([`command "${get(escapedCommand)}" not found !`]);
    resultHistory.update((v: string[]) => [
        ...v, 
        get(result)
    ]);
    reset();
}) as Command