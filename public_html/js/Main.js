'user strict';
var app = app || {};

//INIT
var timer = new support.Timer();
var canvas = document.getElementById("map");
var worldModel = new app.model.WorldModel();
//var hudModel = new app.objects.HudModel(0, 500);

//ZAŁADUJ MAPE Z PLIKU.
//var mapIsReady = false;
//var saveGameLoader = new support.Loader();
//var startGameState = null;

//app.loadGameSave = function loadGameSave(saveGameName) {
//    saveGameLoader.loadJson(function (response) {
//        app.loadGameFromJson(response);
//        mapIsReady = true;
//    }, saveGameName);
//};

//app.loadGameSave("assets/gamesaves/custom1.json");

//MANAGERY
//var bulletManager = new app.managers.BulletManager(worldModel.getBulletList(), worldModel.getEnemyList(), hudModel);
//var towerManager = new app.managers.TowerManager(worldModel.getTowerList(), worldModel.getEnemyList(), worldModel.getBulletList());
//var enemyManager = new app.managers.EnemyManager(worldModel.getEnemyList(), worldModel.getCheckpointList());


//DODANIE OBIEKTOW DO SWIATA
var entityListModel = new app.model.EntityListModel();
var collisionListModel = new app.model.ListModel();

var entity1 = new app.model.EntityModel();
entity1.setStartValueX(100);
entity1.setStartValueY(100);
entity1.setRadius(13);
entity1.setHp(100);
entity1.setCurrentHp(80);
entity1.setGroundSpeed(180);
entity1.setGraphicUrl("assets/images/enemy0.png");

//move list for entity1
var moveList1 = new app.model.ListModel();
//moveList1.addElement(new app.model.TargetModel(50, 50, 0, app.model.ActionTypeModel.MOVE));
//moveList1.addElement(new app.model.TargetModel(150, 50, 0, app.model.ActionTypeModel.MOVE));
//moveList1.addElement(new app.model.TargetModel(50, 150, 0, app.model.ActionTypeModel.MOVE));
//moveList1.addElement(new app.model.TargetModel(300, 50, 0, app.model.ActionTypeModel.MOVE));
//moveList1.addElement(new app.model.TargetModel(350, 200, 0, app.model.ActionTypeModel.MOVE));
entity1.setMoveList(moveList1);


/*
    ENTITY 2 BUDYNEK!!!
 */
var entity2 = new app.model.EntityModel();
entity2.setStartValueX(600);
entity2.setStartValueY(120);
entity2.setRadius(80);
entity2.setHp(1500);
entity2.setCurrentHp(1400);
entity2.setGraphicUrl("assets/images/comandCenter0.png");

var buildList2 = new app.model.ListModel();
var entityToBuild2 = new app.model.EntityModel();

entityToBuild2.setX(200);
entityToBuild2.setY(200);
entityToBuild2.setRadius(20);
entityToBuild2.setGroundSpeed(100);
entityToBuild2.setHp(100);
entityToBuild2.setCurrentHp(80);
entityToBuild2.setBuildTime(200);
entityToBuild2.setSelectable(false);
entityToBuild2.setGraphicUrl("assets/images/enemy0.png");

var entityToBuild2MoveList = new app.model.ListModel();
entityToBuild2MoveList.addElement(new app.model.TargetModel(50, 50, 0, app.model.ActionTypeModel.MOVE));
entityToBuild2MoveList.addElement(new app.model.TargetModel(50, 450, 0, app.model.ActionTypeModel.MOVE));
entityToBuild2MoveList.addElement(new app.model.TargetModel(550, 350, 0, app.model.ActionTypeModel.MOVE));
entityToBuild2MoveList.addElement(new app.model.TargetModel(450, 50, 0, app.model.ActionTypeModel.MOVE));
entityToBuild2.setMoveList(entityToBuild2MoveList);

buildList2.addElement(entityToBuild2);

entity2.setBuildList(buildList2);
entity2.setConstantBuild(true);


/*
    ENTITY 3 WIEZYCZKA
 */
var entity3 = new app.model.EntityModel();
entity3.setStartValueX(150);
entity3.setStartValueY(200);
entity3.setRadius(20);
entity3.setHp(300);
entity3.setCurrentHp(80);
entity3.setGraphicUrl("assets/images/tower0.png");


//move list for entity3 (tower)
var moveList3 = new app.model.ListModel();
moveList3.addElement(new app.model.TargetModel(-1, -1, entity1.getId(), app.model.ActionTypeModel.MOVE));
entity3.setMoveList(moveList3);


//build list for entity 3 (tower)
var buildList3 = new app.model.ListModel();
var entityToBuild = new app.model.EntityModel();

entityToBuild.setRadius(10);
entityToBuild.setAttackDamage(0);
entityToBuild.setGroundSpeed(400);
entityToBuild.setHp(1);
entityToBuild.setCurrentHp(1);
//entityToBuild.setBuildingTime(300);
entityToBuild.setGraphicUrl("assets/images/bullet0.png");
entityToBuild.setBuildTime(500);

//pocisk bedzie kierowany na entity 1 - to powinno byc ustalane w chwili wystrzalu a nie przy budowie
var toBuildMoveList = new app.model.ListModel();
toBuildMoveList.addElement(new app.model.TargetModel(-1, -1, entity1.getId(), app.model.ActionTypeModel.ATTACK));
entityToBuild.setMoveList(toBuildMoveList);

buildList3.addElement(entityToBuild);
entity3.setBuildList(buildList3);
entity3.setConstantBuild(true);


entityListModel.addElement(entity1);
entityListModel.addElement(entity2);
entityListModel.addElement(entity3);

worldModel.setEntityListModel(entityListModel);


//WIDOKI
var worldView = new app.view.WorldView(canvas, worldModel);
//var hudView = new app.objects.HudView(canvas, hudModel);

//EVENTY MYSZKI
var mouseHandler = new app.mouseHandler.MouseEventHandler(timer, entityListModel);
var mouse = new support.Mouse(mouseHandler);
mouse.initMouse();


//CONTROLLERS
var buildController = new app.controller.BuildController(entityListModel);
var moveController = new app.controller.MoveController(entityListModel);
var collisionDetectionController = new app.controller.CollisionDetectionController(entityListModel, collisionListModel);
var collisionReactionController = new app.controller.CollisionReactionController(entityListModel, collisionListModel);


//LOGIKA GRY
var logicFrames = 0;
var totalTimeDelta = 0;
var maxEnemies = 1000;
var nextEnemyMilis = 1500;
setInterval(function () {

    //if (!mapIsReady) {
    //    return;
    //}


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
    collisionDetectionController.update();


    //REAKCJA NA KOLIZJE
    /*
     modul reagowania na kolizje
     delegowanie o kolizji do wyspecjalizowanych modulow
     */
    collisionReactionController.update(); //deleguje obsluge kolizji do wyspecyjalizowanych modulow


    //SPRZATANIE PO PETLI
    /*
     kasowanie entytis, ktore juz nie sa potrzebne - np. jednostki ktore maja 0 hp.
     */
    //removeEntityController.update();


    collisionListModel.clear();

    //if (worldModel.getEnemyList().length() < maxEnemies && totalTimeDelta >= nextEnemyMilis) {
    //
    //    var enemyType = Math.floor(Math.random() * 4);
    //    var speedBaseValue = 100;
    //    var hpBaseValue = 40;
    //    var enemySpeed = speedBaseValue / (enemyType + 1);
    //    var enemyHp = hpBaseValue * (enemyType + 1);
    //
    //    //Dodawanie przeciwnika
    //    worldModel.getEnemyList().addEnemy(new app.objects.Enemy(worldModel.getCheckpointList().getCheckpoint(0).getX(), worldModel.getCheckpointList().getCheckpoint(0).getY(), enemyHp, enemySpeed, "assets/images/enemy0.png"));
    //    totalTimeDelta -= nextEnemyMilis;
    //}
    //
    //towerManager.cooldownTimer(timer.getDelta());
    //towerManager.tryShotToEnemy();
    //
    //enemyManager.moveEnemy(timer.getDelta());
    //
    //bulletManager.moveBullets(timer.getDelta());
    //bulletManager.checkTargetsToHit();
    //
    //enemyManager.removeDeadEnemy();

    logicFrames++;


}, 16);

//RENDEROWANIE
setInterval(function () {

    worldView.draw();
    //hudView.draw();

}, 16);


//app.createGameSaveJson = function createGameSaveJson() {
//
//    var hudJSON = hudModel;
//    var mapJSON = worldModel.getMap();
//    var checkpointListJSON = worldModel.getCheckpointList().getCheckpointList();
//    var towerListJSON = worldModel.getTowerList().getTowerList();
//    var bulletListJSON = worldModel.getBulletList().getBulletList();
//    var enemyListJSON = worldModel.getEnemyList().getEnemyList();
//
//    var gameSave = new Object();
//    gameSave.hudJSON = hudJSON;
//    gameSave.mapJSON = mapJSON;
//    gameSave.checkpointListJSON = checkpointListJSON;
//    gameSave.towerListJSON = towerListJSON;
//    gameSave.bulletListJSON = bulletListJSON;
//    gameSave.enemyListJSON = enemyListJSON;
//
//    return JSON.stringify(gameSave);
//};
//
//app.loadGameFromJson = function loadGameFromJson(gameJsonText) {
//
//    var gameJSON = JSON.parse(gameJsonText);
//    var hudJSON = gameJSON.hudJSON;
//    var mapJSON = gameJSON.mapJSON;
//    var checkpointListJSON = gameJSON.checkpointListJSON;
//    var towerListJSON = gameJSON.towerListJSON;
//    var bulletListJSON = gameJSON.bulletListJSON;
//    var enemyListJSON = gameJSON.enemyListJSON;
//
//    hudModel.loadHudModelFromJson(hudJSON);
//    worldModel.getMap().loadMapModelFromJson(mapJSON);
//    worldModel.getCheckpointList().loadCheckpointListFromJson(checkpointListJSON);
//    worldModel.getTowerList().loadTowerListFromJson(towerListJSON);
//    worldModel.getBulletList().loadBulletListFromJson(bulletListJSON);
//    worldModel.getEnemyList().loadEnemyListFromJson(enemyListJSON);
//};

