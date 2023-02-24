declare type Store<S extends string> = 
    { [key in S]: Writable<string> } & 
    { [key in `escaped${`${UCFirst<S>}`}`]: Readable<string> } & 
    { 
        reset: ResetFunc,
        init: SetFunc
    }

declare type CommandStore = Writable<string>;
declare type EscapedCommandStore = Readable<string>;
declare type FocusedStore = Writable<boolean>;

declare type ResetFunc = () => void;
declare type SetFunc = (s: string) => void;

declare type ReturnTypes<S extends string> = {
    [WRITE_MODE.KEYBOARD]: Store<S>,
    [WRITE_MODE.PROGRAMATIC]: Store<S> & { set: SetFunc }
};

declare type ReturnType<
    T extends WRITE_MODE,
    S extends string
> = ReturnTypes<S>[T];

declare type Return<T, S extends string> = 
    T extends WRITE_MODE.KEYBOARD ? 
        ReturnType<WRITE_MODE.KEYBOARD, S> : 
            ReturnType<WRITE_MODE.PROGRAMATIC, S>

declare type Middleware<T = void> = (w?: Writable<string>, r?: Readable<string>, e?: Event) => T;