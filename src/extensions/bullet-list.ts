import { mergeAttributes, Node } from '@tiptap/core';

/**
 * BulletList extension for JIRA ADF compatibility
 * 
 * Standard bullet list implementation that ensures proper ADF structure.
 */
export const BulletList = Node.create({
  name: 'bulletList',
  group: 'block',
  content: 'listItem+',

  parseHTML() {
    return [
      {
        tag: 'ul',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['ul', mergeAttributes(HTMLAttributes), 0];
  },

  addCommands() {
    return {
      toggleBulletList: () => ({ commands }: any) => {
        return commands.toggleWrap(this.name);
      },
    } as any;
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Shift-8': () => (this.editor.commands as any).toggleBulletList(),
    };
  },
});