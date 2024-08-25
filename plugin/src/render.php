<?php
/**
 *  Inline Spoilers - Render Script
 *
 * @param  array    $attributes The array of attributes for this block.
 * @param  string   $content    Rendered block output.
 * @param  WP_Block $block      The instance of the WP_Block class that represents the block being rendered.
 *
 * @package          Inline Spoilers
 */

?>

<details <?php if ($attributes['open']) { echo "open"; } ?> <?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>>
	<summary>
		<?php echo $attributes['title']; ?>
	</summary>
	<?php echo $content; ?>
</details>
<?php
/**
 *  Inline Spoilers - Render Script
 *
 * @param  array    $attributes The array of attributes for this block.
 * @param  string   $content    Rendered block output.
 * @param  WP_Block $block      The instance of the WP_Block class that represents the block being rendered.
 *
 * @package          Inline Spoilers
 */

?>

<details <?php if ($attributes['open']) { echo "open"; } ?> <?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>>
	<summary>
		<?php echo $attributes['title']; ?>
	</summary>
	<?php echo $content; ?>
</details>
