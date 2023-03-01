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

type CaseToCase<
    String extends string, 
    Separator1 extends string = '_', 
    Separator2 extends string = '-'
> = String extends `${infer T}${Separator1}${infer U}`
        ? `${T}${Separator2}${CaseToCase<U, Separator1, Separator2>}`
            : String;

declare type WindowCss = Partial<{
    header_bg_color: string,
    header_border_color: string,
    header_border_size: string,
    bg_color: string,
    border_color: string,
    border_size: string,
    title_color: string,
    window_position: string
}>;

declare type WindowCssVars = Partial<{
    [K in CaseToCase<`--${keyof WindowCss}`>]: WindowCss[keyof WindowCss]
}>;