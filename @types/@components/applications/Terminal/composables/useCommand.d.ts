declare type Command = (
    command: CommandStore,
    result: WWritable<string[]>, 
    resultHistory?: WWritable<string[][]>,
    manualy?: boolean
) => boolean | void
declare type CommandMatcher = (
    w: CommandStore, 
    r: EscapedCommandStore
) => boolean;

declare type OnValidated = (
    command: WWritable<string>, 
    escapedCommand: WReadable<string>
) => void;

declare type OnLetter = () => void;