<?php
/**
 * Inline Spoilers
 *
 * @package           Inline Spoilers
 * @author            Sergey Kuzmich
 * @license           GPLv3 or later
 *
 * @wordpress-plugin
 * Plugin Name:             Inline Spoilers
 * Plugin URI:              https://github.com/sergeykuzmich/inline-spoilers
 * Description:             The plugin allows to create content plugin with simple shortcode or guttenberg block.
 * Version:                 2.0.0
 * Requires at least:       5.2
 * Tested up to:            6.5.3
 * Requires PHP:            7.1
 * Author:                  Sergey Kuzmich
 * Author URI:              https://kuzmi.ch
 * License:                 GPLv3 or later
 * License URI:             https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:             inline-plugin
 * Domain Path:             /languages/
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Init Gutenberg block.
 *
 * @return void
 */
function inline_spoilers_spoilers_block_init() {
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	register_block_type( __DIR__ . '/build' );
}

add_action( 'init', 'inline_spoilers_spoilers_block_init' );

/**
 * Register the shortcode.
 *
 * @param  array  $atts  List of attributes.
 * @param  string $content  The content to be placed inside the spoiler.
 *
 * @return string
 */
function inline_spoilers_spoiler_shortcode( array $atts, string $content ): string {
	$attributes = shortcode_atts(
		array(
			'title' => _( 'Spoiler' ),
			'open'  => $atts[0] === 'open',
		),
		$atts,
		'spoiler'
	);

	$start = '<details class="spoiler"' . ( $attributes['open'] ? ' open' : '' ) . '>';
	$title = '<summary>' . esc_attr( $attributes['title'] ) . '</summary>';
	$body  = balanceTags( do_shortcode( $content ), true );
	$end   = '</details>';

	return $start . $title . $body . $end;
}

add_shortcode( 'spoiler', 'inline_spoilers_spoiler_shortcode' );
