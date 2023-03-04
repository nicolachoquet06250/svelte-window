declare module '@svelte/window' {
    export type Command = (options: {
        command: CommandStore,
        result: WWritable<string[]>, 
        resultHistory?: WWritable<string[][]>,
        manualy?: boolean
    }) => boolean | void;
    
    export type CommandMatcher = (options: {
        command: CommandStore, 
        escapedCommand: EscapedCommandStore
    }) => boolean;
    
    export type OnValidated = (
        command: WWritable<string>, 
        escapedCommand: WReadable<string>
    ) => void;
    
    export type OnLetter = () => void;
}
