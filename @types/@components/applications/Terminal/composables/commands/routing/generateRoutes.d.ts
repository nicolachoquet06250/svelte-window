declare module '@svelte/window' {
    export type Route = { name: string, command: Command, match: CommandMatcher };
    export type Routes = Route[];
    export type GeneratedRoutes = Map<string, Route>;
}

declare type Route = { name: string, command: Command, match: CommandMatcher };
declare type Routes = Route[];
declare type GeneratedRoutes = Map<string, Route>;