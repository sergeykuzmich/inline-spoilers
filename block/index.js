( function( blocks, editor, i18n, element, components, _ ) {
  var __ = i18n.__;
  var el = element.createElement;
  var RichText = editor.RichText;

  blocks.registerBlockType( 'inline-spoilers/blocks', {
    title: __( 'Inline Spoiler', 'inline-spoilers' ),
    icon: 'hidden',
    category: 'formatting',
    attributes: {
      title: {
        type: 'string'
      },
      content: {
        type: 'string',
        source: 'html'
      },
    },

    edit: function( props ) {
      var { title, content } = props.attributes;

      function onChangeTitle(event) {
        props.setAttributes({title: event.target.value})
      }

      function onChangeContent(value) {
        props.setAttributes({content: value});
      }

      return (
        el( 'div', { className: props.className },
         el("div", { class: "spoiler-title" },
          el("label", null, "Title"),
          el("input", {
            type: "text",
            placeholder: __( 'Spoiler', 'inline-spoilers' ),
            value: title,
            class: "spoiler-title",
            onChange: onChangeTitle
          })
        ),
          el( RichText, {
            placeholder: __( 'Spoiler content…', 'inline-spoilers' ),
            value: content,
            onChange: onChangeContent
          } )
        )
      );
    },

    save: function( props ) {
      var title = props.attributes.title;
      var content = props.attributes.content;

      //<div class="spoiler-wrap">
      //  <div class="spoiler-head collapsed" title="Expand">asdf</div>
      //  <div class="spoiler-body" style="display: none;">
      //    mem<strong>eme</strong>me
      //  </div>
      //  <noscript><div class="spoiler-body">mem<strong>eme</strong>me</div></noscript>
      //</div>

      return (
        el("div", null,
          el("div", { class: "spoiler-wrap" },
            el("div", { class: "spoiler-head collapsed", title: "Expand" },
              title
            ),
            el("div", { class: "spoiler-body", style: "display: none;" },
              el( RichText.Content, { tagName: 'div', value: content })
            ),
            el("noscript", null,
              el("div", { class: "spoiler-body" },
                el( RichText.Content, { tagName: 'div', value: content })
              )
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
