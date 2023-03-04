import type { Command, CommandMatcher } from "@svelte/window";

export const createCommand = (c: Command): Command => c;
export const createCommandMatcher = (c: CommandMatcher): CommandMatcher => c;