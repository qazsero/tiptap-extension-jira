import { Mark, mergeAttributes } from '@tiptap/core';

export const TextColor = Mark.create({
  name: 'textColor',
  addAttributes() {
    return {
      color: {
        default: null,
        // biome-ignore lint/style/useNamingConvention: "This is a Tiptap mark property"
        parseHTML: (element) => {
          // Parse color from style attribute
          const color = element.style.color;
          // Only return valid hex colors
          if (color && color.match(/^#[0-9a-fA-F]{6}$/)) {
            return color;
          }
          return null;
        },
        // biome-ignore lint/style/useNamingConvention: "This is a Tiptap mark property"
        renderHTML: (attributes) => {
          // Only render if we have a valid color
          if (!attributes.color || attributes.color === 'null') {
            return {};
          }
          return { style: `color: ${attributes.color}` };
        },
      },
    };
  },
  // biome-ignore lint/style/useNamingConvention: "This is a Tiptap mark property"
  parseHTML() {
    return [{ 
      style: 'color',
      getAttrs: (element) => {
        // Only create the mark if there's a valid color
        // @ts-expect-error - element type issues
        const color = element.style?.color;
        if (!color || !color.match(/^#[0-9a-fA-F]{6}$/)) {
          return false; // Don't create the mark
        }
        return null; // Create the mark with default parsing
      }
    }];
  },
  // biome-ignore lint/style/useNamingConvention: "This is a Tiptap mark property"
  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes), 0];
  },
});
