/*global console, game*/

export function log(input) {
    if (!game.settings.get('csm-lancer-qol', 'debug')) return;
    if (typeof (input) === 'string') {
        console.debug(`csm-lancer-qol | ${input}`);
    } else {
        console.debug(input);
    }
}
