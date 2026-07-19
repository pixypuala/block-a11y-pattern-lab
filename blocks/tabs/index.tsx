/**
 * Editor entry for the Accessible Tabs block.
 */
import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './edit';
import type { TabsAttributes } from './edit';
import save from './save';

registerBlockType<TabsAttributes>(metadata, {
  edit: Edit,
  save,
});
