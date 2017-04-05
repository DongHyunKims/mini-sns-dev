/**
 * Created by donghyunkim on 2017. 4. 4..
 */
//prototype 기반의 객체 만들기

const mainViewPrototype = {

    render : function(boardViewlModelist) {
        let mainTemplate = document.querySelector("#board_view").innerText;
        //1. 등록한 mainTemplate을 compile 함
        let template = Handlebars.compile(mainTemplate);

        //2. registerHelper 등록 ,json 형태의 데이터를 넘겨주면 handlebars 처리함
        Handlebars.registerHelper("boardViewlist", function () {
            return boardViewlModelist;
        });
        //3. json 데이터 삽입
        mainTemplate = template({"boardViewlist": boardViewlModelist});
        this.renderingDom.innerHTML = mainTemplate;
        this._createTimeAgo();
        this. _setEvent();



    },
    getRenderingDom : function(){
        return this.renderingDom;
    },
    setRenderingDom : function(renderingDom){
        this.renderingDom = renderingDom;
    },
    _setEvent : function(){
        let dropDownDom = document.querySelector(".board_main_block");

        dropDownDom.addEventListener("click",function(event){
            let menuDom = event.target;
            let _id = menuDom.parentNode.firstChild.nextSibling.value;
            if(menuDom.className === "board_delete"){
                this.boardDeleteEvent.emit([{"type":"deleteBoardHandler"}],[_id,this._deleteBoardReqListener]);
            }
        }.bind(this));




        dropDownDom.addEventListener("click",function(event){
            let likeDom = event.target;

            if(Array.from(likeDom.classList).indexOf("like_btn") !== -1){
                let idList = likeDom.parentNode.firstChild.nextSibling.value.split("_");
                let _id = idList[0];
                let userId = idList[1];
                let stateDom = likeDom.parentNode.childNodes.item(2).nextSibling;
                let state = stateDom.value;
                if(state==="0"){
                    likeDom.setAttribute("src","../images/icons/Like-Filled-48.png");
                    stateDom.setAttribute("value","1");
                }else{
                    likeDom.setAttribute("src","../images/icons/Like-50.png");
                    stateDom.setAttribute("value","0");
                }
                this.checkLikeEvent.emit([{"type":"checkLikeBoardHandler"}],[_id,userId,state,this._likeBoardReqListener]);
            }
        }.bind(this));




    },
    _createTimeAgo : function(){
        let timeagoInstance = timeago();
        let timeDom = document.querySelectorAll(".board_date_info_block");
        timeDom.forEach((val)=>{
            val.innerText = timeagoInstance.format(val.innerText);
        });
    },
    _deleteBoardReqListener : function(){
        window.location.reload();
    },
    _likeBoardReqListener : function(res){
        //let jsonDatas = JSON.parse(this.responseText);
        //mainView.initMainViewEvent.emit([{"type": "initMainViewHandler"}], [jsonDatas]);
        console.log("res",res);
    }
};

function MainView(renderingDom){
    this.renderingDom = renderingDom;
    this.initMainViewEvent = new Observer();
    this.boardDeleteEvent = new Observer();
    this.checkLikeEvent = new Observer();
}

MainView.prototype = mainViewPrototype;

