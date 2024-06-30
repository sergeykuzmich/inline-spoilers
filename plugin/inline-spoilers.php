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
function inline_spoilers_block_init() {
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

	$start = '<details class="spoiler"' . ( $attributes['open'] ? ' open' : '' ) . '>';
	$title = '<summary>' . esc_attr( $attributes['title'] ) . '</summary>';
	$body  = balanceTags( do_shortcode( $content ), true );
	$end   = '</details>';

	return $start . $title . $body . $end;
}

add_shortcode( 'spoiler', 'inline_spoilers_spoiler_shortcode' );

/**
 * Register shortcode styles and scripts.
 *
 * @return void
 */
function inline_spoilers_register_shortcode_css_js() {
	wp_register_style(
		'inline-spoilers-shortcode_css',
		plugins_url( 'shortcode/css/inline-spoilers-shortcode.css', __FILE__ ),
		null,
		'2.0.0'
	);
	wp_enqueue_style( 'inline-spoilers-shortcode_css' );

	wp_register_script(
		'inline-spoilers-shortcode_js',
		plugins_url( 'shortcode/js/inline-spoilers-shortcode.js', __FILE__ ),
		array( 'jquery' ),
		'2.0.0',
		array( 'in_footer' => true )
	);
	wp_enqueue_script( 'inline-spoilers-shortcode_js' );
}

add_action( 'wp_enqueue_scripts', 'inline_spoilers_register_shortcode_css_js' );
