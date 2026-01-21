import { browser } from "wxt/browser";
import { defineContentScript } from "wxt/utils/define-content-script";

export default defineContentScript({
    matches: ['https://github.com/*'],
    main() {
        const file_icons: Record<string, string> = {
            'js': 'js.svg',
            'cjs': 'js.svg',
            'mjs': 'es.svg',
            'jsdoc': 'js.svg',
            'ts': 'ts.svg',
            'tsx': 'tsx.svg',
            'jsx': 'jsx.svg',
            'tsconfig*': 'ts.svg',

            'py': 'py.svg',
            'pylintrc': 'py.svg',
            'pyproject.toml': 'pyproject.svg',

            'java': 'java.svg',

            'json': 'json.svg',
            'json5': 'json.svg',
            'jsonc': 'json.svg',

            'css': 'css.svg',
            'scss': 'scss.svg',
            'less': 'less.svg',
            'sass': 'scss.svg',
            'styl': 'styl.svg',
            'html': 'html.svg',
            'xml': 'xml.svg',

            'next.config*': 'nextjs.svg',

            'vite.config*': 'vite.svg',
            'vitest.config*': 'vitest.svg',

            'drizzle.config*': 'drizzle.svg',

            'wxt.config*': 'wxt.svg',
            'web-ext.config*': 'wxt.svg',

            'vue': 'vue.svg',

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

            'zap': 'zap.svg',

            'rbxm': 'rbxm.svg',
            'rbxl': 'rbxm.svg',
            'rbxmx': 'rbxmx.svg',
            'rbxlx': 'rbxmx.svg',

            'sublime-project': 'sublime.svg',
            'sublime-workspace': 'sublime.svg',

            'lua': 'lua.svg',
            'luacheckrc': 'lua.svg',
            'luacov': 'luacov.svg',

            'php': 'php.svg',
            'php.ini': 'php.svg',

            'cpp': 'cpp.svg',
            'hpp': 'cpp.svg',
            'mm': 'ocpp.svg',
            'cmake': 'cmake.svg',
            'cmakelists.txt': 'cmake.svg',
            'cmakepresets.json': 'cmake.svg',
            'cmakecache.txt': 'cmake.svg',
            'c': 'c.svg',
            'h': 'c.svg',
            'cs': 'cs.svg',

            'vscode': 'vscode.svg',
            'vsconfig': 'vscode.svg',
            'code-workspace': 'vscode.svg',

            'sln': 'vs.svg',
            'slnx': 'vs.svg',
            'suo': 'vs.svg',
            'props': 'msbuild.svg',
            'ruleset': 'msbuild.svg',
            'targets': 'msbuild.svg',
            'vbproj': 'msbuild.svg',
            'csproj': 'msbuild.svg',
            'vb': 'vs.svg',

            'config': 'config.svg',

            'nuget.config': 'nuget.svg',

            'sh': 'bash.svg',

            'lefthook.yml': 'lefthook.svg',
            'lefthook.yaml': 'lefthook.svg',

            'gn': 'ninja-by-alhadis.svg',
            'ninja': 'ninja-by-alhadis.svg',

            'go': 'go.svg',
            'go.mod': 'go.svg',
            'go.sum': 'go.svg',
            'textproto': 'go.svg',

            'rs': 'rust.svg',
            'cargo.toml': 'rust.svg',
            'cargo.lock': 'rust.svg',
            'rustfmt.toml': 'rust.svg',
            'rust-toolchain.toml': 'rust.svg',

            'zig': 'zig.svg',
            'zig.toml': 'zig.svg',
            'zon': 'zig.svg',
            'ziggy': 'zig.svg',

            'rb': 'ruby.svg',
            'ruby': 'ruby.svg',
            'ru': 'ruby.svg',
            'ruby-version': 'ruby.svg',
            'gemfile': 'rubygems.svg',
            'gemfile.lock': 'rubygems.svg',
            'rakefile': 'ruby.svg',
            'rspec': 'ruby.svg',
            'yardopts': 'yardoc.svg',
            'yard.gemspec': 'yardoc.svg',
            'gemspec': 'rubygems.svg',
            'gem': 'rubygems.svg',

            'docker-compose.yml': 'docker.svg',
            'd': 'docker.svg',
            'docker-compose.yaml': 'docker.svg',
            'dockerignore': 'docker.svg',
            'dockerfile': 'docker.svg',

            'turbo.json': 'turborepo.svg',
            'turbo.jsonc': 'turborepo.svg',

            'localsettings.php': 'mediawiki.svg',
            'wikitext': 'mediawiki.svg',
            'wiki': 'mediawiki.svg',

            'gitignore': 'git.svg',
            'git': 'git.svg',
            'gitattributes': 'git.svg',
            'gitmodules': 'git.svg',
            'git-blame-ignore': 'git.svg',
            'git-blame-ignore-revs': 'git.svg',

            'env': 'env.svg',

            'prettier': 'prettier.svg',
            'prettierignore': 'prettier.svg',
            'prettierrc*': 'prettier.svg',
            'prettier*': 'prettier.svg',

            'stylelintrc*': 'stylelint.svg',
            'stylelintignore': 'stylelint.svg',

            'webpack.config*': 'webpack.svg',

            'babelrc*': 'babel.svg',
            'babel.config*': 'babel.svg',

            'ttf': 'ttf.svg',
            'otf': 'ttf.svg',
            'woff': 'ttf.svg',
            'woff2': 'ttf.svg',
            'ttc': 'ttf.svg',

            'nojekyll': 'jekyll.svg',

            'zensical.toml': 'zensical.svg',

            'md': 'md.svg',
            'mdx': 'mdx.svg',
            'csv': 'csv.svg',

            'yaml': 'yaml.svg',
            'yml': 'yaml.svg',
            'toml': 'toml.svg',

            'svelte': 'svelte.svg',
            'svelte.config*': 'svelte.svg',

            'astro': 'astro.svg',
            'astro.config*': 'astro.svg',

            'playwright.config*': 'playwright.svg',

            'knip.ts': 'knip.svg',
            'knip.js': 'knip.svg',
            'knip.mjs': 'knip.svg',
            'knip.cjs': 'knip.svg',

            'jest.config*': 'jest.svg',

            'package.json': 'npm.svg',
            'package-lock.json': 'npm.svg',
            'npmignore': 'npm.svg',
            'npmrc': 'npm.svg',
            'npmrc.yml': 'npm.svg',
            'nvmrc': 'npm.svg',
            'node-version': 'nodejs.svg',

            'pnpm-lock.yaml': 'pnpm.svg',
            'pnpm-workspace.yaml': 'pnpm.svg',
            'pnpm-workspace.yml': 'pnpm.svg',

            'yarn.lock': 'yarn.svg',
            'yarnrc': 'yarn.svg',
            'yarnrc.yml': 'yarn.svg',
            'yarnrc.yaml': 'yarn.svg',

            'bun.lock': 'bun.svg',
            'bun.lockb': 'bun.svg',
            'bunfig.toml': 'bun.svg',

            'tailwind.config*': 'tailwindcss.svg',

            'postcss.config*': 'postcss.svg',

            'railway.toml': 'railway.svg',
            'railway.json': 'railway.svg',
            'railwayignore': 'railway.svg',

            'eslintrc': 'eslint.svg',
            'eslintrc.js': 'eslint.svg',
            'eslintignore': 'eslint.svg',
            'eslint.config*': 'eslint.svg',
            'eslintrc.json': 'eslint.svg',

            'crowdin.yml': 'crowdin.svg',
            'crowdin.yaml': 'crowdin.svg',

            'iml': 'intellij_idea.svg',

            'svg': 'svg.svg',
            'png': 'image.svg',
            'jpg': 'image.svg',
            'jpeg': 'image.svg',
            'gif': 'gif.svg',
            'webp': 'image.svg',
            'avif': 'image.svg',
            'apng': 'image.svg',
            'ico': 'ico.svg',

            'swift': 'swift.svg',
            'swift-format': 'swift.svg',
            'swift-lint': 'swift.svg',
            'swift-version': 'swift.svg',

            'streerc': 'discourse.svg',

            'vcpkg.json': 'vcpkg.svg',
            'vcpkg-configuration.json': 'vcpkg.svg',

            'cname': 'cname.svg',

            'license*': 'license.svg',
            'copying': 'license.svg',
            'copyright': 'license.svg',
            'readme': 'readme.svg',
            'readme.md': 'readme.svg',
            'changelog': 'changelog.svg',
            'changelog.md': 'changelog.svg',
            'todo': 'todo.svg',
            'todo.md': 'todo.svg',
            'security': 'security.svg',
            'security.md': 'security.svg',
            'contributing': 'contributing.svg',
            'contributing.md': 'contributing.svg',

            'cspell.json': 'cspell.svg',
            'cspell.yaml': 'cspell.svg',
            'cspell.yml': 'cspell.svg',
            'cspell.config*': 'cspell.svg',

            'hbs': 'handlebars.svg',

            'localazy.json': 'localazy.svg',

            'sonar': 'sonar.svg',
            'sonar-project.properties': 'sonar.svg',

            'cliff.toml': 'gitcliff-png.svg',

            'release-please-manifest.json': 'googlecloud.svg',
            'release-please-config.json': 'googlecloud.svg',

            'cursorrules': 'cursor.svg',
            'mdc': 'cursor.svg',
            'claude.md': 'claude.svg',
            'gemini.md': 'gemini-65.svg',
        };

        const folder_icons: Record<string, string> = {
            // unlike file_icons, folder_icons entries should begin with a `.` if necessary
            'src': 'src.svg',
            'docs': 'docs.svg',

            'public': 'public.svg',
            'images': 'public.svg',
            'assets': 'public.svg',

            'i18n': 'i18n.svg',
            '.i18n': 'i18n.svg',

            'include': 'include.svg',
            'scripts': 'scripts.svg',
            'script': 'scripts.svg',
            'test': 'test.svg',
            'tests': 'test.svg',

            '.vscode': 'vscode.svg',
            '.github': 'github.svg',
        };

        const wildcard_suffix_file_icons: { prefix: string; icon: string }[] = [];
        for (const key of Object.keys(file_icons)) {
            if (key.endsWith('*')) {
                wildcard_suffix_file_icons.push({
                    prefix: key.slice(0, -1),
                    icon: file_icons[key],
                });

                wildcard_suffix_file_icons.push({
                    prefix: '.' + key.slice(0, -1),
                    icon: file_icons[key],
                });

                delete file_icons[key];
            }
        }

        function get_icon_url(file_name: string) {
            const name_lower = file_name.toLowerCase();

            // 1
            if (file_icons[name_lower]) {
                return browser.runtime.getURL(`icons/files/${file_icons[name_lower]}`);
            };

            // 2
            for (const { prefix, icon } of wildcard_suffix_file_icons) {
                if (name_lower.startsWith(prefix)) {
                    return browser.runtime.getURL(`icons/files/${icon}`);
                };
            };

            // 3
            const parts = name_lower.split('.');
            for (let i = 0; i < parts.length; i++) {
                const suffix = parts.slice(i).join('.');
                if (!suffix) continue;
                if (file_icons[suffix]) {
                    return browser.runtime.getURL(`icons/files/${file_icons[suffix]}`);
                };
            };

            // 4
            if (name_lower.startsWith('.')) {
                const after_dot = name_lower.slice(1);
                const segments = after_dot.split(/[\._-]/);

                if (segments.length > 0 && segments[0]) {
                    const stem = segments[0];
                    if (file_icons[stem]) {
                        return browser.runtime.getURL(`icons/files/${file_icons[stem]}`);
                    };
                };
            };

            return null;
        };

        function get_folder_icon_url(folder_name: string) {
            const name_lower = folder_name.toLowerCase();

            // 1
            const parts = name_lower.split('.');
            for (let i = 0; i < parts.length; i++) {
                const suffix = parts.slice(i).join('.');
                if (!suffix) continue;
                if (folder_icons[suffix]) {
                    return browser.runtime.getURL(`icons/folders/${folder_icons[suffix]}`);
                };
            };

            // 2
            if (name_lower.startsWith('.')) {
                const after_dot = name_lower.slice(1);
                const segments = after_dot.split(/[\._-]/);

                if (segments.length > 0 && segments[0]) {
                    const stem = segments[0];
                    if (folder_icons[stem]) {
                        return browser.runtime.getURL(`icons/folders/${folder_icons[stem]}`);
                    };
                };
            };

            // 3
            const s_parts = name_lower.split('/');
            for (let i = 0; i < s_parts.length; i++) {
                if (folder_icons[s_parts[i]]) {
                    return browser.runtime.getURL(`icons/folders/${folder_icons[s_parts[i]]}`);
                };
            };

            return null;
        };

        function replace_file_icon(row: Element, icon_element: Element, file_name: string) {
            if (!icon_element) return;

            const url = get_icon_url(file_name);
            if (!url) return;

            if (icon_element.getAttribute('data-replaced')) return;

            const img = document.createElement('img');
            img.src = url;

            img.className = icon_element.getAttribute('class') || '';
            img.setAttribute('data-replaced', 'true');

            img.style.width = '16px';
            img.style.height = '16px';
            img.style.verticalAlign = 'text-bottom';
            icon_element.replaceWith(img);
        };

        function replace_folder_icon(row: Element, icon_element: Element, folder_name: string) {
            if (!icon_element) return;

            const url = get_folder_icon_url(folder_name);
            if (!url) return;

            if (icon_element.getAttribute('data-replaced')) return;

            const img = document.createElement('img');
            img.src = url;

            img.className = icon_element.getAttribute('class') || '';
            img.setAttribute('data-replaced', 'true');

            img.style.width = '16px';
            img.style.height = '16px';
            img.style.verticalAlign = 'text-bottom';
            icon_element.replaceWith(img);
        };

        function process_main_table(root: Document | Element = document) {
            const rows = root.querySelectorAll('tr.react-directory-row');

            rows.forEach(row => {
                const link = row.querySelector('a.Link--primary');
                if (!link) return;

                const file_name = link.textContent?.trim() || '';
                const svg = row.querySelector('svg.octicon');

                if (svg && (svg.classList.contains('octicon-file') || svg.classList.contains('octicon-file-text') || svg.classList.contains('color-fg-muted'))) {
                    replace_file_icon(row, svg, file_name);
                } else if (svg && (svg.classList.contains('octicon-file-directory') || svg.classList.contains('octicon-file-directory-fill') || svg.classList.contains('icon-directory'))) {
                    replace_folder_icon(row, svg, file_name);
                };
            });
        }

        function process_sidebar_tree(root: Document | Element = document) {
            const items = root.querySelectorAll('li.PRIVATE_TreeView-item');

            items.forEach(item => {
                if (item.hasAttribute('aria-expanded')) return;

                const name_span_container = item.querySelector('.PRIVATE_TreeView-item-content-text');
                if (!name_span_container) return;

                const file_name = name_span_container.textContent?.trim() || '';

                const visual_container = item.querySelector('.PRIVATE_TreeView-item-visual');
                if (!visual_container) return;

                const svg = visual_container.querySelector('svg');
                if (!svg) return;

                if (svg.classList.contains('octicon-file')) {
                    replace_file_icon(item, svg, file_name);
                };
            });
        }

        function apply_extension_icons(root: Document | Element = document) {
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
    }
});
