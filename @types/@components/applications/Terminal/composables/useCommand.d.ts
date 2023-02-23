declare type Command = (
    command: CommandStore,
    commandHistory: Writable<string[]>, 
    result: Writable<string[]>, 
    resultHistory: Writable<string[][]>,
    reset: ResetFunc
) => void
declare type CommandMatcher = (
    w: CommandStore, 
    r: EscapedCommandStore
) => boolean;