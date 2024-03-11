let sno = new URL( location.href ).searchParams.get('sno');

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
        document.querySelector('#sadress').value = r.sadress
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


function onUpdate(){
//1. 폼 가져온다
    let storeUpdateForm = document.querySelector('.storeUpdateForm');
    //2. 폼 객체화 (첨부파일 바이트화)
    let storeUpdateFormData= new FormData(storeUpdateForm);

        // + 폼 객체에 데이터 추가.[HTML 입력 폼 외 데이터 삽입 가능]
        //폼데이터객체명.set(속성명(name),데이터(value));
        storeUpdateFormData.set('sno',sno);

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



