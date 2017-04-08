


const boardViewPrototype = {
    getId : function(){
        return this._id;
    },
    setId : function(_id){
        this._id = _id;
    },
    getBoardContent : function(){
        return this.boardContent;
    },
    setBoardContent : function(boardContent){
        this.boardContent = boardContent;
    },
    getBoardCreatedDate : function(){
        return this.boardCreatedDate;
    },
    setBoardCreatedDate : function(boardCreatedDate){
        this.boardCreatedDate = boardCreatedDate;
    },
    getBoardImgUrl : function(){
        return this.boardImgUrl;
    },
    setBoardImgUrl : function(boardImgUrl){
        this.boardImgUrl = boardImgUrl;
    },
    getBoardPublicState : function(){
        return this.boardPublicState;
    },
    setBoardPublicState : function(boardPublicState){
        this.boardPublicState = boardPublicState;
    },
    getUserNickname : function(){
        return this.userNickname;
    },
    setUserNickname : function(userNickname){
        this.userNickname = userNickname;
    },
    getUserProfileImgUrl : function(){
        return this.userProfileImgUrl;
    },
    setUserProfileImgUrl : function(userProfileImgUrl){
        this.userProfileImgUrl = userProfileImgUrl;
    },
    getUserId : function(){
        return this.userId;
    },
    setUserId : function(userId){
        this.userId = userId;
    },
    getBoardLikeCnt : function(){
        return this.boardLikeCnt;
    },
    setBoardLikeCnt : function(boardLikeCnt){
        this.boardLikeCnt = boardLikeCnt;
    },
    getLikeState : function(){
        return this.likeState;
    },
    setLikeState: function(likeState){
        this.likeState = likeState;
    }
};


function BoardViewModel(_id,boardContent,boardCreatedDate,boardImgUrl,boardPublicState,boardLikeCnt,userNickname,userProfileImgUrl,userId,likeState) {
    this._id = _id;
    this.boardContent = boardContent;
    this.boardCreatedDate = boardCreatedDate;
    this.boardImgUrl = boardImgUrl;
    this.boardPublicState = boardPublicState;
    this.boardLikeCnt = boardLikeCnt;
    this.userNickname = userNickname;
    this.userProfileImgUrl = userProfileImgUrl;
    this.userId = userId;
    this.likeState = likeState
}

BoardViewModel.prototype = boardViewPrototype;
