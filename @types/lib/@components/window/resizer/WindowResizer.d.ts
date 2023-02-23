declare type AvailableSide = 'left' | 'right' | 'top' | 'bottom';
declare type ClickedEvent = CustomEvent<{
    side: AvailableSide,
    e: MouseEvent
}>;
declare type ResizeEvent = CustomEvent<{
    size: {
        width?: number,
        height?: number
    }, 
    side: AvailableSide,
    e: MouseEvent
}>;