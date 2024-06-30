document.body.addEventListener( 'click', ( event ) => {
	const spoiler = event.target.closest(
		'details.wp-shortcode-inline-spoilers-shortcode'
	);
	if ( ! spoiler ) {
		return;
	}

	const summary = spoiler.querySelector( 'summary' );

	event.preventDefault();
	if ( spoiler.open ) {
		const border = parseInt(
			window
				.getComputedStyle( summary )
				.getPropertyValue( 'border-bottom-width' )
				.slice( 0, -2 )
		);

		const to = `${ summary.offsetHeight + border }px`;
		const from = `${ spoiler.offsetHeight }px`;

		spoiler.style.overflow = 'hidden';

		const ani = spoiler.animate(
			{
				height: [ from, to ],
			},
			{
				duration: 200,
				easing: 'ease-in-out',
			}
		);

		ani.onfinish = () => {
			spoiler.style.overflow = '';
			spoiler.open = ! spoiler.open;
		};
	} else {
		spoiler.style.overflow = 'hidden';
		spoiler.style.height = `${ summary.offsetHeight }px`;
		spoiler.open = ! spoiler.open;

		const border = parseInt(
			window
				.getComputedStyle( summary )
				.getPropertyValue( 'border-bottom-width' )
				.slice( 0, -2 )
		);

		const from = `${ summary.offsetHeight + border }px`;
		const to = `${ spoiler.scrollHeight }px`;

		const ani = spoiler.animate(
			{
				height: [ from, to ],
			},
			{
				duration: 200,
				easing: 'ease-in-out',
			}
		);

		ani.onfinish = () => {
			spoiler.style.height = spoiler.style.overflow = '';
		};
	}
} );
