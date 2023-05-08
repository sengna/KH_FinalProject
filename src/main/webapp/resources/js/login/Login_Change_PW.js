$(document).ready(function () {

	// 휴대폰 인증 버튼을 클릭했을 때
	$("#change_pw_p_btn").click(function () {
		// 버튼 스타일 및 폼의 display 변경
		$(this).addClass("change_pw_active");
		$("#change_pw_e_btn").removeClass("change_pw_active");
		$("#id_search_form_p").css("display", "block");
		$("#id_search_form_e").css("display", "none");
	});

	// 이메일 인증 버튼을 클릭했을 때
	$("#change_pw_e_btn").click(function () {
		// 버튼 스타일 및 폼의 display 변경
		$(this).addClass("change_pw_active");
		$("#change_pw_p_btn").removeClass("change_pw_active");
		$("#id_search_form_e").css("display", "block");
		$("#id_search_form_p").css("display", "none");
	});
	
//	-------------------------------------------------------------------------	
	
	// 아이디 조회 - 휴대폰
	    $(".id_search_button_p").click(function (event) {
		
		// 페이지 새로고침 방지
        event.preventDefault();

		// 사용자 입력값 받기 및 입력값 확인
        var id = $(".id_search_input_p").val();
	
		// 입력값 없는 경우를 위한 알람
        if (id.trim() == '') {
            alert("입력값을 모두 입력해주세요.");
            
            return;
        } // if

		// DB에 회원 정보가 존재하는지 확인하는 ajax 요청!
        $.ajax({
            url: "/login/changepw/idSearch",
            type: "POST",
            data: {
                id: id
            },
            dataType: 'json',
            success: function (cntIdInq) {
                cntIdInq = parseInt(cntIdInq);

                if (cntIdInq === 1) {
                    alert("아이디 정보를 확인했습니다. \n\n임시 비밀번호 발송 버튼을 클릭하시면 \n가입 시 기입하신 핸드폰 번호로 임시 비밀번호가 전송됩니다. \n\n비밀번호 변경을 원하신다면 임시 비밀번호로 로그인 후, \n마이페이지에서 비밀번호 변경이 가능합니다.")
                    $(".id_search_button_p").hide();
                    $(".send_tempPw_button_p").show();
                } else {
                    alert("회원정보를 찾지 못했습니다. 다시 확인해주세요.");
                }
            },
            error: function (request, status, error) {
                console.log("code = " + request.status + " message = " + request.responseText + " error = " + error);
            }
        }); // ajax
    }); // // 아이디 찾기 버튼 클릭 - 휴대폰
	
	// 인증 번호 발송 버튼 클릭 이벤트 - 휴대폰
	var val_num = ""; // 인증번호를 저장할 변수
    $(document).on('click', '.send_tempPw_button_p', function () {
        alert("임시 비밀번호가 발송되었습니다. \n임시 비밀번호로 로그인 후, 마이페이지에서 비밀번호 변경이 가능합니다.");
		
		var phone = $("#tel").val();
		
		// 인증 번호 발송을 위한 ajax 요청
        $.ajax({
		    type: 'GET',
		    url: '/login/changepw/sendTelTempPw?phone=' + phone,
		    data: {
		        id: $(".id_search_input_p").val() // id 값을 전송하도록 수정
		    },
		    cache: false,
		    success:function(data){
		        if(data == 'error'){
		            alert("휴대폰 번호가 올바르지 않습니다.")
		        } else {
		            val_num = tempPw;
		            console.log("임시 비밀번호: " + val_num); // 임시 비밀번호 출력
		        } // if-else
		    } // success:fn()
		}); // ajax
    }); // 인증 번호 발송 버튼 클릭 fn()

//	-------------------------------------------------------------------------	
	
	// 아이디 조회 - 이메일
	$(".id_search_button_e").click(function (event) {
	
	    // 페이지 새로고침 방지
	    event.preventDefault();
	
	    // 사용자 입력값 받기 및 입력값 확인
	    var id = $(".id_search_input_e").val();
	
	    // 입력값 없는 경우를 위한 알람
	    if (id.trim() == '') {
	        alert("입력값을 모두 입력해주세요.");
	
	        return;
	    } // if
	
	    // DB에 회원 정보가 존재하는지 확인하는 ajax 요청!
	    $.ajax({
	        url: "/login/changepw/idSearch",
	        type: "POST",
	        data: {
	            id: $(".id_search_input_e").val() // id 값을 전송하도록 수정
	        },
	        dataType: 'json',
	        success: function (cntIdInq) {
	            cntIdInq = parseInt(cntIdInq);
	
	            if (cntIdInq === 1) {
	                alert("아이디 정보를 확인했습니다. \n\n임시 비밀번호 발송 버튼을 클릭하시면 \n가입 시 기입하신 이메일 주소로 임시 비밀번호가 전송됩니다. \n\n비밀번호 변경을 원하신다면 임시 비밀번호로 로그인 후, \n마이페이지에서 비밀번호 변경이 가능합니다.")
	                $(".id_search_button_e").hide();
	                // 임시 비밀번호 발송 버튼
	                $(".send_tempPw_button_e").show();
	            } else {
	                alert("회원정보를 찾지 못했습니다. 다시 확인해주세요.");
	            }
	        },
	        error: function (request, status, error) {
	            console.log("code = " + request.status + " message = " + request.responseText + " error = " + error);
	        }
	    }); // ajax
	}); // 아이디 조회 버튼 클릭 - 이메일

	// 임시 비밀번호 발송 버튼 클릭 이벤트 - 이메일
	var val_num = ""; // 임시 비밀번호 저장할 변수
    $(document).on('click', '.send_tempPw_button_e', function () {
        alert("임시 비밀번호가 발송되었습니다. \n임시 비밀번호로 로그인 후, 마이페이지에서 비밀번호 변경이 가능합니다.");
		
		// 임시 비밀번호 발송을 위한 ajax 요청
        $.ajax({
            type: 'GET',
            url:'/login/changepw/sendEmailTempPw',
            data: {
            	id: $(".id_search_input_e").val() // id 값을 전송하도록 수정
      		},
            cache: false,
            success:function(data){
                if(data == 'error'){
                    alert("이메일 주소가 올바르지 않습니다.")
                } else {
                    val_num = tempPw;
                    console.log("임시 비밀번호: " + val_num); // 임시 비밀번호 출력
                } // if-else
            } // success:fn()
        }); // ajax
    }); // 임시 비밀번호 발송 버튼 클릭 fn()
	
}); // $(document).ready(function () {})
