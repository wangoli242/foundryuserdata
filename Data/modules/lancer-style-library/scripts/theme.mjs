/* global document, getComputedStyle, game, Hooks, MutationObserver */

const MODULE = 'lancer-style-library';

// Resolve a colour expression to "rgb(...)" in body's context (where Lancer's theme vars live).
function resolveColor(expr)
{
    const probe = document.createElement('span');
    probe.style.cssText = `color:${expr};display:none`;
    document.body.appendChild(probe);
    const c = getComputedStyle(probe).color;
    probe.remove();
    return c;
}

function isDark(cssColor)
{
    try
    {
        const ctx = document.createElement('canvas').getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillStyle = cssColor;
        ctx.fillRect(0, 0, 1, 1);
        const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
        return (0.2126 * r + 0.7152 * g + 0.0722 * b) < 128;
    }
    catch (e)
    {
        return false;
    }
}

// Plate + tokens are CSS; JS only flips the mode class and the .la-dark boolean CSS can't derive.
function syncDarkClass()
{
    const root = document.documentElement;
    const dark = isDark(resolveColor('var(--la-plate)'));
    root.classList.toggle('la-dark', dark);
    root.classList.toggle('la-light', !dark);
}

function applyTheme()
{
    let mode = 'light';
    try { mode = game.settings.get(MODULE, 'theme'); }
    catch (e) { /* before registration */ }
    document.documentElement.classList.toggle('la-theme-dark', mode === 'dark');
    document.body.classList.toggle('la-theme-lancer', mode === 'lancer');
    syncDarkClass();
}

Hooks.once('init', () =>
{
    game.settings.register(MODULE, 'theme', {
        name: 'Style Library Theme',
        hint: 'Applies to all Lancer Style Library windows.',
        scope: 'client',
        config: true,
        type: String,
        choices: {
            light: 'Light',
            dark: 'Dark',
            lancer: 'Follow Lancer background',
        },
        default: 'light',
        onChange: applyTheme,
    });
});

Hooks.once('ready', () =>
{
    applyTheme();
    // Re-sync .la-dark when the Lancer theme (body class) changes.
    new MutationObserver(syncDarkClass).observe(document.body, { attributes: true, attributeFilter: ['class'] });
});
