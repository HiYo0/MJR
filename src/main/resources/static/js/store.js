let pageObject = {
    page: 1,                            // 현재 페이지
    pageStoreSize: 5,                   // 페이지당 표시할 게시물 수
    categorya : 1,                             // 현재 카테고리1
    categoryb : 0,                              // 현재 카테고리2
    key: 'b',                    //현재 검색 key
    keyword: ''                         // 현재 검색 keyword
};
const categoryLista=['','자유','안산','시흥','수원','부천','안양','서울'];
const categoryListb=['','한식','일식','중식','양식','분식','패스트푸드'];
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
storeView(1);
//2. 전체 출력
function storeView(page){
console.log("storeView()");

    pageObject.page=page;

    $.ajax({
        url:"/store/do",
        method: "get",
        data: pageObject,
        success: (r)=>{console.log(r);

        //1. 어디에
        let storeList=document.querySelector('.storeList');
        //2. 무엇을
        let html="";
            //서버가 보여준 데이터를 출력
            //1.
            r.list.forEach(store =>{

                console.log(store);
                html+=`<div class="store">

                            <div class="simg1" name="simg1"><img id=simg1
                            src='/img/${store.sfile1}' </div>
                            <div class="sname" name="sname"> ${store.sname}</div>

                            <div class="categorya" name="categorya"> ${categoryLista(a)} </div>
                            <div class="categoryb" name="categoryb"> ${categoryListb(a)} </div>
                </div>`
        })
        //3. 출력
        storeList.innerHTML=html;
        let  pagination = document.querySelector('.pagination');
                // 2. 무엇을
                let pagehtml = ``;
                    // 이전 버튼 ( 만약에 현재페이지가 1페이지이면 1페이지 고정 )
                    pagehtml += `<div class="page-item"><a class="page-link" onclick="storeView( ${ page-1 < 1 ? 1 : page-1 } )">이전</a></div>`
                    // 페이지번호 버튼 ( 1페이지부터 마지막페이지(totalPage)까지
                    for( let i = r.startBtn ; i <= r.endBtn ; i++ ){
                        // + 만약에 i가 현재페이지와 같으면 active 클래스 삽입 아니면 생략 ( *조건부 렌더링 )
                        pagehtml += ` <div class="page-item ${ i == page ? 'active' : '' }"><a class="page-link" onclick="storeView( ${ i } )"> ${ i } </a></div>`
                    }
                    // 다음 버튼 ( 만약에 현재페이지가 마지막 페이지 이면 현재 페이지 고정 )
                    pagehtml += `<div ><a class="page-link" onclick="storeView( ${ page+1 > r.totalPage ? r.totalPage : page+1 } )">다음</a></div>`
                // 3. 출력
                pagination.innerHTML = pagehtml;
                // == 3. 부가 출력  ======================================================
                document.querySelector('.totalPage').innerHTML = r.totalPage;
                document.querySelector('.totalStoreSize').innerHTML = r.totalStoreSize;
        }
    });
}
// 3. 페이지당 게시물 수
function onPageStoreSize( object ){     console.log( object );console.log( object.value );
    pageObject.pageStoreSize = object.value;
    storeView( 1 );
}
