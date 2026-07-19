/**
 * Save (frontend markup) for the Accessible Tabs block.
 *
 * Emits the tablist/tab/panel structure `createTabs` expects, with equal tab
 * and panel counts. All panels stay visible until the view script runs, so the
 * content remains readable without JavaScript; the runtime then reveals only
 * the selected panel and wires the ARIA state.
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';
import type { BlockSaveProps } from '@wordpress/blocks';
import type { TabsAttributes } from './edit';

export default function save({ attributes }: BlockSaveProps<TabsAttributes>) {
  const blockProps = useBlockProps.save({ 'data-tabs': '' });
  return (
    <div {...blockProps}>
      <div data-tabs-list="">
        <button type="button" data-tabs-tab="">
          <RichText.Content tagName="span" value={attributes.tabOneLabel} />
        </button>
        <button type="button" data-tabs-tab="">
          <RichText.Content tagName="span" value={attributes.tabTwoLabel} />
        </button>
      </div>
      <RichText.Content tagName="div" data-tabs-panel="" value={attributes.tabOnePanel} />
      <RichText.Content tagName="div" data-tabs-panel="" value={attributes.tabTwoPanel} />
    </div>
  );
}
