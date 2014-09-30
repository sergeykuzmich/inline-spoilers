/**
 * @package Inline Spoilers
 */

jQuery(function(){
	jQuery(".spoiler-head").on('click', function(event){
		$this = jQuery(this);
		if($this.hasClass("expanded")) {
			$this.switchClass("expanded", "collapsed");
			$this.prop('title', title.expand);
			$this.next().slideUp("fast");
		} else {
			$this.switchClass("collapsed", "expanded");
			$this.prop('title', title.collapse);
			$this.next().slideDown("fast");
		}
	});
});