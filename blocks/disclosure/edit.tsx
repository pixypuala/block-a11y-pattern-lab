/**
 * Editor component for the Accessible Disclosure block.
 *
 * The editor renders the same semantic structure the frontend enhances: a
 * trigger and a content region, both editable inline. It stays deliberately
 * minimal — the ARIA wiring is applied on the frontend by `createDisclosure`,
 * so the editor only has to capture the author's text.
 */
import { __ } from '@wordpress/i18n';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import type { BlockEditProps } from '@wordpress/blocks';

export type DisclosureAttributes = {
  triggerLabel: string;
  content: string;
};

export default function Edit({ attributes, setAttributes }: BlockEditProps<DisclosureAttributes>) {
  const blockProps = useBlockProps();
  return (
    <div {...blockProps}>
      <RichText
        tagName="span"
        className="wp-block-pixy-a11y-disclosure__trigger"
        value={attributes.triggerLabel}
        onChange={(triggerLabel: string) => setAttributes({ triggerLabel })}
        aria-label={__('Disclosure trigger text', 'block-a11y-pattern-lab')}
        allowedFormats={[]}
      />
      <RichText
        tagName="div"
        className="wp-block-pixy-a11y-disclosure__content"
        value={attributes.content}
        onChange={(content: string) => setAttributes({ content })}
        aria-label={__('Disclosure content', 'block-a11y-pattern-lab')}
      />
    </div>
  );
}
