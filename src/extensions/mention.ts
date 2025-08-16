import TiptapMention from '@tiptap/extension-mention';

export const Mention = TiptapMention.extend({
  name: 'mention',

  addAttributes() {
    return {
      id: {
        default: null,

        // biome-ignore lint/style/useNamingConvention: "This is a Tiptap property"
        parseHTML: (element: HTMLElement) => element.getAttribute('data-id'),

        // biome-ignore lint/style/useNamingConvention: "This is a Tiptap property"
        renderHTML: (attributes: any) => {
          if (!attributes.id) {
            return {};
          }
          return { 'data-id': attributes.id };
        },
      },
      text: {
        default: null,

        // biome-ignore lint/style/useNamingConvention: "This is a Tiptap property"
        parseHTML: (element: HTMLElement) => element.getAttribute('data-text'),
        // biome-ignore lint/style/useNamingConvention: "This is a Tiptap property"
        renderHTML: (attributes: any) => {
          if (!attributes.text) {
            return {};
          }
          return { 'data-text': attributes.text };
        },
      },
      accessLevel: {
        default: '',
        // biome-ignore lint/style/useNamingConvention: "This is a Tiptap property"
        parseHTML: (element: HTMLElement) => element.getAttribute('data-access-level'),
        // biome-ignore lint/style/useNamingConvention: "This is a Tiptap property"
        renderHTML: (attributes: any) => {
          if (!attributes.accessLevel) {
            return {};
          }
          return { 'data-access-level': attributes.accessLevel };
        },
      },
    };
  },
}).configure({
  // biome-ignore lint/style/useNamingConvention: "This is a Tiptap property"
  HTMLAttributes: {
    'data-type': 'mention',
  },
  renderText({ options, node }) {
    if (node.attrs.text) {
      return node.attrs.text;
    }

    return `${options.suggestion.char}${node.attrs.label ?? node.attrs.id}`;
  },
  // biome-ignore lint/style/useNamingConvention: "This is a Tiptap property"
  renderHTML({ options, node }) {
    if (node.attrs.text) {
      return node.attrs.text;
    }

    return `${options.suggestion.char}${node.attrs.label ?? node.attrs.id}`;
  },
});
