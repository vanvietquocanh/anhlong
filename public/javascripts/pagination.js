jQuery(document).ready(function($) {
	getPagination('#table-pagination');
	function getPagination (table){

        		var lastPage = 1 ;
        	// $('#maxRows').attr()
		  $('#maxRows').on('keyup change',function(evt){
		  	//$('.paginationprev').html('');						// reset pagination 


		lastPage = 1 ; 
         $('.pagination').find("li").slice(1, -1).remove();
		  	var trnum = 0 ;									// reset tr counter 
		  	var maxRows = parseInt($(this).val())*2;			// get Max Rows from select option

		  	if(maxRows == 5000 ){

		  		$('.pagination').hide();
		  	}else {
		  		
		  		$('.pagination').show();
		  	}

		  	var totalRows = $(table+' tbody tr').length;		// numbers of rows 
			 $(table+' tr:gt(0)').each(function(){			// each TR in  table and not the header
			 	trnum++;									// Start Counter 
			 	if (trnum > maxRows ){						// if tr number gt maxRows
			 		
				 		$(this).hide();							// fade it out 
				 	}if (trnum <= maxRows ){$(this).show();}// else fade in Important in case if it ..
				 });											//  was fade out to fade it in 
				 if (totalRows > maxRows){						// if tr total rows gt max rows option
				 	var pagenum = Math.ceil(totalRows/maxRows*2);	// ceil total(rows/maxrows) to get ..  
				 												//	numbers of pages 
				 	for (var i = 1; i <= pagenum ;){			// for each page append pagination li 
				 	$('.pagination #prev').before('<li data-page="'+i+'">\
									      <span>'+ i++ +'<span class="sr-only">(current)</span></span>\
									    </li>').show();
				 	}											// end for i 
				} 												// end if row count > max rows
				$('.pagination [data-page="1"]').addClass('active'); // add active class to the first li 
									// end of on click pagination list
				$('.pagination li').on('click',function(evt){		// on click each page
					evt.stopImmediatePropagation();
					evt.preventDefault();
					var pageNum = $(this).attr('data-page');	// get it's number

					var maxRows = parseInt($('#maxRows').val())*2;			// get Max Rows from select option
					if(pageNum == "prev" ){
						if(lastPage == 1 ){return;}
						pageNum  = --lastPage ; 
					}
					if(pageNum == "next" ){
						if(lastPage == ($('.pagination li').length -2) ){return;}
						pageNum  = ++lastPage ; 
					}

					lastPage = pageNum ;
					var trIndex = 0 ;							// reset tr counter
					$('.pagination li').removeClass('active');	// remove active class from all li 
					$('.pagination [data-page="'+lastPage+'"]').addClass('active');// add active class to the clicked 
					// $(this).addClass('active');					// add active class to the clicked 
					 $(table+' tr:gt(0)').each(function(){		// each tr in table not the header
					 	trIndex++;								// tr index counter 
					 	// if tr index gt maxRows*pageNum or lt maxRows*pageNum-maxRows fade if out
					 	if (trIndex > (maxRows*pageNum) || trIndex <= ((maxRows*pageNum)-maxRows)){
					 		$(this).hide();		
					 	}else {
					 		$(this).show();
					 	} 				//else fade in 
					 }); 										// end of for each tr in table
				});					
			}).val(5).change();

												// end of on select change 
		 
    
  
								// END OF PAGINATION 
	}	
});