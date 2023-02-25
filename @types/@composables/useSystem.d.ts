declare type TreeItem = {
    creation_date: string,
    opened_date: string,
    updated_date: string,
    content: string | null,
    extention: string| null,
    id: number,
    name: string,
    parent: string,
    type: 'directory' | 'file',
    user_id: 1
};
declare type ParsedItem = TreeItem & { children: Children}
declare type Children = ParsedItem[];

declare type GetChildren = (s: TreeItem[], r: string = '', dn: string = '') => ParsedItem[];
declare type ExecuteFlags = (command: CommandStore, system: SystemStore) => string;

declare type SystemStore = Readable<ParsedItem[]>;