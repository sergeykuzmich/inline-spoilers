/**
 * @package Inline Spoilers
 */

jQuery(function(){
	jQuery(".spoiler-body").hide();

	jQuery(".spoiler-head").on('click', function(event){
		$this = jQuery(this);
		if($this.hasClass("expanded")) {
			$this.removeClass("expanded");
			$this.next().slideUp("fast");
			$this.prop('title', title.expand);
		} else {
			$this.addClass("expanded");
			$this.next().slideDown("fast");
			$this.prop('title', title.collapse);
		}
	});
});