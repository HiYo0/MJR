// 관리자 페이지로 들어가면 나올 js
// 관리자 자기 데이터 및 세션에 관리자 저장.
let tablerows = 8;
orderFunctions()
async function orderFunctions() {
    await adminMview(tablerows);
    await adminBview(tablerows);
    await adminRPview(tablerows);
}

async function adminMview(tablerows){ // 전체 회원
    console.log('adminMview() 실행, 전체회원불러오기')
    $.ajax({
        url : "/admin/mview",
        method : "get",
        success : (r)=>{
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
    await someAsyncOperation();
}

async function adminBview(tablerows){ // 전체 게시글
    console.log('adminBview() 실행, 전체게시글불러오기')
    $.ajax({
        url : "/admin/bview",
        method : "get",
        success : (r)=>{
            console.log(r);
            // 어디에
            let adminBtable = document.querySelector("#adminBtable>tbody");
            // 무엇을
            let html = "";
            for(let i =0 ; i<tablerows ; i++){
            let daytime = r[i].bdate.split(" ");
                            html += `
                                    <tr>
                                       <th>${r[i].bno}</th>
                                       <th>${r[i].bname}</th>
                                       <th>${r[i].mid}</th>
                                       <th>${daytime[0]}</th>
                                       <th>${r[i].bcount}</th>
                                   </tr>
                                    `}

            adminBtable.innerHTML = html;

        }
    })
    await someAsyncOperation();
}

async function adminRPview(tablerows){ // 전체 댓글
    console.log('adminRPview() 실행, 전체댓글 불러오기')
    $.ajax({
        url : "/admin/rpview",
        method : "get",
        success : (r)=>{
            console.log(r);
            // 어디에
            let adminRPtable = document.querySelector("#adminRPtable>tbody");
            // 무엇을
            let html = "";
            for(let i =0 ; i<tablerows ; i++){
            let daytime = r[i].rpdate.split(" ");
                            html += `
                                    <tr>
                                       <th>${r[i].rpcontent}</th>
                                       <th>${daytime[0]}</th>
                                       <th>${r[i].mid}</th>
                                   </tr>
                                    `}

            adminRPtable.innerHTML = html;

        }
    })
    await someAsyncOperation();
}

async function adminRVview(tablerows){ // 전체 댓글
    console.log('adminRVview() 실행, 전체댓글 불러오기')
    $.ajax({
        url : "/admin/rvview",
        method : "get",
        success : (r)=>{
            console.log(r);
            // 어디에
            let adminRVtable = document.querySelector("#adminRVtable>tbody");
            // 무엇을
            let html = "";
            for(let i =0 ; i<tablerows ; i++){
            let daytime = r[i].rpdate.split(" ");
                            html += `
                                    <tr>
                                       <th>${r[i].rpcontent}</th>
                                       <th>${daytime[0]}</th>
                                       <th>${r[i].mid}</th>
                                   </tr>
                                    `}

            adminRPtable.innerHTML = html;

        }
    })
    await someAsyncOperation();
}

async function someAsyncOperation() {
    // 비동기 작업 수행
    return new Promise(resolve => {
        setTimeout(resolve, 55); // 0.055초의 딜레이를 줌
    });

}