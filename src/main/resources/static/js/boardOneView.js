console.log("boardOneView JS실행됨");


// URL 에서 bno가져옴
let bno = new URL( location.href ).searchParams.get('bno'); 


// 개별글 출력 함수
function view(){
    // 출력위치
    let boardContent = document.querySelector('#boardContent');

    // 만들기
    let html = ``;
    $.ajax({
        url: "/board/oneview",
        method: "get",
        data: {'bno':bno},
        success: function (response) {
            
        }
    });
    

    // 출력하기
    boardContent.innerHTML=html;

}