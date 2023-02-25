import { derived, writable } from "svelte/store";

const system = writable<TreeItem[]>([
    {
        content: null,
        creation_date: (new Date()).toUTCString(),
        extention: null,
        id: 1,
        parent: "/",
        name: "Applications",
        opened_date: (new Date()).toUTCString(),
        type: "directory",
        updated_date: (new Date()).toUTCString(),
        user_id: 1,
    },
    {
        content: null,
        creation_date: (new Date()).toUTCString(),
        extention: null,
        id: 2,
        name: "AirDrop",
        parent: "/",
        opened_date: (new Date()).toUTCString(),
        type: "directory",
        updated_date: (new Date()).toUTCString(),
        user_id: 1
    },
    {
        content: null,
        creation_date: (new Date()).toUTCString(),
        extention: null,
        id: 3,
        name: "Desktop",
        parent: "/",
        opened_date: (new Date()).toUTCString(),
        type: "directory",
        updated_date: (new Date()).toUTCString(),
        user_id: 1
    },
    {
        content: null,
        creation_date: (new Date()).toUTCString(),
        extention: null,
        id: 4,
        name: "Images",
        parent: "/",
        opened_date: (new Date()).toUTCString(),
        type: "directory",
        updated_date: (new Date()).toUTCString(),
        user_id: 1
    },
    {
        content: null,
        creation_date: (new Date()).toUTCString(),
        extention: null,
        id: 5,
        name: "Videos",
        parent: "/",
        opened_date: (new Date()).toUTCString(),
        type: "directory",
        updated_date: (new Date()).toUTCString(),
        user_id: 1
    },
    {
        content: null,
        creation_date: (new Date()).toUTCString(),
        extention: null,
        id: 6,
        name: "Documents",
        parent: "/",
        opened_date: (new Date()).toUTCString(),
        type: "directory",
        updated_date: (new Date()).toUTCString(),
        user_id: 1
    },
    {
        content: null,
        creation_date: (new Date()).toUTCString(),
        extention: null,
        id: 7,
        name: "Downloads",
        parent: "/",
        opened_date: (new Date()).toUTCString(),
        type: "directory",
        updated_date: (new Date()).toUTCString(),
        user_id: 1
    },
    {
        content: null,
        creation_date: (new Date()).toUTCString(),
        extention: null,
        id: 9,
        name: "prod",
        parent: "/Desktop",
        opened_date: (new Date()).toUTCString(),
        type: "directory",
        updated_date: (new Date()).toUTCString(),
        user_id: 1
    },
    {
        content: null,
        creation_date: (new Date()).toUTCString(),
        extention: null,
        id: 10,
        name: "portfolio-apple",
        parent: "/Desktop/prod",
        opened_date: (new Date()).toUTCString(),
        type: "directory",
        updated_date: (new Date()).toUTCString(),
        user_id: 1
    },
    {
        content: null,
        creation_date: (new Date()).toUTCString(),
        extention: null,
        id: 10,
        name: "répertoire dans documents",
        parent: "/Documents",
        opened_date: (new Date()).toUTCString(),
        type: "directory",
        updated_date: (new Date()).toUTCString(),
        user_id: 1
    }
]);

const getChildren: GetChildren = (s, root = '', dirName = '') => {
    return s.reduce((r, c) => {
        return c.parent === `${root}/${dirName}`.replace('//', '/') 
            ? [
                ...r, 
                {
                    ...c,
                    // icon: c.type === 'directory' ? iconDirectory : iconUnknownFile,
                    children: getChildren(s, `${root}/${dirName}`, c.name)
                }
            ] : r
    }, []);
};

const reliefSystem = derived(system, v => getChildren(v));

export const useSystem = () => ({
    system: reliefSystem,
    flatSystem: system,
    get() {},
    findAll(name: string) {},
    find(path: string) {}
});