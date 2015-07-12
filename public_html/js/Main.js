'user strict';
var app = app || {};

//INIT
var timer = new support.Timer();
var canvas = document.getElementById("map");
var worldModel = new app.objects.WorldModel();
var hudModel = new app.objects.HudModel(0, 500);

//ZAŁADUJ MAPE Z PLIKU.
var mapIsReady = false;
var saveGameLoader = new support.Loader();
var startGameState = null;

app.loadGameSave = function loadGameSave(saveGameName){
    saveGameLoader.loadJson(function(response) {
        app.loadGameFromJson(response);
        mapIsReady = true;
     }, saveGameName);
};

app.loadGameSave("assets/gamesaves/gamesave1.json");

//MANAGERY
var bulletManager = new app.managers.BulletManager(worldModel.getBulletList(), worldModel.getEnemyList(), hudModel);
var towerManager = new app.managers.TowerManager(worldModel.getTowerList(), worldModel.getEnemyList(), worldModel.getBulletList());
var enemyManager = new app.managers.EnemyManager(worldModel.getEnemyList(), worldModel.getCheckpointList());

//WIDOKI
var worldView = new app.objects.WorldView(canvas, worldModel);
var hudView = new app.objects.HudView(canvas, hudModel);

//EVENTY MYSZKI
var mouseHandler = new app.mouseHandler.MouseEventHandler(timer, worldModel, hudModel);
var mouse = new support.Mouse(mouseHandler);
mouse.initMouse();

//LOGIKA GRY
var logicFrames = 0;
var totalTimeDelta = 0;
var nextEnemyMilis = 500;
setInterval(function(){ 
    
    if (!mapIsReady){
        return;
    }
    
    var maxEnemies = 3000;
    
    timer.updateDelta();
    
    if (timer.getDelta() === 0){
        return;
    }
    
    totalTimeDelta += timer.getDelta();
    
    if(worldModel.getEnemyList().length()<maxEnemies && totalTimeDelta >= nextEnemyMilis){
        
        var enemyType = Math.floor(Math.random() * 4);
        var speedBaseValue = 100;
        var hpBaseValue = 40;
        var enemySpeed = speedBaseValue / (enemyType + 1);
        var enemyHp = hpBaseValue * (enemyType + 1);
        
        //Dodawanie przeciwnika
        worldModel.getEnemyList().addEnemy(new app.objects.Enemy(worldModel.getCheckpointList().getCheckpoint(0).getX(), worldModel.getCheckpointList().getCheckpoint(0).getY(), enemyHp, enemySpeed, "assets/images/enemy0.png"));
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

//RENDEROWANIE
setInterval(function(){ 
    
//    if (!mapIsReady){
//        return;
//    }
//    
//    if (timer.getDelta() === 0){
//        return;
//    }
    
    worldView.draw(logicFrames);
    hudView.draw();
    
}, 16);



app.createGameSaveJson = function createGameSaveJson(){
    
    var hudJSON = hudModel;
    var mapJSON = worldModel.getMap();
    var checkpointListJSON = worldModel.getCheckpointList().getCheckpointList();
    var towerListJSON = worldModel.getTowerList().getTowerList();
    var bulletListJSON = worldModel.getBulletList().getBulletList();
    var enemyListJSON = worldModel.getEnemyList().getEnemyList();
    
    var gameSave = new Object();
    gameSave.hudJSON = hudJSON;
    gameSave.mapJSON = mapJSON;
    gameSave.checkpointListJSON = checkpointListJSON;
    gameSave.towerListJSON = towerListJSON;
    gameSave.bulletListJSON = bulletListJSON;
    gameSave.enemyListJSON = enemyListJSON;
    
    return JSON.stringify(gameSave);
};

app.loadGameFromJson = function loadGameFromJson(gameJsonText){
    
    var gameJSON = JSON.parse(gameJsonText);
    var hudJSON = gameJSON.hudJSON;
    var mapJSON = gameJSON.mapJSON;
    var checkpointListJSON = gameJSON.checkpointListJSON;
    var towerListJSON = gameJSON.towerListJSON;
    var bulletListJSON = gameJSON.bulletListJSON;
    var enemyListJSON = gameJSON.enemyListJSON;
    
    hudModel.loadHudModelFromJson(hudJSON);
    worldModel.getMap().loadMapModelFromJson(mapJSON);
    worldModel.getCheckpointList().loadCheckpointListFromJson(checkpointListJSON);
    worldModel.getTowerList().loadTowerListFromJson(towerListJSON);
    worldModel.getBulletList().loadBulletListFromJson(bulletListJSON);
    worldModel.getEnemyList().loadEnemyListFromJson(enemyListJSON);
};

