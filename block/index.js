( function( wp, blocks, editor, i18n, element ) {
  /**
   * Registers a new block provided a unique name and an object defining its behavior.
   * @see https://github.com/WordPress/gutenberg/tree/master/blocks#api
   */
  var registerBlockType = wp.blocks.registerBlockType;
  /**
   * Returns a new element of given type. Element is an abstraction layer atop React.
   * @see https://github.com/WordPress/gutenberg/tree/master/element#element
   */
  var el = wp.element.createElement;

  var RichText = editor.RichText;
  /**
   * Retrieves the translation of text.
   * @see https://github.com/WordPress/gutenberg/tree/master/i18n#api
   */
  var __ = wp.i18n.__;

  /**
   * Every block starts by registering a new block type definition.
   * @see https://wordpress.org/gutenberg/handbook/block-api/
   */

  registerBlockType('inline-spoilers/block', {
    /**
     * This is the display title for your block, which can be translated with `i18n` functions.
     * The block inserter will show this name.
     */
    title: __( 'Inline Spoilers', 'inline-spoilers' ),
    /**
     * An icon property should be specified to make it easier to identify a block.
     * These can be any of WordPress’ Dashicons, or a custom svg element.
     */
    icon: 'hidden',
    /**
     * Blocks are grouped into categories to help users browse and discover them.
     * The categories provided by core are `common`, `embed`, `formatting`, `layout` and `widgets`.
     */
    category: 'formatting',
    /**
     * Optional block extended support features.
     */
    supports: {
      // Removes support for an HTML mode.
      html: true,
    },

    attributes: {
      title: {type: 'string', default: __( 'Spoiler', 'inline-spoilers' ),},
      content: {type: 'string', default: ''}
    },

    /**
     * The edit function describes the structure of your block in the context of the editor.
     * This represents what the editor will render when the block is used.
     * @see https://wordpress.org/gutenberg/handbook/block-edit-save/#edit
     *
     * @param {Object} [props] Properties passed from the editor.
     * @return {Element}       Element to render.
     */
    
    edit: function(props) {
      function updateTitle(event) {
        props.setAttributes({title: event.target.value})
      }

      function updateContent(value) {
        props.setAttributes({content: event.target.value})
      }

      return el("div", null, el("label", null, "Title: ", el("input", {
        type: "text",
        label: "Title",
        placeholder: "Expand Me",
        value: props.attributes.title,
        onChange: updateTitle
      })), el("br", null), el("label", null, "Content: ", el("input", {
        type: "text",
        label: "Content",
        placeholder: "Hidden content...",
        value: props.attributes.content,
        onChange: updateContent
      })), 
      );
    },

    /**
     * The save function defines the way in which the different attributes should be combined
     * into the final markup, which is then serialized by Gutenberg into `post_content`.
     * @see https://wordpress.org/gutenberg/handbook/block-edit-save/#save
     *
     * @return {Element}       Element to render.
     */

    save: function(props) {
      const title = props.attributes.title || '&nbsp;';
      return "[spoiler title=\"" + title + "\"]" + props.attributes.content + "[/spoiler]";
    }
  })
} )(
  window.wp,
  window.wp.blocks,
  window.wp.editor,
  window.wp.i18n,
  window.wp.element
);
