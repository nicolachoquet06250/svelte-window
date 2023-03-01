export const useWindowStyle: (styles: WindowCss) => WindowCssVars = styles => 
    Object.keys(styles).reduce((r, c) => ({
        ...r,
        [`--${c.replaceAll(/_/g, '-')}`]: styles[c]
    }), {});