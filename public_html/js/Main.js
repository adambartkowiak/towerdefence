'user strict';
var app = app || {};

var timer = new support.Timer();
var canvas = document.getElementById("map");
var worldModel = new app.objects.WorldModel();
var hudModel = new app.objects.HudModel(0, 500);

var towerList = new app.objects.TowerList();
var enemyList = new app.objects.EnemyList();
var bulletList = new app.objects.BulletList();

//var map = new app.objects.Map(14,10,50,50, "assets/images/map1.png");
var map = new app.objects.Map(18,13,37.5,37.5, "assets/images/map2.png");
map.init();


//load JSON file
var mapIsReady = true;
//mapIsReady = false;
//var jsonMapLoader = new support.Loader();
//var loadedMap = null;
//jsonMapLoader.loadJson(function(response) {
//  // Parse JSON string into object
//    loadedMap = JSON.parse(response);
//    
//    map.loadMapModelFromJsonText(response);
//    
//    mapIsReady = true;
// }, "assets/maps/map1.json");
 
 
 

//var jsonGameLoader = new support.Loader();
//var loadedGame = null;
//var gameIsReady = false;
//jsonGameLoader.loadJson(function(response) {
//  // Parse JSON string into object
//    loadedGame = JSON.parse(response);
//   
//    
//    gameIsReady = true;
// }, "assets/maps/gameSave1.json");
 
 
 
 
 
var createGameSaveJson = function createGameSaveJson(){
    
    var hudJSON = hudModel;
    
    var mapJSON = worldModel.getMap();
    var towerListJSON = worldModel.getTowerList().getTowerList();
    var bulletListJSON = worldModel.getBulletList().getBulletList();
    var enemyListJSON = worldModel.getEnemyList().getEnemyList();
    
    var gameSave = new Object();
    gameSave.hudJSON = hudJSON;
    gameSave.mapJSON = mapJSON;
    gameSave.towerListJSON = towerListJSON;
    gameSave.bulletListJSON = bulletListJSON;
    gameSave.enemyListJSON = enemyListJSON;
    
    return JSON.stringify(gameSave);
};


var loadGameFromJson = function loadGameFromJson(gameJsonText){
    
    var gameJSON = JSON.parse(gameJsonText);
    var hudJSON = gameJSON.hudJSON;
    var mapJSON = gameJSON.mapJSON;
    var towerListJSON = gameJSON.towerListJSON;
    var bulletListJSON = gameJSON.bulletListJSON;
    var enemyListJSON = gameJSON.enemyListJSON;
    
    hudModel.loadHudModelFromJson(hudJSON);
    worldModel.getMap().loadMapModelFromJson(mapJSON);
    worldModel.getTowerList().loadTowerListFromJson(towerListJSON);
    worldModel.getBulletList().loadBulletListFromJson(bulletListJSON);
    worldModel.getEnemyList().loadEnemyListFromJson(enemyListJSON);
};




//create checkpoint list form JSON
var checkpointList = new app.objects.CheckpointList();
checkpointList.addCheckpoint(new app.objects.Checkpoint(0,75, 1, 0));
checkpointList.addCheckpoint(new app.objects.Checkpoint(125,75, 0, 1));
checkpointList.addCheckpoint(new app.objects.Checkpoint(125,225, 1, 0));
checkpointList.addCheckpoint(new app.objects.Checkpoint(175,225, 0, 1));
checkpointList.addCheckpoint(new app.objects.Checkpoint(175,325, -1, 0));
checkpointList.addCheckpoint(new app.objects.Checkpoint(75,325, 0, 1));
checkpointList.addCheckpoint(new app.objects.Checkpoint(75,425, 1, 0));
checkpointList.addCheckpoint(new app.objects.Checkpoint(275,425, 0, -1));
checkpointList.addCheckpoint(new app.objects.Checkpoint(275,275, 1, 0));
checkpointList.addCheckpoint(new app.objects.Checkpoint(325,275, 0, -1));
checkpointList.addCheckpoint(new app.objects.Checkpoint(325,175, -1, 0));
checkpointList.addCheckpoint(new app.objects.Checkpoint(225,175, 0, -1));
checkpointList.addCheckpoint(new app.objects.Checkpoint(225,75, 1, 0));
checkpointList.addCheckpoint(new app.objects.Checkpoint(625,75, 0, 1));
checkpointList.addCheckpoint(new app.objects.Checkpoint(625,275, -1, 0));
checkpointList.addCheckpoint(new app.objects.Checkpoint(525,275, 0, -1));
checkpointList.addCheckpoint(new app.objects.Checkpoint(525,175, -1, 0));
checkpointList.addCheckpoint(new app.objects.Checkpoint(425,175, 0, 1));
checkpointList.addCheckpoint(new app.objects.Checkpoint(425,425, 1, 0));
checkpointList.addCheckpoint(new app.objects.Checkpoint(700,425, 0, 0));

worldModel.setTowerList(towerList);
worldModel.setEnemyList(enemyList);
worldModel.setBulletList(bulletList);
worldModel.setCheckpointList(checkpointList);
worldModel.setMap(map);



var bulletManager = new app.managers.BulletManager(bulletList, enemyList, hudModel);
var towerManager = new app.managers.TowerManager(towerList, enemyList, bulletList);
var enemyManager = new app.managers.EnemyManager(enemyList, checkpointList);

var worldView = new app.objects.WorldView(canvas, worldModel);
var hudView = new app.objects.HudView(canvas, hudModel);

//Eventy myszki
var mouseHandler = new app.mouseHandler.MouseEventHandler(timer, worldModel, hudModel);
var mouse = new support.Mouse(mouseHandler);
mouse.initMouse();

var moveRight = true;
var logicFrames = 0;
var totalTimeDelta = 0;
    
//logika
setInterval(function(){ 
    
    if (!mapIsReady){
        return;
    }
    
    var nextEnemyMilis = 1500;
    var maxEnemies = 3000;
    
    timer.updateDelta();
    
    if (timer.getDelta() === 0){
        return;
    }
    
    totalTimeDelta += timer.getDelta();
    
    if(enemyList.length()<maxEnemies && totalTimeDelta >= nextEnemyMilis){
        
        var enemyType = Math.floor(Math.random() * 4);
        var speedBaseValue = 100;
        var hpBaseValue = 40;
        var enemySpeed = speedBaseValue / (enemyType + 1);
        var enemyHp = hpBaseValue * (enemyType + 1);
        
        enemyList.addEnemy(new app.objects.Enemy(0, 75, enemyHp, enemySpeed, enemyType));
        totalTimeDelta -= nextEnemyMilis;
    }
    
    towerManager.cooldownTimer(timer.getDelta());
    towerManager.tryShotToEnemy();
    
    enemyManager.moveEnemy(timer.getDelta());
    
    bulletManager.moveBullets(timer.getDelta());
    bulletManager.checkTargetsToHit();
    
    enemyManager.removeDeadEnemy();
    
    logicFrames++;
    
}, 16);

//renderowanie
setInterval(function(){ 
    
    if (!mapIsReady){
        return;
    }
    
    if (timer.getDelta() === 0){
        return;
    }
    
    worldView.draw(logicFrames);
    hudView.draw();
    
}, 16);
