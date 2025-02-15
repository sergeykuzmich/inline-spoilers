/* eslint-disable */
jQuery( function () {
	jQuery( '.spoiler-head' ).removeClass( 'no-icon' ),
		jQuery( '.spoiler-head' ).on( 'click', function ( e ) {
			( $isExpanded = ( $this = jQuery( this ) ).hasClass( 'expanded' ) ),
				$this.toggleClass( 'expanded' ).toggleClass( 'collapsed' ),
				$this.prop( 'title', $isExpanded ? 'Collapse' : 'Expand' ),
				$isExpanded
					? $this.next().slideUp( 'fast' )
					: $this.next().slideDown( 'fast' );
		} );
} );
