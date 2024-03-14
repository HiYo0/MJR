const categoryLista=['0','자유','안산','시흥','수원','부천','안양','서울'];
const categoryListb=['0','한식','일식','중식','양식','분식','패스트푸드'];

let sno = new URL( location.href ).searchParams.get('sno');

viewStore()
//1. 가게 상세페이지
function viewStore(){
    console.log("viewStore()");
    $.ajax({
        url: "/store/info.do",
        method:"get",
        data: {"sno":sno},
        async: false,
        success : (r)=>{
        let storeInfoBox =document.querySelector('#storeInfoBox');
        let html =`            <div class="sname infoBox"> 가게이름: ${r.sname}</div>
                               <div class="sphone infoBox">가게전화번호: ${r.sphone}</div>
                               <div class="sadress infoBox">가게주소: ${r.sadress}</div>
                               <div class="scontent infoBox">가게설명: ${r.scontent}</div>
                               <div class="scategorya infoBox">지역: ${categoryLista[r.categorya]}</div>
                               <div class="scategoryb infoBox">음식분류: ${categoryListb[r.categoryb]}</div>
                               <div class="imgbox">
                                    <div class="simg1 infoBox"><img id=simg1 src='/img/${r.sfile1}'></div>
                                    <div class="simg2 infoBox"><img id=simg2 src='/img/${r.sfile2}'></div>
                                    <div class="simg3 infoBox"><img id=simg3 src='/img/${r.sfile3}'></div>
                                    <div class="simg4 infoBox"><img id=simg4 src='/img/${r.sfile4}'></div>
                               </div>
                            `
            console.log(r);
            let btnHTML = `<button class="boardBtn" type="button" onclick="onDelete( )"> 삭제하기 </button>`
                           btnHTML +=  `<button class="boardBtn" type="button" onclick="location.href='/store/update?sno=${ r.sno }'"> 수정하기 </button>`
                                    document.querySelector('.btnBox').innerHTML += btnHTML
             $.ajax({
                    url:"/store/revisit",
                    method: "get",
                    data: {"sno":sno},
                    async: false,
                    success:(r)=>{
                    console.log(r);

                    html +=`<div class="srevisit infoBox"> 재방문회수: ${r}</div>`

                    }
                })
            //3. 출력
            storeInfoBox.innerHTML= html;
        }


    })
    console.log('onReviewList');
    onReviewList()
}
// 2.삭제기능
function onDelete(){
    $.ajax({
        url:"/store/delete.do", method:"delete", data:{'sno':sno}, success:(r)=>{
            if(r){alert('삭제성공'); location.href="/store/view";}
        else{alert('삭제실패');}
        }

    });
}

//3. 리뷰 쓰기
function onReviewWrite(){
    console.log("onReviewWrite()")
    //1. 폼 가져오기
    let storeReviewForm= document.querySelector('.storeReviewForm');
    console.log(storeReviewForm);
    //2. 폼 바이트 객체 변환
    let storeReviewFormData= new FormData(storeReviewForm);
    console.log(storeReviewFormData);
    //3. 폼 데이터 추가
    storeReviewFormData.set('sno',sno);

    //4. 폼 전송
     $.ajax({
            url : "/store/review/write.do" ,
            method : "post",
            data: storeReviewFormData,
            contentType: false,
            processData: false,
            async: false,
            success : (r)=>{
                console.log(r);
                if( r ){  alert('리뷰 작성 성공');onReviewList();OnRevisitCount(); // 출력함수 실행위치
                }
                else{ alert( '리뷰 작성 실패');}
            }
        }); // ajax end
}

//4. 리뷰 출력
function onReviewList(){
    $.ajax({
            url : "/store/review/do", method : "get", data : { "sno" : sno },
            async: false,
            success : (r)=>{ console.log( r );
                let reviewListBox = document.querySelector('.reviewListBox');
                let html = ``;
                    r.forEach( (review)=>{
                        html += `<div>
                                    <span>${ review.rvdate}</span>
                                    <span><img id=simg1 src='/img/${review.rvimg}'></span>
                                    <span>${ review.rvcontent}</span>
                                    <span>${ review.mid}</span>
                                </div>`
                    });
                reviewListBox.innerHTML = html;
            }
        })

}

//5. 총재방문 회수 가져오기
function OnRevisitCount(){
    $.ajax({
        url:"/store/revisit",
        method: "get",
        data: {"sno":sno},
        async: false,
        success:(r)=>{
        console.log(r);
        let storeInfoBox =document.querySelector('#storeInfoBox');
        let html =`<div class="srevisit infoBox"> 재방문회수: ${r}</div>`

        }
    })


}

