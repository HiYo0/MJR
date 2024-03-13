let positionObj = {};
// 현재 위치 가져오기
navigator.geolocation.getCurrentPosition(getSuccess, getError);
// 성공시 함수
function getSuccess(position) {
    console.log(position);
    // 위도
    positionObj.lat = position.coords.latitude;
    // 경도
    positionObj.lng = position.coords.longitude;

    var map = new kakao.maps.Map(document.getElementById('map'), { // 지도를 표시할 div
        center : new kakao.maps.LatLng(positionObj.lat, positionObj.lng), // 지도의 중심좌표
        level : 4 // 지도의 확대 레벨
    });

    var imageSrc = '/img/mapicon.png', // 마커이미지의 주소입니다
        imageSize = new kakao.maps.Size(34, 46), // 마커이미지의 크기입니다
        imageOption = {offset: new kakao.maps.Point(10, 42)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
        markerPosition = new kakao.maps.LatLng(37.54699, 127.09598); // 마커가 표시될 위치입니다

    var clusterer = new kakao.maps.MarkerClusterer({
        map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
        averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel: 6 // 클러스터 할 최소 지도 레벨
    });

    $.get("/map/storeinfo.do", (response)=> {
        console.log(response);

        let mapSideContent = document.querySelector('.mapSideContent');
        let html = ``;

        response.forEach((store)=>{
            html += `
                <li class="storeSideInfo storeSideList${store.sno}">
                    <img src="/img/${store.sfile1}"/>
                    <div class="storeInfoBox">
                        <h4>${store.sname}</h4>
                        <p>${store.scontent}</p>
                        <p><a href="#">${store.sphone}</a></p>
                        <p>${store.sadress}</p>
                    </div>
                </li>
            `
        });
        mapSideContent.innerHTML = html;

        let markers = response.map((data)=>{
            // 1. 마커 생성
            let marker = new kakao.maps.Marker({
                position : new kakao.maps.LatLng(data.slat, data.slng),
                image : markerImage
            })

            // 마커에 클릭이벤트를 등록합니다
            kakao.maps.event.addListener(marker, 'click', function() {
                // 마커 위에 인포윈도우를 표시합니다
                let storeSideInfo = document.querySelectorAll('.storeSideInfo');

                for(let i = 0; i < storeSideInfo.length; i++){
                    storeSideInfo[i].style.backgroundColor = '#fff'
                }

                let storeSideList = document.querySelector(`.storeSideList${data.sno}`);

                storeSideList.style.backgroundColor = '#EBC394';

                $('#mapSideBox').animate({scrollTop:$(storeSideList).offset().top}, 500);
            });

            return marker; // 2. 클러스터 저장하기 위해 반복문 밖으로 생성된 마커 반환
        });

        // 3. 클러스터러에 마커들을 추가합니다
        clusterer.addMarkers(markers);
    });
}

// 실패시 함수
function getError() {
    alert('위치정보를 찾을 수 없습니다.');
}



// 전승호 ================================================================

// 검색 키워드 유효성검사
function searchPlaces(){

    let keyword = document.querySelector('#mapkeyword').value;
    console.log('searchPlaces() 입력받은 keyword = '+keyword);

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
    }

    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    let result = mapSerch(keyword); 
    console.log(result);
    return result;
}
// keyword 가 포함된 주소 찾아오기
    // 반환 = storeDto DB
function mapSerch(keyword){
    let storelist= [];
    $.ajax({
        url: "/map/search.do",
        method : "get",
        data: {'keyword':keyword},
        async : false,
        success: function (response) {
            console.log("mapSerch()Ajax 내용 = "+response);
            storelist=response;
        }
    });
    console.log(storelist);
    document.querySelector('#mapkeyword').value=='';
    return storelist;

}


// 전승호 END ============================================================