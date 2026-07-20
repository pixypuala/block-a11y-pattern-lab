# Runtime verification

Everything below was executed against a live WordPress 7.0.2 install (PHP 8.2,
`portfolio.local`) with this repository symlinked into `wp-content/plugins/` and
activated. The vitest suite proves the framework-free pattern core in jsdom;
this document exists because three claims — that the blocks can be *inserted*,
that their *attributes* survive a round trip, and that the *enhanced ARIA
markup* reaches a real browser — can only be proven by running WordPress.

Reproduce with any WordPress 6.5+ install: `pnpm build`, symlink the repo into
`wp-content/plugins/`, activate it.

## Registration

```
$ wp plugin activate block-a11y-pattern-lab
Plugin 'block-a11y-pattern-lab' activated.

$ wp eval '$r = WP_Block_Type_Registry::get_instance(); …'
pixy-a11y/disclosure  registered=yes editor=pixy-a11y-disclosure-editor-script  view=pixy-a11y-disclosure-view-script  attrs=triggerLabel,content
pixy-a11y/tabs        registered=yes editor=pixy-a11y-tabs-editor-script        view=pixy-a11y-tabs-view-script        attrs=tabOneLabel,tabOnePanel,tabTwoLabel,tabTwoPanel
pixy-a11y/menu-button registered=yes editor=pixy-a11y-menu-button-editor-script view=pixy-a11y-menu-button-view-script attrs=triggerLabel,itemOne,itemTwo,itemThree
pixy-a11y/dialog      registered=yes editor=pixy-a11y-dialog-editor-script      view=pixy-a11y-dialog-view-script      attrs=triggerLabel,title,body,closeLabel
```

(WordPress appends `lock`, `metadata`, `className`, and `style` to every block's
attribute list; those are core's, not this plugin's.)

`block-a11y-pattern-lab.php` never names a block. It globs
`build/*/block.json` and calls `register_block_type()` on each directory, so a
new block is picked up by rebuilding, not by editing PHP.

### Missing build output

`build/` is not committed. A checkout without one must not fatal:

```
$ mv build /tmp/__b_backup
$ wp eval 'echo count(… "pixy-a11y/" …);'
Notice: Function Pixypuala\BlockA11yPatternLab\register_blocks was called incorrectly.
Block Accessibility Pattern Lab: no compiled blocks at …/build. Run `pnpm build`.
0
$ curl -s -o /dev/null -w '%{http_code}\n' http://portfolio.local/block-a11y-demo/
200
$ mv /tmp/__b_backup build && wp eval 'echo count(…);'
4
```

The site stays up; the failure is loud under `WP_DEBUG` and silent otherwise.

## Insertion — the block editor

`/wp-admin/post-new.php?post_type=page` was driven with Playwright (chromium),
authenticated as administrator, with the browser console captured.

```
HTTP status: 200

registered: { "pixy-a11y/disclosure": "Accessible Disclosure",
              "pixy-a11y/tabs": "Accessible Tabs",
              "pixy-a11y/menu-button": "Accessible Menu Button",
              "pixy-a11y/dialog": "Accessible Dialog" }

inserted:   { "count": 4,
              "names": ["pixy-a11y/disclosure","pixy-a11y/tabs",
                        "pixy-a11y/menu-button","pixy-a11y/dialog"],
              "allValid": true }
```

`allValid` is the load-bearing assertion: WordPress re-parses each block's saved
markup against what `save.tsx` produces and marks any mismatch invalid. All four
round-trip cleanly — no block-validation warnings.

Console output for the whole editor session, verbatim:

```
log   JQMIGRATE: Migrate is installed with logging active, version 3.4.1
info  Download the React DevTools for a better development experience…
info  [WooCommerce] Dependency detection enabled…
```

No error, no warning, nothing from this plugin.

## Attribute editing

Two blocks were created with non-default attributes (`tabOneLabel: "Shipping"`,
`tabTwoLabel: "Returns"`; `triggerLabel: "Show shipping policy"`,
`content: "Ships within two business days."`). The editor serialized them as:

```html
<!-- wp:pixy-a11y/tabs {"tabOneLabel":"Shipping","tabTwoLabel":"Returns"} -->
<div data-tabs="" class="wp-block-pixy-a11y-tabs"><div data-tabs-list="">
<button type="button" data-tabs-tab=""><span>Shipping</span></button>
<button type="button" data-tabs-tab=""><span>Returns</span></button></div>…
<!-- /wp:pixy-a11y/tabs -->
```

Only non-default values appear in the comment delimiter; the defaults
(`tabOnePanel`, `tabTwoPanel`) are omitted and re-supplied from `block.json` on
parse — correct static-block behaviour. The overridden labels are present in the
saved HTML, and `do_blocks()` on the stored post confirms they survive the
server-side render:

```
$ wp eval '$html = do_blocks(get_post(42)->post_content); …'
1254 bytes
data-disclosure: 3   data-tabs: 6   data-menu: 6   data-dialog: 5
ATTR disclosure triggerLabel OK
ATTR tabs labels OK
```

## Enhanced markup end to end

The four blocks were saved to a published page,
<http://portfolio.local/block-a11y-demo/>.

Served HTML (`curl`, before any JavaScript runs) is deliberately plain semantic
markup — the patterns progressively enhance, so a no-JS reader gets readable
content rather than a collapsed widget:

```
$ curl -s -o front.html -w '%{http_code}\n' http://portfolio.local/block-a11y-demo/
200
$ grep -o 'pixy-a11y-[a-z-]*-view-script-js' front.html | sort -u
pixy-a11y-dialog-view-script-js
pixy-a11y-disclosure-view-script-js
pixy-a11y-menu-button-view-script-js
pixy-a11y-tabs-view-script-js
```

```html
<div data-disclosure="" class="wp-block-pixy-a11y-disclosure">
  <button type="button" data-disclosure-trigger=""><span>Show shipping policy</span></button>
  <div class="wp-block-pixy-a11y-disclosure__content" data-disclosure-content="">Ships within two business days.</div>
</div>
```

All four `viewScript` bundles are enqueued. The ARIA below is what the same page
looks like in a real browser after those bundles run — read out of the live DOM
with Playwright, not asserted in jsdom.

### Tabs

```
tablist role:  "tablist"
tab 0: role=tab  aria-selected=true   aria-controls=tabs-1-panel-0  id=tabs-1-tab-0  tabindex=0   text="Shipping"
tab 1: role=tab  aria-selected=false  aria-controls=tabs-1-panel-1  id=tabs-1-tab-1  tabindex=-1  text="Returns"
panel 0: role=tabpanel  id=tabs-1-panel-0  aria-labelledby=tabs-1-tab-0  hidden=false
panel 1: role=tabpanel  id=tabs-1-panel-1  aria-labelledby=tabs-1-tab-1  hidden=true
```

After focusing tab 0 and pressing `ArrowRight`:

```
aria-selected: ["false","true"]   tabindex: ["-1","0"]
panels hidden: [true,false]        focused: "Returns"
```

Roving tabindex, automatic activation, and panel visibility all move together,
and the `aria-controls`/`aria-labelledby` ids are reciprocal.

### Disclosure

```
before click: aria-expanded=false  aria-controls=disclosure-1  content id=disclosure-1  hidden=true
after  click: aria-expanded=true   hidden=false
```

### Menu button

```
before: aria-haspopup=menu  aria-expanded=false  aria-controls=menu-1-list
        list role=menu  id=menu-1-list  hidden=true
        items: [menuitem tabindex=-1 "Edit", menuitem tabindex=-1 "Duplicate", menuitem tabindex=-1 "Delete"]
after click:      aria-expanded=true   hidden=false   focus → "Edit"
after ArrowDown:  focus → "Duplicate"
after Escape:     aria-expanded=false  focus restored to trigger → true
```

### Dialog

```
closed: role=dialog  aria-modal=true  aria-labelledby=dialog-1-title
        (title element id=dialog-1-title)  surface hidden=true
open:   surface hidden=false  focus inside dialog=true
        activeElement=<button type="button" data-dialog-close=""><span>Close</span></button>
Escape: surface hidden=true  focus restored to trigger=true
```

The dialog trigger carries no `aria-expanded` — correct for the APG modal dialog
pattern, where the dialog is not a disclosure of the button.

Front-end console for the whole session:

```
info     [WooCommerce] Dependency detection enabled…
log      JQMIGRATE: Migrate is installed with logging active, version 3.4.1
warning  The usage of data-wp-init--mark-as-hydrated (two hyphens…) is deprecated…
```

The deprecation is WooCommerce's cart-block markup on the same install:
`grep -rn 'data-wp-' blocks/ src/` returns nothing, so no block in this
repository emits an Interactivity API directive.

## Error hygiene

`WP_DEBUG` and `WP_DEBUG_LOG` were on for every run above. After restoring
`build/`, the front end and the block editor were requested again and the log
was diffed from a mark taken beforehand:

```
$ curl … /block-a11y-demo/            200
$ curl … /wp-admin/post-new.php…      200
$ tail -n +114 debug.log | grep -iE 'Notice|Warning|Fatal|Deprecated|Uncaught'
(none)
```

The only entries this plugin has ever written to `debug.log` are the two
`_doing_it_wrong` notices produced on purpose by the missing-`build/` test above.

## Suite state

```
$ corepack pnpm exec tsc --noEmit     # clean
$ corepack pnpm exec vitest run
Test Files  6 passed (6)
     Tests  67 passed (67)
```

The suite grew from 55 to 67: `test/plugin-wrapper.test.ts` pins the plugin
header, the ABSPATH guard, the missing-build guard, the `init` hook, and — the
property that matters — that no block slug appears in the executable body, so
directory discovery cannot silently regress into a hardcoded list.

## What is still not proven here

- **Screen-reader behaviour.** Every assertion above reads the DOM. Correct
  roles and state are necessary for a good NVDA/JAWS/VoiceOver experience, not
  sufficient. No assistive technology was driven in this run.
- **Patterns beyond the four.** Combobox, listbox, treeview, and the rest of the
  APG catalogue are not built and therefore not verified.
- **Cross-browser.** Chromium only. WebKit and Gecko focus-management differences
  were not exercised.
- **Multiple instances of one block on a page.** The ids observed (`tabs-1-*`,
  `menu-1-list`, `dialog-1-title`) come from a per-page counter; only one
  instance of each block was on the test page.
- **Editor-canvas interaction.** Blocks were inserted through the block editor's
  own data store and validated by it; the inserter UI was not clicked by hand.
