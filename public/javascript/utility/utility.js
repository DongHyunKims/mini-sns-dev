/**
 * Created by donghyunkim on 2017. 4. 3..
 */
var utility = {
    $ : document,
    $selector : function(selector){
        return document.querySelector(selector);
    },
    //ajax 실행 메소드
    runAjax : function(reqListener, method, url){
        var xhr = new XMLHttpRequest();
        //reqListener 제일 마지막에 실행된다.
        xhr.addEventListener("load", reqListener);
        xhr.open(method, url);
        oReq.send();
    },
    runAjaxJson : function(reqListener, method, url, data, contentType){

        var xhr = new XMLHttpRequest();
        //reqListener 제일 마지막에 실행된다.

        xhr.open(method, url);
        //xhr.setRequestHeader("Content-Type","application/json");
        if(contentType !== undefined)
        xhr.setRequestHeader("Content-Type",contentType);

        xhr.send(data);
        xhr.addEventListener("load", reqListener);
    },
    //객체 생성 메소드
    makeObject : function (property, proto){
        //프로토 타입에 넣을 메소드를 모두 지정한다
        var obj = Object.create(proto);
        Object.keys(property).forEach(function(val){
            //해당 프로퍼티가 없으면 만든후 할당하고 아니면 덮어쓴다
            obj[val] = property[val];
        });
        return obj;
    }
};