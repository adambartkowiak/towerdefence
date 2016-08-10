'user strict';
var app = app || {};

var FEATURE_TOGGLE = app.FeatureToggle;

//INIT
var timer = new support.Timer();
var canvas = document.getElementById("map");
var worldModel = new app.model.WorldModel();

timer.setTimerListener(worldModel.getGlobalEventListener());

var graphicsBuffor = new support.data.ImageDataList();

//ODCZYTWANIE PARAMETROW Z LINKA - POBRANIE GUIDA
var query = window.location.search.substring(1);
var vars = query.split("&");
var atr = vars[0].split("=");
var paramName = atr[0];
var paramValue = atr[1];


//USTALENIE CZY JSON STANU GRY LADUJE SIE Z PLIKU LOKALNEGO CZY Z WEBSERWISU
var loadFromFile = true;
var loadFromWebservice = !loadFromFile;

//LADWOANIE MAPY
var mapIsReady = false;

//ZAŁADUJ MAPE Z PLIKU.
if (loadFromFile) {
    var saveGameLoader = new support.Loader();

    app.loadGameSave = function loadGameSave(saveGameName) {
        saveGameLoader.loadJson(function (response) {
            mapIsReady =  app.loadGameFromMinifyString(response);

            if (!mapIsReady){
                return;
            }

            minimapView.setMapWidth(worldModel.getMapModel().getMapWidth());
            minimapView.setMapHeight(worldModel.getMapModel().getMapHeight());

            //LOAD MAP ASSETS!!! DO NAPRAWY !!!!
            //@NAPRAWIC TO !!!
            var graphicLength = worldModel.getMapModel().getMapGraphicModel().getTileArray().length;
            var graphicPath = null;
            for (var i = 0; i < graphicLength; i++) {

                graphicPath = worldModel.getMapModel().getMapGraphicModel().getTileArray()[i][0];
                if (graphicPath){
                    graphicPath = graphicPath.src;
                }

                if (graphicPath !== null && graphicsBuffor.get(graphicPath) === undefined){
                    console.log(graphicPath);
                    graphicsBuffor.load(graphicPath);
                }

                graphicPath = worldModel.getMapModel().getMapGraphicModel().getTileArray()[i][1];
                if (graphicPath){
                    graphicPath = graphicPath.src;
                }

                if (graphicPath !== null && graphicsBuffor.get(graphicPath) === undefined){
                    console.log(graphicPath);
                    graphicsBuffor.load(graphicPath);
                }

            }

            graphicPath = "assets/graphics/images/enemy0.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/enemy1.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/enemy2.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/enemy3.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/tower0.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/bullet0.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/bullet1.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/bullet2.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/bullet3.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/bullet4.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/base1.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/base2.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/base3.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/base4.png";
            graphicsBuffor.load(graphicPath);


            //-------objects
            graphicPath = "assets/graphics/images/base_03.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/base_04.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/bush_01.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/pine-none04.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/rock_01.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/rock_02.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/tree_01.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/goldmine_neutral.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/mineral_01_01.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/mineral_01_02.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/mineral_01_03.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/mineral_01_04.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/mineral_01_05.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/mineral_01_06.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/mineral_01_07.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/mineral_01_08.png";
            graphicsBuffor.load(graphicPath);

            //-------neutral
            graphicPath = "assets/graphics/images/building1_neutral.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/building2_neutral.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/unit1_neutral.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/unit2_neutral.png";
            graphicsBuffor.load(graphicPath);


            //-------team1
            graphicPath = "assets/graphics/images/building1_team1.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/building2_team1.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/unit1_team1.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/unit2_team1.png";
            graphicsBuffor.load(graphicPath);


            //-------tem2
            graphicPath = "assets/graphics/images/building1_team2.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/building2_team2.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/unit1_team2.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/unit2_team2.png";
            graphicsBuffor.load(graphicPath);




            //-------NEW UNITS
            graphicPath = "assets/graphics/images/tower_01.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/castle_01.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/warrior_01.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/enemy_01.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/tree_02.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/tree_02cut.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/tree_03.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/tree_03cut.png";
            graphicsBuffor.load(graphicPath);
            
            graphicPath = "assets/graphics/images/bush_02.png";
            graphicsBuffor.load(graphicPath);


            graphicPath = "assets/graphics/images/goldmine_neutral2.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/goldmine_neutral2ruin.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/worker_01.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/worker_01withwood.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/worker_01withgold.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/rock_03.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/goldicon.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/woodicon.png";
            graphicsBuffor.load(graphicPath);


            //-------MENU GRAPHIC
            graphicPath = "assets/graphics/menu/inGamePopupMenu.png";
            graphicsBuffor.load(graphicPath);


            graphicPath = "assets/graphics/menu/hudmenu_icongold.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/menu/hudmenu_iconwood.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/menu/hudmenu_iconarmy.png";
            graphicsBuffor.load(graphicPath);


            graphicPath = "assets/graphics/menu/hudmenu_buttonbrown.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/menu/hudmenu_buttongreen.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/menu/hudmenu_buttonred.png";
            graphicsBuffor.load(graphicPath);


        }, saveGameName);
    };

}


//ZAŁADOWANIE MAPY Z INTERNETU
if (loadFromWebservice) {

    //FUNKCJA DO LADOWANIA XMLA
    function loadXMLDoc(callback, url) {

        var request = new XMLHttpRequest();
        request.onload = function () {

            if (request.readyState == 4 && request.status == 200) {
                //wywolanie funkcji po pobraniu danych
                callback(request);
            }
        };

        request.open("GET", url, true);
        request.send();
    }

    //pobranie JSONA mapy i zaladowanie go zaraz po pobraniu
    loadXMLDoc(function (response) {
        mapIsReady = app.loadGameFromMinifyString(response.response);
        console.log(response.response);
    }, "LoadGame.php?" + paramName + "=" + paramValue);
}



//EVENTY MYSZKI
var mouseHandler = new app.mouseHandler.MouseEventHandler("map");
var mouse = new support.Mouse(mouseHandler);
mouse.initMouse();

//CONTROLLERS DATA
var entityListModel = worldModel.getEntityListModel(worldModel._collisionTreeModel);
var waypointCollisionListModel = worldModel.getWaypointCollisionListModel();

//CONTROLLERS
var collisionDetectionController = new app.controller.CollisionDetectionController(entityListModel);
var selectTargetController = new app.controller.SelectTargetController(entityListModel, collisionDetectionController);
var buildController = new app.controller.BuildController(entityListModel);
var moveController = new app.controller.MoveController(entityListModel);
var gatherController = new app.controller.GatherController(entityListModel);
var collisionRepulsionController = new app.controller.CollisionRepulsionController(entityListModel, collisionDetectionController);
var commandController = new app.controller.CommandController();
var waypointCollisionDetectionController = new app.controller.WaypointCollisionDetectionController(entityListModel, waypointCollisionListModel);
var waypointCollisionReactionController = new app.controller.WaypointCollisionReactionController(worldModel, entityListModel, waypointCollisionListModel);


//WIDOKI
var rootView = new support.view.RootView(canvas, mouseHandler);
var worldView = new app.view.WorldView(worldModel, 0, 0, rootView.getWidth(), rootView.getHeight(), commandController);

//Minimap
var minimapView = new support.view.MinimapView();

var minimapBackgroundImage = new Image();
minimapBackgroundImage.src = "assets/graphics/menu/background_minimap.png";
minimapView.setBackgroundImage(minimapBackgroundImage);

minimapView.setX(app.GuiConfig.minimapx);
minimapView.setY(app.GuiConfig.minimapy);
minimapView.setWidth(app.GuiConfig.minimapwidth);
minimapView.setHeight(app.GuiConfig.minimapheight);

minimapView.setMapWidth(worldModel.getMapModel().getMapWidth());
minimapView.setMapHeight(worldModel.getMapModel().getMapHeight());

minimapView.setViewPort(worldModel.getCameraModel());
minimapView.setElements(worldModel.getEntityListModel().getElements());

//Action Menu
var actionMenuView = new app.view.gui.ActionMenuView(app.GuiConfig.actionmenux, app.GuiConfig.actionmenuy, app.GuiConfig.actionmenuwidth, app.GuiConfig.actionmenuheight, commandController, worldModel.getActionMenu(), entityListModel);
var actionMenuBackgroundImage = new Image();
actionMenuBackgroundImage.src = "assets/graphics/menu/background_actionMenu.png";
actionMenuView.setBackgroundImage(actionMenuBackgroundImage);

//Entity Status View
var entityStatusView = new app.view.gui.EntityStatusView(app.GuiConfig.statusmenux, app.GuiConfig.statusmenuy, app.GuiConfig.statusmenuwidth, app.GuiConfig.statusmenuheight, worldModel.getSelectedEntityListModel());
var entityStatusBackgroundImage = new Image();
entityStatusBackgroundImage.src = "assets/graphics/menu/background_statusMenu.png";
entityStatusView.setBackgroundImage(entityStatusBackgroundImage);

//Hud Label Gold
var hudLabelGold = new support.view.LabelView(app.GuiConfig.hudmenugoldlabelx, app.GuiConfig.hudmenulabelsy, app.GuiConfig.hudmenulabelswidth, app.GuiConfig.hudmenulabelsheight);
var hudLabelGoldBackgroundImage = new Image();
hudLabelGoldBackgroundImage.src = "assets/graphics/menu/hudmenu_buttonbrown.png";
hudLabelGold.setBackgroundImage(hudLabelGoldBackgroundImage);
hudLabelGold.setText(worldModel.getTeamModelArray()[1].getResourcesJSON()["gold"]);

//Hud Label Wood
var hudLabelWood = new support.view.LabelView(app.GuiConfig.hudmenuwoodlabelx, app.GuiConfig.hudmenulabelsy, app.GuiConfig.hudmenulabelswidth, app.GuiConfig.hudmenulabelsheight);
hudLabelWood.setBackgroundImage(hudLabelGoldBackgroundImage);
hudLabelWood.setText(worldModel.getTeamModelArray()[1].getResourcesJSON()["wood"]);

//Hud Label Army
var hudLabelArmy = new support.view.LabelView(app.GuiConfig.hudmenuarmylabelx, app.GuiConfig.hudmenulabelsy, app.GuiConfig.hudmenulabelswidth, app.GuiConfig.hudmenulabelsheight);
hudLabelArmy.setBackgroundImage(hudLabelGoldBackgroundImage);
hudLabelArmy.setText("Army");

//Hud Label Time
var hudLabelTime = new support.view.LabelView(app.GuiConfig.hudmenutimelabelx, app.GuiConfig.hudmenulabelsy, app.GuiConfig.hudmenulabelswidth, app.GuiConfig.hudmenulabelsheight);
var hudLabelTimeBackgroundImage = new Image();
hudLabelTimeBackgroundImage.src = "assets/graphics/menu/hudmenu_buttongreen.png";
hudLabelTime.setBackgroundImage(hudLabelTimeBackgroundImage);
hudLabelTime.setText("TIME");

//Hud Button Menu
var hudButtonMenu = new support.view.LabelView(app.GuiConfig.hudmenumenubuttonx, app.GuiConfig.hudmenulabelsy, app.GuiConfig.hudmenulabelswidth, app.GuiConfig.hudmenulabelsheight);
var hudLabelMenuBackgroundImage = new Image();
hudLabelMenuBackgroundImage.src = "assets/graphics/menu/hudmenu_buttonred.png";
hudButtonMenu.setBackgroundImage(hudLabelMenuBackgroundImage);
hudButtonMenu.setText("MENU");


//DODAWANIE WIDOKOW DO ROOT VIEW
rootView.addView(worldView);
rootView.addView(minimapView);
rootView.addView(actionMenuView);
rootView.addView(entityStatusView);
rootView.addView(hudLabelGold);
rootView.addView(hudLabelWood);
rootView.addView(hudLabelArmy);
rootView.addView(hudLabelTime);
rootView.addView(hudButtonMenu);

//LOGIKA GRY
var logicFrames = 0;
var totalTimeDelta = 0;

var logicFunction = function () {

    //Nie wchodz do petli przed zaladowaniem mapy
    if (!mapIsReady) {
        return;
    }


    timer.updateDelta();

    if (timer.getDelta() === 0) {
        return;
    }

    totalTimeDelta += timer.getDelta();

    //Update mapy kolizji
    //update collision map - for optymalization porpouse
    collisionDetectionController.prepareObjectsGroups(worldModel.getMapModel());
    //check collision


    //react on collision

    //raport collision to




    //TWORZENIE OBIEKTOW
    /*
     buildUnits - entitys ktore sa jednostkami
     buildBuildings - entytis ktore sa budynkami
     buildBullets - entytis ktore sa pociskami
     */
    selectTargetController.update(timer.getDelta());
    buildController.update(timer.getDelta());
    //createEntityController.update();
    //shotController.update();

    //ROZPYCHANIE OBIEKTÓW
    /*
    rozpychanie obiektów jeżeli na siebie nachodzą
     */
    collisionRepulsionController.update(timer.getDelta());


    //PORUSZANIE OBIEKTAMI
    /*
     poruszanie jednostkami
     poruszanie pociskami
     */
    moveController.update(timer.getDelta(), worldModel.getMapModel());


    //POSTEPY ZBIERANIA SUROWCOW + ZAKANCZANIE ZBIERANIA SUROWCOW
    gatherController.update(timer.getDelta());

    //WYKRYWANIE KOLIZJI
    /*
     sprawdzanie chodzenia jednostek - czy juz doszla do punktu przeznaczenia
     sprawdzenia kolizji miedzy entytis
     tworzenie listy kolizji ktora zaszla w tym przebiegu petli
     */
    waypointCollisionDetectionController.update();


    //REAKCJA NA KOLIZJE
    /*
     modul reagowania na kolizje dotarcia do celu
     Dotarcie do celu jest wejscie na waypoint, ale waypointem tez moze byc dotarcie pocisku
     do przeciwnika - czyli kolizja trafienia.
     delegowanie o kolizji do wyspecjalizowanych modulow
     */
    waypointCollisionReactionController.update(); //deleguje obsluge kolizji do wyspecyjalizowanych modulow


    //SPRZATANIE PO PETLI
    /*
     kasowanie entytis, ktore juz nie sa potrzebne - np. jednostki ktore maja 0 hp.
     */
    //TODO: Dokodzic!!


    waypointCollisionListModel.clear();

    //Update HUD
    hudLabelGold.setText(worldModel.getTeamModelArray()[1].getResourcesJSON()["gold"]);
    hudLabelWood.setText(worldModel.getTeamModelArray()[1].getResourcesJSON()["wood"]);
    hudLabelArmy.setText(worldModel.getTeamModelArray()[1].getResourcesJSON()["army"]);

    hudLabelTime.setText();

    logicFrames++;

    //window.requestAnimationFrame(mainDraw);

};

//Start rendering after 100ms
setTimeout(mainDraw, 100);

//RENDEROWANIE
function mainDraw() {
    logicFunction();
    rootView.draw();

    window.requestAnimationFrame(mainDraw);
};


app.saveGame = function saveGame() {
    return worldModel.save();
};

app.saveGameToMinifyString = function saveGameToMinifyString() {
    var minifyJson = worldModel.getMinifyJSON();
    return JSON.stringify(minifyJson);
};

app.loadGame = function loadGame(stringJson) {
    try {
        var json = JSON.parse(stringJson);
        worldModel.loadFromJSON(json);
    }
    catch (e){
        return e.message;
    }

    return true;
};

app.loadGameFromMinifyString = function loadGameFromMinifyString(stringJson) {
    try {
        var worldModelMinifyJSON = JSON.parse(stringJson);
        worldModel.loadFromMinifyJSON(worldModelMinifyJSON);

        worldModel.getMapModel().getMapGraphicModel().initRootTileArray();
    }
    catch (e){
        return e.message;
    }

    return true;
};


app.saveGameToMinifyStringAndSendToBackend = function saveGameToMinifyStringAndSendToBackend(){

    console.log("Start Saving Game State");

    var saveGame = app.saveGameToMinifyString();
    var url = "SaveGame.php?" + atr[0] + "=" + atr[1] + "&saveName=jakasNazwa";

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function () {

        console.log(xmlhttp.response);

        //if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        //    //wywolanie funkcji po pobraniu danych
        //    //callback(xmlhttp);
        //}
    };

    var stringDataToSend = saveGame;
    xmlhttp.open("POST", url, true);
    xmlhttp.send(stringDataToSend);
};


app.saveScoreAndSendToBackend = function saveScoreAndSendToBackend(){

    var score = Math.round( Math.random() * 1000 );
    var url = "SaveScore?" + atr[0] + "=" + atr[1] + "&score=" + score;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function () {

        console.log(xmlhttp);

        //if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        //    //wywolanie funkcji po pobraniu danych
        //    //callback(xmlhttp);
        //}
    };

    var stringDataToSend = score;
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

};