'user strict';
var app = app || {};

//INIT
var timer = new support.Timer();
var canvas = document.getElementById("map");
var worldModel = new app.model.WorldModel();

//ODCZYTWANIE PARAMETROW Z LINKA - POBRANIE GUIDA
var query = window.location.search.substring(1);
var vars = query.split("&");
var atr = vars[0].split("=");
var paramName = atr[0];
var paramValue = atr[1];


//USTALENIE CZY JSON STANU GRY LADUJE SIE Z PLIKU LOKALNEGO CZY Z WEBSERWISU
var loadFromFile = false;
var loadFromWebservice = !loadFromFile;

//LADWOANIE MAPY
var mapIsReady = false;

//ZAŁADUJ MAPE Z PLIKU.
if (loadFromFile) {
    var saveGameLoader = new support.Loader();

    app.loadGameSave = function loadGameSave(saveGameName) {
        saveGameLoader.loadJson(function (response) {
            mapIsReady =  app.loadGameFromMinifyString(response);
        }, saveGameName);
    };

    app.loadGameSave("assets/gamesaves/newSaveGame004Minified.json");
    //app.loadGameSave("assets/gamesaves/newSaveGame001.json");
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
        }

        request.open("GET", url, true);
        request.send();
    }

    //pobranie JSONA mapy i zaladowanie go zaraz po pobraniu
    loadXMLDoc(function (response) {
        mapIsReady = app.loadGameFromMinifyString(response.response);
        console.log(response.response);
    }, "LoadGame.php?" + paramName + "=" + paramValue);
}





/*




 KOD SLUZACY DO GENEROWANIA MAPY NIE Z PLIKU ALE Z KODU!!!! TERAZ NIE JEST UZYWANY !!! :)



 */

//DODANIE OBIEKTOW DO SWIATA
//var entityListModel = new app.model.EntityListModel();
//var waypointCollisionListModel = new app.model.TargetListModel();


/*
 BASE1
 */
//var base1 = new app.model.EntityModel();
//base1.setTeam(1);
//base1.setRadius(80);
//base1.setMass(-1);
//base1.setStartValueX(60);
//base1.setStartValueY(200);
//base1.setHp(1000);
//base1.setCurrentHp(1000);
//base1.setTargetable(true);
//base1.setGraphicUrl("assets/images/base1.png");
//
////unit1
//var unit1 = new app.model.EntityModel();
//unit1.setTeam(1);
//unit1.setX(60);
//unit1.setY(200);
//unit1.setRadius(20);
//unit1.setGroundSpeed(120);
//unit1.setHp(100);
//unit1.setCurrentHp(100);
//unit1.setBuildTime(200);
//unit1.setSelectable(true);
//unit1.setTargetable(true);
//unit1.setGraphicUrl("assets/images/enemy0.png");
//
////unit1 move list
//var unit1MoveList = new app.model.ListModel();
//unit1MoveList.addElement(new app.model.TargetModel(700, 200, 5, 0, app.model.ActionTypeModel.MOVE_AND_AIM));
//unit1.setMoveList(unit1MoveList);
//
////unit1 build list
//var unit1BuildList = new app.model.ListModel();
//
//var unit1Bullet = new app.model.EntityModel();
//unit1Bullet.setRadius(10);
//unit1Bullet.setAttackDamage(0);
//unit1Bullet.setGroundSpeed(1500);
//unit1Bullet.setHp(1);
//unit1Bullet.setCurrentHp(1);
//unit1Bullet.setBuildTime(100);
//unit1Bullet.setGraphicUrl("assets/images/bullet0.png");
//unit1Bullet.setSelectable(false);
//unit1Bullet.setAttackRange(300);
//
//var unit1BulletMoveList = new app.model.ListModel();
//unit1BulletMoveList.addElement(new app.model.TargetModel(-1, -1, 5, 0, app.model.ActionTypeModel.ATTACK));
//unit1Bullet.setMoveList(unit1BulletMoveList);
//
//
//unit1BuildList.addElement(unit1Bullet);
//unit1.setBuildList(unit1BuildList);
//
////base1 build list
//var base1buildList = new app.model.ListModel();
//
//base1buildList.addElement(unit1);
//base1buildList.addElement(unit1);
//base1buildList.addElement(unit1);
//base1buildList.addElement(unit1);
//base1buildList.addElement(unit1);
//base1buildList.addElement(unit1);
//base1buildList.addElement(unit1);
//base1buildList.addElement(unit1);
//
//base1.setBuildList(base1buildList);
//
//
//
///*
//BASE2
// */
//var base2 = new app.model.EntityModel();
//base2.setTeam(2);
//base2.setRadius(80);
//base2.setMass(-1);
//base2.setStartValueX(700);
//base2.setStartValueY(150);
//base2.setHp(1000);
//base2.setCurrentHp(1000);
//base2.setTargetable(true);
//base2.setGraphicUrl("assets/images/base2.png");
//
////unit2
//var unit2 = new app.model.EntityModel();
//unit2.setTeam(2);
//unit2.setX(700);
//unit2.setY(150);
//unit2.setRadius(20);
//unit2.setGroundSpeed(80);
//unit2.setHp(300);
//unit2.setCurrentHp(300);
//unit2.setBuildTime(100);
//unit2.setSelectable(true);
//unit2.setTargetable(true);
//unit2.setGraphicUrl("assets/images/enemy3.png");
//
////unit2 move list
//var unit2MoveList = new app.model.ListModel();
//unit2MoveList.addElement(new app.model.TargetModel(60, 170, 5, 0, app.model.ActionTypeModel.MOVE_AND_AIM));
//unit2.setMoveList(unit2MoveList);
//
////unit2 build list
//var unit2BuildList = new app.model.ListModel();
//
//var unit2Bullet = new app.model.EntityModel();
//unit2Bullet.setRadius(10);
//unit2Bullet.setAttackDamage(0);
//unit2Bullet.setGroundSpeed(1500);
//unit2Bullet.setHp(1);
//unit2Bullet.setCurrentHp(1);
//unit2Bullet.setBuildTime(30);
//unit2Bullet.setGraphicUrl("assets/images/bullet2.png");
//unit2Bullet.setSelectable(false);
//unit2Bullet.setAttackRange(300);
//
//var unit2BulletMoveList = new app.model.ListModel();
//unit2BulletMoveList.addElement(new app.model.TargetModel(-1, -1, 5, 0, app.model.ActionTypeModel.ATTACK));
//unit2Bullet.setMoveList(unit2BulletMoveList);
//
//unit2BuildList.addElement(unit2Bullet);
//unit2.setBuildList(unit2BuildList);
//
////base2 build list
//var base2buildList = new app.model.ListModel();
//
//base2buildList.addElement(unit2);
//base2buildList.addElement(unit2);
//base2buildList.addElement(unit2);
//base2buildList.addElement(unit2);
//base2buildList.addElement(unit2);
//base2buildList.addElement(unit2);
//base2buildList.addElement(unit2);
//base2buildList.addElement(unit2);
//base2buildList.addElement(unit2);
//base2buildList.addElement(unit2);
//base2buildList.addElement(unit2);
//
//base2.setBuildList(base2buildList);
//
//
//
///*
//Dodanie budynkow do listy entity
// */
//entityListModel.addElement(base1);
//entityListModel.addElement(base2);
//worldModel.setEntityListModel(entityListModel);

//EVENTY MYSZKI
var mouseHandler = new app.mouseHandler.MouseEventHandler(timer, worldModel.getEntityListModel(), worldModel);
var mouse = new support.Mouse(mouseHandler);
mouse.initMouse();

//WIDOKI
var worldView = new app.view.WorldView(canvas, worldModel, mouseHandler);

//CONTROLLERS DATA
var entityListModel = worldModel.getEntityListModel();
var waypointCollisionListModel = worldModel.getWaypointCollisionListModel();

//CONTROLLERS
var selectTargetController = new app.controller.SelectTargetController(entityListModel);
var buildController = new app.controller.BuildController(entityListModel);
var moveController = new app.controller.MoveController(entityListModel);
var waypointCollisionDetectionController = new app.controller.WaypointCollisionDetectionController(entityListModel, waypointCollisionListModel);
var waypointCollisionReactionController = new app.controller.WaypointCollisionReactionController(entityListModel, waypointCollisionListModel);


//LOGIKA GRY
var logicFrames = 0;
var totalTimeDelta = 0;
setInterval(function () {

    //Nie wchodz do petli przed zaladowaniem mapy
    if (!mapIsReady) {
        return;
    }


    timer.updateDelta();

    if (timer.getDelta() === 0) {
        return;
    }

    totalTimeDelta += timer.getDelta();


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


    //PORUSZANIE OBIEKTAMI
    /*
     poruszanie jednostkami
     poruszanie pociskami
     */
    moveController.update(timer.getDelta());


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
    //removeEntityController.update();


    waypointCollisionListModel.clear();


    logicFrames++;


}, 16);

//RENDEROWANIE
setInterval(function () {

    worldView.draw(mapIsReady);

}, 16);

app.saveGame = function saveGame() {
    var save = worldModel.save();
    return save;
};

app.saveGameToMinifyString = function saveGameToMinifyString() {
    var minifyJson = worldModel.getMinifyJSON();
    return JSON.stringify(minifyJson);
};

app.loadGame = function loadGame(stringJson) {
    try {
        var json = JSON.parse(stringJson);
        worldModel.laodFromJSON(json);
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
    }

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
    }

    var stringDataToSend = score;
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

};