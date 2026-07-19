/**
 * Editor entry for the Accessible Dialog block.
 */
import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './edit';
import type { DialogAttributes } from './edit';
import save from './save';

registerBlockType<DialogAttributes>(metadata, {
  edit: Edit,
  save,
});
