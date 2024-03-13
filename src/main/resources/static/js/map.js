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

    var clusterer = new kakao.maps.MarkerClusterer({
        map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
        averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel: 6 // 클러스터 할 최소 지도 레벨
    });

    $.get("/map/position.do", (response)=> {
        let markers = response.map((data)=>{
            // 1. 마커 생성
            let marker = new kakao.maps.Marker({
                position : new kakao.maps.LatLng(data.slat, data.slng)
            })

            // 마커에 클릭이벤트를 등록합니다
            kakao.maps.event.addListener(marker, 'click', function() {
                  // 마커 위에 인포윈도우를 표시합니다
                  alert(`제품명 : ${data.sname}`);
            });

            return marker; // 2. 클러스터 저장하기 위해 반복문 밖으로 생성된 마커 반환
        })

        // 3. 클러스터러에 마커들을 추가합니다
        clusterer.addMarkers(markers);
    });
}

// 실패시 함수
function getError() {
    alert('위치정보를 찾을 수 없습니다.');
}