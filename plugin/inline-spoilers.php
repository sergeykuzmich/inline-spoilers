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
 * Description:             The plugin allows to create content spoilers with Guttenberg block or simple shortcode.
 * Version:                 2.1.0
 * Requires at least:       6.6
 * Tested up to:            6.7.1
 * Requires PHP:            7.2
 * Author:                  Sergey Kuzmich
 * Author URI:              https://kuzmi.ch
 * License:                 GPLv3 or later
 * License URI:             https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:             inline-plugin
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Init Gutenberg block.
 *
 * @return void
 */
function inline_spoilers_block_init(): void {
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	register_block_type( __DIR__ . '/build' );
}

add_action( 'init', 'inline_spoilers_block_init' );

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
			'title' => __( 'Spoiler', 'inline-spoilers' ),
			'open'  => in_array( 'open', $atts, true ),
		),
		$atts,
		'spoiler'
	);

	$start = '<details class="wp-block-inline-spoilers-block"' . ( $attributes['open'] ? ' open' : '' ) . '>';
	$title = '<summary>' . esc_attr( $attributes['title'] ) . '</summary>';
	$body  = balanceTags( do_shortcode( $content ), true );
	$end   = '</details>';

	return $start . $title . $body . $end;
}

add_shortcode( 'spoiler', 'inline_spoilers_spoiler_shortcode' );

/**
 * Register styles and scripts of block version 1.5.5.
 *
 * @return void
 */
function inline_spoilers_shortcode_css_js(): void {
	wp_register_style(
		'inline-spoilers-css',
		plugins_url( 'build/style-index.css', __FILE__ ),
		array(),
		'2.1.0'
	);
	wp_enqueue_style( 'inline-spoilers-css' );

	wp_register_script(
		'inline-spoilers-js',
		plugins_url( 'build/view.js', __FILE__ ),
		array( 'jquery' ),
		'2.1.0',
		array( 'in_footer' => true )
	);
	wp_enqueue_script( 'inline-spoilers-js' );
}

add_action( 'wp_enqueue_scripts', 'inline_spoilers_shortcode_css_js' );

/**
 * Experimental feature to detect and register dynamic shortcodes.
 */
if ( defined( 'IS_DYNAMIC_SHORTCODE' ) && constant( 'IS_DYNAMIC_SHORTCODE' ) === true ) {
	/**
	 * Detect and register all shortcodes with prefix "spoiler-".
	 *
	 * @param  string $content The content of the current post or block.
	 *
	 * @return string
	 */
	function inline_spoilers_detect_and_register_dynamic_shortcodes( string $content ): string {
		preg_match_all( '/\[spoiler-([a-zA-Z0-9_-]+)([^\]]*)\]/', $content, $matches );

		if ( ! empty( $matches[1] ) ) {
			foreach ( $matches[1] as $key ) {
				$shortcode_name = "spoiler-{$key}";

				if ( ! shortcode_exists( $shortcode_name ) ) {
					add_shortcode( $shortcode_name, 'inline_spoilers_spoiler_shortcode' );
				}
			}
		}

		return $content;
	}

	add_filter( 'the_content', 'inline_spoilers_detect_and_register_dynamic_shortcodes', 1 );
	add_filter( 'widget_text', 'inline_spoilers_detect_and_register_dynamic_shortcodes', 1 );
}
