<?php
/**
 *  Inline Spoilers - Render Script
 *
 * @param  array  $attributes  The array of attributes for this block.
 * @param  string  $content  Rendered block output.
 * @param  WP_Block  $block  The instance of the WP_Block class that represents the block being rendered.
 *
 * @package          Inline Spoilers
 */

/**
 * Attributes of a Gutenberg block or another element.
 *
 * @var array $attributes
 */

/**
 * The content of the current post or block.
 *
 * @var string $content
 */

if ( ! str_contains( $content, 'spoiler-wrap' ) ) :
	?>
<details
	<?php
	if ( true === $attributes['open'] ) {
		echo 'open';
	}
	?>
	<?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>>
	<summary>
		<?php echo wp_kses( ! empty( $attributes['title'] ) ? $attributes['title'] : '&nbsp;', array() ); ?>
	</summary>
	<?php echo wp_kses( $content, 'post' ); ?>
</details>
<?php else : ?>
	<?php
	// Allow no-escape rendering of the content for blocks created
	// in version of Plugin prior to 2.0.0.
	echo $content; // phpcs:ignore WordPress.Security.EscapeOutput
	?>
<?php endif; ?>
