import { get } from "svelte/store";
import { useSystem } from "../../../../@composables";
import { createCommand, createCommandMatcher } from "../createCommand";
import { executeFlags, setFlag, setWithoutFlag } from "../createCommandFlags";
import { mounths } from "../../../../lib/@tools/date";

export const match = createCommandMatcher((command) => 
    get<string>(command).startsWith('ls'));

export default createCommand((command, result) => {
    const { system } = useSystem();

    setFlag('las', () => {
        const r = get<ParsedItem[]>(system)
            .reduce((r: ParsedItem[], c: ParsedItem) => 
                c.type === 'directory' ? [...r, c] : r, 
                []
            )
            .map(v => {
                const date = new Date(Date.parse(v.updated_date))
                return [
                    'drwxrwxrwx', 
                    '63', 
                    'nchoquet', 
                    'nchoquet', 
                    '76', 
                    mounths[date.getMonth()], 
                    date.getDate(), 
                    date.getHours() + ':' + date.getMinutes(), 
                    v.name
                ].join(' ');
            });

        return [`total ${r.length}`, ...r]
            .map(v => v.replaceAll(/ /g, '&nbsp;'))
            .map(v => [v]);
    });

    setWithoutFlag(() => [
        get<ParsedItem[]>(system)
            .reduce((r: string[], c: ParsedItem) => 
                c.type === 'directory' ? [...r, c.name] : r, [])
            .map(v => {
                if (v.includes(' ')) {
                    if (v.includes(`'`)) {
                        return `"${v}"`
                    } else if (v.includes(`"`)) {
                        return `'${v}'`
                    }
                }
                return v;
            }).join(' ').replaceAll(/ /g, '&nbsp;')
    ]);

    result.set(executeFlags(command));

    return true;
});