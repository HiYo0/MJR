// ========== 페이지 관련 객체 만들기(여러개의 변수를 묶겠다.) =========== //
let pageObject = {
    detail : '',        // 검색할 DB테이블
    page : 1,           // 현재 페이지
    tablerows : 30,  // 현재 페이지당 표시할 게시물 수
    state : [0,1,2,3,4],            // 현재 카테고리
    key : '',   // 현재 검색 키
    keyword : ''        // 현재 검색
}

console.log('adminDetail js 실행')


window.onload = function() {
    let params = new URLSearchParams(window.location.search);
    let detail = params.get('detail');
    let sstate = params.get('sstate');
    console.log(sstate);
    if (detail === 'member') {
        pageObject.detail = "member"
        adminDeMview(1); // 첫 페이지 실행
    } else if (detail === 'board') {
        pageObject.detail = "board";
        adminDeBview(1); // 첫 페이지 실행
    }else if (detail === 'review') {
             pageObject.detail = "review";
             adminDeRVview(1); // 첫 페이지 실행
    }else if (detail === 'reply') {
        pageObject.detail = "reply";
        adminDeRPview(1); // 첫 페이지 실행
    } else if (detail === 'store') {
        pageObject.detail = "store";
        pageObject.state = sstate.split('').map(Number);
        adminDeSview(1,pageObject.state);
    }
}

function adminDeMview(page){
    pageObject.detail = 'member'
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
            console.log(r);
            // 어디에
            let adminDeMtable = document.querySelector("#detailTable");
            // 무엇을
            let html = "";
            html += `
            <thead>
                <tr>
                    <th>회원 번호</th>
                  <th style="width: 25%">아이디</th>
                  <th style="width: 15%">이름</th>
                  <th style="width: 20%">가입 날짜</th>
                  <th>회원 상태</th>
                  <th style="width: 8%">비고</th>
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
                                        <th id="mselect${i}">
                                               <select id="select${i}">

                                       `;
                                       if(r.list[i].mstate=="일반"){
                                      html +=
                                                                          `
                                                                          <option>정지</option>
                                                                          <option>탈퇴</option>
                                                                          <option>관리자</option>
                                                                          </select>`
                                      }else if(r.list[i].mstate=="정지"){
                                      html +=
                                                                         `
                                                                         <option>일반</option>
                                                                         <option>탈퇴</option>
                                                                         <option>관리자</option>
                                                                         </select>`
                                      }else if(r.list[i].mstate=="탈퇴"){
                                      html +=
                                                                         `
                                                                         <option>정지</option>
                                                                         <option>탈퇴</option>
                                                                         <option>관리자</option>
                                                                         </select>`
                                      }else if(r.list[i].mstate=="관리자"){
                                      html +=
                                                                         `
                                                                         <option>일반</option>
                                                                         <option>정지</option>
                                                                         <option>탈퇴</option>
                                                                         </select>`
                                      }
                                      html += `</th>
                                          </tr>`

                                    }
            html += "</tbody>";
            adminDeMtable.innerHTML = html;

        }
    })
}

function adminDeBview(page){
    pageObject.detail = 'board'
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
        console.log(r);
            // 어디에
            let adminDeMtable = document.querySelector("#detailTable");
            // 무엇을
            let html = "";
            html += `
            <thead>
                <tr>
                    <th style="width: 10%">글 번호</th>
                    <th style="width: 32%">제목</th>
                    <th style="width: 20%">작성자</th>
                    <th style="width: 20%">작성일</th>
                    <th style="width: 10%">조회수</th>
                    <th style="width: 8%">비고</th>
                </tr>
            </thead>
            <tbody>
                `
            for(let i =0 ; i < r.list.length ; i++){
            if(r.list.length == i){break;}
            let daytime = r.list[i].bdate.split(" ");
                            html += `
                                    <tr>
                                       <th><a href="/board/oneview?bno=${r.list[i].bno}">${r.list[i].bno}</a></th>
                                       <th><a href="/board/oneview?bno=${r.list[i].bno}">${r.list[i].bname}</a></th>
                                       <th>${r.list[i].mid}</th>
                                       <th>${daytime[0]}</th>
                                       <th>${r.list[i].bcount}</th>
                                       <th><button type="button" style="width:100%; font-size:18px; display : inline; height:100%; margin-top:0px; margin-bottom:0px">삭제</button></th>
                                   </tr>
                                    `}
            html += "</tbody>";
            adminDeMtable.innerHTML = html;

        }
    })
}

function adminDeRPview(page){
    pageObject.detail = 'reply'
    console.log(page)
    document.querySelector('.nav_btn_badge:nth-child(1)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(2)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(3)').classList.add('active');
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
        console.log(r);
            // 어디에
            let adminDeMtable = document.querySelector("#detailTable");
            // 무엇을
            let html = "";
            html += `
            <thead>
                <tr>
                    <th>댓글 내용</th>
                    <th style="width: 20%">작성일</th>
                    <th style="width: 20%">작성자</th>
                    <th style="width: 8%">비고</th>
                </tr>
            </thead>
            <tbody>
                `
            for(let i =0 ; i < r.list.length ; i++){
            if(r.list.length == i){break;}
            let daytime = r.list[i].rpdate.split(" ");
                            html += `
                                    <tr>
                                       <th><a href="/board/oneview?bno=${r.list[i].bno}">${r.list[i].rpcontent}</a></th>
                                       <th>${daytime[0]}</th>
                                       <th>${r.list[i].mid}</th>
                                       <th><button type="button" style="width:100%; font-size:18px; display : inline; height:100%; margin-top:0px; margin-bottom:0px">삭제</button></th>
                                   </tr>
                                    `}
            html += "</tbody>";
            adminDeMtable.innerHTML = html;

        }
    })
}

function adminDeRVview(page){
    pageObject.detail = 'review'
    console.log(page)
    document.querySelector('.nav_btn_badge:nth-child(1)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(2)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(3)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(4)').classList.add('active');
    document.querySelector('.nav_btn_badge:nth-child(5)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(6)').classList.remove('active');

//   pageObject.detail = "member"
   pageObject.page = page; // 매개변수로 들어온 페이지를 현재페이지로 설정해주고,


   $.ajax({
        url : "/admin/mview/detail",
        method : "get",
        data : pageObject,
        success : (r)=>{
        console.log(r);
            // 어디에
            let adminDeMtable = document.querySelector("#detailTable");
            // 무엇을
            let html = "";
            html += `
            <thead>
                <tr>

                   <th style="width: 40%">리뷰 내용</th>
                   <th>등록 사진</th>
                   <th style="width: 20%">작성일</th>
                   <th style="width: 20%">작성자</th>
                   <th style="width: 8%">비고</th>
                </tr>
            </thead>
            <tbody>
                `
            for(let i =0 ; i < r.list.length ; i++){
            if(r.list.length == i){break;}
            let daytime = r.list[i].rvdate.split(" ");
                            if(r.list[i].rvimg== null){
                                            html += `
                                                      <tr>
                                                          <th><a href="/store/info.do?sno=${r.list[i].sno}">${r.list[i].rvcontent}</a></th>
                                                          <th></th>
                                                          <th>${daytime[0]}</th>
                                                          <th>${r.list[i].mid}</th>
                                                          <th><button type="button" style="width:100%; font-size:18px; display : inline; height:100%; margin-top:0px; margin-bottom:0px">삭제</button></th>
                                                      </tr>
                                            `
                                            }
                                            else{
                                            html += `
                                                      <tr>
                                                          <th><a href="/store/info.do?sno=${r.list[i].sno}">${r.list[i].rvcontent}</a></th>
                                                          <th><a href="/store/info.do?sno=${r.list[i].sno}"><img class="image-display" src="/img/${r.list[i].rvimg}" alt="No Image" style=""/></a></th>
                                                          <th>${daytime[0]}</th>
                                                          <th>${r.list[i].mid}</th>
                                                          <th><button type="button" style="width:100%; font-size:18px; display : inline; height:100%; margin-top:0px; margin-bottom:0px">삭제</button></th>
                                                      </tr>
                                            `}



        }

        html += "</tbody> <style>tbody>tr{height: 45px;}; tbody>tr img{width: 45px;}</style>";
        adminDeMtable.innerHTML = html;
        }
    })
}

function adminDeSview(page , sstate){
    pageObject.detail = 'store';
    pageObject.state = sstate;
    console.log(pageObject.state);
    console.log(page)
    document.querySelector('.nav_btn_badge:nth-child(1)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(2)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(3)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(4)').classList.remove('active');
    if(sstate.includes(0) || sstate.includes(3)){
    document.querySelector('.nav_btn_badge:nth-child(5)').classList.add('active');
    document.querySelector('.nav_btn_badge:nth-child(6)').classList.remove('active');
    }
    else if(sstate.includes(1) || sstate.includes(2)){
    document.querySelector('.nav_btn_badge:nth-child(5)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(6)').classList.add('active');
    }

//   pageObject.detail = "member"
   pageObject.page = page; // 매개변수로 들어온 페이지를 현재페이지로 설정해주고,


   $.ajax({
        url : "/admin/mview/detail",
        method : "get",
        data : pageObject,
        success : (r)=>{
        console.log(r);
            // 어디에
            let adminDeMtable = document.querySelector("#detailTable");
            // 무엇을
            let html = "";
            html += `
            <thead>
                <tr>
                    <th style="width: 20%">식당 이름</th>
                    <th style="width: 10%">대표 사진</th>
                    <th style="width: 32%">식당 설명</th>
                    <th style="width: 20%">작성자</th>
                    <th style="width: 10%">상태</th>
                    <th style="width: 8%">비고</th>
                </tr>
            </thead>
            <tbody>
                `
            for(let i =0 ; i < r.list.length ; i++){
            if(r.list.length == i){break;}
             if(r.list[i].sstate == 0){r.list[i].sstate = "승인 대기"}
                                        else if(r.list[i].sstate == 1){r.list[i].sstate = "승인"}
                                        else if(r.list[i].sstate == 2){r.list[i].sstate = "맛집 선정"}
                                        else if(r.list[i].sstate == 3){r.list[i].sstate = "반려"}
                                            html += `
                                                      <tr>
                                                          <th><a href="/store/info.do?sno=${r.list[i].sno}">${r.list[i].sname}</a></th>
                                                          <th><a href="/store/info.do?sno=${r.list[i].sno}"><img class="image-display" src="/img/${r.list[i].simg1}" alt="No Image"/></a></th>
                                                          <th>${r.list[i].scontent}</th>
                                                          <th>${r.list[i].mid}</th>
                                                          <th>${r.list[i].sstate}</th>
                                                           <th id="rselect1${i}">
                                                                                      <select id="rselect2${i}">
                                                                  `
                                                                     if(r.list[i].sstate=="승인 대기"){
                                                                     html +=
                                                                                                         `
                                                                                                         <option>승인</option>
                                                                                                         <option>반려</option>
                                                                                                         </select>`
                                                                     }else if(r.list[i].sstate=="승인"){
                                                                     html +=
                                                                                                        `
                                                                                                        <option>승인 대기</option>
                                                                                                        <option>반려</option>
                                                                                                        </select>`
                                                                     }else if(r.list[i].sstate=="맛집 선정"){
                                                                                         html +=
                                                                                                                            `
                                                                                                                            <option>승인 대기</option>
                                                                                                                            <option>승인</option>
                                                                                                                            <option>반려</option>
                                                                                                                            </select>`

                                                                     }else if(r.list[i].sstate=="반려"){
                                                                     html +=
                                                                                                        `
                                                                                                        <option>승인 대기</option>
                                                                                                        <option>승인</option>
                                                                                                        </select>`

                                                                     }
                                                                     html += `</th>
                                                                      </tr>`
        }
        adminDeMtable.innerHTML = html;
        html += "</tbody> <style>tbody>tr{height: 45px;}; tbody>tr img{width: 45px;}</style>";
        }
    })
}
