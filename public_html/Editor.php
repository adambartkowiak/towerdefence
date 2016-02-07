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
<script type="text/javascript" src="js/support/view/ButtonView.js"></script>
<script type="text/javascript" src="js/support/view/MinimapView.js"></script>
<script type="text/javascript" src="js/support/view/RootView.js"></script>

<script type="text/javascript" src="js/support/command/AbstractCommand.js"></script>

<!-- Mouse Event Handler -->
<script type="text/javascript" src="js/app/mouseHandler/MouseEventHandler.js"></script>

<!-- App files -->
<script type="text/javascript" src="js/app/model/map/AbstractMapLayerModel.js"></script>
<script type="text/javascript" src="js/app/model/map/MapGraphicLayerModel.js"></script>
<script type="text/javascript" src="js/app/model/map/MapCollisionLayerModel.js"></script>
<script type="text/javascript" src="js/app/model/MapModel.js"></script>
<script type="text/javascript" src="js/app/model/CameraModel.js"></script>
<script type="text/javascript" src="js/app/model/ListModel.js"></script>
<script type="text/javascript" src="js/app/model/EntityListModel.js"></script>
<script type="text/javascript" src="js/app/model/TargetListModel.js"></script>
<script type="text/javascript" src="js/app/model/EntityModelIndex.js"></script>
<script type="text/javascript" src="js/app/model/EntityModel.js"></script>
<script type="text/javascript" src="js/app/model/gui/MiniMapModel.js"></script>
<script type="text/javascript" src="js/app/model/WorldModel.js"></script>
<script type="text/javascript" src="js/app/view/AbstractWorldView.js"></script>

<!-- Editor classes -->
<script type="text/javascript" src="js/editor/model/MapTileModel.js"></script>
<script type="text/javascript" src="js/editor/model/MapTileListModel.js"></script>
<script type="text/javascript" src="js/editor/model/EditorMapModel.js"></script>
<script type="text/javascript" src="js/editor/controller/EditorMapController.js"></script>
<script type="text/javascript" src="js/editor/view/WorldView.js"></script>

<!-- Script -->
<script type="text/javascript">

    var worldModel = new app.model.WorldModel();
    var entityListModel = worldModel.getEntityListModel();

    var graphicListModel;
    var graphicsBuffor = new support.data.ImageDataList();

    var mapModel = new app.model.MapModel(2000, 2000, 40, 40);
    //    var mapModel = new app.model.MapModel(30000, 30000, 40, 40);

    var editorMapModel = new editor.model.EditorMapModel(mapModel);

    worldModel.setMapModel(mapModel);


    var mapView = null;
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

    window.onload = function () {

        var cameraModel = new app.model.CameraModel(1180 / 2, 780 / 2, 1180, 780);


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

            assetName = assetsElement[index].dataset["assetname"];

            graphicsBuffor.load(assetName);
        }


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


        mapView = new editor.view.WorldView(worldModel, 0, 0, 1180, 780);
        mapView.setMouseEventListener(editorMapController);

        miniMapView = new support.view.MinimapView();
        miniMapView.setX(10);
        miniMapView.setY(10);
        miniMapView.setWidth(miniMapCanvas.width - 20);
        miniMapView.setHeight(miniMapCanvas.height - 20);
        miniMapView.setMapWidth(mapModel.getMapWidth());
        miniMapView.setMapHeight(mapModel.getMapHeight());


        miniMapView.setViewPort(cameraModel);

        mapRootView = new support.view.RootView(mapCanvas, mapMouseHandler);
        mapRootView.addView(mapView);


        miniMapRootView = new support.view.RootView(miniMapCanvas, miniMapMouseHandler);
        miniMapRootView.addView(miniMapView);


        var miniMapBackgroundImage = null;

        function mainDraw() {

            backgroundStep();
            mapRootView.draw();
            miniMapRootView.draw();

            window.requestAnimationFrame(mainDraw);

        }

        //MinimapRennderings
        function backgroundStep() {
            miniMapBackgroundImage = mapView.getImageData(miniMapBackgroundImage, 160, 160);
            miniMapView.setMapImage(miniMapBackgroundImage);
        }

        window.requestAnimationFrame(mainDraw);


        function handleFileSelect(evt) {
            var files = evt.target.files; // FileList object
            var objectURL = null;

            // files is a FileList of File objects. List some properties.
            var output = [];
            for (var i = 0, f; f = files[i]; i++) {
                objectURL = window.URL.createObjectURL(f);
            }

//            console.log(objectURL);

            uploadMapFile(objectURL);
        }

        document.getElementById('files').addEventListener('change', handleFileSelect, false);


    };

    var downloadMapFile = function downloadMapFile() {

        var URL = "data:application/octet-stream,";
        URL += encodeURI(JSON.stringify(mapModel.getMinifyJSON()));

        window.open(URL);

    };

    function b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, {type: contentType});
        return blob;
    }
    ;

    uploadMapFile = function uploadMapFile(url) {

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onload = function () {

            mapModel.loadFromMinifyJSON(JSON.parse(xmlhttp.response));

        };

        xmlhttp.open("GET", url, true);
        xmlhttp.send();


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
            <a class="navbar-brand" href="#">Editor</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <!--            <ul class="nav navbar-nav">-->
            <!--                <li><a href="#">Graphic</a></li>-->
            <!--                <li><a href="#">Collision</a></li>-->
            <!--            </ul>-->

            <div class="fileupload fileupload-new" data-provides="fileupload">
                <!--                <span class="btn btn-primary btn-file"><span class="fileupload-new">UPLOAD MAP</span>-->
                <input type="file" id="files" name="files[]"/>
            </div>

            <button id="downloadMapButton" class="btn btn-default" type="submit" onclick="downloadMapFile()">SAVE MAP
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

                        <li id="id1.2" class="folder">terrain 2
                            <ul>
                                <li id="id1.2.1">terrain 2.1</li>
                                <li id="id1.2.2">terrain 2.2</li>
                            </ul>
                        </li>

                        <li id="id1.3" class="folder">terrain 3
                            <ul>
                                <li id="id1.3.1">terrain 3.1</li>
                                <li id="id1.3.2">terrain 3.2</li>
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
                <li id="id3" class="folder">system</li>

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


        function createMenuFromJsonFiles($path){
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
        function readEntityElementsFromJsonAndCreateHTMLwithIt($path){

            $arrayFiles = scandir($path);
            for ($index = 0; $index < count($arrayFiles); $index++) {

                $tabElement = $arrayFiles[$index];

                if (endswith($tabElement, ".json")) {

                    //wczytuje z pliku w formacie json dane odnosnie grafiki i wpisuje je do NODEa HTMLowego
                    $str = file_get_contents("{$path}/{$tabElement}");
                    $json = json_decode($str, true);

                    $graphicPath = $json['graphicPath'];
                    $graphicOffsetX = $json['graphicOffsetX'];
                    $graphicOffsetY = $json['graphicOffsetY'];
                    $radius = $json['radius'];
                    $groundSpeed = $json['groundSpeed'];
                    $team = $json['team'];
                    $mass = $json['mass'];
                    $hp = $json['hp'];
                    $currentHp = $json['currentHp'];
                    $selectable = $json['selectable'];
                    $targetable = $json['targetable'];

                    $tabElement = substr($tabElement, 0, strlen($tabElement) - strlen(".json"));

//                {
//                      "graphicPath": "/assets/editor/graphic/tree_01.png",
//                      "graphicOffsetX": 0,
//                      "graphicOffsetY": 0,
//                      "radius": 20,
//                      "groundSpeed": 0,
//                      "team": 0,
//                      "mass": 0,
//                      "hp": 100,
//                      "currentHp": 100,
//                      "selectable": true,
//                      "targetable": true
//                }

                    print("
                    <graphicData class=\"entityElement\"
                        data-entityid=\"{$tabElement}\"
                        data-assetname=\"{$graphicPath}\"
                        data-graphicoffsetx=\"{$graphicOffsetX}\"
                        data-graphicoffsety=\"{$graphicOffsetY}\"
                        data-radius=\"{$radius}\"
                        data-groundspeed=\"{$groundSpeed}\"
                        data-team=\"{$team}\"
                        data-mass=\"{$mass}\"
                        data-hp=\"{$hp}\"
                        data-currenthp=\"{$currentHp}\"
                        data-selectable=\"{$selectable}\"
                        data-targetable=\"{$targetable}\"
                        >
                    </graphicData>");

                }

            }
        }

        /*
         * Create HTML with tile configs (from JSON) that can be read in Javascript as model
         */
        function readTileConfigsFromJsonAndCreateHTMLwithIt(){

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
                    $graphicOffsetX = $json['graphicOffsetX'];
                    $graphicOffsetY = $json['graphicOffsetY'];
                    $graphicWidthInTile = $json['graphicWidthInTile'];
                    $graphicHeightInTile = $json['graphicHeightInTile'];
                    $graphicPatternX = $json['graphicPatternX'];
                    $graphicPatternY = $json['graphicPatternY'];
                    $graphicPatternWidth = $json['graphicPatternWidth'];
                    $graphicPatternHeight = $json['graphicPatternHeight'];
                    $graphicPatternArray = $json['graphicPatternArray'];
                    $graphicPatternArrayJsonEncoded = json_encode($graphicPatternArray);
                    $graphicPatternArrayJsonEncoded = htmlspecialchars($graphicPatternArrayJsonEncoded, ENT_QUOTES, 'UTF-8');


                    $tabElement = substr($tabElement, 0, strlen($tabElement) - strlen(".json"));

//              {
//                  "graphicOffsetX": 0,
//                  "graphicOffsetY": 0,
//                  "graphicWidth": 40,
//                  "graphicHeight": 40,

//                  "graphicPatternX": 0,
//                  "graphicPatternY": 0,
//                  "graphicPatternWidth": 1,
//                  "graphicPatternHeight": 1,
//                  "graphicPatternArray": [
//                                  [["cobblestones", "cobblestones", "grass", "grass"]]
//                            ]
//              }

                    print("
                    <graphicData class=\"mapTileElement\"
                        data-assetname=\"assets/graphics/images/{$tabElement}.png\"
                        data-graphicLayer=\"{$graphicLayer}\"
                        data-graphicOffsetX=\"{$graphicOffsetX}\"
                        data-graphicOffsetY=\"{$graphicOffsetY}\"
                        data-graphicsWidyhInTile=\"{$graphicWidthInTile}\"
                        data-graphicsHeightInTile=\"{$graphicHeightInTile}\"
                        data-graphicPatternX=\"{$graphicPatternX}\"
                        data-graphicPatternY=\"{$graphicPatternY}\"
                        data-graphicPatternWidth=\"{$graphicPatternWidth}\"
                        data-graphicPatternHeight=\"{$graphicPatternHeight}\"
                        data-graphicPatternArray=\"{$graphicPatternArrayJsonEncoded}\"
                        >
                    </graphicData>");

                }

            }

        }

        ?>


    </div>
</div>
</body>
</html>