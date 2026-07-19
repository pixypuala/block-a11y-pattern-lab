/**
 * Editor component for the Accessible Tabs block.
 *
 * Captures the two tab labels and their panel bodies. The tab roles, roving
 * tabindex, and Arrow/Home/End navigation are applied on the frontend by
 * `createTabs`, so the editor only edits text.
 */
import { __ } from '@wordpress/i18n';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import type { BlockEditProps } from '@wordpress/blocks';

export type TabsAttributes = {
  tabOneLabel: string;
  tabOnePanel: string;
  tabTwoLabel: string;
  tabTwoPanel: string;
};

export default function Edit({ attributes, setAttributes }: BlockEditProps<TabsAttributes>) {
  const blockProps = useBlockProps();
  return (
    <div {...blockProps}>
      <RichText
        tagName="span"
        className="wp-block-pixy-a11y-tabs__tab"
        value={attributes.tabOneLabel}
        onChange={(tabOneLabel: string) => setAttributes({ tabOneLabel })}
        aria-label={__('First tab label', 'block-a11y-pattern-lab')}
        allowedFormats={[]}
      />
      <RichText
        tagName="div"
        className="wp-block-pixy-a11y-tabs__panel"
        value={attributes.tabOnePanel}
        onChange={(tabOnePanel: string) => setAttributes({ tabOnePanel })}
        aria-label={__('First tab panel', 'block-a11y-pattern-lab')}
      />
      <RichText
        tagName="span"
        className="wp-block-pixy-a11y-tabs__tab"
        value={attributes.tabTwoLabel}
        onChange={(tabTwoLabel: string) => setAttributes({ tabTwoLabel })}
        aria-label={__('Second tab label', 'block-a11y-pattern-lab')}
        allowedFormats={[]}
      />
      <RichText
        tagName="div"
        className="wp-block-pixy-a11y-tabs__panel"
        value={attributes.tabTwoPanel}
        onChange={(tabTwoPanel: string) => setAttributes({ tabTwoPanel })}
        aria-label={__('Second tab panel', 'block-a11y-pattern-lab')}
      />
    </div>
  );
}
