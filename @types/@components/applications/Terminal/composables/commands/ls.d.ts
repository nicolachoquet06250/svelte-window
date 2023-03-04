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
