/**
 * Save (frontend markup) for the Accessible Dialog block.
 *
 * Emits the trigger and dialog surface `createDialog` expects. The surface is
 * hidden in the saved markup so a no-JavaScript page never shows a stuck-open
 * modal; the runtime reveals it on open, traps focus, and restores focus to the
 * opener on close.
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';
import type { BlockSaveProps } from '@wordpress/blocks';
import type { DialogAttributes } from './edit';

export default function save({ attributes }: BlockSaveProps<DialogAttributes>) {
  const blockProps = useBlockProps.save({ 'data-dialog': '' });
  return (
    <div {...blockProps}>
      <button type="button" data-dialog-trigger="">
        <RichText.Content tagName="span" value={attributes.triggerLabel} />
      </button>
      <div data-dialog-surface="" hidden>
        <h2 data-dialog-title="">
          <RichText.Content tagName="span" value={attributes.title} />
        </h2>
        <RichText.Content tagName="div" value={attributes.body} />
        <button type="button" data-dialog-close="">
          <RichText.Content tagName="span" value={attributes.closeLabel} />
        </button>
      </div>
    </div>
  );
}
