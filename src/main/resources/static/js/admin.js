// 관리자 페이지로 들어가면 나올 js
// 관리자 자기 데이터 및 세션에 관리자 저장.


adminMview()
function adminMview(){ // 전체
    console.log('adminMview() 실행, 전체회원불러오기')
    $.ajax({
        url : "/admin/Mview",
        method : "get",
        success : (r)=>{
            console.log(r);
            // 어디에
            let adminMtable = document.querySelector("#adminMtable>tbody");
            // 무엇을
            let html = "";
            r.forEach((member1)=>{
                let daytime = member1.mdate.split(" ");
                html += `
                        <tr>
                           <th>${member1.mno}</th>
                           <th>${member1.mid}</th>
                           <th>${member1.mname}</th>
                           <th>daytime[0]</th>
                           <th>${member1.mstate}</th>
                       </tr>
                        `
            })
            adminMtable.innerHTML = html;

        }
    })

}