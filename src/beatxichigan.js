$(document).ready(function() {

	wordScanner( $('body'), 'Michigan', 'The State Up North' )

	letterScanner( $('body'), 'm|M' )

	corssAWord( $('body'), 'Wolverines')

	function letterScanner( $el, letter ){
	  $el.contents().each( function(){
	    if( this.nodeType == 3 ){
	      $( this ).replaceWith( this.textContent.replace( new RegExp( '('+letter+'+)', 'g' ), "<span style='color: red; text-decoration: line-through;'>$1</span>" ) );
	    }else{
	      letterScanner( $( this ), letter )
	    }
	  });
	}



	function wordScanner( $el, word, replacement ){
	  $el.contents().each( function(){
	    if( this.nodeType == 3 ){
	      $( this ).replaceWith( this.textContent.replace( new RegExp( '('+word+'+)', 'g' ), "<span style='color: red;'>"+replacement+"</span>" ) );
	    }else{
        wordScanner( $( this ), word, replacement )
	    }
	  });
	}

	function corssAWord( $el, word ){
	  $el.contents().each( function(){
	    if( this.nodeType == 3 ){
	      $( this ).replaceWith( this.textContent.replace( new RegExp( '('+word+'+)', 'g' ), "<span style='color: red; text-decoration: line-through;'>$1</span>" ) );
	    }else{
        corssAWord( $( this ), word )
	    }
	  });
	}
});