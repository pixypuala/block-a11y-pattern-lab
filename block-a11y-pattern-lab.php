<?php
/**
 * Plugin Name:       Block Accessibility Pattern Lab
 * Plugin URI:        https://github.com/pixypuala/block-a11y-pattern-lab
 * Description:       Registers the lab's WAI-ARIA block patterns — disclosure, tabs, menu button, and dialog — from the compiled build/ directory.
 * Version:           0.1.0
 * Requires at least: 6.5
 * Requires PHP:      8.1
 * Author:            Pixypuala
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       block-a11y-pattern-lab
 *
 * @package Pixypuala\BlockA11yPatternLab
 */

declare( strict_types=1 );

namespace Pixypuala\BlockA11yPatternLab;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register every compiled block found in build/.
 *
 * The build directory is discovered rather than enumerated, so adding a block
 * under blocks/ and rebuilding is enough — this file never needs editing. A
 * checkout without a build is a normal state (build/ is not committed), so a
 * missing directory is reported once and skipped instead of fataling.
 *
 * Wrapped in a function so no variable from this file leaks into the global
 * scope, where it could collide with another plugin's.
 *
 * @return void
 */
function register_blocks(): void {
	$build_dir = __DIR__ . '/build';

	if ( ! is_dir( $build_dir ) ) {
		/* translators: %s: absolute path to the expected build directory. */
		$message = sprintf( 'Block Accessibility Pattern Lab: no compiled blocks at %s. Run `pnpm build`.', $build_dir );

		if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
			_doing_it_wrong( __FUNCTION__, esc_html( $message ), '0.1.0' );
		}

		return;
	}

	$metadata_files = glob( $build_dir . '/*/block.json' );

	foreach ( is_array( $metadata_files ) ? $metadata_files : array() as $metadata_file ) {
		register_block_type( dirname( $metadata_file ) );
	}
}

add_action( 'init', __NAMESPACE__ . '\\register_blocks' );
