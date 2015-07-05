'user strict';
var app = app || {};

var timer = new support.Timer();
var canvas = document.getElementById("map");
var worldModel = new app.objects.WorldModel();
var hudModel = new app.objects.HudModel(0, 0);

var towerList = new app.objects.TowerList();
var enemyList = new app.objects.EnemyList();
var bulletList = new app.objects.BulletList();

//load JSON file
var jsonLoader = new support.Loader();

var loadedMap = null;
jsonLoader.loadJson(function(response) {
  // Parse JSON string into object
    loadedMap = JSON.parse(response);
 }, "assets/maps/map1.json");



console.log(loadedMap);


//wczytywanie mapy
var map = new app.objects.Map(14,10,50,50);
map.init();

//loadMapFromJSON
//
//imagePath
//mapFieldWidthAndHeight
//mapWidthAndHeight
//Fields
//checkpointList


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
    
    var nextEnemyMilis = 2500;
    
    timer.updateDelta();
    
    if (timer.getDelta() === 0){
        return;
    }
    
    totalTimeDelta += timer.getDelta();
    
    if(enemyList.length()<3 && totalTimeDelta >= nextEnemyMilis){
        
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
    
    if (timer.getDelta() === 0){
        return;
    }
    
    worldView.draw(logicFrames);
    hudView.draw();
    
}, 16);
