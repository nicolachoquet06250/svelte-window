declare module '@svelte/window' {
    export type FirstLetterOf<
        S extends string
    > = S extends `${infer FL}${string}` ? FL : S;

    export type UCFirst<
        S extends string
    > = S extends `${FirstLetterOf<S>}${infer Rest}` 
        ? `${Uppercase<FirstLetterOf<S>>}${Lowercase<Rest>}` : S;
}
