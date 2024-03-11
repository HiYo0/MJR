console.log("board.JS실행됨");
// 전체 게시글 출력용 JS

let pageInfo = {
    page:1,              // 현재페이지수
    pageBoardSize:5,     // 페이지에 출력할 게시물수
    categoryA:0,         // 지역 카테고리
    categoryB:0,         // 음식 카테고리
    key:"b.bname",              // 현재검색 key
    keyword:""           // 현재 검색keyword
}



boardListAllView(1) // 처음출력은 1page
// 게시글 전체출력 (카테고리 무시)
function boardListAllView(page){
    // 페이지 정보에 입력받은 페이지 대입
    pageInfo.page = page;

    $.ajax({
        url: "/board/list.do",
        method : "get",
        data: pageInfo,
        success: function (response) {
            console.log(response);
    
            // 출력위치
            let boardTableBody = document.querySelector('#boardTableBody');
            // 출력물 만들기
            let html = ``;
                response.list.forEach(board => {
                    console.log(board);
                    html += `<tr>
                                <td>${board.bdate}</td>
                                <td style="text-align: left;">${board.bname}</td>
                                <td>${board.bcount}</td>
                                <td>
                                    <img src="/img/${board.mimg}" style="width:20px; border-radius:50%;"/>
                                    작성자이름
                                </td>
                            </tr>`;
                });
            // 3. 출력
            boardTableBody.innerHTML = html;
            // ==페이지구성======================================= //////
            // 출력위치
            let pagination = document.querySelector('.pagination');
            // 내용
            let pagehtml = ``;
                // 이전버튼
                pagehtml += `<li class="page-item"><a class="page-link" onclick="boardListAllView(${page-1<1? 1 :page-1})">이전</a></li>`;

                // 페이지버튼 ( 막약 i가 현재페이지와 같으면 active 클래스 삽입 아니면 생략)
                for(let i = response.startBtn ; i <=response.endBtn; i++){
                    pagehtml +=`<li class="page-item"><a class="page-link ${page == i?'active':''}" onclick="boardListAllView(${i})">${i}</a></li>`;
                }

                // 다음 버튼
                pagehtml +=`<li class="page-item"><a class="page-link" onclick="boardListAllView(${page+1>response.totalPage?response.totalPage:page+1})">다음</a></li>`;
            // 3. 출력
            pagination.innerHTML = pagehtml;
            document.querySelector('.keyword').value = '';// 검색 입력어 지우기
        }
            
    })

}


// 게시글 카테고리A(지역) 선택함
function onCategoryAChoose(categoryA){

}

// 게시글 카테고리B(음식분류) 선택함
function onCategoryBChoose(categoryB){
    
}

// 페이지 출력량 선택
function onPageBoardSize(page){

}