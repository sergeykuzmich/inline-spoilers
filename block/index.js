( function( blocks, editor, i18n, element) {
  var el = wp.element.createElement;
  var RichText = editor.RichText;
  var __ = wp.i18n.__;

  blocks.registerBlockType( 'inline-spoilers/block', {
    title: __( 'Inline Spoilers', 'inline-spoilers' ),
    icon: 'hidden',
    category: 'formatting',
    attributes: {
      title: {
        type: 'string',
      },  
      content: {
        type: 'string',
      },
    },

    edit: function( props ) {
      var attributes = props.attributes;
      function updateTitle(event) {
        props.setAttributes({title: event.target.value})
      }

      return (
        el( 'div', { className: props.className },
         el("div", {
            class: "spoiler-title"
          }, el("label", null, "Title"), el("input", {
            type: "text",
            placeholder: __( 'Expand me…', 'inline-spoilers' ),
            value: attributes.title,
            class: "spoiler-title",
            onChange: updateTitle
          })),
          el( RichText, {
            tagName: 'div',
            inline: false,
            placeholder: __( 'Write content…', 'inline-spoilers' ),
            value: attributes.content,
            onChange: function( value ) {
              props.setAttributes( { content: value } );
            },
          } )
        )
      );
    },

    save: function(props) {
      const title = props.attributes.title || '&nbsp;';
      return "[spoiler title=\"" + title + "\"]" + props.attributes.content + "[/spoiler]";
    },


  } );

} )(
  window.wp.blocks,
  window.wp.editor,
  window.wp.i18n,
  window.wp.element,
);
