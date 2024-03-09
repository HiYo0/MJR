console.log("boardOneView JS실행됨");


// URL 에서 bno가져옴
let bno = new URL( location.href ).searchParams.get('bno'); 

view();
// 개별글 출력 함수
function view(){
    console.log("view()실행");
    // 출력위치
    let boardContent = document.querySelector('#boardContent');

    // 만들기
    let html = ``;
    $.ajax({
        url: "/board/oneview.do",
        method: "get",
        data: {'bno':bno},
        success: function (response) {
        console.log(response);
        let category = categoryaText(response);
        // 출력하기
        document.querySelector('#viewbname').innerHTML = response.bname;
        document.querySelector('#boardWriteInfo > img').src ="/img/"+response.mimg;
        document.querySelector('#writerName').innerHTML = response.mid;
        document.querySelector('#registrationDate').innerHTML = response.bdate;
        document.querySelector('#viewpoint').innerHTML = response.bcount;
        // 카테고리
        document.querySelector('#categoryA').innerHTML = category[0];
        document.querySelector('#categoryB').innerHTML = category[1];

        document.querySelector('#contentBox').innerHTML = response.bcontent;
        document.querySelector('#buttonBox').innerHTML =`
            <button class="ButtonOff ${response.ueserinfo?'ButtonOn':''}" type="button" onclick="onUndate()">수정</button>
            <button class="ButtonOff ${response.ueserinfo?'ButtonOn':''}" type="button" onclick="onDelete()">삭제</button>
            <button class="ButtonOff ButtonOn" type="button" href="">목록으로</button>
            `;
        }
    });
    
}
// 카테고리 한글화 함수
function categoryaText(response){
    let category = [];
    if(response.categorya==0){category[0]='자유';}
    else if(response.categorya==1){category[0]='안산';}
    else if(response.categorya==2){category[0]='시흥';}
    else if(response.categorya==3){category[0]='수원';}
    else if(response.categorya==4){category[0]='부천';}
    else if(response.categorya==5){category[0]='안양';}
    else if(response.categorya==6){category[0]='서울';}
    
    
    if(response.categoryb==0){category[1]='';}
    else if(response.categoryb==1){category[1]='한식';}
    else if(response.categoryb==2){category[1]='일식';}
    else if(response.categoryb==3){category[1]='중식';}
    else if(response.categoryb==4){category[1]='양식';}
    else if(response.categoryb==5){category[1]='분식';}
    else if(response.categoryb==6){category[1]='패스트푸드';}

    return category;
}



// 댓글라인 ====================================
let replyWirteCheck = [false];
// 댓글입력 유효성검사 (50글자까지만 가능)
function replyContentMsg(){

    let replyContent = document.querySelector('#replyContent').value;
console.log(replyContent);
console.log(replyContent.length);

    // 안내글 출력위치 
    let replyContentMsg = document.querySelector('#replyContentMsg');
    
    // 만약 
    if(replyContent.length>20){
        replyContentMsg.innerHTML = "20글자 내로 댓글을 작성해주세요.";
        replyWirteCheck[0] = false;
    }else if(replyContent.length>0 && replyContent.length<=20){
        replyContentMsg.innerHTML = "";
        replyWirteCheck[0] = true;
    }
    
}

//댓글작성
function replyWirte(){//공사중

    let replyContent = document.querySelector('#replyContent').value;
    
    let gggg= replyContent.replaceAll('\n', '<br/>');
    console.log(gggg);
    document.querySelector('#replyContentMsg').innerHTML = gggg;
    // $.ajax({
    //    url : /board/test",
    //    method : "post",
    // });
    

}