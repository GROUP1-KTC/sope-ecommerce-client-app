export function disableConsoleInProd() {
    if (process.env.NODE_ENV === 'production') {
        console.log = () => {};
        console.debug = () => {};
        console.info = () => {};
        console.warn = () => {};
        console.error = () => {};
    }
}
