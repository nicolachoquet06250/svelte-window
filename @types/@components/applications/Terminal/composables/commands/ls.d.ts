declare module '@svelte/window' {
    export type FormatTree = (
        system: WReadable<ParsedItem[]>
    ) => string[];

    export type GetFlag = (
        command: CommandStore
    ) => Record<`-${string}`, string | true>;

    export type SetFlagCb = (
        value?: string | true
    ) => string[]|string[][];
}

declare type FormatTree = (
    system: WReadable<ParsedItem[]>
) => string[]
declare type GetFlag = (
    command: CommandStore
) => Record<`-${string}`, string | true>;
declare type SetFlagCb = (
    value?: string | true
) => string[]|string[][];