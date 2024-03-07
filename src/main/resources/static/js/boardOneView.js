console.log("boardOneView JS실행됨");


// URL 에서 bno가져옴
let bno = new URL( location.href ).searchParams.get('bno'); 


// 개별글 출력 함수
function view(){
    // 출력위치
    let boardContent = document.querySelector('#boardContent');

    // 만들기
    let html = ``;
    $.ajax({
        url: "/board/oneview",
        method: "get",
        data: {'bno':bno},
        success: function (response) {
            html +=`<div id="viewbname">${response.bname}</div>
                    <div id="memberheard">
                        <div id="boardWriteInfo">
                            <img src="C:\\Users\\504\\Desktop\\team4Project\\build\\resources\\main\\static\\img\\${response.mimg}"/>
                            <div>
                                <div id="writerName">${response.mid}</div>
                                <div id="registrationDate">${response.bdate}</div>
                            </div>
                        </div>
                        <div id="viewpoint"><img src="/static/img/view-icon.png"/>${response.bcount}</div>            
                    </div>
                    
                    <div id="boardViewContent"><!-- 글내용 출력라인 -->
                        <div id="contentBox">
                            ${response.bcontent}
                        </div>
                        <div id="buttonBox">
                            <!-- ButtonOff 만있으면 버튼 출력안됨 ButtonOn 클래스 뒤에추가되면 버튼보임 -->
                            <!-- 자기가 쓴글만 버튼 나오게 하기위함 -->
                            <button class="ButtonOff ${response.ueserinfo?'ButtonOn':''}" type="button" onclick="onUndate()">수정</button>
                            <button class="ButtonOff ${response.ueserinfo?'ButtonOn':''}" type="button" onclick="onDelete()">삭제</button>
                            <button class="ButtonOff ButtonOn" type="button" href="">목록으로</button>
                        </div>
                    </div>
            `;
        }
    });
    

    // 출력하기
    boardContent.innerHTML=html;

}