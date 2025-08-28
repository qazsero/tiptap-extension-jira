import { mergeAttributes, Node } from '@tiptap/core';

/**
 * OrderedList extension for JIRA ADF compatibility
 * 
 * Ensures the 'type' attribute is never null, which causes JIRA validation errors.
 * Default type is 'decimal' for numbered lists.
 */
export const OrderedList = Node.create({
  name: 'orderedList',
  group: 'block',
  content: 'listItem+',
  
  addAttributes() {
    return {
      start: {
        default: 1,
        parseHTML: element => {
          const start = element.getAttribute('start');
          return start ? parseInt(start, 10) : 1;
        },
        renderHTML: attributes => {
          return attributes.start !== 1 ? { start: attributes.start } : {};
        },
      },
      type: {
        // CRITICAL FIX: Always provide a valid type for JIRA ADF
        // Never allow null - always default to 'decimal'
        default: 'decimal',
        parseHTML: element => {
          // Check for data-list-type attribute or default to decimal
          const listType = element.getAttribute('data-list-type') || 
                          element.style.listStyleType || 
                          'decimal';
          // Ensure we never return null
          return listType || 'decimal';
        },
        renderHTML: attributes => {
          // Only add the attribute if it's not the default
          if (attributes.type && attributes.type !== 'decimal') {
            return { 'data-list-type': attributes.type };
          }
          return {};
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'ol',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    // Ensure type is never null when rendering
    const attrs = { ...HTMLAttributes };
    if (!attrs['data-list-type']) {
      attrs['data-list-type'] = 'decimal';
    }
    return ['ol', mergeAttributes(attrs), 0];
  },

  addCommands() {
    return {
      toggleOrderedList: () => ({ commands }: any) => {
        return commands.toggleWrap(this.name);
      },
    } as any;
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Shift-7': () => (this.editor.commands as any).toggleOrderedList(),
    };
  },
});