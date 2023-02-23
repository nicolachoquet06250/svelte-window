declare type HeaderProps = {
    headerHeight: number,
    maxified: boolean,
    resizable: boolean,
    stowable: boolean,
    title: string,
    logo: string | ConstructorOfATypedSvelteComponent,
};
declare type HeaderEvents = {};

declare type HeaderComponent = SvelteComponentTyped<HeaderProps, HeaderEvents, {}>;

declare type WindowProps = Partial<{
    rounded: boolean,
    title: string,
    width: number,
    height: number,
    positionX: number,
    positionY: number,
    minWidth: number,
    minHeight: number,
    windowWidth: number,
    windowHeight: number,
    logo: string | ConstructorOfATypedSvelteComponent,
    header: ConstructorOfATypedSvelteComponent,
    tidy: ConstructorOfATypedSvelteComponent
}>;

declare type WindowCssVars = Partial<
    Record<
        '--bg-color' | 
        '--border-color' | 
        '--border-size' | 
        '--title-color' | 
        '--window-position', 
        string
    >
>;