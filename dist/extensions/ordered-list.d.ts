import { Node } from '@tiptap/core';

/**
 * OrderedList extension for JIRA ADF compatibility
 *
 * Ensures the 'type' attribute is never null, which causes JIRA validation errors.
 * Default type is 'decimal' for numbered lists.
 */
declare const OrderedList: Node<any, any>;

export { OrderedList };
