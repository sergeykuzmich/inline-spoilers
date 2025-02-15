=== Inline Spoilers ===
Contributors: sergeykuzmich, gadswan
Tags: shortcode, spoiler, bbcode, toggle, guttenberg, block
Stable tag: 2.0.0
Tested up to: 6.7.1
Requires at least: 6.6
Requires PHP: 7.2
License: GPLv3 or later
License URI: https://www.gnu.org/licenses/gpl-3.0.html

The plugin allows to create content spoilers with Guttenberg block or simple shortcode.

== Description ==

The plugin allows to create content spoilers with Guttenberg block or simple shortcode.

`
[spoiler title="Expand Me"]Spoiler content[/spoiler]
`

== Installation ==

1. Install via WordPress Dashboard or upload `inline-spoiler.zip`;
2. Activate the plugin through the 'Plugins' menu in WordPress;
3. Use Guttenberg block or shortcode in your content;

== Frequently Asked Questions ==

= How can I customize design of the spoiler? =
Just override classes defined in `build/style-index.css` with your theme styles.

== Screenshots ==

1. Guttenberg block
2. Spoiler shortcode `[spoiler][/spoiler]`
3. Collapsed spoiler
4. Expanded spoiler

== Changelog ==

= 2.0.0 =

* Change spoiler HTML semantic (from `div` to `details` & `summary`)
  * All blocks created with the previous version of Guttenberg block will be the same as before, until you edit them
* Allow spoilers inside spoilers (as well as any other Guttengerg blocks allowed in post)

**WARNING**
* Minimal required WordPress version is 6.6 (for JSX support, [JSX in WordPress 6.6](https://make.wordpress.org/core/2024/06/06/jsx-in-wordpress-6-6/))
* The plugin is not fully tested with PHP versions lower than 8.1 due to the lack of available [official docker images](https://hub.docker.com/_/wordpress/)

[OLDER VERSIONS](https://github.com/sergeykuzmich/inline-spoilers?tab=readme-ov-file#older-versions)
