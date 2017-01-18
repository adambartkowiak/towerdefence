<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <!-- JQUERY -->
    <script src="lib/jquery/jquery-2.1.4.min.js"></script>

    <!-- BOOSTRAP - Latest compiled and minified CSS -->
    <link rel="stylesheet" type="text/css" href="lib/bootstrap-3.3.5-dist/css/bootstrap.min.css"/>

    <!-- BOOSTRAP - Optional theme -->
    <link rel="stylesheet" type="text/css" href="lib/bootstrap-3.3.5-dist/css/bootstrap-theme.min.css"/>

    <!-- BOOSTRAP - Latest compiled and minified JavaScript -->
    <script src="lib/bootstrap-3.3.5-dist/js/bootstrap.min.js"></script>


    <!-- FANCYtrEE -->
    <!--    <script src="http://code.jquery.com/jquery-latest.min.js"></script>-->
    <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>

    <link href="lib/fancytree-master/src/skin-lion/ui.fancytree.css" rel="stylesheet" type="text/css">

    <script src="lib/fancytree-master/src/jquery.fancytree.js" type="text/javascript"></script>
    <script src="lib/fancytree-master/src/jquery.fancytree.edit.js" type="text/javascript"></script>

    <!-- MY FILES -->
    <link rel="stylesheet" type="text/css" href="css/editor.css"/>

    <title>STD: GameEditor</title>
</head>
<body>

<!-- Utils -->
<script type="text/javascript" src="js/utils/Utils.js"></script>

<!-- Support -->
<script type="text/javascript" src="js/support/Timer.js"></script>
<script type="text/javascript" src="js/support/Mouse.js"></script>
<script type="text/javascript" src="js/support/MouseEvent.js"></script>
<script type="text/javascript" src="js/support/MouseEventType.js"></script>
<script type="text/javascript" src="js/support/AbstractMouseEventHandler.js"></script>
<script type="text/javascript" src="js/support/Loader.js"></script>
<script type="text/javascript" src="js/support/AbstractMouseEventListener.js"></script>
<script type="text/javascript" src="js/support/data/ImageDataList.js"></script>

<script type="text/javascript" src="js/support/geom/Point2d.js"></script>
<script type="text/javascript" src="js/support/geom/SimpleVector2d.js"></script>
<script type="text/javascript" src="js/support/geom/Vector2d.js"></script>
<script type="text/javascript" src="js/support/geom/Circle.js"></script>
<script type="text/javascript" src="js/support/geom/Rect.js"></script>
<script type="text/javascript" src="js/support/geom/shape/FreeShape.js"></script>

<script type="text/javascript" src="js/support/geom/collisions/Collision.js"></script>

<script type="text/javascript" src="js/support/graphics/Image.js"></script>

<script type="text/javascript" src="js/support/view/AbstractView.js"></script>
<script type="text/javascript" src="js/support/view/AbstractViewGroup.js"></script>
<script type="text/javascript" src="js/support/view/AbsoluteLayoutView.js"></script>
<script type="text/javascript" src="js/support/view/LabelView.js"></script>
<script type="text/javascript" src="js/support/view/ButtonView.js"></script>
<script type="text/javascript" src="js/support/view/MinimapView.js"></script>
<script type="text/javascript" src="js/support/view/RootView.js"></script>

<script type="text/javascript" src="js/support/command/AbstractCommand.js"></script>

<!-- Game Files -->

<!--CONFIGS-->
<script type="text/javascript" src="js/app/GuiConfig.js"></script>
<script type="text/javascript" src="js/app/FeatureToggle.js"></script>

<!--HELPER-->
<script type="text/javascript" src="js/helper/Helper.js"></script>

<!--ENUM-->
<script type="text/javascript" src="js/app/enum/GameEventEnum.js"></script>
<script type="text/javascript" src="js/app/enum/FunctionEnum.js"></script>
<script type="text/javascript" src="js/app/enum/EntityPropertyEnum.js"></script>

<!--LISTENER-->
<script type="text/javascript" src="js/app/listener/GlobalEventListener.js"></script>

<!--MODEL-->
<script type="text/javascript" src="js/app/model/AvailableActionsModel.js"></script>
<script type="text/javascript" src="js/app/model/WorldModel.js"></script>
<script type="text/javascript" src="js/app/model/TaskForEntityModel.js"></script>
<script type="text/javascript" src="js/app/model/TaskModel.js"></script>
<script type="text/javascript" src="js/app/model/GameEventModel.js"></script>
<script type="text/javascript" src="js/app/model/TriggerModel.js"></script>
<script type="text/javascript" src="js/app/model/ResourceModel.js"></script>
<script type="text/javascript" src="js/app/model/EntityModelIndex.js"></script>
<script type="text/javascript" src="js/app/model/TeamModel.js"></script>
<script type="text/javascript" src="js/app/model/EntityAttackModel.js"></script>
<script type="text/javascript" src="js/app/model/EntityStateModel.js"></script>
<script type="text/javascript" src="js/app/model/EntityModel.js"></script>
<script type="text/javascript" src="js/app/model/ObjectiveModel.js"></script>
<script type="text/javascript" src="js/app/model/ListModel.js"></script>
<script type="text/javascript" src="js/app/model/EntityAttackListModel.js"></script>
<script type="text/javascript" src="js/app/model/EntityStateListModel.js"></script>
<script type="text/javascript" src="js/app/model/GameEventListModel.js"></script>
<script type="text/javascript" src="js/app/model/TaskListModel.js"></script>
<script type="text/javascript" src="js/app/model/VariableModel.js"></script>
<script type="text/javascript" src="js/app/model/EntityListModel.js"></script>
<script type="text/javascript" src="js/app/model/TeamListModel.js"></script>
<script type="text/javascript" src="js/app/model/ObjectiveListModel.js"></script>
<script type="text/javascript" src="js/app/model/TriggerListModel.js"></script>
<script type="text/javascript" src="js/app/model/FunctionListModel.js"></script>
<script type="text/javascript" src="js/app/model/VariableListModel.js"></script>

<script type="text/javascript" src="js/app/model/map/AbstractMapLayerModel.js"></script>
<script type="text/javascript" src="js/app/model/map/MapCollisionLayerModel.js"></script>
<script type="text/javascript" src="js/app/model/map/MapGraphicLayerModel.js"></script>
<script type="text/javascript" src="js/app/model/MapModel.js"></script>

<script type="text/javascript" src="js/app/model/function/AbstractValueModel.js"></script>
<script type="text/javascript" src="js/app/model/function/AbstractFunctionModel.js"></script>
<script type="text/javascript" src="js/app/model/function/AttributeModel.js"></script>
<script type="text/javascript" src="js/app/model/function/ConditionEqualModel.js"></script>
<script type="text/javascript" src="js/app/model/function/ConditionEqualOrGreaterModel.js"></script>
<script type="text/javascript" src="js/app/model/function/GetEventEntityModel.js"></script>
<script type="text/javascript" src="js/app/model/function/GetEntityPropertyModel.js"></script>
<script type="text/javascript" src="js/app/model/function/GetUnitCountModel.js"></script>
<script type="text/javascript" src="js/app/model/function/ShowConsoleLogModel.js"></script>
<script type="text/javascript" src="js/app/model/function/TurnOffTriggerModel.js"></script>
<script type="text/javascript" src="js/app/model/function/TurnOnTriggerModel.js"></script>
<script type="text/javascript" src="js/app/model/function/GetResourcesValueModel.js"></script>
<script type="text/javascript" src="js/app/model/function/ChangeObjectiveResultModel.js"></script>
<script type="text/javascript" src="js/app/model/function/GetVariableValueModel.js"></script>
<script type="text/javascript" src="js/app/model/function/IncrementVariableValueModel.js"></script>
<script type="text/javascript" src="js/app/model/function/AllObjectivesCompletedModel.js"></script>
<script type="text/javascript" src="js/app/model/function/ShowVictoryPopupModel.js"></script>

<script type="text/javascript" src="js/app/model/CameraModel.js"></script>
<script type="text/javascript" src="js/app/model/ActionMenuModel.js"></script>
<script type="text/javascript" src="js/app/model/gui/MiniMapModel.js"></script>

<!--VIEW MOUSE EVENT LISTENER -->
<script type="text/javascript" src="js/app/view/mouseEventListener/CommandMouseEventListener.js"></script>

<!--VIEW-->
<script type="text/javascript" src="js/app/view/AbstractWorldView.js"></script>
<script type="text/javascript" src="js/app/view/WorldView.js"></script>
<script type="text/javascript" src="js/app/view/gui/ActionMenuView.js"></script>
<script type="text/javascript" src="js/app/view/gui/EntityStatusView.js"></script>

<!--CONTROLLER-->
<script type="text/javascript" src="js/app/controller/CollisionDetectionController.js"></script>
<script type="text/javascript" src="js/app/controller/BuildController.js"></script>
<script type="text/javascript" src="js/app/controller/CollisionRepulsionController.js"></script>
<script type="text/javascript" src="js/app/controller/MoveController.js"></script>
<script type="text/javascript" src="js/app/controller/CommandController.js"></script>
<script type="text/javascript" src="js/app/controller/WaypointCollisionDetectionController.js"></script>
<script type="text/javascript" src="js/app/controller/WaypointCollisionReactionController.js"></script>
<script type="text/javascript" src="js/app/controller/SelectTargetController.js"></script>

<!-- APP COMMANDS -->
<script type="text/javascript" src="js/app/command/AttributeCommand.js"></script>
<script type="text/javascript" src="js/app/command/SetMoveCommandOnCommandController.js"></script>
<script type="text/javascript" src="js/app/command/SetAttackCommandOnCommandController.js"></script>
<script type="text/javascript" src="js/app/command/SetMoveAttackCommandOnCommandController.js"></script>
<script type="text/javascript" src="js/app/command/SetPatrolCommandOnCommandController.js"></script>
<script type="text/javascript" src="js/app/command/SetGatherCommandOnCommandController.js"></script>
<script type="text/javascript" src="js/app/command/SetBuildBuildingCommandOnCommandController.js"></script>
<script type="text/javascript" src="js/app/command/ActionMenuUpdateMenuCommand.js"></script>
<script type="text/javascript" src="js/app/command/CancelCommand.js"></script>
<script type="text/javascript" src="js/app/command/HoldCommand.js"></script>
<script type="text/javascript" src="js/app/command/TrainEntityCommand.js"></script>
<script type="text/javascript" src="js/app/command/ShowConsoleLogCommand.js"></script>
<script type="text/javascript" src="js/app/command/TurnOffTriggerCommand.js"></script>
<script type="text/javascript" src="js/app/command/TurnOnTriggerCommand.js"></script>
<script type="text/javascript" src="js/app/command/GetUnitCountCommand.js"></script>
<script type="text/javascript" src="js/app/command/ConditionEqualCommand.js"></script>
<script type="text/javascript" src="js/app/command/ConditionEqualOrGreaterCommand.js"></script>
<script type="text/javascript" src="js/app/command/GetEventEntityModelCommand.js"></script>
<script type="text/javascript" src="js/app/command/GetEntityPropertyCommand.js"></script>
<script type="text/javascript" src="js/app/command/GetResourcesValueCommand.js"></script>
<script type="text/javascript" src="js/app/command/ChangeObjectiveResultCommand.js"></script>
<script type="text/javascript" src="js/app/command/GetVariableValueCommand.js"></script>
<script type="text/javascript" src="js/app/command/IncrementVariableValueCommand.js"></script>
<script type="text/javascript" src="js/app/command/ShowVictoryPopupCommand.js"></script>
<script type="text/javascript" src="js/app/command/AllObjectivesCompletedCommand.js"></script>

<!-- FACTORY -->
<script type="text/javascript" src="js/app/factory/FunctionModelFactory.js"></script>
<script type="text/javascript" src="js/app/factory/CommandFactory.js"></script>

<!-- Mouse Event Handler -->
<script type="text/javascript" src="js/app/mouseHandler/MouseEventHandler.js"></script>

<!-- EDITOR FILES -->

<!--CONFIGS-->
<script type="text/javascript" src="js/editor/FeatureToggle.js"></script>

<!-- Editor Enums -->
<script type="text/javascript" src="js/editor/enum/SelectAttributeEnum.js"></script>

<!-- Editor classes -->
<script type="text/javascript" src="js/editor/model/MapTileModel.js"></script>
<script type="text/javascript" src="js/editor/model/MapTileListModel.js"></script>
<script type="text/javascript" src="js/editor/model/EditorMapModel.js"></script>
<script type="text/javascript" src="js/editor/model/SelectAttributeModel.js"></script>

<!-- Editor controllers -->
<script type="text/javascript" src="js/editor/controller/EditorMapController.js"></script>
<script type="text/javascript" src="js/editor/controller/NewMapModuleController.js"></script>
<script type="text/javascript" src="js/editor/controller/TriggerModuleController.js"></script>
<script type="text/javascript" src="js/editor/controller/ObjectiveModuleController.js"></script>
<script type="text/javascript" src="js/editor/controller/AddGameEventController.js"></script>
<script type="text/javascript" src="js/editor/controller/EditGameEventController.js"></script>
<script type="text/javascript" src="js/editor/controller/EditAttributeController.js"></script>

<!-- VIEWS -->
<script type="text/javascript" src="js/editor/view/WorldView.js"></script>
<script type="text/javascript" src="js/editor/view/NewMapModuleView.js"></script>
<script type="text/javascript" src="js/editor/view/TriggerModuleView.js"></script>
<script type="text/javascript" src="js/editor/view/ObjectiveModuleView.js"></script>
<script type="text/javascript" src="js/editor/view/SelectGameEventView.js"></script>
<script type="text/javascript" src="js/editor/view/SelectAttributeView.js"></script>

<!-- HTML VIEWS -->
<template id="HTMLNewMapModule">
    <?php include 'html/newMapModuleDivOnly.html'; ?>
</template>

<template id="HTMLTriggerModule">
    <?php include 'html/triggerModuleDivOnly.html'; ?>
</template>

<template id="HTMLObjectiveModule">
    <?php include 'html/objectiveModuleDivOnly.html'; ?>
</template>

<template id="HTMLSelectGameEvent">
    <?php include 'html/selectGameEventDivOnly.html'; ?>
</template>

<template id="HTMLSelectAttribute">
    <?php include 'html/selectAttributeDivOnly.html'; ?>
</template>


<!-- Script -->
<script type="text/javascript">

    var editor = editor || {};
    var FEATURE_TOGGLE = editor.FeatureToggle;

    var timer = new support.Timer();
    var logicTimer = new support.Timer();
    var rendererTimer = new support.Timer();

    var cameraViewPortWidth = 1180,
        cameraViewPortHeight = 780,
        cameraStartX = cameraViewPortWidth / 2,
        cameraStartY = cameraViewPortHeight / 2;

    var cameraModel = new app.model.CameraModel(cameraStartX, cameraStartY, cameraViewPortWidth, cameraViewPortHeight);
    var worldModel = new app.model.WorldModel();
    var entityDictionary = new app.model.EntityListModel();
    var entityListModel = worldModel.getEntityListModel();

    var graphicListModel;
    var graphicsBuffor = new support.data.ImageDataList();

    //    var mapModel = new app.model.MapModel(2000, 2000, 40, 40);
    var mapModel = new app.model.MapModel(4000, 4000, 40, 40);
    //        var mapModel = new app.model.MapModel(10000, 10000, 40, 40);
    //        var mapModel = new app.model.MapModel(30000, 30000, 40, 40);

    var editorMapModel = new editor.model.EditorMapModel(mapModel);

    worldModel.setMapModel(mapModel);


    var editorWorldView = null;
    var miniMapView = null;
    var mapCanvas = null;
    var miniMapCanvas = null;
    var editorMapController = null;

    var mapMouseHandler = new app.mouseHandler.MouseEventHandler("map");
    var miniMapMouseHandler = new app.mouseHandler.MouseEventHandler("miniMapCanvas");


    var mouse = new support.Mouse();
    mouse.addMouseEventHandler(mapMouseHandler);
    mouse.addMouseEventHandler(miniMapMouseHandler);

    var mapRootView = null;
    var miniMapRootView = null;


    //Init Modelu Swiata dla Edytora

    //Init Modelu Mapy Edytora
    /*
     Generowani tilesow Edytora typ terenu - wszystko jest tutaj opisane w sposob latwy edytowaly dla edytora
     */
    var tileCount = (mapModel.getMapGraphicModel().getMapWidth() / mapModel.getMapGraphicModel().getTileWidth()) * (mapModel.getMapGraphicModel().getMapHeight() / mapModel.getMapGraphicModel().getTileHeight());
    for (var i = 0; i < tileCount; i++) {
        //editorMapModel.getMapModel().getMapGraphicModel().getTileArray().push([{"set": false, "data":["grass", "grass", "grass", "grass"]}, {"set": false, "data":["", "", "", ""]}]);
        editorMapModel.getEditorMapTileArray().push([{
            "set": false,
            "data": ["grass", "grass", "grass", "grass"]
        }, {"set": false, "data": ["", "", "", ""]}]);
    }

    /*
     Generowanie mapy kolizji - mapa kolizji ma ten sam format dla edytora i dla gry
     */
    for (var i = 0; i < tileCount; i++) {
        editorMapModel.getMapModel().getMapCollisionModel().getTileArray().push([0x0000, 0]);
    }


    //Controllers and Views
    var newMapModuleController;
    var triggerModuleController;
    var objectiveModuleController;

    var newMapModuleView;
    var triggerModuleView;
    var objectiveModuleView;


    window.onload = function () {


        //Ladowanie Grafik
        var assetName;
        var assetsElement = document.getElementsByClassName("mapTileElement");
        var assetsElementLength = assetsElement.length;
        for (var index = 0; index < assetsElementLength; index++) {

            assetName = assetsElement[index].dataset["assetname"];

            graphicsBuffor.load(assetName);
        }

        //Ladowanie Grafik
        assetsElement = document.getElementsByClassName("entityElement");
        assetsElementLength = assetsElement.length;
        for (var index = 0; index < assetsElementLength; index++) {

            assetName = assetsElement[index].dataset["json"];
            var parsedJson = JSON.parse(assetName);

            for (var i = 0; i < parsedJson._entityStateListModel._elements.length; i++) {
                assetName = parsedJson._entityStateListModel._elements[i]._graphicUrl;
                graphicsBuffor.load(assetName);
            }


        }

        //Załadowanie konfiguracji do Dictionary
        assetsElement = document.getElementsByClassName("entityElement");
        assetsElementLength = assetsElement.length;
        for (var index = 0; index < assetsElementLength; index++) {

            assetName = assetsElement[index].dataset["json"];
            var parsedJson = JSON.parse(assetName);
            var tempEntityModel = new app.model.EntityModel();
            tempEntityModel.loadFromJSON(parsedJson);
            entityDictionary.addElement(tempEntityModel);

        }

        worldModel.setEntityDictionary(entityDictionary);

        worldModel.setCameraModel(cameraModel);

        //UpdateMapModel from EditorMapModel
        /*
         Wygenerowanie z ModeluMapyEdytora - modelu dla gry/wyswietlania/kolizji/oswietlenia itp
         */
        editorMapController = new editor.controller.EditorMapController(editorMapModel, worldModel);
        editorMapController.updateMapModel();


        mapCanvas = document.getElementById("map");
        miniMapCanvas = document.getElementById("miniMapCanvas");
        mouse.initMouse();


        editorWorldView = new editor.view.WorldView(worldModel, editorMapModel, 0, 0, cameraViewPortWidth, cameraViewPortHeight);
        editorWorldView.setMouseEventListener(editorMapController);

        miniMapView = new support.view.MinimapView();
        miniMapView.setX(10);
        miniMapView.setY(10);
        miniMapView.setWidth(miniMapCanvas.width - 20);
        miniMapView.setHeight(miniMapCanvas.height - 20);
        miniMapView.setMapWidth(mapModel.getMapWidth());
        miniMapView.setMapHeight(mapModel.getMapHeight());


        miniMapView.setViewPort(cameraModel);

        mapRootView = new support.view.RootView(mapCanvas, mapMouseHandler);
        mapRootView.addView(editorWorldView);


        miniMapRootView = new support.view.RootView(miniMapCanvas, miniMapMouseHandler);
        miniMapRootView.addView(miniMapView);


        var miniMapBackgroundImage = null;

        //Controllers and Views
        newMapModuleController = new editor.controller.NewMapModuleController(worldModel, editorWorldView, miniMapView);
        triggerModuleController = new editor.controller.TriggerModuleController(worldModel);
        objectiveModuleController = new editor.controller.ObjectiveModuleController(worldModel);

        newMapModuleView = new editor.view.NewMapModuleView(newMapModuleController);
        triggerModuleView = new editor.view.TriggerModuleView(triggerModuleController);
        objectiveModuleView = new editor.view.ObjectiveModuleView(objectiveModuleController);

        triggerModuleController.setView(triggerModuleView);
        objectiveModuleController.setView(objectiveModuleView);

        function mainDraw() {

            backgroundStep();
            mapRootView.draw(20, 20);
            miniMapRootView.draw();

            window.requestAnimationFrame(mainDraw);

        }

        //MinimapRennderings
        function backgroundStep() {
//            miniMapBackgroundImage = editorWorldView.getImageData(miniMapBackgroundImage, 160, 160);
//            miniMapView.setMapImage(miniMapBackgroundImage);
        }

        window.requestAnimationFrame(mainDraw);


        function handleFileSelect(evt) {
            var files = evt.target.files; // FileList object
            var objectURL = null;
            var max = files.length;
            var i;
            var f;

            // files is a FileList of File objects. List some properties.
            for (i = 0; i < max; i++) {
                f = files[i];
                objectURL = window.URL.createObjectURL(f);
            }

            uploadMapFile(objectURL);
        }

        //click
        document.getElementById('upload-map-button').addEventListener('click', function () {
            this.value = null
        });

        //change
        document.getElementById('upload-map-button').addEventListener('change', handleFileSelect, false);
        document.getElementById('upload-map-button').addEventListener('change', function () {
            console.log("change: upload-map-button")
        }, false);

    };


    var downloadMapFile = function downloadMapFile() {

        var URL = "data:application/octet-stream,";
        URL += encodeURI(JSON.stringify(mapModel.getMinifyJSON()));

        window.open(URL);

    };


    uploadMapFile = function uploadMapFile(url) {

        if (!url) {
            return;
        }

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onload = function () {
            if (xmlhttp.status === 200) {
                worldModel.loadFromMinifyJSON(JSON.parse(xmlhttp.response));
            }
        };

        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    };

    /*
     1. uploadMapFileToServer
     2. downloadMapFileFromServer
     */
    var editorExportMap = function editorExportMap() {

        var xmlhttp = new XMLHttpRequest();
        var worldModelMinifiedJSON = worldModel.getMinifyJSON();
        var JSONtoSend = JSON.stringify(worldModelMinifiedJSON);

        xmlhttp.open("POST", "backend/editorExportMap.php", true);
        xmlhttp.setRequestHeader("Content-type", "application/json");

        xmlhttp.send(JSONtoSend);

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                window.open('backend/downloadFile.php');
            }
        };

    };

    var hideModuleWindow = function hideModuleWindow() {
        document.getElementById("module-window").style.display = "none";
    };

    $(function () {
        // using default options
        $("#tree").fancytree({
            click: function (event, data) {
//            console.log(event, data, ", targetType=" + data.targetType);
//
//            console.log(data.node.key);

                editorMapController._activeBrushhName = data.node.key;
                // return false to prevent default behavior (i.e. activation, ...)
                //return false;
            }
        });
    });


</script>


<nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <!--            <a class="navbar-brand" href="#">Editor</a>-->
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

            <div class="fileUpload btn btn-primary">
                <span>Load Map</span>
                <input type="file" id="upload-map-button" class="upload""/>
            </div>

            <button id="exportMapButton" class="btn btn-warning" type="submit" onclick="editorExportMap()">Save/Export
                Map
            </button>

            <button id="newMapButton" class="btn btn-default" type="submit" onclick="newMapModuleView.show()">New Map
            </button>

            <!--            <button id="dataModuleButton" class="btn btn-default" type="submit" onclick="">DATA MODULE</button>-->

            <button id="triggersModuleButton" class="btn btn-default" type="submit" onclick="triggerModuleView.show()">
                Trigger Module
            </button>

            <button id="objectivesModuleButton" class="btn btn-default" type="submit"
                    onclick="objectiveModuleView.show()">Objectives Module
            </button>

        </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
</nav>

<div id="contentArea">
    <div id="editorMenu">
        <canvas id="miniMapCanvas" width="180px" height="180px">CANVAS NOt SUPPORTED</canvas>

        <div id="tree">
            <ul id="treeData" style="display: none;">
                <li id="id1" class="folder expanded">terrain
                    <ul>
                        <li id="id1.1" class="folder expanded">terrain 1
                            <ul>
                                <li id="brushGrass">brushGrass</li>
                                <li id="brushCobblestones">brushCobblestones</li>
                                <li id="brushCobblestonesBig">brushCobblestonesBig</li>
                                <li id="brushPaving">brushPaving</li>
                                <li id="brushPaving-Water">brushPaving-Water</li>
                                <li id="brushWater">brushWater</li>
                                <li id="highground_cobblestones">highground_cobblestones</li>
                                <li id="highground_cobblestonesBig">highground_cobblestonesBig</li>
                            </ul>
                        </li>
                    </ul>

                <li id="id4" class="folder expanded">objects
                    <ul>
                        <?php
                        createMenuFromJsonFiles("assets/editor/objects");
                        ?>
                    </ul>
                </li>

                <li id="id2" class="folder expanded">units
                    <ul>
                        <li class="folder expanded">neutral
                            <ul>
                                <?php
                                createMenuFromJsonFiles("assets/editor/units/neutral");
                                ?>
                            </ul>
                        </li>
                        <li class="folder expanded">team1
                            <ul>
                                <?php
                                createMenuFromJsonFiles("assets/editor/units/team1");
                                ?>
                            </ul>
                        </li>
                        <li class="folder expanded">team2
                            <ul>
                                <?php
                                createMenuFromJsonFiles("assets/editor/units/team2");
                                ?>
                            </ul>
                        </li>
                    </ul>
                </li>

            </ul>
        </div>
    </div>
    <div id="mapArea">
        <div id="mapPreview">
            <canvas id="map" width="1200px" height="800px"></canvas>
        </div>
    </div>
    <div id="assetsArea">

        <?php

        //Tiles
        readTileConfigsFromJsonAndCreateHTMLwithIt();

        //Objects - trees etc
        readEntityElementsFromJsonAndCreateHTMLwithIt("assets/editor/objects");

        //Units neutral, tem1, tem2, etc
        readEntityElementsFromJsonAndCreateHTMLwithIt("assets/editor/units/neutral");
        readEntityElementsFromJsonAndCreateHTMLwithIt("assets/editor/units/team1");
        readEntityElementsFromJsonAndCreateHTMLwithIt("assets/editor/units/team2");
        readEntityElementsFromJsonAndCreateHTMLwithIt("assets/editor/units/team3");
        readEntityElementsFromJsonAndCreateHTMLwithIt("assets/editor/units/team4");

        /*
         * Ends with Functions
         */
        function endswith($string, $test)
        {
            $strlen = strlen($string);
            $testlen = strlen($test);
            if ($testlen > $strlen) return false;
            return substr_compare($string, $test, $strlen - $testlen, $testlen) === 0;
        }


        function createMenuFromJsonFiles($path)
        {
            $arrayFiles = scandir($path);
            for ($index = 0; $index < count($arrayFiles); $index++) {

                $tabElement = $arrayFiles[$index];

                if (endswith($tabElement, ".json")) {
                    $tabElement = substr($tabElement, 0, strlen($tabElement) - strlen(".json"));
                    print("<li id=\"{$tabElement}\">{$tabElement}</li>");
                }
            }
        }


        /*
         * Create HTML with object (from JSON) that can be read in Javascript as model
         */
        function readEntityElementsFromJsonAndCreateHTMLwithIt($path)
        {

            $arrayFiles = scandir($path);
            for ($index = 0; $index < count($arrayFiles); $index++) {

                $tabElement = $arrayFiles[$index];

                if (endswith($tabElement, ".json")) {

                    //wczytuje z pliku w formacie json dane odnosnie grafiki i wpisuje je do NODEa HTMLowego
                    $str = file_get_contents("{$path}/{$tabElement}");
                    $json = json_decode($str, true);

                    $tabElement = substr($tabElement, 0, strlen($tabElement) - strlen(".json"));

                    $escapedJson = htmlspecialchars($str, ENT_QUOTES, 'UTF-8');


                    print("
                    <graphicData class=\"entityElement\"
                        data-entityid=\"{$tabElement}\"
                        data-json=\"{$escapedJson}\">
                    </graphicData>");

                }

            }
        }


        /*
         * Create HTML with tile configs (from JSON) that can be read in Javascript as model
         */
        function readTileConfigsFromJsonAndCreateHTMLwithIt()
        {

            /*
             * Load Files from "assets/editor/graphic"
             */
            $arrayFiles = scandir("assets/editor/configs");
            for ($index = 0; $index < count($arrayFiles); $index++) {

                $tabElement = $arrayFiles[$index];


                if (endswith($tabElement, ".json")) {

                    //wczytuje z pliku w formacie json dane odnosnie grafiki i wpisuje je do NODEa HTMLowego
                    $str = file_get_contents("assets/editor/configs/{$tabElement}");
                    $json = json_decode($str, true);

                    $graphicLayer = $json['graphicLayer'];
                    $graphicWidthInTile = $json['graphicWidthInTile'];
                    $graphicHeightInTile = $json['graphicHeightInTile'];
                    $graphicPatternX = $json['graphicPatternX'];
                    $graphicPatternY = $json['graphicPatternY'];

                    $graphicPatternArray = $json['graphicPatternArray'];
                    $graphicPatternArrayJsonEncoded = json_encode($graphicPatternArray);
                    $graphicPatternArrayJsonEncoded = htmlspecialchars($graphicPatternArrayJsonEncoded, ENT_QUOTES, 'UTF-8');

                    $collisionArray = $json['collisionArray'];
                    $collisionArrayEncoded = json_encode($collisionArray);
                    $collisionArrayEncoded = htmlspecialchars($collisionArrayEncoded, ENT_QUOTES, 'UTF-8');

                    $tabElement = substr($tabElement, 0, strlen($tabElement) - strlen(".json"));


                    print("
                    <graphicData class=\"mapTileElement\"
                        data-assetname=\"assets/graphics/images/{$tabElement}.png\"
                        data-graphicLayer=\"{$graphicLayer}\"
                        data-graphicPatternX=\"{$graphicPatternX}\"
                        data-graphicPatternY=\"{$graphicPatternY}\"
                        data-graphicWidthInTile=\"{$graphicWidthInTile}\"
                        data-graphicHeightInTile=\"{$graphicHeightInTile}\"
                        data-graphicPatternArray=\"{$graphicPatternArrayJsonEncoded}\"
                        data-collisionArray=\"{$collisionArrayEncoded}\"
                        >
                    </graphicData>");

                }

            }

        }

        ?>


    </div>
</div>

<!--<div class="my-large-window" id="module-window">-->
<!--    <div class="panel panel-primary my-panel-with-shadow my-100p-height">-->
<!--        <div class="panel-heading">-->
<!--            <h3 class="panel-title">Trigger Module</h3>-->
<!--            <button type="button" class="close my-close-button" id="moduleViewClose" onclick="hideModuleWindow()">&times;</button>-->
<!--        </div>-->
<!--        <div class="module-window-content" id="module-window-content">-->
<!--        </div>-->
<!--    </div>-->
<!--</div>-->

<div id="module-div" class="hidden">

</div>

</body>
</html>