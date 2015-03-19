# Inline Spoilers #
**Contributors:** Sergey Kuzmich
  
**Tags:** shortcode, spoiler
  
**Requires at least:** 3.9.1
  
**Tested up to:** 4.1.1
  
**Stable tag:** 1.2.5
  
**License:** GPLv2 or later
  
**License URI:** http://www.gnu.org/licenses/gpl-2.0.html
  

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

###1. To add a spoilered content to your post/page just put that content between `[spoiler][/spoiler]` shortcode
###
![To add a spoilered content to your post/page just put that content between `[spoiler][/spoiler]` shortcode
](https://cloud.githubusercontent.com/assets/2089534/6707541/fbe4f21e-cd78-11e4-9ecd-1beba5d054f0.png)

###2. Collapsed spoiler in your post/page
###
![Collapsed spoiler in your post/page
](https://cloud.githubusercontent.com/assets/2089534/6707542/fbe314f8-cd78-11e4-8995-7c39bfbac151.png)

###3. Expanded spoiler
###
![Expanded spoiler
](https://cloud.githubusercontent.com/assets/2089534/6707540/fbe32ff6-cd78-11e4-8140-cb828ea7ff97.png)


## Changelog ##

### 1.2.4 ###
* Update spoiled content formatting method

### 1.2.4 ###
* Add WP_DEBUG mode
* Fix incorrect paragraph tags inside the spoiler

### 1.2.3 ###
* JavaScript bug fix

### 1.2.2 ###
* Update spoiler default behaviour

### 1.1.2 ###
* Update Russian translation
* Add attribute 'initial_state' to define default state of a spoiler `initial_state=(expanded|collapsed)`. Default state is 'collapsed'
* Security updates

### 1.0.2 ###
* Update Russian translation

### 1.0.1 ###
* Plugin Release