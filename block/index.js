/**
 * @package Inline Spoilers
 */

( function( blocks, editor, i18n, element, components, _ ) {
  var __ = i18n.__;
  var el = element.createElement;

  const { RichText, BlockControls, AlignmentToolbar } = wp.editor;

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
      },
      alignment: {
        type: 'string'
      },
    },

    edit: function( props ) {
      var { title, content, state, alignment } = props.attributes;

      if(!visibleTitle) {
        visibleTitle = title;
      }

      return (
        el( 'div', { className: props.className },
          el( BlockControls, {
            key: 'controls',
            controls: [
              {
                icon: 'visibility',
                title: __( 'Show/hide spoiler content', 'inline-spoilers' ),
                onClick: function( updateState ) {
                  props.setAttributes( { state: !state } );
                },
                isActive: state
              }
            ]
          },
          el( AlignmentToolbar, {
                value: alignment,
                onChange: function( updatedAlignment ) {
                  props.setAttributes( { alignment: updatedAlignment } )
                }
              }
            ),
          ),
          el( 'div', {
            class: 'spoiler-title',
            contenteditable: 'true',
            onInput: function( event ) {
              props.setAttributes( { title: event.target.innerHTML } )
            }
          }, visibleTitle ),
          el( 'div', { class: 'spoiler-content' },
            el( RichText, {
              placeholder: __( 'Spoiler content', 'inline-spoilers' ),
              value: content,
              style: { textAlign: alignment },
              onChange: function( value ) {
                props.setAttributes( { content: value } );
              }
            })
          ),
        )
      );
    },

    save: function( props ) {
      var { title, content, state, alignment } = props.attributes;

      return (
        el( 'div', null,
          el( 'div', { class: 'spoiler-wrap' },
            el( 'div', { class: ((state) ? 'spoiler-head expanded' : 'spoiler-head collapsed'), title: 'Expand' },
              title
            ),
            el( RichText.Content, { tagName: 'div', className: 'spoiler-body', style: { display: ((state) ? 'block' : 'none'), textAlign: alignment }, value: content } ),
            el( 'noscript', null,
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
