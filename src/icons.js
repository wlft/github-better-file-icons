function apply_extension_icons(root = document) {
    root.querySelectorAll('a.js-navigation-open').forEach(link => {
        if (link.closest('svg.octicon-file-directory')) { return }; // svg.octicon-file-directory-fill

        const file_name = link.textContent.trim();

        const ext = file_name.includes('.')
            ? file_name.split('.').pop().toLowerCase()
            : null
        
        const icon_name = ext && icon_exists(ext)
            ? `${ext}.svg`
            : 'file.svg'
        
        const svg = link.closest('tr').querySelector('svg.octicon');
        if (!svg) { return };

        svg.querySelectorAll('path, g').forEach(el => {el.style.display = 'none'});

        const url = chrome.runtime.getURL(`./icons/files/${icon_name}`);
        console.log(url);
        svg.style.maskImage = `url(${url}) no-repeat center`;
        svg.style.webkitMaskImage = `url(${url}) no-repeat center`;
        svg.style.backgroundColor = 'currentColor';
    });
};

const known = new Set(['js','ts'])

function icon_exists(ext) {
    return known.has(ext);
};

apply_extension_icons();

const observer = new MutationObserver(mutations => {
    mutations.forEach(m => {
        if (m.addedNodes.length) {
            apply_extension_icons(m.target);
        };
    });
});

observer.observe(document.body, { childList: true, subtree: true });