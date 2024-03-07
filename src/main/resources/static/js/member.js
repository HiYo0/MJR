// 1. 생년월일 함수
$(document).ready(function(){
    var now = new Date();
    var year = now.getFullYear();
    var mon = (now.getMonth() + 1) > 9 ? ''+(now.getMonth() + 1) : '0'+(now.getMonth() + 1);
    var day = (now.getDate()) > 9 ? ''+(now.getDate()) : '0'+(now.getDate());
    //년도 selectbox만들기
    for(var i = 1900 ; i <= year ; i++) {
        $('#year').append('<option value="' + i + '">' + i + '년</option>');
    }

    // 월별 selectbox 만들기
    for(var i=1; i <= 12; i++) {
        var mm = i > 9 ? i : "0"+i ;
        $('#month').append('<option value="' + mm + '">' + mm + '월</option>');
    }

    // 일별 selectbox 만들기
    for(var i=1; i <= 31; i++) {
        var dd = i > 9 ? i : "0"+i ;
        $('#day').append('<option value="' + dd + '">' + dd+ '일</option>');
    }
    $("#year  > option[value="+year+"]").attr("selected", "true");
    $("#month  > option[value="+mon+"]").attr("selected", "true");
    $("#day  > option[value="+day+"]").attr("selected", "true");
})

// 2. 주소 API
    // 우편번호 찾기 찾기 화면을 넣을 element
var element_wrap = document.getElementById('wrap');

function foldDaumPostcode() {
    // iframe을 넣은 element를 안보이게 한다.
    element_wrap.style.display = 'none';
}

function sample3_execDaumPostcode() {
    // 현재 scroll 위치를 저장해놓는다.
    var currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    new daum.Postcode({
        oncomplete: function(data) {
            // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if(data.userSelectedType === 'R'){
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                document.getElementById("sample3_extraAddress").value = extraAddr;

            } else {
                document.getElementById("sample3_extraAddress").value = '';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('sample3_postcode').value = data.zonecode;
            document.getElementById("sample3_address").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("sample3_detailAddress").focus();

            // iframe을 넣은 element를 안보이게 한다.
            // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
            element_wrap.style.display = 'none';

            // 우편번호 찾기 화면이 보이기 이전으로 scroll 위치를 되돌린다.
            document.body.scrollTop = currentScroll;
        },
        // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분. iframe을 넣은 element의 높이값을 조정한다.
        onresize : function(size) {
            element_wrap.style.height = size.height+'px';
        },
        width : '100%',
        height : '100%'
    }).embed(element_wrap);

    // iframe을 넣은 element를 보이게 한다.
    element_wrap.style.display = 'block';
}

// 현재 유효성검사 체크 현황
let checkArray = [false,false,false,false,false,false]; // 아이디,비밀번호,생년월일,전화번호,이메일,주소

// 3. 아이디 유효성검사
function idCheck(){
    // 1. 입력된 데이터 가져오기
    let mid = document.querySelector('#mid').value;

    // 2. 정규표현식 : 영소문자+숫자5~12
    let idj = /^[a-z0-9]{5,12}$/

    // 3. 정규표현식에 따른 검사
    if(idj.test(mid)){
        // 아이디 중복 체크(ajax)
        $.ajax({
            url:"/member/signup/idCheck",
            method:"get",
            data:{mid : mid},
            success:(r)=>{ // true : 중복있음 , false : 중복없음
                if(r){
                    document.querySelector('.idcheckbox').innerHTML = `중복 된 아이디입니다.`;
                    document.querySelector('.idcheckbox').style.color='red';
                    document.querySelector('#mid').style.borderBottomColor='red';
                    checkArray[0]=false;
                }else{
                    document.querySelector('.idcheckbox').innerHTML = `사용 가능한 아이디입니다.`;
                    document.querySelector('.idcheckbox').style.color='green';
                    document.querySelector('#mid').style.borderBottomColor='green';
                    checkArray[0]=true;
                }
            }
        })
    }else{
        document.querySelector('.idcheckbox').innerHTML = `영소문자+숫자 조합의 5~12글자로 입력해주세요.`;
        document.querySelector('.idcheckbox').style.color='red';
        document.querySelector('#mid').style.borderBottomColor='red';
        checkArray[0]=false;
    }
}

// 4. 비밀번호 유효성검사
function pwCheck(){
    let mpw = document.querySelector('#mpw').value;
    let mpwconfirm = document.querySelector('#mpwconfirm').value;

    // 정규표현식 : 영대소문자1개이상+숫자1개이상 8~16자리
    let pwj = /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{8,16}$/

    if(pwj.test(mpw)){
        if(mpw == mpwconfirm){
            document.querySelector('.pwconfirmcheckbox').innerHTML = `비밀번호가 일치합니다.`;
            document.querySelector('.pwconfirmcheckbox').style.color='green';
            document.querySelector('#mpwconfirm').style.borderBottomColor='green';
            checkArray[1]=true;
        }else{
            document.querySelector('.pwconfirmcheckbox').innerHTML = `비밀번호가 일치하지 않습니다.`;
            document.querySelector('.pwconfirmcheckbox').style.color='red';
            document.querySelector('#mpwconfirm').style.borderBottomColor='red';
            checkArray[1]=false;
        }
        document.querySelector('.pwcheckbox').innerHTML = `사용 가능한 비밀번호입니다.`;
        document.querySelector('.pwcheckbox').style.color='green';
        document.querySelector('#mpw').style.borderBottomColor='green';
    }else{
        document.querySelector('.pwcheckbox').innerHTML = `영대소문자1개이상+숫자1개이상 8~16자리 글자로 입력해주세요.`;
        document.querySelector('.pwcheckbox').style.color='red';
        document.querySelector('#mpw').style.borderBottomColor='red';
        checkArray[1]=false;
    }
}

// 5. 생년월일 유효성검사
function birthCheck(){
    let year = document.querySelector('#year').value;
    let age = new Date();
    let manage = age.getFullYear()-year;
    if(manage > 15){
        document.querySelector('.birthcheckbox').innerHTML = ``;
        checkArray[2]=true;
    }else{
        document.querySelector('.birthcheckbox').innerHTML = `만15세 이상부터 가입 가능합니다.`;
        document.querySelector('.birthcheckbox').style.color='red';
        checkArray[2]=false;
    }
}

// 6. 전화번호 유효성검사
function phoneCheck(){
    let mphone = document.querySelector('#mphone').value;

    let phonej = /^([0-9]{2,3})+[-]+([0-9]{3,4})+[-]+([0-9]{4})+$/

    if(phonej.test(mphone)){
        document.querySelector('.phonecheckbox').innerHTML = ``;
        document.querySelector('#mphone').style.borderBottomColor='green';
        checkArray[3]=true;
    }else{
        document.querySelector('.phonecheckbox').innerHTML = `\'-\'를 포함하여 번호를 입력해주세요.`;
        document.querySelector('.phonecheckbox').style.color='red';
        document.querySelector('#mphone').style.borderBottomColor='red';
        checkArray[3]=false;
    }
}

let timer = 0;
let authbox = document.querySelector('.authbox');
let send = document.querySelector('.send');

// 7. 이메일 유효성검사
function emailCheck(){
    let memail = document.querySelector('#memail').value;

    let emailj = /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+\.+[a-z.]+$/

    if(emailj.test(memail)){
        document.querySelector('.emailcheckbox').innerHTML = `올바른 형식입니다.`;
        document.querySelector('.emailcheckbox').style.color='green';
        document.querySelector('#memail').style.borderBottomColor='green';
        checkArray[4]=true;
        send.disabled = false;
        send.addEventListener('mouseover',function(){
            send.setAttribute('class','sendBtn');
        });
        send.addEventListener('mouseout',function(){
            send.setAttribute('class','send');
        });
    }else{
        document.querySelector('.emailcheckbox').innerHTML = `\'@\'와\'.\'을 포함한 이메일 형식으로 입력해주세요.`;
        document.querySelector('.emailcheckbox').style.color='red';
        document.querySelector('#memail').style.borderBottomColor='red';
        send.disabled = true;
        send.setAttribute('class','send');
        checkArray[4]=false;
    }
}

// 8. 주소 유효성검사
function addressCheck(){
    let maddress = document.querySelector('.maddress').value;

    if(maddress){
        checkArray[5]=true;
    }else{
        checkArray[5]=false;
        alert('주소를 입력해주세요.');
    }
}

//// 7. 이메일 인증요청
//function authreq(){
//    let html = `
//        <p>인증번호</p>
//        <input onkeyup="" type="text" id="certi" name="certi"/>
//        <button class="send" type="button" onclick="auth()">
//            인증
//        </button>
//        <span class="timebox">02분00초</span>
//    `;
//
//    authbox.innerHTML = html;
//
//    // 자바에 인증 요청
//    $.ajax({
//        url:"/auth/email/request",
//        method:"get",
//        data : {email : document.querySelector('#email').value},
//        success:(r)=>{
//            if(r){
//                // 4. 타이머 함수 실행
//                timer = 120;
//                ontimer();
//
//                // 해당 버튼 사용 금지
//                send.disabled = true;
//            }else{
//                alert('관리자에게 문의');
//            }
//        }
//    })
//}
//
//let interval;
//
//// 8. 타이머
//function ontimer(){
//    interval = setInterval(() => {
//        // 1. 초 변수를 분/초로 변환
//        let m = parseInt(timer/60); // 분
//        let s = parseInt(timer%60); // 분 제외한 초
//
//        // 2. 시간을 두 자릿수로 표현
//        m = m < 10 ? "0"+m : m;
//        s = s < 10 ? "0"+s : s;
//
//        // 3. 시간 출력
//        document.querySelector('.timebox').innerHTML = `${m}분${s}초`;
//
//        // 4. 초 감소
//        timer--;
//
//        // 5. 만약에 초가 0보다 작아지면 종료
//        if(timer < 0){
//            clearInterval(interval);
//            authbox.innerHTML = `다시 인증을 요청 해주세요.`;
//            send.disabled = false;
//        }
//    } , 1000);
//}
//
//// 9. 인증 함수
//function auth(){
//    // 1. 내가 입력한 인증번호
//    let certi = document.querySelector('#certi').value;
//    // == 내가 입력한 인증번호를 자바에게 보내기 == //
//    $.ajax({
//        url:"/auth/email/check",
//        method:"get",
//        data : {certi : certi},
//        success:(r)=>{
//            // 3. 성공시 / 실패시
//            if(r){
//                checkArray[4]=true;
//                document.querySelector('.emailcheckbox').innerHTML = `인증완료`;
//                document.querySelector('.emailcheckbox').style.color='gray';
//                clearInterval(interval);
//                authbox.innerHTML = '';
//                send.disabled = true;
//            }else{
//                checkArray[4]=false;
//                alert('인증번호가 틀립니다.');
//            }
//        }
//    })
//}

// 3. 회원가입
function signup(){
    addressCheck();

    // 유효성검사 체크 현황중에 하나라도 false이면 회원가입 금지
    for(let i = 0; i < checkArray.length; i++){
        if(!checkArray[i]){
            alert('잘못 입력되었습니다 다시 확인해주세요.');
            return;
        }
    }

    // 1. 입력값 가져오기
    let mid = document.querySelector('#mid').value;
    let mpw = document.querySelector('#mpw').value;
    let mname = document.querySelector('#mname').value;
    let year = document.querySelector('#year').value;
    let month = document.querySelector('#month').value;
    let day = document.querySelector('#day').value;
    let msex = $('input[name=msex]:checked').val();
    let mphone = document.querySelector('#mphone').value;
    let memail = document.querySelector('#memail').value;
    let maddress = document.querySelector('.maddress').value;
    let mimg = document.querySelector('#mimg').value;

    // 2. 값 합치기
    let mbirth = year + month + day;

    // 3. 객체화
    let info = {
        mid : mid,
        mpw : mpw,
        mname : mname,
        mbirth : mbirth,
        msex : msex,
        mphone : mphone,
        memail : memail,
        maddress : maddress,
        mimg : mimg
    };

    console.log(info);

    // 4. ajax 통신
    $.ajax({
        url : '/member/signup.do',
        method : 'post',
        data : info,
        success : function ( result ){
            console.log(result);
            // 4. 결과
            if(result){
                alert('회원가입 성공');
                // location.href = '/member/login';
            }else{
                alert('회원가입 실패');
            }
        }
    });
}

// 프로필 사진
function onChangeImg(event){
    let fileReader = new FileReader();

    fileReader.readAsDataURL(event.files[0]);

    fileReader.onload = e => {
        document.querySelector('#preimg').src = e.target.result;
    }
}