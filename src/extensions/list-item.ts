import { mergeAttributes, Node } from '@tiptap/core';

/**
 * ListItem extension for JIRA ADF compatibility
 * 
 * Standard list item implementation that works with both bullet and ordered lists.
 */
export const ListItem = Node.create({
  name: 'listItem',
  content: 'paragraph block*',
  
  defining: true,

  parseHTML() {
    return [
      {
        tag: 'li',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['li', mergeAttributes(HTMLAttributes), 0];
  },

  addKeyboardShortcuts() {
    return {
      Enter: () => (this.editor.commands as any).splitListItem(this.name),
      Tab: () => (this.editor.commands as any).sinkListItem(this.name),
      'Shift-Tab': () => (this.editor.commands as any).liftListItem(this.name),
    };
  },
});