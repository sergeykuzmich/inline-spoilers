# Code Review: Inline Spoilers v2.1.0

## Security Concerns

### 1. Unescaped legacy block output (render.php:29) — HIGH

```php
echo $content; // phpcs:ignore WordPress.Security.EscapeOutput
```

When a pre-2.0 block (detected by the `spoiler-wrap` class) is rendered, `$content` is echoed with no sanitization. The `phpcs:ignore` suppresses the linter, but this is a stored XSS vector if old block content contains malicious markup.

**Recommendation:** Apply `wp_kses($content, 'post')` to the legacy path as well, or at minimum document the risk more explicitly.

### 2. Wrong escaping function for shortcode title (inline-spoilers.php:62) — LOW

```php
$title = '<summary>' . esc_attr( $attributes['title'] ) . '</summary>';
```

`esc_attr()` is for HTML attributes, not element content. The correct function is `esc_html()`. Not exploitable in practice (same characters are escaped), but semantically incorrect.

---

## Bugs

### 3. `str_contains()` requires PHP 8.0 (render.php:12) — HIGH

```php
if ( ! str_contains( $content, 'spoiler-wrap' ) ) :
```

`str_contains()` was introduced in PHP 8.0. The plugin declares `Requires PHP: 7.2`. Any site on PHP 7.x will get a **fatal error**.

**Fix:** Either bump minimum to PHP 8.0, or replace with `strpos($content, 'spoiler-wrap') !== false`.

### 4. Text domain mismatch (inline-spoilers.php:21) — MEDIUM

Plugin header declares `Text Domain: inline-plugin`, but `block.json` and all `__()` calls use `inline-spoilers`. WordPress will fail to load translations.

### 5. Version mismatch in package.json — LOW

`plugin/package.json` says `"version": "2.0.0"` while the plugin is at `2.1.0` everywhere else.

---

## Code Quality

### 6. Unnecessary jQuery dependency (inline-spoilers.php:88) — MEDIUM

`view.js` is registered with `array('jquery')` as a dependency, but only the legacy v1.5.5 compat function uses jQuery. The modern animation code is pure vanilla JS. This forces ~30KB of jQuery on every page.

**Recommendation:** Separate legacy compat into its own script, or conditionally load jQuery only when legacy blocks are detected.

### 7. Unconditional asset loading on all pages (inline-spoilers.php:76-93) — MEDIUM

`inline_spoilers_shortcode_css_js()` enqueues CSS and JS on every frontend page via `wp_enqueue_scripts`, regardless of whether any spoiler content exists. The `block.json` declarations already handle asset loading for block-based spoilers.

**Recommendation:** Use `has_shortcode()` or a similar check to conditionally enqueue for shortcode-only pages.

### 8. Redundant className on block wrapper (edit.js:42-44) — LOW

`useBlockProps()` already generates `wp-block-inline-spoilers-block` from the block name. The manual `className` is redundant and could conflict with the spread props.

### 9. Global namespace pollution (view.js) — LOW

Functions like `window.inlineSpoilersAnimation` and `window.inlineSpoilersAnimationInitialized` are exposed globally, risking name collisions with other plugins.

---

## WordPress Compatibility (6.7 / 6.8 / 6.9)

### 10. Not tested against WordPress 6.8 or 6.9

`readme.txt` and plugin header both declare `Tested up to: 6.7.1`. WordPress 6.8 shipped April 2025 and 6.9 shipped December 2025.

### 11. WordPress 6.9 on-demand block styles

WordPress 6.9 loads block CSS on-demand (only for blocks present on the page), now for classic themes too. The manual `wp_enqueue_style()` in `inline_spoilers_shortcode_css_js()` bypasses this optimization and may cause double-loading when both blocks and shortcodes are used on the same page.

### 12. WordPress 6.8 batch block registration

WordPress 6.8 introduced `wp_register_block_types_from_metadata_collection()` for more efficient registration. The current `register_block_type()` approach still works, but is not taking advantage of the newer API.

### 13. jQuery 4.0 update planned for WordPress core

jQuery 4.0 removes some deprecated APIs. The legacy `.slideUp()`/`.slideDown()` methods still exist in jQuery 4.0, so no immediate breakage, but the hard jQuery dependency should be re-evaluated.

### 14. `widget_text` filter losing relevance (inline-spoilers.php:125)

The experimental dynamic shortcode feature hooks into `widget_text`, but classic widgets are being progressively deprecated in favor of block-based widgets. This won't break but will become less useful over time.

---

## Summary

| # | Severity | Issue |
|---|----------|-------|
| 1 | HIGH | Unescaped `echo $content` for legacy blocks (XSS risk) |
| 3 | HIGH | `str_contains()` fatal error on PHP < 8.0 |
| 4 | MEDIUM | Text domain mismatch breaks translations |
| 6 | MEDIUM | jQuery forced on all pages unnecessarily |
| 7 | MEDIUM | CSS/JS loaded on all pages unconditionally |
| 11 | MEDIUM | Potential conflict with WP 6.9 on-demand styles |
| 2 | LOW | `esc_attr()` used instead of `esc_html()` |
| 5 | LOW | `package.json` version out of sync |
| 8 | LOW | Redundant `className` in editor component |
| 10 | LOW | Not tested against WP 6.8/6.9 |
