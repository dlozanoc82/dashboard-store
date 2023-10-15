export const namePathWeb = (url) => {
    const partesURL = url.split('/');
    return partesURL[partesURL.length - 1];
}