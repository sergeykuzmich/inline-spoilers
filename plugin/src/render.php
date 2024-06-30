<?php
/**
 *  Inline Spoilers - Render Script
 *
 * @param  array     $attributes  The array of attributes for this block.
 * @param  string    $content     Rendered block output.
 * @param  WP_Block  $block       The instance of the WP_Block class that represents the block being rendered.
 *
 * @package          Inline Spoilers
 */

?>

<p <?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>>
	<?php esc_html_e( 'Inline Spoilers!', 'plugin' ); ?>
</p>
