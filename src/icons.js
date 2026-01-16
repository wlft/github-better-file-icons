const file_icons = {
    'js': 'js.svg',
    'mjs': 'es.svg',
    'ts': 'ts.svg',
    'tsx': 'tsx.svg',
    'jsx': 'jsx.svg',
    'tsconfig.json': 'ts.svg',
    'tsconfig.types.json': 'ts.svg',

    'json': 'json.svg',
    'json5': 'json.svg',
    'jsonc': 'json.svg',

    'css': 'css.svg',
    'scss': 'scss.svg',
    'less': 'less.svg',
    'sass': 'scss.svg',
    'styl': 'styl.svg',
    'html': 'html.svg',

    'next.config.js': 'nextjs.svg',
    'next.config.mjs': 'nextjs.svg',
    'next.config.ts': 'nextjs.svg',

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

    'selene.toml': 'selene.svg',

    'lua': 'lua.svg',

    'php': 'php.svg',
    'php.ini': 'php.svg',

    'localsettings.php': 'mediawiki.svg',
    'wikitext': 'mediawiki.svg',
    'wiki': 'mediawiki.svg',

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
    'prettierignore': 'prettier.svg',

    'webpack.config.js': 'webpack.svg',
    
    'babelrc': 'babel.svg',
    'babel.config': 'babel.svg',


    'nojekyll': 'jekyll.svg',
    
    'zensical.toml': 'zensical.svg',

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

    'yarn.lock': 'yarn.svg',
    'yarnrc': 'yarn.svg',
    'yarnrc.yml': 'yarn.svg',
    'yarnrc.yaml': 'yarn.svg',

    'bun.lock': 'bun.svg',
    'bun.lockb': 'bun.svg',

    'tailwind.config.mjs': 'tailwindcss.svg',
    'tailwind.config.js': 'tailwindcss.svg',

    'postcss.config.mjs': 'postcss.svg',
    'postcss.config.js': 'postcss.svg',

    'eslintrc': 'eslint.svg',
    'eslintignore': 'eslint.svg',
    'eslint.config.js': 'eslint.svg',
    'eslint.config.mjs': 'eslint.svg',
    'eslint.config.cjs': 'eslint.svg',
    'eslint.config.ts': 'eslint.svg',
    'eslintrc.json': 'eslint.svg',

    'svg': 'svg.svg',
    'png': 'image.svg',
    'jpg': 'image.svg',
    'jpeg': 'image.svg',
    'gif': 'gif.svg',
    'webp': 'image.svg',
    'avif': 'image.svg',
    'apng': 'image.svg',
    'ico': 'ico.svg',
};

function get_icon_url(file_name) {
    const name_lower = file_name.toLowerCase();
    const parts = name_lower.split('.');

    // iterate through the name
    // e.g. "foo.model.json" -> "foo.model.json", "model.json", "json"
    // e.g. ".gitignore" -> ".gitignore", "gitignore"
    for (let i = 0; i < parts.length; i++) {
        // if it starts with dot, parts[0] is empty
        // i=0 joined is ".gitignore". i=1 joined is "gitignore"

        const suffix = parts.slice(i).join('.');
        if (!suffix) continue;

        if (file_icons[suffix]) {
            return chrome.runtime.getURL(`icons/files/${file_icons[suffix]}`);
        };
    };

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