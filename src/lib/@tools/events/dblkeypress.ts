export const useKeyPress = (key: string) => {
    let firstPress = false;
    let isDouble = false;

    return (simple: () => void, dbl?: () => void) => {
        return (e: KeyboardEvent) => {
            if (key === e.key) {
                if(firstPress) {
                    // they have already clicked once, we have a double
                    isDouble = true;
                    isDouble && dbl?.()
                    firstPress = false;
                } else {
                    // this is their first key press
                    firstPress = true;
                    isDouble = false;
            
                    // if they don't click again in half a second, reset
                    setTimeout(() => {
                        !isDouble && simple();
                        firstPress = false;
                    }, 500);
                }
            }
        }
    };
};
