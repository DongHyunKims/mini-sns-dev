/**
 * Created by donghyunkim on 2017. 4. 3..
 */





(function () {

    const defaultURL = "http://localhost:3000";



    utility.$selector("#state_toggle > input").addEventListener("click",function(){
        let slideDom = utility.$selector("#state_toggle > input");
        console.log(slideDom.value);
        if(slideDom.value === "1"){
            slideDom.setAttribute("value","0");
        }
        else{
            slideDom.setAttribute("value","1");
        }
    });

    utility.$selector("#confirm_btn").addEventListener("click",function(){
        let content = utility.$selector("#content_box").value;
        let imgFile = utility.$selector("#img-file-input").files[0];
        let state = utility.$selector("#state_toggle > input").value;

        if(content===""){
            alert("내용을 입력 해 주세요!!");
        }
        else {
            var formData = new FormData();
            formData.append("imgFile", imgFile);
            formData.append("content", content);
            formData.append("state", state);
            utility.runAjaxData(reqListener, "post", defaultURL + "/board/insertBoard",formData );
        }
    });

    function reqListener(res){
        console.log(res);
        window.location = '/main';
    }

})();

