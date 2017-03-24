'user strict';
var app = app || {};

var FEATURE_TOGGLE = app.FeatureToggle;

//INIT
var timer = new support.Timer();
var logicTimer = new support.Timer();
var rendererTimer = new support.Timer();

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
            mapIsReady = app.loadGameFromMinifyString(response);

            if (!mapIsReady) {
                return;
            }

            minimapView.setMapWidth(worldModel.getMapModel().getMapWidth());
            minimapView.setMapHeight(worldModel.getMapModel().getMapHeight());


            //LOAD MAP ASSETS!!! DO NAPRAWY !!!!
            //@NAPRAWIC TO !!!
            var graphicLength = worldModel.getMapModel().getMapGraphicModel().getTileArray().length;
            var graphicPath = null;
            var graphicRootPath =  null;
            for (var i = 0; i < graphicLength; i++) {

                graphicPath = worldModel.getMapModel().getMapGraphicModel().getTileArray()[i][0];
                if (graphicPath) {
                    graphicPath = graphicPath.src;
                }

                if (graphicPath !== null && graphicsBuffor.get(graphicPath) === undefined) {
                    console.log(graphicPath);
                    graphicsBuffor.load(graphicPath);
                }

                graphicPath = worldModel.getMapModel().getMapGraphicModel().getTileArray()[i][1];
                if (graphicPath) {
                    graphicPath = graphicPath.src;
                }

                if (graphicPath !== null && graphicsBuffor.get(graphicPath) === undefined) {
                    console.log(graphicPath);
                    graphicsBuffor.load(graphicPath);
                }

            }


            //-------NEW UNITS
            graphicPath = "assets/graphics/images/barracks01_t01.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/bullet0.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/bush01.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/bush02.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/castle_t01.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/cottage01_t01.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/cottage02_t01.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/goldmine01.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/goldmine01out.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/monster_t02.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/rock01.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/rock02.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/rock03.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/rock04.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/tower_t01.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/tree01.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/tree01cut.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/tree02.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/tree02cut.png";
            graphicsBuffor.load(graphicPath);


            graphicPath = "assets/graphics/images/warrior_t01.png";
            graphicsBuffor.load(graphicPath);


            graphicPath = "assets/graphics/images/worker_t01.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/workerwithwood_t01.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/workerwithgold_t01.png";
            graphicsBuffor.load(graphicPath);


            //-------INTERFACE ICONS
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

            graphicPath = "assets/graphics/images/cottage_team01.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/cottageA_team01.png";
            graphicsBuffor.load(graphicPath);

            graphicPath = "assets/graphics/images/barracks_team01.png";
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

//MOUSE + MOUSE HANDEL
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
var updatePositionController = new app.controller.UpdatePositionController(entityListModel);
var commandController = new app.controller.CommandController();
var waypointCollisionDetectionController = new app.controller.WaypointCollisionDetectionController(entityListModel, waypointCollisionListModel);
var waypointCollisionReactionController = new app.controller.WaypointCollisionReactionController(worldModel, entityListModel, waypointCollisionListModel);
var attackController = new app.controller.AttackController(entityListModel, collisionDetectionController);
var removeEntityController = new app.controller.RemoveEntityController(entityListModel);

//VIEWS
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
var actionMenuView = new app.view.gui.ActionMenuView(app.GuiConfig.actionmenux, app.GuiConfig.actionmenuy, app.GuiConfig.actionmenuwidth, app.GuiConfig.actionmenuheight, commandController, worldModel.getActionMenu(), entityListModel, worldModel.getEntityDictionary());
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
var hudLabelGoldIcon = new Image();
hudLabelGoldIcon.src = "assets/graphics/menu/hudmenu_icongold.png";

hudLabelGold.setBackgroundImage(hudLabelGoldBackgroundImage);
hudLabelGold.setLabelIcon(hudLabelGoldIcon);


var teamResources = worldModel.getTeamListModel().getElement(1);
var goldValue = 0;

if (!!teamResources) {
    goldValue = worldModel.getTeamListModel().getElement(1).getResourcesArray()["gold"];
}

hudLabelGold.setText(goldValue);
hudLabelGold.setTextOffsetX(10);

//Hud Label Wood
var hudLabelWood = new support.view.LabelView(app.GuiConfig.hudmenuwoodlabelx, app.GuiConfig.hudmenulabelsy, app.GuiConfig.hudmenulabelswidth, app.GuiConfig.hudmenulabelsheight);
var hudLabelWoodIcon = new Image();
hudLabelWoodIcon.src = "assets/graphics/menu/hudmenu_iconwood.png";

hudLabelWood.setBackgroundImage(hudLabelGoldBackgroundImage);
hudLabelWood.setLabelIcon(hudLabelWoodIcon);
var woodValue = 0;

if (!!teamResources) {
    woodValue = worldModel.getTeamListModel().getElement(1).getResourcesArray()["wood"];
}
hudLabelWood.setText(woodValue);
hudLabelWood.setTextOffsetX(10);

//Hud Label Army
var hudLabelArmy = new support.view.LabelView(app.GuiConfig.hudmenuarmylabelx, app.GuiConfig.hudmenulabelsy, app.GuiConfig.hudmenulabelswidth, app.GuiConfig.hudmenulabelsheight);
var hudLabelArmyIcon = new Image();
hudLabelArmyIcon.src = "assets/graphics/menu/hudmenu_iconarmy.png";

hudLabelArmy.setBackgroundImage(hudLabelGoldBackgroundImage);
hudLabelArmy.setLabelIcon(hudLabelArmyIcon);
hudLabelArmy.setText("Army");
hudLabelArmy.setTextOffsetX(10);

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


//ADDING VIEWS TO ROOT VIEW
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
var logicLoopNumber = 0;

var physicStepInMilis = 1000.0 / 20.0;
var physicDeltaAccumulator = 0;

var logicFunction = function (timeDelta) {

    //Nie wchodz do petli przed zaladowaniem mapy
    if (!mapIsReady) {
        return;
    }

    physicDeltaAccumulator += timeDelta;

    if (physicDeltaAccumulator > 5000) {
        console.log("PAUSE WINDOW - DELTA TO LONG: " + physicDeltaAccumulator + "ms");
        physicDeltaAccumulator = 0;
        return;
    }

    while (physicDeltaAccumulator >= physicStepInMilis) {

        logicLoopNumber++;

        physicDeltaAccumulator -= physicStepInMilis;

        //Update mapy kolizji
        //update collision map - for optymalization porpouse
        collisionDetectionController.prepareObjectsGroups(worldModel.getMapModel());

        //TWORZENIE OBIEKTOW
        /*
         buildUnits - entitys ktore sa jednostkami
         buildBuildings - entytis ktore sa budynkami
         buildBullets - entytis ktore sa pociskami
         */
        buildController.update(physicStepInMilis);

        selectTargetController.update(physicStepInMilis);
        //createEntityController.update();
        //shotController.update();

        //Atakowanie
        attackController.update(physicStepInMilis);


        //POSTEPY ZBIERANIA SUROWCOW + ZAKANCZANIE ZBIERANIA SUROWCOW
        gatherController.update(physicStepInMilis);

        //PORUSZANIE OBIEKTAMI
        /*
         poruszanie jednostkami
         poruszanie pociskami
         */
        moveController.update(physicStepInMilis, worldModel.getMapModel());

        //ROZPYCHANIE OBIEKTÓW
        /*
         rozpychanie obiektów jeżeli na siebie nachodzą
         */
        collisionRepulsionController.update(physicStepInMilis);


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
        removeEntityController.update(physicStepInMilis);


        waypointCollisionListModel.clear();

        updatePositionController.update(physicStepInMilis, logicLoopNumber);

    }


    //Update HUD
    var teamResources = worldModel.getTeamListModel().getElement(1);

    if (teamResources !== null) {
        if (teamResources.getResourcesArray()["gold"] === undefined) {
            teamResources.getResourcesArray()["gold"] = 0;
        }

        if (teamResources.getResourcesArray()["wood"] === undefined) {
            teamResources.getResourcesArray()["wood"] = 0;
        }

        if (teamResources.getResourcesArray()["army"] === undefined) {
            teamResources.getResourcesArray()["army"] = 0;
        }

        hudLabelGold.setText(teamResources.getResourcesArray()["gold"]);
        hudLabelWood.setText(teamResources.getResourcesArray()["wood"]);
        hudLabelArmy.setText(teamResources.getResourcesArray()["army"]);
    }


    var date = new Date();
    var minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    var seconds = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();
    hudLabelTime.setText(date.getHours() + ":" + minutes + ":" + seconds);

    logicFrames++;

    //window.requestAnimationFrame(mainDraw);

};


//URUCHOMIENIE PETLI LOGIKI
setTimeout(function () {
    mainDraw();
}, 100);

//Główna pętla gry
function mainDraw() {

    window.requestAnimationFrame(mainDraw);

    timer.updateDelta();

    //Wykonanie logiki
    logicTimer.updateDelta();
    logicFunction(timer.getDelta());
    logicTimer.updateDelta();

    rendererTimer.updateDelta();
    rootView.draw(physicDeltaAccumulator, physicStepInMilis);
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
    catch (e) {
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
    catch (e) {
        return e.message;
    }

    return true;
};


app.saveGameToMinifyStringAndSendToBackend = function saveGameToMinifyStringAndSendToBackend() {

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


app.saveScoreAndSendToBackend = function saveScoreAndSendToBackend() {

    var score = Math.round(Math.random() * 1000);
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