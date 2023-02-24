declare type Route = { name: string, command: Command, match: CommandMatcher };
declare type Routes = Route[];
declare type GeneratedRoutes = Map<string, Route>;