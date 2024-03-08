// 관리자 페이지로 들어가면 나올 js
// 관리자 자기 데이터 및 세션에 관리자 저장.
let tablerows = 7;

adminMview(tablerows);
function adminMview(tablerows){ // 전체
    console.log('adminMview() 실행, 전체회원불러오기')
    $.ajax({
        url : "/admin/Mview",
        method : "get",
        success : (r)=>{
            console.log(r);
            // 어디에
            let adminMtable = document.querySelector("#adminMtable>tbody");
            // 무엇을
            let html = "";
            for(let i =0 ; i<tablerows ; i++){
            let daytime = r[i].mdate.split(" ");
                            if(r[i].mstate == 0){r[i].mstate = "일반"}
                            else if(r[i].mstate == 1){r[i].mstate = "정지"}
                            else if(r[i].mstate == 2){r[i].mstate = "탈퇴"}
                            else if(r[i].mstate == 3){r[i].mstate = "관리자"}
                            html += `
                                    <tr>
                                       <th>${r[i].mno}</th>
                                       <th>${r[i].mid}</th>
                                       <th>${r[i].mname}</th>
                                       <th>${daytime[0]}</th>
                                       <th>${r[i].mstate}</th>
                                   </tr>
                                    `}

            adminMtable.innerHTML = html;
        }
    })
}

function adminBview(tablerows){ // 전체
    console.log('adminBview() 실행, 전체게시글불러오기')
    $.ajax({
        url : "/admin/Bview",
        method : "get",
        success : (r)=>{
            console.log(r);
            // 어디에
            let adminMtable = document.querySelector("#adminBtable>tbody");
            // 무엇을
            let html = "";
            for(let i =0 ; i<tablerows ; i++){
            let daytime = r[i].mdate.split(" ");
                            if(r[i].mstate == 0){r[i].mstate = "일반"}
                            else if(r[i].mstate == 1){r[i].mstate = "정지"}
                            else if(r[i].mstate == 2){r[i].mstate = "탈퇴"}
                            else if(r[i].mstate == 3){r[i].mstate = "관리자"}
                            html += `
                                    <tr>
                                       <th>${r[i].mno}</th>
                                       <th>${r[i].mid}</th>
                                       <th>${r[i].mname}</th>
                                       <th>${daytime[0]}</th>
                                       <th>${r[i].mstate}</th>
                                   </tr>
                                    `}

            adminMtable.innerHTML = html;
        }
    })
}