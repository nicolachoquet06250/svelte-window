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

declare type WindowItem = Partial<CustomWindow & ApplicationWindow>;

declare type Windows = WindowItem[];