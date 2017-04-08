/**
 * Created by donghyunkim on 2017. 4. 4..
 */


const boardViewModelListPrototype = {
    getBoardViewList : function(){
        return this.boardViewList;
    },
    setBoardViewList : function(){
        this.boardViewList = boardViewList;
    },
    createBoardViewModelList : function(data, user){

        data.forEach(function(val){
           let _id = val.boardId;
           let boardContent = val.boardContent;
           let boardCreatedDate = val.boardCreateDate;
           let boardImgUrl = val.boardImgUrl;
           let boardPublicState  = val.boardPulicState;
           let boardLikeCnt = val.boardLikeCnt;
           let userNickname = val.userNickname;
           let userProfileImgUrl = val.userProfileImgUrl;
           let userId = val.userId;
           let likeState = val.likeState;

           this.boardViewList.push(new BoardViewModel(_id,boardContent,boardCreatedDate,boardImgUrl,boardPublicState,boardLikeCnt,userNickname,userProfileImgUrl,userId,likeState));
        }.bind(this));
        this.renderingMainViewEvent.emit([{"type": "renderingMainViewHandler"}],[this.boardViewList,user]);
    },
    deleteBoardViewModel : function(){



    },
    updateBoardViewModel : function(){

    },
    getBoardViewModel : function(){

    },
    searchBoardViewModel : function(){

    }

};


function BoardViewModelList(boardViewList) {
    this.boardViewList = boardViewList;
    this.renderingMainViewEvent = new Observer();
}

BoardViewModelList.prototype = boardViewModelListPrototype;
