declare type FirstLetterOf<
    S extends string
> = S extends `${infer FL}${string}` ? FL : S;

declare type UCFirst<
    S extends string
> = S extends `${FirstLetterOf<S>}${infer Rest}` 
    ? `${Uppercase<FirstLetterOf<S>>}${Lowercase<Rest>}` : S;