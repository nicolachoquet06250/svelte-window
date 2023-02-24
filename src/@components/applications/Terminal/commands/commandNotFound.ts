import { derived, get } from "svelte/store";
import { createCommand, createCommandMatcher } from "../createCommand";

export const match = createCommandMatcher(() => true);

export default createCommand((
    command, result, resultHistory,
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

    return false;
})