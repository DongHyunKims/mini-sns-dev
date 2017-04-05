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
    },
    deleteBoardEvent : function(){

    },
    updateBoardEvent : function(){

    },
    setEvent : function(){

    },
    getRenderingDom : function(){
        return this.renderingDom;
    },
    setRenderingDom : function(renderingDom){
        this.renderingDom = renderingDom;
    },
    _createTimeAgo(){
        let timeagoInstance = timeago();
        let timeDom = document.querySelectorAll(".board_date_info_block");
        timeDom.forEach((val)=>{
            val.innerText = timeagoInstance.format(val.innerText);
        });
    }
};

function MainView(renderingDom){
    this.renderingDom = renderingDom;
    this.initMainViewEvent = new Observer();
}

MainView.prototype = mainViewPrototype;

