( function( blocks, editor, i18n, element, components, _ ) {
  var el = element.createElement;
  var RichText = editor.RichText;

  blocks.registerBlockType( 'inline-spoilers/blocks', {
    title: i18n.__( 'Inline Spoiler', 'inline-spoilers' ),
    icon: 'hidden',
    category: 'formatting',
    attributes: {
      title: {
        type: 'array',
        source: 'children',
        selector: 'h2',
      },
      content: {
        type: 'array',
        source: 'children',
        selector: '.spoiler-content',
      },
    },
    edit: function( props ) {
      var attributes = props.attributes;
      var content = props.attributes.content;
      function onTitleChange(event) {
        props.setAttributes({title: event.target.value})
      }


      return (
        el( 'div', { className: props.className },
         el("div", { class: "spoiler-title" }, 
          el("label", null, "Title"), 
          el("input", {
            type: "text",
            placeholder: i18n.__( 'Expand me...', 'inline-spoilers' ),
            value: attributes.title,
            class: "spoiler-title",
            onChange: onTitleChange
          })
        ),
          el( RichText, {
            tagName: 'div',
            inline: false,
            placeholder: i18n.__( 'Write spoiler content…', 'inline-spoilers' ),
            value: attributes.content,
            onChange: function( value ) {
              props.setAttributes( { content: value } );
            },
          } )
        )
      );
    },
    save: function( props ) {
      var attributes = props.attributes;

      return (
        el( 'div', { className: props.className },
          el( RichText.Content, {
            tagName: 'h2', value: attributes.title
          } ),
          el( RichText.Content, {
            tagName: 'div', className: 'spoiler-content', value: attributes.content
          } ),
        )
      );
    },
  } );

} )(
  window.wp.blocks,
  window.wp.editor,
  window.wp.i18n,
  window.wp.element,
  window.wp.components,
  window._,
);


// ( function( blocks, editor, i18n, element) {
//   var el = wp.element.createElement;
//   var RichText = editor.RichText;
//   var __ = wp.i18n.__;

//   blocks.registerBlockType( 'inline-spoilers/block', {
//     title: __( 'Inline Spoilers', 'inline-spoilers' ),
//     icon: 'hidden',
//     category: 'formatting',
//     attributes: {
//       // title: {
//       //   type: 'string',
//       // },  
//       content: {
//         type: 'array',
//         source: 'children',
//         selector: 'p',
//       },
//     },

//     edit: function( props ) {
//       // var attributes = props.attributes;
//       var content = props.attributes.content;
//       // function onTitleChange(event) {
//       //   props.setAttributes({title: event.target.value})
//       // }

//       function onChangeContent( newContent ) {
//         props.setAttributes( { content: newContent } );
//       }

//       // return //el( 'div', { className: props.className },
//         // el("div", { class: "spoiler-title" }, 
//         //   el("label", null, "Title"), 
//         //   el("input", {
//         //     type: "text",
//         //     placeholder: __( 'Spoiler', 'inline-spoilers' ),
//         //     value: attributes.title,
//         //     class: "spoiler-title",
//         //     onChange: onTitleChange
//         //   })
//         // ),
//       return  el(
//           RichText,
//           {
//             tagName: 'p',
//             className: props.className,
//             onChange: onChangeContent,
//             value: attributes.content
//           },
//           placeholder: __( 'Enter a GitHub Gist URL' ),
//         );
//       //);
//     },

//     save: function(props) {
//       return 'Code';
//       // const title = props.attributes.title || '&nbsp;';
//       // return "[spoiler title=\"" + title + "\"]" + props.attributes.content + "[/spoiler]";
//     },


//   } );

// } )(
//   window.wp.blocks,
//   window.wp.editor,
//   window.wp.i18n,
//   window.wp.element,
// );
