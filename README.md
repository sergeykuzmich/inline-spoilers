# Inline Spoilers #

[![Plugin Version](https://img.shields.io/wordpress/plugin/v/inline-spoilers.svg)](https://wordpress.org/plugins/inline-spoilers/)
[![Plugin Active Installs](https://img.shields.io/wordpress/plugin/installs/inline-spoilers.svg)](https://wordpress.org/plugins/inline-spoilers/)
[![Plugin Downloads](https://img.shields.io/wordpress/plugin/dt/inline-spoilers.svg)](https://wordpress.org/plugins/inline-spoilers/)
[![Plugin Rating](https://img.shields.io/wordpress/plugin/r/inline-spoilers.svg)](https://wordpress.org/plugins/inline-spoilers/)
[![Wordpress Required Version](https://img.shields.io/wordpress/plugin/wp-version/inline-spoilers.svg?label=wordpress%20at%20least)](https://wordpress.org/plugins/inline-spoilers/)
[![Wordpress Tested Version](https://img.shields.io/wordpress/plugin/tested/inline-spoilers.svg)](https://wordpress.org/plugins/inline-spoilers/)

**Contributors:** sergeykuzmich, gadswan  
**Tags:** shortcode, spoiler  
**Stable tag:** 2.0.0  
**Tested up to:** 6.5.0  
**Requires at least:** 5.2  
**Requires PHP:** 7.1  
**License:** GPLv3 or later  
**License URI:** https://www.gnu.org/licenses/gpl-3.0.html

The plugin allows to create content spoilers with simple shortcode & guttenberg block.

## Description ##

The plugin allows to create content spoilers with simple shortcode & guttenberg block.

`
[spoiler title="Expand Me"]Spoiler content[/spoiler]
`

## Installation ##

1. Install via WordPress Dashboard or upload `inline-spoiler.zip`;
2. Activate the plugin through the 'Plugins' menu in WordPress;
3. Use shortcode & block in your content;

## Frequently Asked Questions ##

### How can I customize design of the spoiler? ###

Just override classes defined in `public/css/inline-spoilers-default.css` with your theme styles.

## Screenshots ##

### 1. Guttenberg block ###

![1. Guttenberg block](assets/screenshot-1.gif)

### 2. Spoiler shortcode `[spoiler][/spoiler]` ###

![2. Spoiler shortcode `[spoiler][/spoiler]`](assets/screenshot-2.png)

### 3. Collapsed spoiler ###

![3. Collapsed spoiler](assets/screenshot-3.png)

### 4. Expanded spoiler ###

![4. Expanded spoiler](assets/screenshot-4.png)

## Changelog ##

### 2.0.0 ###

* More semantic HTML layout for spoilers is used
  * **IMPORTANT:** All previously created spoilers will work as before, but the new ones will have different HTML structure
  * **WARNING:** In case you have custom styles for spoilers, you may need to update them
* Extended Guttenberg block with available options
* **DEPRECATED** PHP less than 7.1


<a name="older-versions"></a>
<details>
<summary> <strong>OLDER VERSIONS</strong> </summary>

### 1.5.4 ###

* Minify assets
* Update WordPress "Requires at least" version
* Update WordPress "Tested up to" version

### 1.5.1 ###

* Fix `Inline Spoiler` block doesn't appear in Guttenberg
  editor (https://wordpress.org/support/topic/block-folder-is-missing/).

### 1.5.0 ###

* Make flag for non-optimized script & style loading to prevent issues on some child themes (
  see https://wordpress.org/support/topic/spoiler-doesnt-show-up/ for more information)

```
wp-config.php:

...
/** Set FALSE to disable 'Inline Spoliers' plugin script & style optimization
define( 'IS_OPTIMIZE_LOADER', false );

/* That's all, stop editing! Happy publishing. */
...
```

### 1.4.1 ###

* Fix https://wordpress.org/support/topic/fatal-error-when-activating-the-plugin-10/

### 1.4.0 ###

* Introduce Guttenberg block to create spoilers (special thanks
  to [Sergey Zaytsev](https://www.linkedin.com/in/sergey-zaytsev-b50857b0/) for doing most of things)

### 1.3.8 ###

* Allow empty spoiler title by default

### 1.3.7 ###

* Refactor deployment strategy to support multiply revisions for the same plugin version

### 1.3.3 ###

* Fix https://wordpress.org/support/topic/notice-undefined-variable-extra-in-wp-content-plugins-inline-spoilers-inlin/

### 1.3.2 ###

* Compatibility up to Wordpress 4.9.8

### 1.3.1 ###

* Always show spoiler contents while javascript is disabled

### 1.2.8 ###

* Setup automated deployment with TravisCI

### 1.2.5 ###

* Balance content html tags

### 1.2.4 ###

* Add WP_DEBUG mode
  * Fix incorrect paragraph tags inside the spoiler

### 1.2.3 ###

* JavaScript bug fix

### 1.2.2 ###

* Update spoiler default behaviour

### 1.1.2 ###

* Update Russian translation
* Add attribute 'initial_state' to define default state of a spoiler `initial_state=(expanded|collapsed)`. Default state
  is 'collapsed'
* Security updates

### 1.0.2 ###

* Update Russian translation

### 1.0.1 ###

* Release the plugin
</details>
