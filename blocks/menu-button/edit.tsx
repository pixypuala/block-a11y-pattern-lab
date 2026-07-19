/**
 * Editor component for the Accessible Menu Button block.
 *
 * Captures the trigger label and the three menu item labels. The menu roles,
 * roving focus, and keyboard operation are applied on the frontend by
 * `createMenuButton`, so the editor only edits text.
 */
import { __ } from '@wordpress/i18n';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import type { BlockEditProps } from '@wordpress/blocks';

export type MenuButtonAttributes = {
  triggerLabel: string;
  itemOne: string;
  itemTwo: string;
  itemThree: string;
};

export default function Edit({ attributes, setAttributes }: BlockEditProps<MenuButtonAttributes>) {
  const blockProps = useBlockProps();
  return (
    <div {...blockProps}>
      <RichText
        tagName="span"
        className="wp-block-pixy-a11y-menu-button__trigger"
        value={attributes.triggerLabel}
        onChange={(triggerLabel: string) => setAttributes({ triggerLabel })}
        aria-label={__('Menu button label', 'block-a11y-pattern-lab')}
        allowedFormats={[]}
      />
      <RichText
        tagName="span"
        className="wp-block-pixy-a11y-menu-button__item"
        value={attributes.itemOne}
        onChange={(itemOne: string) => setAttributes({ itemOne })}
        aria-label={__('First menu item', 'block-a11y-pattern-lab')}
        allowedFormats={[]}
      />
      <RichText
        tagName="span"
        className="wp-block-pixy-a11y-menu-button__item"
        value={attributes.itemTwo}
        onChange={(itemTwo: string) => setAttributes({ itemTwo })}
        aria-label={__('Second menu item', 'block-a11y-pattern-lab')}
        allowedFormats={[]}
      />
      <RichText
        tagName="span"
        className="wp-block-pixy-a11y-menu-button__item"
        value={attributes.itemThree}
        onChange={(itemThree: string) => setAttributes({ itemThree })}
        aria-label={__('Third menu item', 'block-a11y-pattern-lab')}
        allowedFormats={[]}
      />
    </div>
  );
}
