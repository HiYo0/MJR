const categoryLista=['0','안산','시흥','수원','부천','안양','서울'];
const categoryListb=['0','한식','일식','중식','양식','분식','패스트푸드'];


// HTML 주소에서 URL 정보 가져오기 sno(가게식별번호)
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
        let html =`
                                <div class="likeBtnBox">

                                </div>
                                <div class="sname infoBox"> 가게이름: ${r.sname}</div>
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

slikeState(sno);

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
// 6. 즐겨찾기 실행
function slikeDo(sno , method){
    let result = false;
    $.ajax({
        url:'/store/slike.do',
        method:method,
        data:{sno:sno},
        async:false,
        success:(r)=>{
            console.log(r);
            result = r;
        }
    });
    if(method != 'get'){ // 순환 참조 해결 후 get실행
        slikeState(sno);
    }
    return result;
}

// 7. 즐겨찾기 출력
function slikeState(sno){
    let result = slikeDo(sno,'get');
    if(result){
        document.querySelector('.likeBtnBox').innerHTML = `
            <a href="#" onclick="slikeDo(${sno},'delete')"><img src="/img/yeslike.png" style="width:50px"></a>
        `;
    }else{
        document.querySelector('.likeBtnBox').innerHTML = `
            <a href="#" onclick="slikeDo(${sno},'post')"><img src="/img/nolike.png" style="width:50px"></a>
        `;
    }
}

// 전승호  ======================================================================
let mypositionlat = 0; // 나의 위도
let mypositionlng = 0; // 나의 경도
navigator.geolocation.getCurrentPosition(async (myLocation)=>{
    console.log(myLocation);

    mypositionlat = myLocation.coords.latitude;  // 나의 위도
    mypositionlng = myLocation.coords.longitude; // 나의 경도

});

// 리뷰작성 유효성 검사만들기
    // 1. 나의 GPS거리가 식당의 위치랑 100m 이내인 가게인가
    reviewValidation();
function reviewValidation(){
    console.log("reviewValidation()");

    // 현재 열람한 가게페이지 정보가져오기
    $.ajax({
        url : " ",
        method : "get",
        data: {'sno':sno},
        success : function(response){
            loadCalculate(response);
            console.log("내위치와 가계의 거리차이 = "+response);


        }

    });// ajax END





}

    // 매개변수 = 상점정보
function loadCalculate (store){
    // console.log("경도"+mypositionlat);
    // console.log(store);
    let 위도 = mypositionlat - store.slat; // 나의 위도
    let 경도 = mypositionlng - store.slng; // 나의 경도

    // console.log(위도);
    // console.log(경도);
    // 매개변수 = 내위도 , 내경도 , 검색한곳위도 , 검색한곳경도
    let dist = distance(mypositionlat, mypositionlng, store.slat, store.slng);
    // console.log(dist+"KM 입니다");

    return dist;
}

    // 매개변수 = 내위도 , 내경도 , 검색한곳위도 , 검색한곳경도
function distance(lat1, lon1, lat2, lon2) {
    let R = 6371; // 지구 반지름 (단위: km)
    let dLat = deg2rad(lat2 - lat1); // 차이값 위도
    let dLon = deg2rad(lon2 - lon1); // 차이값 경도
    let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let distance = R * c; // 두 지점 간의 거리 (단위: km)
        return distance;
    }

    function deg2rad(deg) {
        return deg * (Math.PI/180);
    }

// 전승호 END ======================================================================
