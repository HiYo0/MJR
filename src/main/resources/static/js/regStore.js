
//1. 가게 등록
function onReg(){
    console.log("onReg()");
    //1. 폼DOM 가져온다.
    let storeRegForm = document.querySelector('.storeRegForm');
    console.log(storeRegForm);
    //2. 폼 바이트 (바이너리) 객체 변환
    let storeRegFormData= new FormData(storeRegForm);
    console.log(storeRegFormData);
    //3. ajax 첨부파일 폼 전송
    $.ajax({
        url : "/store/reg.do" ,
        method : "post" ,
        data: storeRegFormData,
        contentType: false,
        processData: false,
        success : (r) => {
            console.log(r);
            if(r==0){
                alert('등록 실패: 관리자에게 문의: DB오류')
            }else if(r==-1){
                alert('등록실패: 관리자에게 문의 (첨부파일 오류)')
            }else if(r>=1){
            alert('등록 성공')
            }
        }
    })
}
//=============================유효성 검사===============================
// 유효성 검사 체크현황
let checkList= [false,false,false,true,false,true]   // 가게이름 (한글자이상,중복이 아니게), 전화번호(xxx-xxx?-xxxx 형식), 가게주소(지도기능 넣고수정)
                            // 가게설명 (null이 아니게) ,사업자 번호(xxx-xx-xxxxx)중복없음, 이미지1,2,3,4(반드시 입력)

//2. 가게이름 유효성 검사(입력할 때마다)
function snameCheck(){console.log('snameCheck()');
    //1. 입력된 데이터 가져오기
    let sname = document.querySelector('#sname').value;    console.log( sname );
        // 2. 정규표현식 : 한글,영대소문자+숫자 조합의 1~30 글자 사이 규칙
        let 가게이름규칙 = /^[a-zA-Z0-9가-힣]{1,30}$/
        // 3. 정규표현식 에 따른 검사.
        if( 가게이름규칙.test(sname) ){
            $.ajax({
                url : `/store/reg/snamecheck` ,
                method : "get" ,
                data : { 'sname' : sname } ,
                success : (r)=>{
                    if( r ){  // true : 중복있다 , false : 중복없다.
                        document.querySelector('.snameCheckBox').innerHTML = `사용중인 가게명입니다.`;
                        checkList[0] = false; // 체크 현황 변경
                    }else{
                        document.querySelector('.snameCheckBox').innerHTML = `사용가능한 가게명입니다.`;
                        checkList[0] = true; // 체크 현황 변경
                    }
                } // success end
            }) // ajax end
        }else{
            // 유효성 검사 결과 출력
            document.querySelector('.snameCheckBox').innerHTML = ` 1~30글자 사이로 입력해주세요.`;
            checkList[0] = false; // 체크 현황 변경
        }
}

//3. 전화번호 유효성검사  000-0000-0000 00-0000-0000
function sphonecheck(){
    let sphone = document.querySelector('#sphone').value;
    let 전화번호규칙 = /^([0-9]{2,3})+[-]+([0-9]{3,4})+[-]+([0-9]{4})+$/
    let msg='-를 포함한 전화번호 형식으로 입력해주세요';
    checkList[1]=false;
    if(전화번호규칙.test(sphone)){
        msg='유효한 전화번호입니다.'; checkList[1]=true;
    }
    document.querySelector('.sphonecheckbox').innerHTML= msg;
}

//4. 지역 유효성 검사 (보류)


//5. 가게 설명 유효성 검사
function scontentCheck(){
    // 1. 입력된 데이터 가져오기
        let scontent = document.querySelector('#scontent').value;    console.log( scontent );
        // 2. 정규표현식 한글,영대소문자+숫자 조합의 10~100 글자 사이 규칙
        let 가게설명 = /^[a-zA-Z0-9가-힣]{10,100}$/
        let msg='';
        checkList[3]=false;
        // 3. 정규표현식 에 따른 검사.
            console.log( 가게설명.test( scontent ) );
          if( 가게설명.test(scontent) ){
                msg='유효한 가게설명입니다'; checkList[3]=true;
          }else{msg='10~100글자사이로 가게 설명을 적어주세요'}
          document.querySelector('.scontentcheckbox').innerHTML =msg;
}

//6. 사업자번호 (유효성 검사)
function snumberCheck(){
    let snumber = document.querySelector('#snumber').value;    console.log( snumber );
        let 사업자번호규칙 = /^([0-9]{3})+[-]+([0-9]{2})+[-]+([0-9]{5})+$/  //숫자 xxx-xx-xxxxx
        if( 사업자번호규칙.test(snumber) ){
            $.ajax({
                url : `/store/reg/snumbercheck` ,
                method : "get" ,
                data : { 'snumber' : snumber } ,
                success : (r)=>{
                    if( r ){  // true : 중복있다 , false : 중복없다.
                        document.querySelector('.snumberCheckBox').innerHTML = `사용중인 사업자번호입니다.`;
                        checkList[4] = false; // 체크 현황 변경
                    }else{
                        document.querySelector('.snumberCheckBox').innerHTML = `사용가능한 사업자번호입니다.`;
                        checkList[4] = true; // 체크 현황 변경
                    }
                } // success end
            }) // ajax end
        }else{
            // 유효성 검사 결과 출력
            document.querySelector('.snumberCheckBox').innerHTML = ` xxx-xx-xxxxx형식의 숫자로만 입력해주세요`;
            checkList[4] = false; // 체크 현황 변경
        }
}
//7. 이미지 유효성검사
/*
function simgCheck(){

}*/
