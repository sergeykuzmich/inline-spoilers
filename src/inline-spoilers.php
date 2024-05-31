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
 * Description:             The plugin allows to create content spoilers with simple shortcode & guttenberg js.
 * Version:                 2.0.0
 * Requires at least:       5.2
 * Tested up to:            6.5.0
 * Requires PHP:            7.1
 * Author:                  Sergey Kuzmich
 * Author URI:              https://kuzmi.ch
 * License:                 GPLv3 or later
 * License URI:             https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:             inline-spoilers
 * Domain Path:             /languages/
 */

if ( ! defined( 'WPINC' ) ) {
	die;
}

// Read environment to detect script & style loading optimization.
defined( 'IS_OPTIMIZE_LOADER' ) || define( 'IS_OPTIMIZE_LOADER', true );

add_action( 'plugins_loaded', 'is_load_textdomain' );
/**
 * Load plugin translation files.
 *
 * @return void
 */
function is_load_textdomain() {
	load_plugin_textdomain( 'inline-spoilers', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
}

/**
 * Decides which props to use based on the initial state.
 *
 * @param  string $initial_state  The initial state of the spoiler.
 *
 * @return array
 */
function is_get_initial_props( string $initial_state ): array {
	return ( 'collapsed' === $initial_state )
		? array(
			'head_class' => ' collapsed',
			'body_atts'  => 'style="display: none;"',
			'head_hint'  => __( 'Expand', 'inline-spoilers' ),
		)
		: array(
			'head_class' => ' expanded',
			'body_atts'  => 'style="display: block;"',
			'head_hint'  => __( 'Collapse', 'inline-spoilers' ),
		);
}

add_shortcode( 'spoiler', 'is_spoiler_shortcode' );
/**
 * Register the shortcode.
 *
 * @param  array  $atts  List of attributes.
 * @param  string $content  The content to be placed inside the spoiler.
 *
 * @return string
 */
function is_spoiler_shortcode( array $atts, string $content ): string {
	$attributes = shortcode_atts(
		array(
			'title'         => '&nbsp;',
			'initial_state' => 'collapsed',
		),
		$atts,
		'spoiler'
	);

	$initial_state = esc_attr( $attributes['initial_state'] );

	$props = is_get_initial_props( $initial_state );

	$head  = '<div class="spoiler-head no-icon ' . $props['head_class'] . '" title="' . $props['head_hint'] . '">';
	$head .= esc_attr( $attributes['title'] );
	$head .= '</div>';

	$body  = '<div class="spoiler-body" ' . $props['body_atts'] . '>';
	$body .= balanceTags( do_shortcode( $content ), true );
	$body .= '</div>';

	$extra  = '<div class="spoiler-body">';
	$extra .= balanceTags( do_shortcode( $content ), true );
	$extra .= '</div>';

	$output  = '<div><div class="spoiler-wrap">';
	$output .= $head . $body;
	$output .= ( 'collapsed' === $initial_state )
		? '<noscript>' . $extra . '</noscript>' : '';
	$output .= '</div></div>';

	return $output;
}

/**
 * Register public styles and scripts.
 *
 * @return void
 */
function is_register_public_css_js() {
	wp_register_style(
		'inline-spoilers_css',
		plugins_url( 'public/css/inline-spoilers-default.css', __FILE__ ),
		null,
		'2.0.0'
	);
	wp_register_script(
		'inline-spoilers_js',
		plugins_url( 'public/js/inline-spoilers.js', __FILE__ ),
		array( 'jquery' ),
		'2.0.0',
		array( 'in_footer' => true )
	);
}

add_action( 'wp_enqueue_scripts', 'is_js_css' );
/**
 * Enqueue styles and scripts.
 *
 * @return void
 */
function is_js_css() {
	global $post;

	if ( ! IS_OPTIMIZE_LOADER || ( has_shortcode(
		$post->post_content,
		'spoiler'
	) || has_block( 'inline-spoilers/block', $post ) ) ) {
		is_register_public_css_js();
		wp_enqueue_style( 'inline-spoilers_css' );
		wp_enqueue_script( 'inline-spoilers_js' );

		$translation_array = array(
			'expand'   => __( 'Expand', 'inline-spoilers' ),
			'collapse' => __( 'Collapse', 'inline-spoilers' ),
		);

		wp_localize_script( 'inline-spoilers_js', 'title', $translation_array );
	}
}

/**
 * Register block editor styles and scripts.
 *
 * @return void
 */
function is_register_admin_css_js() {
	wp_register_style(
		'inline-spoilers_block_css',
		plugins_url( 'admin/css/inline-spoilers-block.css', __FILE__ ),
		array(),
		'2.0.0'
	);

	wp_register_script(
		'inline-spoilers_block_js',
		plugins_url( 'admin/js/inline-spoilers-block.js', __FILE__ ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element' ),
		'2.0.0',
		array( 'in_footer' => true )
	);
}

add_action( 'init', 'is_block_init' );
/**
 * Init Gutenberg block to use in the editor.
 *
 * @return void
 */
function is_block_init() {
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	is_register_admin_css_js();
	register_block_type(
		'inline-spoilers/block',
		array(
			'editor_script' => 'inline-spoilers_block_js',
			'editor_style'  => 'inline-spoilers_block_css',
		)
	);
}
