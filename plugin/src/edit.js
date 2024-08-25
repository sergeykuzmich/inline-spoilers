import { __ } from '@wordpress/i18n';
import {
	InnerBlocks,
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';

import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { title, open } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'inline-spoilers' ) }>
					<ToggleControl
						checked={ !! open }
						label={ __( 'Expanded', 'inline-spoilers' ) }
						onChange={ () =>
							setAttributes( {
								open: ! open,
							} )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<details { ...useBlockProps() } open>
				<RichText
					tagName="summary"
					disableLineBreaks={ true }
					withoutInteractiveFormatting={ true }
					onChange={ ( value ) => setAttributes( { value } ) }
					value={ title }
				/>
				<InnerBlocks />
			</details>
		</>
	);
}
