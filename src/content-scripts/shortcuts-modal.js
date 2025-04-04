class ShortcutsModal {
    constructor() {
        this.isVisible = false;

        // general
        this.shortcuts = [
            { key: 'j', description: 'Move to next post' },
            { key: 'k', description: 'Move to previous post' },
            { key: 'l', description: 'Like post' },
            { key: 'r', description: 'Reply to post' },
            { key: 't', description: 'Repost post' },
            { modifier: 'Shift', key: 't', description: 'Quote post' },
            { key: 'o', description: 'Expand image' },
            { key: 'Enter', description: 'Open selected post/link' },
            { key: 'v', description: 'Select next link in post.' },
            { modifier: 'Shift', key: 'v', description: 'Select next previous link in post.' },
            { key: '/', description: 'Search' },
            { key: 'c', description: 'Next pinned feed' },
            { modifier: 'Shift', key: 'c', description: 'Previous pinned feed' },
            { key: '.', description: 'Load more posts' },
            { key: '?', description: 'Toggle shortcuts' },
            { modifier: 'Alt', key: 'a', description: 'Switch to next account'}
        ];

        // more
        this.postOptions = [
            { key: 'h', description: 'Hide post' },
            { key: 'b', description: 'Block account' },
            { key: 'x', description: 'Report post' },
            { key: 'y', description: 'Copy post text' }
        ];

        // navigation
        this.goShortcuts = [
            { key: 'g h', description: 'Go Home' },
            { key: 'g p', description: 'Go to Profile' },
            { key: 'g n', description: 'Go to Notifications' },
            { key: 'g c', description: 'Go to Chat' },
            { key: 'g f', description: 'Go to Feeds' },
            { key: 'g l', description: 'Go to Lists' },
            { key: 'g s', description: 'Go to Settings' },
            { key: 'g u', description: 'Go to User Profile' }
        ];

        this.initialize();
    }

    createShortcutItem(shortcut) {
        const item = document.createElement('div');
        item.className = 'bsky-shortcut-item';

        const keysContainer = document.createElement('div');
        keysContainer.className = 'bsky-shortcut-keys';

        if (shortcut.modifier) {
            const modKey = document.createElement('kbd');
            modKey.className = 'bsky-shortcut-key';
            modKey.textContent = shortcut.modifier;
            keysContainer.appendChild(modKey);

            const plus = document.createElement('span');
            plus.className = 'bsky-shortcut-plus';
            plus.textContent = '+';
            keysContainer.appendChild(plus);

            const key = document.createElement('kbd');
            key.className = 'bsky-shortcut-key';
            key.textContent = shortcut.key;
            keysContainer.appendChild(key);
        } else if (shortcut.key.startsWith('g')) {
            const gKey = document.createElement('kbd');
            gKey.className = 'bsky-shortcut-key';
            gKey.textContent = 'g';
            keysContainer.appendChild(gKey);

            const secondKey = document.createElement('kbd');
            secondKey.className = 'bsky-shortcut-key';
            secondKey.textContent = shortcut.key.slice(1);
            keysContainer.appendChild(secondKey);
        } else {
            const key = document.createElement('kbd');
            key.className = 'bsky-shortcut-key';
            key.textContent = shortcut.key;
            keysContainer.appendChild(key);
        }

        const desc = document.createElement('span');
        desc.className = 'bsky-shortcut-description';
        desc.textContent = shortcut.description;

        item.appendChild(keysContainer);
        item.appendChild(desc);
        return item;
    }

    createShortcutSection(title, shortcuts) {
        const section = document.createElement('div');
        section.className = 'bsky-shortcuts-section';

        const sectionTitle = document.createElement('h3');
        sectionTitle.className = 'bsky-shortcuts-section-title';
        sectionTitle.textContent = title;
        section.appendChild(sectionTitle);

        const list = document.createElement('div');
        list.className = 'bsky-shortcuts-list';

        shortcuts.forEach(shortcut => {
            list.appendChild(this.createShortcutItem(shortcut));
        });

        section.appendChild(list);
        return section;
    }

    initialize() {
        const modal = document.createElement('div');
        modal.className = 'bsky-shortcuts-modal';
        modal.style.display = 'none';

        const overlay = document.createElement('div');
        overlay.className = 'bsky-shortcuts-overlay';

        const content = document.createElement('div');
        content.className = 'bsky-shortcuts-content';

        const header = document.createElement('div');
        header.className = 'bsky-shortcuts-header';

        const title = document.createElement('h2');
        title.textContent = 'Keyboard Shortcuts';

        const close = document.createElement('button');
        close.className = 'bsky-shortcuts-close';
        close.textContent = '×';
        close.addEventListener('click', () => this.hide());

        header.appendChild(title);
        header.appendChild(close);

        const columnsContainer = document.createElement('div');
        columnsContainer.className = 'bsky-shortcuts-columns';

        const regularSection = this.createShortcutSection('General', this.shortcuts);
        const navigationSection = this.createShortcutSection('Navigation', this.goShortcuts);
        const optionsSection = this.createShortcutSection('Post Options', this.postOptions);

        columnsContainer.appendChild(regularSection);
        columnsContainer.appendChild(navigationSection);
        columnsContainer.appendChild(optionsSection);

        content.appendChild(header);
        content.appendChild(columnsContainer);
        overlay.appendChild(content);
        modal.appendChild(overlay);

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) this.hide();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isVisible) {
                this.hide();
            }
        });

        this.modalContainer = modal;
        document.body.appendChild(modal);
    }

    show() {
        this.isVisible = true;
        this.modalContainer.style.display = 'block';
    }

    hide() {
        this.isVisible = false;
        this.modalContainer.style.display = 'none';
    }

    toggle() {
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }

    cleanup() {
        this.modalContainer?.remove();
        if (this._escapeListener) {
            document.removeEventListener('keydown', this._escapeListener);
        }
    }
}

export default ShortcutsModal;
