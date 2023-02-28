declare type Command = (options: {
    command: CommandStore,
    result: WWritable<string[]>, 
    resultHistory?: WWritable<string[][]>,
    manualy?: boolean
}) => boolean | void
declare type CommandMatcher = (options: {
    command: CommandStore, 
    escapedCommand: EscapedCommandStore
}) => boolean;

declare type OnValidated = (
    command: WWritable<string>, 
    escapedCommand: WReadable<string>
) => void;

declare type OnLetter = () => void;