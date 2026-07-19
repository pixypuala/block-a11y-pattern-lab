/**
 * Save (frontend markup) for the Accessible Menu Button block.
 *
 * Emits the trigger and menu list `createMenuButton` expects. The list stays
 * visible until the view script runs; the runtime then collapses it and wires
 * the menu roles, roving focus, and keyboard behaviour.
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';
import type { BlockSaveProps } from '@wordpress/blocks';
import type { MenuButtonAttributes } from './edit';

export default function save({ attributes }: BlockSaveProps<MenuButtonAttributes>) {
  const blockProps = useBlockProps.save({ 'data-menu': '' });
  return (
    <div {...blockProps}>
      <button type="button" data-menu-trigger="">
        <RichText.Content tagName="span" value={attributes.triggerLabel} />
      </button>
      <ul data-menu-list="">
        <li data-menu-item="">
          <RichText.Content tagName="span" value={attributes.itemOne} />
        </li>
        <li data-menu-item="">
          <RichText.Content tagName="span" value={attributes.itemTwo} />
        </li>
        <li data-menu-item="">
          <RichText.Content tagName="span" value={attributes.itemThree} />
        </li>
      </ul>
    </div>
  );
}
