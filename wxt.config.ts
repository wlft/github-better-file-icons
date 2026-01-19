import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
    manifest: {
        name: 'GitHub Better File Icons',
        description: 'Adds icons for various projects and file types on GitHub.',
        icons: {
            48: 'icons/extension/48.png'
        },
        web_accessible_resources: [
            {
                resources: ['icons/files/*.svg'],
                matches: ['https://github.com/*'],
            },
        ],
        permissions: ['activeTab'],
    }
});
