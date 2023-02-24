declare type Command = (
    command: CommandStore,
    result: Writable<string[]>, 
    resultHistory?: Writable<string[][]>
) => boolean | void
declare type CommandMatcher = (
    w: CommandStore, 
    r: EscapedCommandStore
) => boolean;

declare type OnValidated = (
    command: Writable<string>, 
    escapedCommand: Readable<string>
) => void;

declare type OnLetter = () => void;