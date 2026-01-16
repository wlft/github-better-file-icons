const file_icons = {
    'js': 'js.svg',
    'mjs': 'es.svg',
    'ts': 'ts.svg',
    'tsconfig.json': 'ts.svg',
    'tsconfig.types.json': 'ts.svg',

    'luau': 'luau.svg',
    'luaurc': 'luau.svg',

    'wally.toml': 'wally.svg',
    'wally.lock': 'wally.svg',

    'aftman.toml': 'aftman.svg',

    'darklua.json': 'darklua.svg',
    'darklua.json5': 'darklua.svg',
    'darklua.jsonc': 'darklua.svg',

    'project.json': 'rojo-png.svg',
    'model.json': 'rojo-png.svg',


    'lua': 'lua.svg',

    'gitignore': 'git.svg',
    'git': 'git.svg',
    'gitattributes': 'git.svg',
    'gitmodules': 'git.svg',

    'env': 'env.svg',
    'env.example': 'env.svg',
    'env.local': 'env.svg',
    'env.local.example': 'env.svg',

    'prettier': 'prettier.svg',
    'prettierrc': 'prettier.svg',
    'prettierrc.mjs': 'prettier.svg',


    'nojekyll': 'jekyll.svg',

    'md': 'md.svg',
    'mdx': 'mdx.svg',

    'yaml': 'yaml.svg',
    'yml': 'yaml.svg',
    'toml': 'toml.svg',

    'svelte': 'svelte.svg',
    'svelte.config.js': 'svelte.svg',
    'svelte.config.mjs': 'svelte.svg',
    'svelte.config.ts': 'svelte.svg',
    'svelte.config.json': 'svelte.svg',

    'astro': 'astro.svg',
    'astro.config.js': 'astro.svg',
    'astro.config.mjs': 'astro.svg',
    'astro.config.cjs': 'astro.svg',
    'astro.config.ts': 'astro.svg',

    'package.json': 'npm.svg',
    'package-lock.json': 'npm.svg',

    'pnpm-lock.yaml': 'pnpm.svg',
    'pnpm-workspace.yaml': 'pnpm.svg',
    'pnpm-workspace.yml': 'pnpm.svg',

    'tailwind.config.mjs': 'tailwindcss.svg',
    'tailwind.config.js': 'tailwindcss.svg',

    'postcss.config.mjs': 'postcss.svg',
    'postcss.config.js': 'postcss.svg',

    'eslintrc': 'eslint.svg',

    'svg': 'svg.svg',
};

function get_icon_url(file_name) {
    const name_lower = file_name.toLowerCase();

    if (file_icons[name_lower]) { return chrome.runtime.getURL(`icons/files/${file_icons[name_lower]}`); };
    if (name_lower.startsWith('.') && file_icons[name_lower.slice(1)]) { return chrome.runtime.getURL(`icons/files/${file_icons[name_lower.slice(1)]}`); };

    if (file_name.includes('.')) {
        const ext = file_name.split('.').pop().toLowerCase();
        if (file_icons[ext]) { return chrome.runtime.getURL(`icons/files/${file_icons[ext]}`); };
    }

    return null;
}

function replace_file_icon(row, icon_element, file_name) {
    if (!icon_element) return;

    const url = get_icon_url(file_name);
    if (!url) return;

    if (icon_element.getAttribute('data-replaced')) return;

    const img = document.createElement('img');
    img.src = url;

    img.className = icon_element.getAttribute('class');
    img.setAttribute('data-replaced', 'true');

    img.style.width = '16px';
    img.style.height = '16px';
    img.style.verticalAlign = 'text-bottom';
    icon_element.replaceWith(img);
}

function process_main_table(root = document) {
    const rows = root.querySelectorAll('tr.react-directory-row');

    rows.forEach(row => {
        const link = row.querySelector('a.Link--primary');
        if (!link) return;

        const aria_label = link.getAttribute('aria-label') || '';
        if (aria_label.includes('(Directory)')) return;

        const file_name = link.textContent.trim();
        const svg = row.querySelector('svg.octicon');

        if (svg && (svg.classList.contains('octicon-file') || svg.classList.contains('octicon-file-text') || svg.classList.contains('color-fg-muted'))) {
            replace_file_icon(row, svg, file_name);
        };
    });
}

function process_sidebar_tree(root = document) {
    const items = root.querySelectorAll('li.PRIVATE_TreeView-item');

    items.forEach(item => {
        if (item.hasAttribute('aria-expanded')) return;

        const name_span_container = item.querySelector('.PRIVATE_TreeView-item-content-text');
        if (!name_span_container) return;

        const file_name = name_span_container.textContent.trim();

        const visual_container = item.querySelector('.PRIVATE_TreeView-item-visual');
        if (!visual_container) return;

        const svg = visual_container.querySelector('svg');
        if (!svg) return;

        if (svg.classList.contains('octicon-file')) {
            replace_file_icon(item, svg, file_name);
        };
    });
}

function apply_extension_icons(root = document) {
    process_main_table(root);
    process_sidebar_tree(root);
};

// init
apply_extension_icons();

// observer for navigation/lazy loading
const observer = new MutationObserver(mutations => {
    let should_update = false;
    for (const m of mutations) {
        if (m.addedNodes.length > 0) {
            should_update = true;
            break;
        };
    };

    if (should_update) {
        apply_extension_icons();
    };
});

observer.observe(document.body, { childList: true, subtree: true });