/**
 * Save (frontend markup) for the Accessible Disclosure block.
 *
 * Emits the semantic markup `createDisclosure` expects: a trigger button and a
 * content region tagged with the `data-disclosure-*` hooks. The content is left
 * visible so it remains readable if the view script never runs; the frontend
 * runtime collapses it and wires the ARIA state once enhanced.
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';
import type { BlockSaveProps } from '@wordpress/blocks';
import type { DisclosureAttributes } from './edit';

export default function save({ attributes }: BlockSaveProps<DisclosureAttributes>) {
  const blockProps = useBlockProps.save({ 'data-disclosure': '' });
  return (
    <div {...blockProps}>
      <button type="button" data-disclosure-trigger="">
        <RichText.Content tagName="span" value={attributes.triggerLabel} />
      </button>
      <RichText.Content
        tagName="div"
        className="wp-block-pixy-a11y-disclosure__content"
        value={attributes.content}
        data-disclosure-content=""
      />
    </div>
  );
}
