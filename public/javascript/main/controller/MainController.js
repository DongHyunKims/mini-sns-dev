/**
 * Created by donghyunkim on 2017. 4. 4..
 */


// 모든 view와 model에 대한 조작
const mainControllerPrototype = {
    getMainView : function(){
        return this.mainView;
    },
    setMainView : function(mainView){
        this.mainView = mainView;
    },
    getBoardViewModelList : function(){
        return this.boardViewModelList;
    },
    setBoardViewModelList: function(boardViewModelList){
        this.boardViewModelList = boardViewModelList;
    },
    getHandlers : function(){
        return this.handlers;
    },
    setHandlers : function(handlers){
        this.handlers = handlers;
    },
    initMainViewHandler : function(data){
        this.boardViewModelList.createBoardViewModelList(data);
    },
    renderingMainViewHandler : function(data){
        this.mainView.render(data);
    }
};


function MainController(mainView,boardViewModelList) {
    this.mainView = mainView;
    this.boardViewModelList = boardViewModelList;
    let _this = this;

    // 등록
    mainView.initMainViewEvent.register({"type": "initMainViewHandler"},_this,_this.initMainViewHandler);
    boardViewModelList.renderingMainViewEvent.register({"type": "renderingMainViewHandler"},_this,_this.renderingMainViewHandler)

}

MainController.prototype = mainControllerPrototype;

