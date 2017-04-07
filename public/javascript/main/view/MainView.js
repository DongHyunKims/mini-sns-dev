/**
 * Created by donghyunkim on 2017. 4. 4..
 */
//prototype 기반의 객체 만들기

const mainViewPrototype = {

    render : function(boardViewlModelist,user) {
        let mainTemplate = document.querySelector("#board_view").innerText;
        //1. 등록한 mainTemplate을 compile 함
        let template = Handlebars.compile(mainTemplate);

        //2. registerHelper 등록 ,json 형태의 데이터를 넘겨주면 handlebars 처리함
        Handlebars.registerHelper("boardViewlist", function () {
            return boardViewlModelist;
        });

        Handlebars.registerHelper("userId", function () {
            return user._ID;
        });

        Handlebars.registerHelper('ifCond', function(lvalue, options) {
            if (arguments.length < 2)
                throw new Error("Handlebars Helper equal needs 2 parameters");
            if( lvalue!=user.USER_NICKNAME) {
                return options.inverse(this);
            } else {
                return options.fn(this);
            }
        });


        //3. json 데이터 삽입
        mainTemplate = template({"boardViewlist": boardViewlModelist, userId : user._ID});
        this.renderingDom.innerHTML = mainTemplate;
        this._createTimeAgo();
        this._setEvent();


        let nameTemplate = document.querySelector("#login_nickname").innerText;

        let nameRendertemplate = Handlebars.compile(nameTemplate);
        Handlebars.registerHelper("userNickname", function () {
            return user.USER_NICKNAME;
        });

        nameTemplate = nameRendertemplate({userNickname: user.USER_NICKNAME});
        let nameRenderingDom = document.querySelector(".nickname_text");
        nameRenderingDom.innerText = nameTemplate;


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
                let _id = likeDom.parentNode.firstChild.nextSibling.value;
                let stateDom = likeDom.parentNode.childNodes.item(2).nextSibling;
                let state = stateDom.value;
                if(state==="0"){
                    likeDom.setAttribute("src","../images/icons/Like-Filled-48.png");
                    stateDom.setAttribute("value","1");
                }else{
                    likeDom.setAttribute("src","../images/icons/Like-50.png");
                    stateDom.setAttribute("value","0");
                }
                this.checkLikeEvent.emit([{"type":"checkLikeBoardHandler"}],[_id,state,this._likeBoardReqListener]);
            }
        }.bind(this));


        dropDownDom.addEventListener("click",function(event){
            let profileDom = event.target;

            if(profileDom.id === "profile_update_btn"){

                let profileImgFile = utility.$selector("#profileimg_file_input").files[0];

                let profileFormData = new FormData();
                profileFormData.append("profileImgFile", profileImgFile);

                this.updateProfileEvent.emit([{"type":"updateProfileHandler"}],[this._updateProfileReqListener,profileFormData]);
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
    _likeBoardReqListener : function(){
        let jsonDatas = JSON.parse(this.responseText);
        //mainView.initMainViewEvent.emit([{"type": "initMainViewHandler"}], [jsonDatas]);

        let likeData = jsonDatas[0];
        //console.log(likeData);
        let likeCount = likeData.count;
        let boardId = likeData.boardId;

        utility.$selector("#b_" +boardId).innerText = likeCount + " 개";

    },
    _updateProfileReqListener : function(){
        window.location.reload();
    }

};

function MainView(renderingDom){
    this.renderingDom = renderingDom;
    this.initMainViewEvent = new Observer();
    this.boardDeleteEvent = new Observer();
    this.checkLikeEvent = new Observer();
    this.updateProfileEvent = new Observer();
}

MainView.prototype = mainViewPrototype;

