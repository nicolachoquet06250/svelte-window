declare module '@svelte/window' {
    export type AvailableSide = 'left' | 'right' | 'top' | 'bottom';
    
    export type ClickedEvent = CustomEvent<{
        side: AvailableSide,
        e: MouseEvent
    }>;
    
    export type ResizeEvent = CustomEvent<{
        size: {
            width?: number,
            height?: number
        }, 
        side: AvailableSide,
        e: MouseEvent
    }>;
}
