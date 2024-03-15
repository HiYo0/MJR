// url에서 mno 추출
let mno = new URL(location.href).searchParams.get('mno');
console.log(mno);

let myinfoContent = document.querySelector('#mypageContentBox');
let html= ``;
let onMyinforesult = 0;
let onSessionresult = 0;

getsessioninfo();
onMyinfo();

// 세션 정보 가져오기
function getsessioninfo(){
    $.ajax({
        url:'/member/mypage/getsessioninfo',
        method:'get',
        async:false,
        success:(r)=>{
            console.log(r);
            onSessionresult = r;
        }
    })
}

// 1. 내정보
function onMyinfo(){
    $.ajax({
        url:'/member/mypage/myinfo',
        method:'get',
        data:{'mno':mno},
        async:false,
        success:(r)=>{
            console.log(r);

            if(r != ''){
                onMyinforesult = r;

                document.querySelector('.nav_btn_badge:nth-child(2)').classList.remove('active');
                document.querySelector('.nav_btn_badge:nth-child(3)').classList.remove('active');
                document.querySelector('.nav_btn_badge:nth-child(4)').classList.remove('active');
                document.querySelector('.nav_btn_badge:nth-child(5)').classList.remove('active');
                document.querySelector('.nav_btn_badge:nth-child(6)').classList.remove('active');
                document.querySelector('.nav_btn_badge:nth-child(1)').classList.add('active');

                html = ``;

                html += `
                    <div class="infoBox">
                        <h3>기본정보</h3>
                        <div class="infoFlexBox">
                            <img src="/img/default.jpg"/>
                            <ul>
                                <li>
                                    <p>이름</p><span>${r.mname}</span>
                                </li>
                                <li>
                                    <p>이메일</p><span>${r.memail}</span>
                                </li>
                                <li>
                                    <p>전화번호</p><span>${r.mphone}</span>
                                </li>
                                <li>
                                    <p>가입날짜</p><span>${r.mdate}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                `;
                myinfoContent.innerHTML = html;
            }else{
                alert('잘못된 접근 입니다.');
                location.href="/main";
            }
        }
    })
}

// 2. 회원정보 값 출력
function updateView(){
    document.querySelector('.nav_btn_badge:nth-child(1)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(3)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(4)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(5)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(6)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(2)').classList.add('active');

    html = ``;

    if(onSessionresult.mstate == 3 && onMyinforesult.mno != onSessionresult.mno){
        html += '';
    }else{
        html += `
            <h3 class="updateTitle">회원정보 변경</h3>
            <form id="updateForm">
                <ul>
                    <li>
                        <p>아이디</p>
                        <input type="text" id="mid" name="mid" value="${onMyinforesult.mid}" readonly/>
                    </li>
                    <li>
                        <p>비밀번호</p>
                        <input type="password" onkeyup="pwCheck()" id="mpw" name="mpw" placeholder="비밀번호 입력"/>
                        <span class="pwcheckbox"></span>
                    </li>
                    <li>
                        <p>비밀번호 확인</p>
                        <input type="password" onkeyup="pwCheck()" id="mpwconfirm" name="mpwconfirm" placeholder="비밀번호 재입력"/>
                        <span class="pwconfirmcheckbox"></span>
                    </li>
                    <li>
                        <p>이름</p>
                        <input type="text" id="mname" name="mname" value="${onMyinforesult.mname}" readonly/>
                    </li>
                    <li>
                        <p>생년월일</p>
                        <input type="text" id="mbirth" name="mbirth" value="${onMyinforesult.mbirth}" readonly/>
                    </li>
                    <li>
                        <p>성별</p>
                        <div class="radioBox">남자<input type="radio" checked value="남자" name="msex" readonly/></div>
                        <div class="radioBox">여자<input type="radio" value="여자" name="msex" readonly/></div>
                    </li>
                    <li>
                        <p>전화번호</p>
                        <input type="text" onkeyup="phoneCheck()" id="mphone" name="mphone" placeholder="전화번호 입력" value="${onMyinforesult.mphone}"/>
                        <span class="phonecheckbox"></span>
                    </li>
                    <li id="emailLi">
                        <p>이메일</p>
                        <div class="emailBox">
                            <input type="text" onkeyup="emailCheck()" id="memail" name="memail" placeholder="이메일 입력" value="${onMyinforesult.memail}"/>
                            <button class="send" type="button" onclick="authreq()">
                                인증번호 발송
                            </button>
                        </div>
                        <span class="emailcheckbox"></span>
                    </li>
                    <li>
                        <p>주소</p>
                        <input type="text" id="sample3_address" class="maddress" name="maddress" placeholder="주소" value="${onMyinforesult.maddress}">
                    </li>
                    <li class="imgBox">
                        <p>프로필 사진</p>
                        <input onchange="onChangeImg(this)" type="file" id="mimg" name="profileimg" accept="image/*"/>
                    </li>
                    <li class="priview">
                        <img id="preimg" src="/img/default.jpg"/>
                    </li>
                </ul>
                <button id="updateBtn" type="button" onclick="updateInfo()">수정 완료</button>
                <button id="updatebackBtn" type="button">취소</button>
            </form>
        `;
    }

    myinfoContent.innerHTML = html;
}

// 3. 회원정보 수정
function updateInfo(){
    let memberUpdateForm = document.querySelector('#updateForm');

    let memberUpdateFormData = new FormData(memberUpdateForm);

    memberUpdateFormData.set('mno',onMyinforesult.mno);

    console.log(memberUpdateFormData);

    $.ajax({
        url:'/member/mypage/updateinfo',
        method:'post',
        data:memberUpdateFormData,
        contentType:false,
        processData:false,
        success:(r)=>{
            console.log(r);
            if(r){
                alert('수정 완료');
            }
        }
    })
}

// 4. 내가 쓴 글/댓글 보기
function myWriteList(){
    document.querySelector('.nav_btn_badge:nth-child(1)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(2)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(4)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(5)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(6)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(3)').classList.add('active');

    $.ajax({
        url:'/member/mypage/boardlist',
        method:'get',
        async:false,
        data:{mno:mno},
        success:(r)=>{
            console.log(r);

            html = ``;

            html += `
                <div class="myBoardBox">
                    <h3>내가 쓴 글</h3>
                    <table class="myBoardTable">
                        <colgroup>
                            <col style="width:12%">
                            <col style="width:68%">
                            <col style="width:20%">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>게시물 번호</th>
                                <th>제목</th>
                                <th>작성일자</th>
                            </tr>
                        </thead>
                        <tbody class="myWriteBoard">

                        </tbody>
                    </table>
                </div>
                <div class="myReplyBox">
                    <h3>내가 쓴 댓글</h3>
                    <table class="myReplyTable">
                        <colgroup>
                            <col style="width:12%">
                            <col style="width:68%">
                            <col style="width:20%">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>게시물 번호</th>
                                <th>댓글내용</th>
                                <th>작성일자</th>
                            </tr>
                        </thead>
                        <tbody class="myWriteReply">
                            ${onReplyList()}
                        </tbody>
                    </table>
                </div>
            `;

            myinfoContent.innerHTML = html;

            let myWriteBoard = document.querySelector('.myWriteBoard');
            let htmlBoard = ``;

            r.forEach((board)=>{
                htmlBoard += `
                    <tr>
                        <td>${board.bno}</td>
                        <td>${board.bname}</td>
                        <td>${board.bdate}</td>
                    </tr>
                `
            })

            myWriteBoard.innerHTML = htmlBoard;


        }
    })
}

// 6. 내가 쓴 댓글 출력
function onReplyList(){
    let subHtml = ``;
    let myWriteReply2 = document.querySelector('.myWriteReply');
    $.ajax({
        url:'/member/mypage/replylist',
        async:false,
        method:'get',
        data:{mno:mno},
        success:(r)=>{
            console.log(r);

            r.forEach((reply)=>{
                subHtml += `
                    <tr>
                        <td>${reply.bno}</td>
                        <td>${reply.rpcontent}</td>
                        <td>${reply.rpdate}</td>
                    </tr>
                `
            });
        }
    });
    return subHtml;
}

// 7. 내 쿠폰
function myCoupon(){
    $.ajax({
        url:'/member/mypage/mycoupon',
        method:'get',
        data: { 'mno': mno },
        success:(r)=>{
            console.log(r);

            document.querySelector('.nav_btn_badge:nth-child(1)').classList.remove('active');
            document.querySelector('.nav_btn_badge:nth-child(2)').classList.remove('active');
            document.querySelector('.nav_btn_badge:nth-child(3)').classList.remove('active');
            document.querySelector('.nav_btn_badge:nth-child(5)').classList.remove('active');
            document.querySelector('.nav_btn_badge:nth-child(6)').classList.remove('active');
            document.querySelector('.nav_btn_badge:nth-child(4)').classList.add('active');

            html = ``;

            html += `

            `;
            myinfoContent.innerHTML = html;
        }
    })
}

// 8. 즐겨찾기
function favorites(){
    $.ajax({
        url:'/member/mypage/favorites',
        method:'get',
        success:(r)=>{
            console.log(r);

            document.querySelector('.nav_btn_badge:nth-child(1)').classList.remove('active');
            document.querySelector('.nav_btn_badge:nth-child(2)').classList.remove('active');
            document.querySelector('.nav_btn_badge:nth-child(3)').classList.remove('active');
            document.querySelector('.nav_btn_badge:nth-child(4)').classList.remove('active');
            document.querySelector('.nav_btn_badge:nth-child(6)').classList.remove('active');
            document.querySelector('.nav_btn_badge:nth-child(5)').classList.add('active');

            html = ``;

            html += `

            `;
            myinfoContent.innerHTML = html;
        }
    })
}

// 9. 회원탈퇴
function memberDelete(){
    document.querySelector('.nav_btn_badge:nth-child(1)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(2)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(3)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(4)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(5)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(6)').classList.add('active');

    html = ``;

    html += `
        <div>
            <h3>회원 탈퇴</h3>
            <input type="password" id="deletePw" name="mpw" placeholder="비밀번호 입력"/>
            <button type="button" onclick="onDelete()">확인</button>
        </div>
    `;
    myinfoContent.innerHTML = html;


}

// 10. 회원탈퇴 기능
function onDelete(){
    let mpw = document.querySelector('#deletePw').value;

    $.ajax({
        url:'/member/mypage/memberdelete',
        method:'get',
        data:{mpw:mpw},
        success:(r)=>{
            console.log(r);
            if(r){
                alert('회원 탈퇴 성공');
                location.href="/member/logout.do";
            }else{
                alert('비밀번호가 일치하지 않습니다.');
            }
        }
    })
}