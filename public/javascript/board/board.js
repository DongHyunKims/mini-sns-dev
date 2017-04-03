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


            let data = {
                content: content,
                imgFile: imgFile,
            };
            data = JSON.stringify(data);
            utility.runAjaxJson(reqListener, "post", defaultURL + "/board/insertBoard", data);
        }
    });



    function reqListener(res){
        console.log(res);
        window.location = '/main';
    }

})();

