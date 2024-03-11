let myinfoContent = document.querySelector('#mypageContentBox');
let html= ``;
let onMyinforesult;

onMyinfo();

// 1. 내정보
function onMyinfo(){
    $.ajax({
        url:'/member/mypage/myinfo',
        method:'get',
        async:false,
        success:(r)=>{
            console.log(r);

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

    html += `
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
                    <input type="text" onkeyup="emailCheck()" id="memail" name="memail" placeholder="이메일 입력" value="${onMyinforesult.memail}"/>
                    <button class="send" type="button" onclick="authreq()">
                        인증번호 발송
                    </button>
                    <span class="emailcheckbox"></span>
                </li>
                <li>
                    <p>주소</p>
                    <input type="text" id="sample3_address" class="maddress" name="maddress" placeholder="주소" value="${onMyinforesult.maddress}">
                </li>
                <li>
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
    $.ajax({
        url:'/member/mypage/writelist',
        method:'get',
        success:(r)=>{
            console.log(r);
            $.ajax({

            })

            document.querySelector('.nav_btn_badge:nth-child(1)').classList.remove('active');
            document.querySelector('.nav_btn_badge:nth-child(2)').classList.remove('active');
            document.querySelector('.nav_btn_badge:nth-child(4)').classList.remove('active');
            document.querySelector('.nav_btn_badge:nth-child(5)').classList.remove('active');
            document.querySelector('.nav_btn_badge:nth-child(6)').classList.remove('active');
            document.querySelector('.nav_btn_badge:nth-child(3)').classList.add('active');

            html = ``;

            html += `

            `;
            myinfoContent.innerHTML = html;
        }
    })
}

// 5. 내 쿠폰
function myCoupon(){
    $.ajax({
        url:'/member/mypage/mycoupon',
        method:'get',
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

// 6. 즐겨찾기
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

// 7. 회원탈퇴
function memberDelete(){
    $.ajax({
        url:'/member/mypage/memberdelete',
        method:'get',
        success:(r)=>{
            console.log(r);

            document.querySelector('.nav_btn_badge:nth-child(1)').classList.remove('active');
            document.querySelector('.nav_btn_badge:nth-child(2)').classList.remove('active');
            document.querySelector('.nav_btn_badge:nth-child(3)').classList.remove('active');
            document.querySelector('.nav_btn_badge:nth-child(4)').classList.remove('active');
            document.querySelector('.nav_btn_badge:nth-child(5)').classList.remove('active');
            document.querySelector('.nav_btn_badge:nth-child(6)').classList.add('active');

            html = ``;

            html += `

            `;
            myinfoContent.innerHTML = html;
        }
    })
}