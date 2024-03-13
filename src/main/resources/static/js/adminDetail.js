// ========== 페이지 관련 객체 만들기(여러개의 변수를 묶겠다.) =========== //
let pageObject = {
    detail : '',
    page : 1,           // 현재 페이지
    tablerows : 30,  // 현재 페이지당 표시할 게시물 수
    sstate : [],            // 현재 카테고리
    key : '',   // 현재 검색 키
    keyword : ''        // 현재 검색
}

console.log('adminDetail js 실행')

window.onload = function() {
    let params = new URLSearchParams(window.location.search);
    let detail = params.get('detail');
    if (detail === 'member') {
        detail='member';
        pageObject.detail = "member"
        pageObject.sstate = [0,1,2,3];
        adminDeMview(1); // 첫 페이지 실행
    } else if (detail === 'board') {
        detail='board';
        pageObject.detail = "board";
        adminDeBview(1); // 첫 페이지 실행
    } else if (detail === 'reply') {
        리플라이함수만들기();
    } else if (detail === 'store') {
        스토어함수만들기();
    }
}

function adminDeMview(page){

    document.querySelector('.nav_btn_badge:nth-child(1)').classList.add('active');
    document.querySelector('.nav_btn_badge:nth-child(2)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(3)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(4)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(5)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(6)').classList.remove('active');

//   pageObject.detail = "member"
   pageObject.page = page; // 매개변수로 들어온 페이지를 현재페이지로 설정해주고,


   $.ajax({
        url : "/admin/mview/detail",
        method : "get",
        data : pageObject,
        success : (r)=>{
            // 어디에
            let adminDeMtable = document.querySelector("#detailTable");
            // 무엇을
            let html = "";
            html += `
            <thead>
                <tr>
                    <th>회원 번호</th>
                  <th style="width: 30%">아이디</th>
                  <th style="width: 20%">이름</th>
                  <th style="width: 30%">가입 날짜</th>
                  <th>회원 상태</th>
                </tr>
            </thead>
            <tbody>
                `
            for(let i =0 ; i < r.list.length ; i++){
            if(r.list.length == i){break;}
            let daytime = r.list[i].mdate.split(" ");
                            if(r.list[i].mstate == 0){r.list[i].mstate = "일반"}
                            else if(r.list[i].mstate == 1){r.list[i].mstate = "정지"}
                            else if(r.list[i].mstate == 2){r.list[i].mstate = "탈퇴"}
                            else if(r.list[i].mstate == 3){r.list[i].mstate = "관리자"}
                            html += `
                                    <tr>
                                       <th>${r.list[i].mno}</th>
                                       <th>${r.list[i].mid}</th>
                                       <th>${r.list[i].mname}</th>
                                       <th>${daytime[0]}</th>
                                       <th>${r.list[i].mstate}</th>
                                   </tr>
                                    `}
            html += "</tbody>";
            adminDeMtable.innerHTML = html;

        }
    })
}

function adminDeBview(page){
    console.log(page)
    document.querySelector('.nav_btn_badge:nth-child(1)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(2)').classList.add('active');
    document.querySelector('.nav_btn_badge:nth-child(3)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(4)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(5)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(6)').classList.remove('active');

//   pageObject.detail = "member"
   pageObject.page = page; // 매개변수로 들어온 페이지를 현재페이지로 설정해주고,


   $.ajax({
        url : "/admin/mview/detail",
        method : "get",
        data : pageObject,
        success : (r)=>{
            // 어디에
            let adminDeMtable = document.querySelector("#detailTable");
            // 무엇을
            let html = "";
            html += `
            <thead>
                <tr>
                    <th style="width: 10%">글 번호</th>
                    <th style="width: 30%">제목</th>
                    <th style="width: 20%yle">작성자</th>
                    <th style="width: 30%">작성일</th>
                    <th style="width: 10%">조회수</th>
                </tr>
            </thead>
            <tbody>
                `
            for(let i =0 ; i < r.list.length ; i++){
            if(r.list.length == i){break;}
            let daytime = r.list[i].mdate.split(" ");
                            if(r.list[i].mstate == 0){r.list[i].mstate = "일반"}
                            else if(r.list[i].mstate == 1){r.list[i].mstate = "정지"}
                            else if(r.list[i].mstate == 2){r.list[i].mstate = "탈퇴"}
                            else if(r.list[i].mstate == 3){r.list[i].mstate = "관리자"}
                            html += `
                                    <tr>
                                       <th>${r.list[i].mno}</th>
                                       <th>${r.list[i].mid}</th>
                                       <th>${r.list[i].mname}</th>
                                       <th>${daytime[0]}</th>
                                       <th>${r.list[i].mstate}</th>
                                   </tr>
                                    `}
            html += "</tbody>";
            adminDeMtable.innerHTML = html;

        }
    })
}
