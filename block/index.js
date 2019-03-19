/**
 * @package Inline Spoilers
 */

( function( blocks, editor, i18n, element, components, _ ) {
  var __ = i18n.__;
  var el = element.createElement;
  var RichText = editor.RichText;

  var visibleTitle = false;

  blocks.registerBlockType( 'inline-spoilers/block', {
    title: __( 'Inline Spoiler', 'inline-spoilers' ),
    icon: 'hidden',
    category: 'formatting',
    attributes: {
      title: {
        type: 'array',
        selector: '.spoiler-head',
        source: 'children'
      },
      content: {
        type: 'array',
        selector: '.spoiler-body',
        source: 'children'
      },
      state: {
        type: 'boolean',
        default: false
      }
    },

    edit: function( props ) {
      var { title, content, state } = props.attributes;

      if(!visibleTitle) {
        visibleTitle = title;
      }

      return (
        el( 'div', { className: props.className },
          el("div", {
            class: "spoiler-title",
            contenteditable: "true",
            onInput: function(event) {
              props.setAttributes({title: event.target.innerHTML})
            }
          }, visibleTitle ),
          el("div", { class: "spoiler-content" },
            el( RichText, {
              placeholder: __( 'Spoiler content', 'inline-spoilers' ),
              value: content,
              onChange: function(value) {
                props.setAttributes({content: value});
              }
            })
          ),
          el( wp.components.ToggleControl, {
            checked: state,
            onChange: function(checked) {
              props.setAttributes({state: !state});
            }
          }),
        )
      );
    },

    save: function( props ) {
      var title = props.attributes.title;
      var content = props.attributes.content;
      var state = props.attributes.state;

      return (
        el("div", null,
          el("div", { class: "spoiler-wrap" },
            el("div", { class: "spoiler-head collapsed", title: "Expand" },
              title
            ),
            el( RichText.Content, { tagName: 'div', className: 'spoiler-body', style: {display: ((state) ? 'block' : 'none')}, value: content } ),
            el("noscript", null,
              el( RichText.Content, { tagName: 'div', className: 'spoiler-body', value: content } )
            )
          )
        )
      );
    },
  });
})(
  window.wp.blocks,
  window.wp.editor,
  window.wp.i18n,
  window.wp.element,
  window.wp.components,
  window._,
);
