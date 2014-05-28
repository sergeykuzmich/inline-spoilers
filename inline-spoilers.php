<?php
/*
Plugin Name: Inline Spoilers
Plugin URI: http://kuzmi.ch
Description: The plugin allows to create content spoilers with simple shortcode.
Version: 1.0.1
Author: Sergey Kuzmich
Author URI: http://kuzmi.ch
License: GPLv2
*/

/**
 * @package Inline Spoilers
 */

add_action( 'plugins_loaded', 'is_load_textdomain' );
function is_load_textdomain() {
	load_plugin_textdomain( 'is', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' ); 
}

add_shortcode ( 'spoiler', 'is_spoiler_shortcode' );
function is_spoiler_shortcode( $atts, $content ) {
	extract( shortcode_atts( array (
		'title' => __('Spoiler', 'is')
	), $atts ) );

	$output  = "<div class=\"spoiler-wrap\">\n";
	$output .= "<div class=\"spoiler-head\" title=\"". __('Expand', 'is') ."\">\n";
	$output .= $title;
	$output .= "\n</div>\n";
	$output .= "<div class=\"spoiler-body\">\n";
	$output .= do_shortcode($content);
	$output .= "\n</div>\n";
	$output .= "</div>\n";

	return $output;
}

add_action( 'wp_enqueue_scripts', 'is_styles_scripts' );
function is_styles_scripts() {
	global $post;
	wp_register_style( 'is_style', plugins_url( 'styles/is-styles.css', __FILE__ ), null, '1.0' );
	wp_register_script( 'is_script', plugins_url( 'scripts/is-scripts.js', __FILE__ ), array( 'jquery' ), '1.0', true );

	if( has_shortcode( $post->post_content, 'spoiler' ) ) {
		wp_enqueue_style( 'is_style' );
		wp_enqueue_script( 'is_script' );

		$translation_array = array( 'expand' 	=> __( 'Expand', 'is' ), 
									'collapse' 	=> __( 'Collapse', 'is' ) );

		wp_localize_script( 'is_script', 'title', $translation_array );
	}  
}