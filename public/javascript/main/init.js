/**
 * Created by donghyunkim on 2017. 4. 4..
 */



const defaultUrl = "http://localhost:3000";




(function () {

    let mainView;
    let boardViewModelList;
    let mainController;

    // 초기화

    document.addEventListener("DOMContentLoaded", function() {
        let renderingDom = utility.$selector(".board_main_block");
        mainView = new MainView(renderingDom);
        boardViewModelList = new BoardViewModelList([]);
        mainController = new MainController(mainView,boardViewModelList);
    });


    //ajax 콜백함수
    function reqListener() {
        let jsonDatas = JSON.parse(this.responseText);

        mainView.initMainViewEvent.emit([{"type": "initMainViewHandler"}], [jsonDatas.boardList,jsonDatas.user]);
    }

    document.addEventListener("DOMContentLoaded",utility.runAjax(reqListener,"GET",defaultUrl + "/board/getBoards"));

})();