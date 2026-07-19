/**
 * Local type surface for `@wordpress/block-editor`.
 *
 * The published `@wordpress/block-editor` package ships no `.d.ts` files (its
 * package manifest declares neither a `types` field nor a `types` export
 * condition). Rather than let the editor glue fall back to `any`, this file
 * declares the precise subset of the module this project consumes. `wp-scripts`
 * externalises the package to `window.wp.blockEditor` at build time, so this
 * declaration only informs the type-checker.
 */
declare module '@wordpress/block-editor' {
  import type { ComponentType } from 'react';

  interface RichTextProps {
    tagName?: keyof JSX.IntrinsicElements;
    className?: string;
    value: string;
    onChange: (value: string) => void;
    allowedFormats?: readonly string[];
    'aria-label'?: string;
  }

  interface RichTextContentProps {
    tagName?: keyof JSX.IntrinsicElements;
    className?: string;
    value: string;
    [dataAttribute: `data-${string}`]: string;
  }

  export const RichText: ComponentType<RichTextProps> & {
    Content: ComponentType<RichTextContentProps>;
  };

  export function useBlockProps(
    props?: Record<string, unknown>,
  ): Record<string, unknown> & { className?: string };

  export namespace useBlockProps {
    function save(props?: Record<string, unknown>): Record<string, unknown>;
  }
}
