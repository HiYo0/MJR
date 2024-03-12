let sno = new URL( location.href ).searchParams.get('sno');
let lat = 0 // 위도
let lng = 0 // 경도

//1. 가게정보 불러오기
onView();
function onView(){
    console.log("onView()");
    $.ajax({
        url: "/store/info.do",
        method: "get",
        data: {"sno":sno},
        success: (r)=>{
        document.querySelector('#sname').value = r.sname
        document.querySelector('#sphone').value = r.sphone
        document.querySelector('.sadress').value = r.sadress
        document.querySelector('#scontent').value = r.scontent
        document.querySelector('#snumber').value = r.snumber
        document.querySelector('#categorya').value = r.categorya
        document.querySelector('#categoryb').value = r.categoryb

        let preImgBox = document.querySelector('.preImgBox');
        let html=`
        <div>대표이미지</div>
        <input onchange="onChangeStoreImg1(this)" type="file" class="regimg" id="simg1"name="simg1" accept="/image/*"><br/>
        <div class="simg1 "><img id="storePreimg1" class ="storePreimg" src='/img/${r.sfile1}'></div>
        <div> 이미지2 </div>
        <input onchange="onChangeStoreImg2(this)" type="file" class="regimg" id="simg2"name="simg2" accept="/image/*"><br/>
        <div class="simg2 "><img id="storePreimg2" class ="storePreimg"" src='/img/${r.sfile2}'></div>
        <div> 이미지3 </div>
        <input onchange="onChangeStoreImg3(this)" type="file" class="regimg" id="simg3"name="simg3" accept="/image/*"><br/>
        <div class="simg3 "><img id="storePreimg3" class ="storePreimg" src='/img/${r.sfile3}'></div>
        <div> 이미지4 </div>
        <input onchange="onChangeStoreImg4(this)" type="file" class="regimg" id="simg4"name="simg4" accept="/image/*"><br/>
        <div class="simg4 "><img id="storePreimg4" class ="storePreimg" src='/img/${r.sfile4}'></div>
        `
        preImgBox.innerHTML=html;


        } // success end
    }) // ajax end

}//f end
// 이미지변경1
function onChangeStoreImg1(se){
    let fileReader= new FileReader();
    fileReader.readAsDataURL(se.files[0]);
    fileReader.onload = se2 => {
    document.querySelector('#storePreimg1').src = se2.target.result
    }
}
// 이미지변경2
function onChangeStoreImg2(se){
    let fileReader= new FileReader();
    fileReader.readAsDataURL(se.files[0]);
    fileReader.onload = se2 => {
    document.querySelector('#storePreimg2').src = se2.target.result
    }
}
// 이미지변경3
function onChangeStoreImg3(se){
    let fileReader= new FileReader();
    fileReader.readAsDataURL(se.files[0]);
    fileReader.onload = se2 => {
    document.querySelector('#storePreimg3').src = se2.target.result
    }
}
// 이미지변경4
function onChangeStoreImg4(se){
    let fileReader= new FileReader();
    fileReader.readAsDataURL(se.files[0]);
    fileReader.onload = se2 => {
    document.querySelector('#storePreimg4').src = se2.target.result
    }
}

// 회원정보 수정
function onUpdate(){
//1. 폼 가져온다
    let storeUpdateForm = document.querySelector('.storeUpdateForm');
    //2. 폼 객체화 (첨부파일 바이트화)
    let storeUpdateFormData= new FormData(storeUpdateForm);

        // + 폼 객체에 데이터 추가.[HTML 입력 폼 외 데이터 삽입 가능]
        //폼데이터객체명.set(속성명(name),데이터(value));
        storeUpdateFormData.set('sno',sno);
        storeUpdateFormData.set('slat',lat);
        storeUpdateFormData.set('slng',lng);
    // 멀티파트 폼 전송
    $.ajax({
        url : "/store/update.do", method:'put',
        data : storeUpdateFormData,
        contentType : false, processData:false,
        success : (r)=>{
        if(r){alert('수정성공'); location.href="/store/view?sno="+sno;}
        else{alert('수정실패');}
        }
    });
}
//지도 표시
var mapContainer = document.getElementById('map'), // 지도를 표시할 div
        mapOption = {
            center: new daum.maps.LatLng(37.537187, 127.005476), // 지도의 중심좌표
            level: 5 // 지도의 확대 레벨
        };

    //지도를 미리 생성
    var map = new daum.maps.Map(mapContainer, mapOption);
    //주소-좌표 변환 객체를 생성
    var geocoder = new daum.maps.services.Geocoder();
    //마커를 미리 생성
    var marker = new daum.maps.Marker({
        position: new daum.maps.LatLng(37.537187, 127.005476),
        map: map
    });

// 주소입력받기
    function sample5_execDaumPostcode() {
        new daum.Postcode({
            oncomplete: function(data) {
                var addr = data.address; // 최종 주소 변수

                // 주소 정보를 해당 필드에 넣는다.
                document.getElementById("sample5_address").value = addr;
                // 주소로 상세 정보를 검색
                geocoder.addressSearch(data.address, function(results, status) {
                    // 정상적으로 검색이 완료됐으면
                    if (status === daum.maps.services.Status.OK) {

                        var result = results[0]; //첫번째 결과의 값을 활용

                        // 해당 주소에 대한 좌표를 받아서
                        var coords = new daum.maps.LatLng(result.y, result.x);
                        lat=result.y; console.log;
                        lng=result.x; console.log;
                        // 지도를 보여준다.
                        mapContainer.style.display = "block";
                        map.relayout();
                        // 지도 중심을 변경한다.
                        map.setCenter(coords);
                        // 마커를 결과값으로 받은 위치로 옮긴다.
                        marker.setPosition(coords)
                    }
                });
            }
        }).open();
    }


