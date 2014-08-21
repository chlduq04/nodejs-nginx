$(document).ready(function(){
	$("#login-btn").bind("click",function(e){
		
	})
})

$(".login-form").submit(function(e) {
     var id = $("#login-name").val();
     var pass = $("#login-pass").val();
     if( !(id.length >= 4 && id.length <= 15) ){
    	 alert("id는 4~15자 입니다");
         e.preventDefault();
         return false; //is superfluous, but I put it here as a fallback
     }else if( !(pass.length >= 8 && pass.length <= 20) ){
    	 alert("password는 8~20자 입니다");
         e.preventDefault();
         return false; //is superfluous, but I put it here as a fallback
     }else{
    	 $("#login-pass").val(CryptoJS.SHA512( pass + id ));
     }
});