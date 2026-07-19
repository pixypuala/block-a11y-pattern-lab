/**
 * Editor entry for the Accessible Disclosure block.
 *
 * Registers the block against its `block.json` metadata (attributes and
 * supports are read from that file when the block is registered server-side)
 * and binds the editor and save components.
 */
import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './edit';
import type { DisclosureAttributes } from './edit';
import save from './save';

registerBlockType<DisclosureAttributes>(metadata, {
  edit: Edit,
  save,
});
