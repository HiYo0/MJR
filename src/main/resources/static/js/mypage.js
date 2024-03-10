let myinfoContent = document.querySelector('#mypageContentBox');
let html= ``;

// 1. 내정보
function onMyinfo(){
    $.ajax({
        url:'/member/mypage/myinfo',
        method:'get',
        success:(r)=>{
            console.log(r);

            document.querySelector('.nav_btn_badge').classList.remove('active');
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

// 2. 회원정보 변경
function updateInfo(){
    $.ajax({
        url:'/member/mypage/updateinfo',
        method:'post',
        success:(r)=>{
            console.log(r);
            document.querySelector('.nav_btn_badge').classList.remove('active');
            document.querySelector('.nav_btn_badge:nth-child(2)').classList.add('active');

            html = ``;

            html += `
                <form id="updateForm">
                    <ul>
                        <li>
                            <input type="text" onkeyup="idCheck()" id="mid" name="mid" placeholder="아이디 입력" disabled/>
                        </li>
                        <li>
                            <input type="password" onkeyup="pwCheck()" id="mpw" name="mpw" placeholder="비밀번호 입력"/>
                            <span class="pwcheckbox"></span>
                        </li>
                        <li>
                            <input type="password" onkeyup="pwCheck()" id="mpwconfirm" name="mpwconfirm" placeholder="비밀번호 재입력"/>
                            <span class="pwconfirmcheckbox"></span>
                        </li>
                        <li>
                            <input type="text" id="mname" name="mname" placeholder="이름 입력" disabled/>
                        </li>
                        <li>
                            <p>생년월일</p>
                            <select name="yy" onchange="birthCheck()" id="year" disabled></select>
                            <select name="mm" id="month" disabled></select>
                            <select name="dd" id="day" disabled></select>
                        </li>
                        <li>
                            <p>성별</p>
                            <div class="radioBox">남자<input type="radio" checked value="남자" name="msex"/></div>
                            <div class="radioBox">여자<input type="radio" value="여자" name="msex"/></div>
                        </li>
                        <li>
                            <input type="text" onkeyup="phoneCheck()" id="mphone" name="mphone" placeholder="전화번호 입력"/>
                            <span class="phonecheckbox"></span>
                        </li>
                        <li id="emailLi">
                            <input type="text" onkeyup="emailCheck()" id="memail" name="memail" placeholder="이메일 입력"/>
                            <button class="send" type="button" onclick="authreq()" disabled>
                                인증번호 발송
                            </button>
                            <span class="emailcheckbox"></span>
                        </li>
                        <li class="authbox">

                        </li>
                        <li>
                            <p>주소</p>
                            <div id="zipCode">
                                <input type="text" id="sample3_postcode" placeholder="우편번호">
                                <input type="button" onclick="sample3_execDaumPostcode()" value="검색">
                            </div>
                            <input type="text" id="sample3_address" class="maddress" name="maddress" placeholder="주소">
                            <input type="text" id="sample3_detailAddress" placeholder="상세주소">
                            <input type="text" id="sample3_extraAddress" placeholder="참고항목">

                            <div id="wrap" style="display:none;border:1px solid;width:500px;height:300px;margin:5px 0;position:relative">
                                <img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnFoldWrap" style="cursor:pointer;position:absolute;right:0px;top:-1px;z-index:1" onclick="foldDaumPostcode()" alt="접기 버튼">
                            </div>
                        </li>
                        <li>
                            <p>프로필 사진</p>
                            <input onchange="onChangeImg(this)" type="file" id="mimg" name="profileimg" accept="image/*"/>
                        </li>
                        <li class="priview">
                            <img id="preimg" src="/img/default.jpg"/>
                        </li>
                    </ul>
                    <button id="signupBtn" type="button" onclick="signup()">회원가입</button>
                    <button id="signupbackBtn" type="button">취소</button>
                </form>
            `;
            myinfoContent.innerHTML = html;
        }
    })
}