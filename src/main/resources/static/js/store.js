let pageObject = {
    page: 1,                            // 현재 페이지
    pageBoardSize: 5,                   // 페이지당 표시할 게시물 수
    categorya : 1,                             // 현재 카테고리1
    categoryb : 0,                              // 현재 카테고리2
    key: 'b',                    //현재 검색 key
    keyword: ''                         // 현재 검색 keyword
};

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
//2. 전체 출력
function storeView(page){console.log("storeView()");

    pageObject.page=page;
    $.ajax({
        url:"store/do",
        method: "get",
        data: pageObject,
        success: (r)=>{console.log(r);

        //1. 어디에
        let storeList=document.querySelector('.storeList');
        //2. 무엇을
        let html="";
            //서버가 보여준 데이터를 출력
            //1.
            r.list.forEach(store)=>{}


        }


    })


}