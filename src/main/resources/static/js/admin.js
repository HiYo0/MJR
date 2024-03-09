// 관리자 페이지로 들어가면 나올 js
// 관리자 자기 데이터 및 세션에 관리자 저장.
let tablerows = 8; // 기본 8줄, or 8/2 = 사진 있으면 4줄
orderFunctions()
async function orderFunctions() {
    await adminMview(tablerows);
    await adminBview(tablerows);
    await adminRPview(tablerows);
    await adminRVview(tablerows/2);
    await adminS0view(tablerows/2);
    await adminS1view(tablerows/2);
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
            if(tablerows == i){break;}
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
            if(tablerows == i){break;}
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
            if(tablerows == i){break;}
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



async function adminRVview(tablerows){ // 전체 리뷰
    console.log('adminRVview() 실행, 전체리뷰 불러오기')
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
            if(tablerows == i){break;}
            let daytime = r[i].rvdate.split(" ");
                if(r[i].rvimg== null){
                html += `
                          <tr>
                              <th>${r[i].rvcontent}</th>
                              <th></th>
                              <th>${daytime[0]}</th>
                              <th>${r[i].mid}</th>
                          </tr>
                `
                }
                else{
                html += `
                          <tr>
                              <th>${r[i].rvcontent}</th>
                              <th><img class="image-display" src="/img/"+r[i].rvimg alt="No Image"/></th>
                              <th>${daytime[0]}</th>
                              <th>${r[i].mid}</th>
                          </tr>
                `}
            }


            adminRVtable.innerHTML = html;

        }
    })
    await someAsyncOperation();
}

async function adminS0view(tablerows){
    let sstates = [0,3];
    let where = 'adminStable';
    adminSview(tablerows, where, sstates);
    await someAsyncOperation();
}

async function adminS1view(tablerows){
    let sstates = [1,2];
    let where = 'adminS2table';
    adminSview(tablerows, where, sstates);
    await someAsyncOperation();
}


async function adminSview(tablerows, where, sstates){ // 전체 식당
    console.log('adminSview() 실행, 음식점 불러오기')

    $.ajax({
        url : "/admin/sview?sstates="+ sstates,
        method : "get",
        success : (r)=>{
            console.log(r);

            // 어디에
            let adminStable = document.querySelector("#"+where+">tbody");

            // 무엇을
            let html = "";
            for(let i =0 ; i<r.length ; i++){
            if(tablerows == i){break;}
            console.log(r[i]);
//            let daytime = r[i].rvdate.split(" "); // 가게글은 등록 날짜 없네.
                            if(r[i].sstate == 0){r[i].sstate = "승인 대기"}
                            else if(r[i].sstate == 1){r[i].sstate = "승인"}
                            else if(r[i].sstate == 2){r[i].sstate = "맛집 선정"}
                            else if(r[i].sstate == 3){r[i].sstate = "반려"}

                html += `
                          <tr>
                              <th>${r[i].sname}</th>
                              <th><img class="image-display" src="/img/"+r[i].simg1 alt="No Image"/></th>
                              <th>${r[i].scontent}</th>
                              <th>${r[i].mid}</th>
                              <th>${r[i].sstate}</th>
                          </tr>
                `
                }
                adminStable.innerHTML = html;
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