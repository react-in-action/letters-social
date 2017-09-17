/**
 * Returns whether or not we're in a non-browser environment
 * @method isServer
 * @return {Boolean}
 */
export function isServer() {
    // NOTE: this isn't the only way to determine if we are in a server environment
    // but it should be sufficient for our needs
    return typeof window === 'undefined';
}
