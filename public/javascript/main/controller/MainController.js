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
    initMainViewHandler : function(data,user){
        this.boardViewModelList.createBoardViewModelList(data,user);
    },
    renderingMainViewHandler : function(data,user){
        this.mainView.render(data,user);
    },
    deleteBoardHandler : function(_id,reqListener){
        utility.runAjaxData(reqListener,"post","http://localhost:3000/board/deleteBoards",JSON.stringify({boardId : _id}),"application/json");
    },
    checkLikeBoardHandler : function(_id,state,reqListener){
        utility.runAjaxData(reqListener,"post","http://localhost:3000/board/checkLikeBoards",JSON.stringify({boardId : _id, state: state}),"application/json");
    },
    updateProfileHandler : function(reqListener,formData){
        //console.log("formData",formData);

        utility.runAjaxData(reqListener,"post","http://localhost:3000/board/updateProfile",formData);
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
    mainView.updateProfileEvent.register({"type" : "updateProfileHandler"},_this,_this.updateProfileHandler);

    boardViewModelList.renderingMainViewEvent.register({"type": "renderingMainViewHandler"},_this,_this.renderingMainViewHandler);


}

MainController.prototype = mainControllerPrototype;

