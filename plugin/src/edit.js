import {__} from '@wordpress/i18n';
import {
	InnerBlocks,
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import {useEffect, useRef} from '@wordpress/element';
import {PanelBody, ToggleControl} from '@wordpress/components';

import './editor.scss';

export default function Edit({attributes, setAttributes}) {
	const {title, open} = attributes;
	const innerBlocksRef = useRef();

	useEffect(() => {
		setTimeout(() => {
			if (innerBlocksRef.current) {
				innerBlocksRef.current.querySelector('p')?.click();
			}
		}, 50);
	}, []);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Settings', 'inline-spoilers')}>
					<ToggleControl
						checked={!!open}
						label={__('Expanded', 'inline-spoilers')}
						onChange={() =>
							setAttributes({
								open: !open,
							})
						}
						__nextHasNoMarginBottom={true}
					/>
				</PanelBody>
			</InspectorControls>
			<div
				className={'wp-block-inline-spoilers-block'}
				{...useBlockProps()}
			>
				<RichText
					tagName="div"
					className={'spoiler-title'}
					disableLineBreaks={true}
					withoutInteractiveFormatting={true}
					onChange={(value) =>
						setAttributes({title: value})
					}
					value={title}
				/>
				<div className={'spoiler-content'}>
					<InnerBlocks ref={innerBlocksRef}/>
				</div>
			</div>
		</>
	);
}
