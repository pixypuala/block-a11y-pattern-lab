/**
 * Editor entry for the Accessible Menu Button block.
 */
import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './edit';
import type { MenuButtonAttributes } from './edit';
import save from './save';

registerBlockType<MenuButtonAttributes>(metadata, {
  edit: Edit,
  save,
});
