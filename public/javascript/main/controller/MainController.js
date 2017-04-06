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
    initMainViewHandler : function(data,userNickname){
        this.boardViewModelList.createBoardViewModelList(data,userNickname);
    },
    renderingMainViewHandler : function(data,userNickname){
        this.mainView.render(data,userNickname);
    },
    deleteBoardHandler : function(_id,reqListener){
        utility.runAjaxData(reqListener,"post","http://localhost:3000/board/deleteBoards",JSON.stringify({boardId : _id}),"application/json");
    },
    checkLikeBoardHandler : function(_id,state,reqListener){
        utility.runAjaxData(reqListener,"post","http://localhost:3000/board/checkLikeBoards",JSON.stringify({boardId : _id, state: state}),"application/json");
    }
};


function MainController(mainView,boardViewModelList) {
    this.mainView = mainView;
    this.boardViewModelList = boardViewModelList;
    let _this = this;
    // 등록
    mainView.initMainViewEvent.register({"type": "initMainViewHandler"},_this,_this.initMainViewHandler);
    mainView.boardDeleteEvent.register({"type" : "deleteBoardHandler"},_this,_this.deleteBoardHandler);
    mainView.checkLikeEvent.register({"type" : "checkLikeBoardHandler"},_this,_this.checkLikeBoardHandler);


    boardViewModelList.renderingMainViewEvent.register({"type": "renderingMainViewHandler"},_this,_this.renderingMainViewHandler);


}

MainController.prototype = mainControllerPrototype;

