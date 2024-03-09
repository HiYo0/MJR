// 유효성 검사 체크현황
//let checkList= [false,]


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