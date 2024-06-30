document.body.addEventListener('click', (event) => {
	const spoiler = event.target.closest('details.spoiler');
	if (!spoiler) return;

	const summary = spoiler.querySelector('summary');

    event.preventDefault();
    if (spoiler.open) {
		const border = parseInt(getComputedStyle(summary).getPropertyValue('border-bottom-width').slice(0, -2));

		let to = `${summary.offsetHeight + border}px`;
        let from = `${spoiler.offsetHeight}px`;

        spoiler.style.overflow = 'hidden';

        const ani = spoiler.animate({
            height: [from, to]
        }, {
            duration: 200,
            easing: 'ease-in-out'
        });

        ani.onfinish = (event) => {
            spoiler.style.overflow = '';
            spoiler.open = !spoiler.open;
        };

    } else {
        spoiler.style.overflow = 'hidden';
		spoiler.style.height = `${summary.offsetHeight}px`;
		spoiler.open = !spoiler.open;

        const border = parseInt(getComputedStyle(summary).getPropertyValue('border-bottom-width').slice(0, -2));

		let from = `${summary.offsetHeight + border}px`;
        let to = `${spoiler.scrollHeight}px`;

        const ani = spoiler.animate({
            height: [from, to]
        }, {
            duration: 200,
            easing: 'ease-in-out'
        });

        ani.onfinish = (event) => {
            spoiler.style.height = spoiler.style.overflow = '';
        };
    }
});
