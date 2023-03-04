declare module '@svelte/window' {
    export type MovableZoneElement = {
        component: (ATypedSvelteComponent & Partial<{ 
            $$set: (v: Record<string, any>) => void,
            $$prop_def: Record<string, any>
        }>) | null,
        element: HTMLElement
    };
    
    export type Point = { x: number, y: number };
}
