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