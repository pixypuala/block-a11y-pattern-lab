/**
 * Editor component for the Accessible Dialog block.
 *
 * Captures the trigger label, dialog title, body, and close label. The dialog
 * role, focus trap, Escape handling, and focus restoration are applied on the
 * frontend by `createDialog`, so the editor only edits text.
 */
import { __ } from '@wordpress/i18n';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import type { BlockEditProps } from '@wordpress/blocks';

export type DialogAttributes = {
  triggerLabel: string;
  title: string;
  body: string;
  closeLabel: string;
};

export default function Edit({ attributes, setAttributes }: BlockEditProps<DialogAttributes>) {
  const blockProps = useBlockProps();
  return (
    <div {...blockProps}>
      <RichText
        tagName="span"
        className="wp-block-pixy-a11y-dialog__trigger"
        value={attributes.triggerLabel}
        onChange={(triggerLabel: string) => setAttributes({ triggerLabel })}
        aria-label={__('Dialog trigger label', 'block-a11y-pattern-lab')}
        allowedFormats={[]}
      />
      <RichText
        tagName="span"
        className="wp-block-pixy-a11y-dialog__title"
        value={attributes.title}
        onChange={(title: string) => setAttributes({ title })}
        aria-label={__('Dialog title', 'block-a11y-pattern-lab')}
        allowedFormats={[]}
      />
      <RichText
        tagName="div"
        className="wp-block-pixy-a11y-dialog__body"
        value={attributes.body}
        onChange={(body: string) => setAttributes({ body })}
        aria-label={__('Dialog body', 'block-a11y-pattern-lab')}
      />
      <RichText
        tagName="span"
        className="wp-block-pixy-a11y-dialog__close"
        value={attributes.closeLabel}
        onChange={(closeLabel: string) => setAttributes({ closeLabel })}
        aria-label={__('Dialog close label', 'block-a11y-pattern-lab')}
        allowedFormats={[]}
      />
    </div>
  );
}
