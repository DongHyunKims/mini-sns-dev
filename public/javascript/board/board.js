/**
 * Created by donghyunkim on 2017. 4. 3..
 */





(function () {

    const defaultURL = "http://localhost:3000";


    utility.$selector("#confirm_btn").addEventListener("click",function(){
        let content = utility.$selector("#content_box").value;
        let imgFile = utility.$selector("#img-file-input").files[0];

        if(content===""){
            alert("내용을 입력 해 주세요!!");
        }
        else {

            var formData = new FormData();
            formData.append("imgFile", imgFile);
            formData.append("content", content);
            utility.runAjaxJson(reqListener, "post", defaultURL + "/board/insertBoard",formData );





        }
    });



    function reqListener(res){
        console.log(res);
        window.location = '/main';
    }

})();
