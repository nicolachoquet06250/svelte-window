import type { WindowCss, WindowCssVars } from "svelte-window";

export const useWindowStyle: (styles: WindowCss) => WindowCssVars = styles => 
    Object.keys(styles).reduce((r, c) => ({
        ...r,
        [c.startsWith('--') ? c: `--${c.replaceAll(/_/g, '-')}`]: styles[c]
    }), {});