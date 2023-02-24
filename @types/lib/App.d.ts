type CustomWindow = {
    movable: boolean,
    resizable: boolean,
    content: ConstructorOfATypedSvelteComponent,
    
    style: {
        '--border-color': string,
        '--header-bg-color': string,
        '--header-border-color': string,
        '--header-border-size': `${number}px`,
        '--title-color': string
    },

    data: {
        title: string,
        width: number,
        height: number,
        positionX: number,
        positionY: number,
        rounded: boolean,
        header?: ConstructorOfATypedSvelteComponent,
        tidy: ConstructorOfATypedSvelteComponent,
        logo?: string
    }
};

type ApplicationWindow = {
    specificWindow: ConstructorOfATypedSvelteComponent
};

declare type WindowItem = Partial<CustomWindow & ApplicationWindow>;

declare type Windows = WindowItem[];