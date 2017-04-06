/**
 * Created by donghyunkim on 2017. 4. 4..
 */


//이벤트 등록
const observerPrototype = {
    register : function(typeObj,context,handler){
        this.context = context;
        this.handlers[typeObj.type] = handler;
    },
    emit : function(typeObjList,args){
        typeObjList.forEach(function(typeObj){
            this.handlers[typeObj.type].apply(this.context,args);
        }.bind(this));

    },
    remove : function(typeObj){
        let regex = typeObj.type;
        delete this.handlers[regex];
    },
};


function Observer(){
   this.context = {};
   this.handlers = {};
}

Observer.prototype = observerPrototype;
