declare module '@svelte/window' {
    type CustomWindow = {
        id?: number,
        movable: boolean,
        resizable: boolean,
        content: ConstructorOfATypedSvelteComponent,
        
        style: WindowCss,
    
        data: WindowProps
    };
    
    type ApplicationWindow = {
        specificWindow: ConstructorOfATypedSvelteComponent
    };
    
    export type WindowItem = Partial<CustomWindow & ApplicationWindow>;
    
    export type Windows = WindowItem[];
}

declare module '@types/svelte-window' {
    type CustomWindow = {
        id?: number,
        movable: boolean,
        resizable: boolean,
        content: ConstructorOfATypedSvelteComponent,
        
        style: WindowCss,
    
        data: WindowProps
    };
    
    type ApplicationWindow = {
        specificWindow: ConstructorOfATypedSvelteComponent
    };
    
    export type WindowItem = Partial<CustomWindow & ApplicationWindow>;
    
    export type Windows = WindowItem[];
}
