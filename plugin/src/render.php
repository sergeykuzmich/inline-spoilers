<?php
/**
 *  Inline Spoilers - Render
 *
 * @package           Inline Spoilers
 */

?>

<p <?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>>
	<?php esc_html_e( 'Inline Spoilers!', 'plugin' ); ?>
</p>
