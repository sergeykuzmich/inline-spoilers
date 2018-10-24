# Inline Spoilers #

[![Plugin Downloads](https://img.shields.io/wordpress/plugin/dt/inline-spoilers.svg)](https://wordpress.org/plugins/inline-spoilers/)
[![Plugin Version](https://img.shields.io/wordpress/plugin/v/inline-spoilers.svg)](https://wordpress.org/plugins/inline-spoilers/)
[![Wordpress Version](https://img.shields.io/wordpress/v/inline-spoilers.svg)](https://wordpress.org/plugins/inline-spoilers/)
[![Plugin Rating](https://img.shields.io/wordpress/plugin/r/inline-spoilers.svg)](https://wordpress.org/plugins/inline-spoilers/)

**Contributors:** Sergey Kuzmich

**Tags:** shortcode, spoiler

**Requires at least:** 3.9.1

**Tested up to:** 4.9.8

**Requires PHP at least:** 5.5

**Stable tag:** 1.3.3

**License:** GPLv3 or later

**License URI:** http://www.gnu.org/licenses/gpl-3.0.html


The plugin allows to create content spoilers with simple shortcode.

## Description ##

`Example: [spoiler title="Expand Me"]Spoiler content[/spoiler]`

## Installation ##

1. Upload folder `inline-spoiler` to the `/wp-content/plugins/` directory;
1. Activate the plugin through the 'Plugins' menu in WordPress;
1. Place shortcode (*Example:* `[spoiler title="Expand Me"]Spoiler content[/spoiler]`) in your content;

## Frequently Asked Questions ##

### How do I can customize design of the spoiler? ###
To change layout of a spoiler, please, edit `styles/inline-spoilers-styles.css` file.

### How to remove text from the title? ###
To remove default title you can use
```
[spoiler title="&nbsp;"]
...
[/spoiler]
```

## Screenshots ##

### 1. Spoiler shortcode `[spoiler][/spoiler]`
![Spoiler shortcode](https://cloud.githubusercontent.com/assets/2089534/6707541/fbe4f21e-cd78-11e4-9ecd-1beba5d054f0.png)

### 2. Collapsed spoiler
![Collapsed spoiler](https://cloud.githubusercontent.com/assets/2089534/6707542/fbe314f8-cd78-11e4-8995-7c39bfbac151.png)

### 3. Expanded spoiler
![Expanded spoiler](https://cloud.githubusercontent.com/assets/2089534/6707540/fbe32ff6-cd78-11e4-8140-cb828ea7ff97.png)


## Changelog ##

### 1.3.3 ###
* Fix https://wordpress.org/support/topic/notice-undefined-variable-extra-in-wp-content-plugins-inline-spoilers-inlin/
