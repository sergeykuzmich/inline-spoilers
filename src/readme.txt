=== Inline Spoilers ===
Contributors: sergeykuzmich, gadswan
Tags: shortcode, spoiler
Stable tag: 2.0.0
Tested up to: 6.5.0
Requires at least: 5.2
Requires PHP: 7.1
License: GPLv3 or later
License URI: https://www.gnu.org/licenses/gpl-3.0.html

The plugin allows to create content spoilers with simple shortcode & guttenberg block.

== Description ==

The plugin allows to create content spoilers with simple shortcode & guttenberg block.

`
[spoiler title="Expand Me"]Spoiler content[/spoiler]
`

== Installation ==

1. Install via WordPress Dashboard or upload `inline-spoiler.zip`;
2. Activate the plugin through the 'Plugins' menu in WordPress;
3. Use shortcode & block in your content;

== Frequently Asked Questions ==

= How can I customize design of the spoiler? =
Just override classes defined in `public/css/inline-spoilers-default.css` with your theme styles.

== Screenshots ==

1. Guttenberg block
2. Spoiler shortcode `[spoiler][/spoiler]`
3. Collapsed spoiler
4. Expanded spoiler

== Changelog ==

= 2.0.0 =
* More semantic HTML layout for spoilers is used
  * **IMPORTANT:** All previously created spoilers will work as before, but the new ones will have different HTML structure
  * **WARNING:** In case you have custom styles for spoilers, you may need to update them
* Extended Guttenberg block with available options
* **DEPRECATED** PHP less than 7.1

[OLDER VERSIONS](https://github.com/sergeykuzmich/inline-spoilers?tab=readme-ov-file#older-versions)
