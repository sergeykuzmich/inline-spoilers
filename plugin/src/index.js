/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import {registerBlockType} from '@wordpress/blocks';
import {RichText,InnerBlocks} from '@wordpress/block-editor';


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import metadata from './block.json';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata.name, {
	deprecated: [
		{
			attributes: {
				title: {
					type: 'string',
					selector: '.spoiler-head',
					source: 'text'
				},
				content: {
					type: 'string',
					source: 'html',
					selector: '.spoiler-body',
				},
				initial_state: {
					type: 'string',
					default: 'collapsed'
				}
			},
			save: function (props) {
				const { title, content } = props.attributes;

				return (
					<div className="wp-block-inline-spoilers-block">
						<div className="spoiler-wrap">
							<div className="spoiler-head collapsed" title="Expand">
								{ title.length ? title : '\u00A0' }
							</div>
							<RichText.Content
								tagName="div"
								className="spoiler-body"
								style={ { display: 'none' } }
								value={ content }
							/>
							<noscript>
								<RichText.Content
									tagName="div"
									className="spoiler-body"
									value={ content }
								/>
							</noscript>
						</div>
					</div>
				);
			},
		},
	],

	/**
	 * @see ./edit.js
	 */
	edit: Edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
});


function renderContentArray( contentArray ) {
	return contentArray.map( item => {
		if ( typeof item === 'string' ) {
			return item;
		} else if ( typeof item === 'object' && item.type ) {
			const type = item.type;
			const props = item.props || {};
			const children = renderContentArray( props.children || [] );

			const attributes = Object.keys( props )
				.filter( key => key !== 'children' )
				.map( key => {
					const value = props[ key ];
					return `${ key }="${ value }"`;
				} )
				.join( ' ' );

			// Self-closing tags
			const selfClosingTags = [ 'img', 'br', 'hr', 'input', 'meta', 'link' ];
			if ( selfClosingTags.includes( type ) ) {
				return `<${ type } ${ attributes } />`;
			} else {
				return `<${ type } ${ attributes }>${ children }</${ type }>`;
			}
		}
		return '';
	} ).join( '' );
}
