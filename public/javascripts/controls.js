jQuery(document).ready(function($) {
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regexURL = new RegExp(expression);
	function valid(link, geo) {
		var err = [];
		if(!regexURL.test(link)){
			err.push($("#url"))
		}
		if((/a-zA-Z/.test(geo))||geo.length!==2){
			err.push($("#geo"))
		}
		return err;
	}
	function postRm(path, data) {
		$.post(path, data, function(res, textStatus, xhr) {
			if(res==="success"){
				if(data.id){
					$(`#${data.id}`).remove();
				}else{
					$("tbody").empty()
				}
			}else{
				$("#res-sender").text("Error!");
				$('#myModal').modal()
			}
		});
	}
	function initRemoveRow() {
		$(".trash").click(function(event) {
			let tags = $(event.currentTarget).parent().parent();
			tags.remove();
			postRm("/remove/deleteOne", {"id":tags.attr("id")})
		});
	}
	function initApp() {
		$("#addEle").click((event)=>{
			$("#geo").removeClass("bg-danger")
			$("#url").removeClass("bg-danger")
			if(valid($("#url").val() ,$("#geo").val()).length>0){
				$.each(valid($("#url").val() ,$("#geo").val()), function(index, val) {
					val.addClass('bg-danger')
				});
				$("#geo").val("");
				$("#url").val("");
			}else{
				let data = {
					link : $("#url").val().match(regexURL)[0],
					geo  : $("#geo").val().toUpperCase(),
				}
				$.post('/save', data, function(res, textStatus, xhr) {
					$("#geo").val("");
					$("#url").val("");
					if(res==="success"){
						var html = `<tr>
								      	<td>${(data.link.match(regexURL)[0].trim())?data.link.match(regexURL)[0]:data.link.trim()}</td>
								      	<td class="fix-width-min">${data.geo.toUpperCase()}</td>
								      	<td class="fix-width-min trash"><button class="btn btn-danger" disabled><i class="fa fa-trash"></i></button></td>
								    </tr>`;
						$("tbody").append(html)
					}else{
						$("#res-sender").text("Error!");
						$('#myModal').modal()
					}
				});
			}
		});
	}
	$("#url").keyup(function(event) {
		if(event.keyCode===13||event.key==="Enter"){
			$("#addEle").click();
		}
	});
	$("#geo").keyup(function(event) {
		if(event.keyCode===13||event.key==="Enter"){
			$("#addEle").click();
		}
	});
	$("#dropAll").click(function(event) {
		let conf = confirm("You definitely want to remove all smart links?");
		if(conf){
			var data = {}
			postRm("/remove/drop", data)
		};
	});
	initApp();
	initRemoveRow()
	$(".loaderBox").css("height" , "10em")
	setTimeout(function() {
		$(".loaderBox").css("width" , "10em")
		setTimeout(function() {
			$(".fix-wait-show").hide("slow");
		}, 1000);
	}, 500);
});