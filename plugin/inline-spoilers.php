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
 * Version:                 2.2.0
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
 * Register settings page menu.
 */
function inline_spoilers_add_settings_page(): void {
	add_options_page(
		__('Inline Spoilers Settings', 'inline-spoilers'),
		__('Inline Spoilers', 'inline-spoilers'),
		'manage_options',
		'inline-spoilers-settings',
		'inline_spoilers_settings_page'
	);
}
add_action('admin_menu', 'inline_spoilers_add_settings_page');

/**
 * Register settings.
 */
function inline_spoilers_register_settings(): void {
	register_setting(
		'inline_spoilers_options',
		'inline_spoilers_dynamic_shortcode',
		array(
			'type' => 'boolean',
			'default' => false,
			'sanitize_callback' => 'rest_sanitize_boolean'
		)
	);

	add_settings_section(
		'inline_spoilers_main_section',
		__('Experimental Features', 'inline-spoilers'),
		null,
		'inline-spoilers-settings'
	);

	add_settings_field(
		'inline_spoilers_dynamic_shortcode',
		__('Dynamic Shortcodes', 'inline-spoilers'),
		'inline_spoilers_dynamic_shortcode_field',
		'inline-spoilers-settings',
		'inline_spoilers_main_section'
	);
}
add_action('admin_init', 'inline_spoilers_register_settings');

/**
 * Render dynamic shortcodes field.
 */
function inline_spoilers_dynamic_shortcode_field(): void {
	?>
	<label>
		<input type="checkbox" name="inline_spoilers_dynamic_shortcode" value="1" <?php checked(get_option('inline_spoilers_dynamic_shortcode')); ?>>
		<?php esc_html_e('Enabled', 'inline-spoilers'); ?>
	</label>
	<p class="description">
		<?php esc_html_e('Allow using dynamic shortcodes like [spoiler-alpha], [spoiler-beta], etc.', 'inline-spoilers'); ?>
	</p>
	<?php
}

/**
 * Render settings page.
 */
function inline_spoilers_settings_page(): void {
	// Check user capabilities
	if (!current_user_can('manage_options')) {
		return;
	}
	?>
	<div class="wrap">
		<h1><?php echo esc_html(get_admin_page_title()); ?></h1>
		<form method="post" action="options.php">
			<?php
			settings_fields('inline_spoilers_options');
			do_settings_sections('inline-spoilers-settings');
			submit_button();
			?>
		</form>
	</div>
	<?php
}

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
		'2.2.0'
	);
	wp_enqueue_style( 'inline-spoilers-css' );

	wp_register_script(
		'inline-spoilers-js',
		plugins_url( 'build/view.js', __FILE__ ),
		array( 'jquery' ),
		'2.2.0',
		array( 'in_footer' => true )
	);
	wp_enqueue_script( 'inline-spoilers-js' );
}

add_action( 'wp_enqueue_scripts', 'inline_spoilers_shortcode_css_js' );

/**
 * Experimental feature to detect and register dynamic shortcodes.
 */
if ( get_option('inline_spoilers_dynamic_shortcode') ) {
	/**
	 * Detect and register all shortcodes with prefix "spoiler-".
	 *
	 * @param  string $content The content of the current post or block.
	 *
	 * @return string
	 */
	function inline_spoilers_detect_and_register_dynamic_shortcodes( string $content ): string {
		// Get cached shortcodes
		$registered_shortcodes = wp_cache_get('inline_spoilers_dynamic_shortcodes');
		if (false === $registered_shortcodes) {
			$registered_shortcodes = array();
		}

		// Find all spoiler shortcodes in content
		preg_match_all( '/\[spoiler-([a-zA-Z0-9_-]+)([^\]]*)\]/', $content, $matches );

		if ( ! empty( $matches[1] ) ) {
			foreach ( $matches[1] as $key ) {
				$shortcode_name = "spoiler-{$key}";

				// Only register if not already registered
				if ( ! isset($registered_shortcodes[$shortcode_name]) && ! shortcode_exists( $shortcode_name ) ) {
					add_shortcode( $shortcode_name, 'inline_spoilers_spoiler_shortcode' );
					$registered_shortcodes[$shortcode_name] = true;
				}
			}

			// Cache the updated list of registered shortcodes
			wp_cache_set('inline_spoilers_dynamic_shortcodes', $registered_shortcodes, '', 3600);
		}

		return $content;
	}

	add_filter( 'the_content', 'inline_spoilers_detect_and_register_dynamic_shortcodes', 1 );
	add_filter( 'widget_text', 'inline_spoilers_detect_and_register_dynamic_shortcodes', 1 );

	/**
	 * Clear shortcodes cache when saving posts.
	 */
	function inline_spoilers_clear_shortcodes_cache(): void {
		wp_cache_delete(INLINE_SPOILERS_DYNAMIC_SHORTCODES_CACHE);
	}
	add_action('save_post', 'inline_spoilers_clear_shortcodes_cache');
	add_action('edit_post', 'inline_spoilers_clear_shortcodes_cache');
}
