declare type FormatTree = (system: Readable<ParsedItem[]>) => 
    string[]
declare type GetFlag = (command: CommandStore) => 
    Record<`-${string}`, string | true>;
declare type SetFlagCb = (
    value?: string | true
) => string[]|string[][];