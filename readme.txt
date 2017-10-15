=== Inline Spoilers ===
Contributors: sergeykuzmich
Tags: shortcode, spoiler
Requires at least: 3.9.1
Tested up to: 4.1.1
Stable tag: 1.2.5
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

The plugin allows to create content spoilers with simple shortcode.

== Description ==

`Example: [spoiler title="Expand Me"]Spoiler content[/spoiler]`

== Installation ==

1. Upload folder `inline-spoiler` to the `/wp-content/plugins/` directory;
1. Activate the plugin through the 'Plugins' menu in WordPress;
1. Place shortcode (*Example:* `[spoiler title="Expand Me"]Spoiler content[/spoiler]`) in your content;

== Frequently Asked Questions ==

= How do I can customize design of the spoiler? =
To change layout of a spoiler, please, edit `styles/inline-spoilers-styles.css` file.

= How to remove text from the title? =
To remove default title you can use
`
[spoiler title="&nbsp;"]
...
[/spoiler]
`

== Screenshots ==

1. To add a spoilered content to your post/page just put that content between `[spoiler][/spoiler]` shortcode
2. Collapsed spoiler in your post/page
3. Expanded spoiler

== Changelog ==

= 1.2.5 =
* Balance content html tags
