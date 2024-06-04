jQuery(function () {
    jQuery(".spoiler-head").removeClass("no-icon"), jQuery(".spoiler-head").on("click", function (e) {
        $isExpanded = ($this = jQuery(this)).hasClass("expanded"), $this.toggleClass("expanded").toggleClass("collapsed"), $this.prop("title", $isExpanded ? title.collapse : title.expand), $isExpanded ? $this.next().slideUp("fast") : $this.next().slideDown("fast")
    })
});


const el = document.querySelectorAll('details.spoiler')[0];
const sm = document.querySelectorAll('details.spoiler summary')[0];

sm.addEventListener('click', (event) => {
    event.preventDefault();
    if (el.open) {
        console.log('slideUp');

        let endHeight = `${sm.offsetHeight}px`;
        let startHeight = `${el.offsetHeight}px`;

        el.style.overflow = 'hidden';

        const ani = el.animate({
            height: [startHeight, endHeight]
        }, {
            duration: 200,
            // easing: 'ease-out'
        });

        ani.onfinish = (event) => {
            el.style.overflow = '';
            el.open = !el.open;
        };

    } else {
        console.log('slideDown');

        el.style.overflow = 'hidden';
        el.style.height = `${sm.offsetHeight}px`;
        el.open = !el.open;

        console.log(el);
        console.log(typeof el);
        const item = document.querySelectorAll('details')[0];
        console.log(item);
        console.log(item.scrollHeight);

        const border = parseInt(getComputedStyle(sm).getPropertyValue('border-bottom-width').slice(0, -2));
        console.log(border);

        console.log(sm.offsetHeight + border);

        let startHeight = `${sm.offsetHeight + border}px`;
        let endHeight = `${item.scrollHeight}px`;

        console.log(startHeight, endHeight);

        const ani = el.animate({
            height: [startHeight, endHeight]
        }, {
            duration: 200,
            // easing: 'ease-out'
        });

        ani.onfinish = (event) => {
            el.style.height = el.style.overflow = '';
        };
    }
});
