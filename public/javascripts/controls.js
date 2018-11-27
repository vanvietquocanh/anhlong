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
	$(".d-none").hide();
	$("tr").click(function(event) {
		if($(this).next().attr("class").indexOf("d-none")!==-1){
			$(this).next().removeClass("d-none").addClass("active").fadeIn('slow')
		}else if($(this).next().attr("class").indexOf("active")!==-1){
			$(this).next().removeClass("active").addClass("d-none").hide('slow')
		}
	});
	if($("#content-script").length!==0){
		$("form").submit(function(event) {
			if($("#package").val()===""||$("#model").val()===""||$("#cpu").val()===""||$("#content-script").val()===""){
				event.preventDefault();
				alert("Vui lòng điền đầy đủ thông tin!")
			}
		})
	}
	if($(".btn.btn-danger").length!==0){
		$(".btn.btn-danger").click(function(event) {
			event.stopPropagation();
			let conf = confirm("Bạn chắc chắn muốn xóa?");
			if(conf){
				var id = $(this).parent().parent().attr("class")
				var path = "/drop?script=";
				if(window.location.pathname==="/dashboard/admin"){
					path+="0"
				}else{
					path+="1"
				}
				$.post(path, {id: id}, function(res, textStatus, xhr) {
					if(res==="success"){
						$(`.${id}`).remove()
					}else{
						alert('Lỗi! Vui lòng thử lại!');
					}
				});
			}
		});
		$("#drop-update").click(function(event) {
			$("form").attr("action","/share")
			$("#submit").removeClass('d-none')
			$("#update").addClass('d-none').hide();
			$("#drop-update").addClass('d-none').hide();
		});
		$(".edit-ele").click(function(event) {
			event.stopPropagation();
			$("form").attr("action","/update")
			$("#submit").addClass('d-none')
			$("#update").removeClass('d-none').fadeIn();
			$("#drop-update").removeClass('d-none').fadeIn();
			$("form").append(`<input value="${$(this).parent().parent().attr("class")}" class="_id d-none" name="_id" type="text">`)
			$("#package").val($(this).parent().parent().children(`.package`).text())
			$("#model").val($(this).parent().parent().children(`.model`).text())
			$("#cpu").val($(this).parent().parent().children(`.cpu`).text())
			$("#content-script").val($(this).parent().parent().next().children().html().split("<br>").join("\r\n").trim())
		});
	}
	if($(".btn.btn-success").length!==0){
		$("tr").unbind('click')
		$(".btn.btn-success").click(function(event) {
			var id = $(this).parent().parent().attr("class");
			$.post('/ad/active', {id:id}, function(res, textStatus, xhr) {
				if(res==="success"){
					$(`.${id}`).remove()
				}else{
					alert('Lỗi! Vui lòng thử lại!');
				}
			});
		});
	}
	if($(".btn.btn-warning").length!==0){
		$("tr").unbind('click')
		$(".btn.btn-warning").click(function(event) {
			var id = $(this).parent().parent().attr("class");
			$.post('/ad/inactive', {id:id}, function(res, textStatus, xhr) {
				if(res==="success"){
					$(`.${id}`).remove()
				}else{
					alert('Lỗi! Vui lòng thử lại!');
				}
			});
		});
	}
});
