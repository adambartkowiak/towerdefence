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

<!-- Editor classes -->
<script type="text/javascript" src="js/editor/assets/AssetListController.js"></script>
<script type="text/javascript" src="js/editor/assets/AssetListModel.js"></script>
<script type="text/javascript" src="js/editor/controller/MapController.js"></script>
<script type="text/javascript" src="js/editor/view/MapView.js"></script>

<!-- Script -->
<script type="text/javascript">
    var assetListController;
    var assetListModel;
    var mapModel = new app.model.MapModel(2000, 2000, 40, 40);
    var mapView = null;
    var miniMapView = null;
    var mapCanvas = null;
    var miniMapCanvas = null;
    var mapController = null;

    var mapMouseHandler = new app.mouseHandler.MouseEventHandler("map");
    var miniMapMouseHandler = new app.mouseHandler.MouseEventHandler("miniMapCanvas");

    var mouse = new support.Mouse();
    mouse.addMouseEventHandler(mapMouseHandler);
    mouse.addMouseEventHandler(miniMapMouseHandler);

    var mapRootView = null;
    var miniMapRootView = null;

    window.onload = function(){

        var cameraModel = new app.model.CameraModel(20,20,780,480);

        assetListModel =  new editor.assets.AssetListModel();
        assetListController = new editor.assets.AssetListController(assetListModel);
        mapController = new editor.controller.MapController(mapModel, cameraModel, assetListModel);
        mapCanvas = document.getElementById("map");
        miniMapCanvas = document.getElementById("miniMapCanvas");
        mouse.initMouse();



        mapView = new editor.view.MapView(mapModel, cameraModel, assetListModel, 780, 480);
        mapView.setMouseEventListener(mapController);

        miniMapView = new support.view.MinimapView();
        miniMapView.setX(20);
        miniMapView.setY(20);
        miniMapView.setWidth(miniMapCanvas.width - 40);
        miniMapView.setHeight(miniMapCanvas.height - 40);
        miniMapView.setMapWidth(mapModel.getMapWidth());
        miniMapView.setMapHeight(mapModel.getMapHeight());


        miniMapView.setViewPort(cameraModel);

//        minimapView.setElements(worldModel.getEntityListModel().getElements());

        mapRootView = new support.view.RootView(mapCanvas, mapMouseHandler);
        mapRootView.addView(mapView);


        miniMapRootView = new support.view.RootView(miniMapCanvas, miniMapMouseHandler);
        miniMapRootView.addView(miniMapView);


        setInterval(function () {
            mapRootView.draw();
            miniMapRootView.draw();
        }, 50);


        function handleFileSelect(evt) {
            var files = evt.target.files; // FileList object
            var objectURL = null;

            // files is a FileList of File objects. List some properties.
            var output = [];
            for (var i = 0, f; f = files[i]; i++) {
                objectURL = window.URL.createObjectURL(f);
            }

            console.log(objectURL);

            uploadMapFile(objectURL);
        }

        document.getElementById('files').addEventListener('change', handleFileSelect, false);

    }

    downloadMapFile = function downloadMapFile(){

        var URL = "data:application/octet-stream,";
        URL += encodeURI(JSON.stringify(mapModel.getMinifyJSON()));

        window.open(URL);

    };

    uploadMapFile = function uploadMapFile(url){

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onload = function () {

            mapModel.loadFromMinifyJSON(JSON.parse(xmlhttp.response));

        };

        xmlhttp.open("GET", url, true);
        xmlhttp.send();



    };

    $(function(){
        // using default options
        $("#tree").fancytree();
    });



</script>

<nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
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

            <button id="downloadMapButton" class="btn btn-default" type="submit" onclick="downloadMapFile()">SAVE MAP</button>

        </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
</nav>

<div id="contentArea">
    <div id="editorMenu">
        <canvas id="miniMapCanvas" width="180px" height="180px">CANVAS NOt SUPPORTED</canvas>

        <div id="tree">
            <ul id="treeData" style="display: none;">
                <li id="id1" class="folder">terrain
                    <ul>
                        <li id="id1.1" class="folder">terrain 1
                            <ul>
                                <li id="id1.1.1">terrain </li>
                                <li id="id1.1.2">terrain 1.2</li>
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

                <li id="id2" class="folder">units
                <li id="id3" class="folder">system
<!--                <li id="id3" class="folder">Folder with some children-->
<!--                    <ul>-->
<!--                        <li id="id3.1">Sub-item 3.1-->
<!--                            <ul>-->
<!--                                <li id="id3.1.1">Sub-item 3.1.1-->
<!--                                <li id="id3.1.2">Sub-item 3.1.2-->
<!--                            </ul>-->
<!--                        <li id="id3.2">Sub-item 3.2-->
<!--                            <ul>-->
<!--                                <li id="id3.2.1">Sub-item 3.2.1-->
<!--                                <li id="id3.2.2">Sub-item 3.2.2-->
<!--                            </ul>-->
<!--                    </ul>-->
<!--                <li id="id4" class="expanded">Document with some children (expanded on init)-->
<!--                    <ul>-->
<!--                        <li id="id4.1"  class="active focused">Sub-item 4.1 (active and focus on init)-->
<!--                            <ul>-->
<!--                                <li id="id4.1.1">Sub-item 4.1.1-->
<!--                                <li id="id4.1.2">Sub-item 4.1.2-->
<!--                            </ul>-->
<!--                        <li id="id4.2">Sub-item 4.2-->
<!--                            <ul>-->
<!--                                <li id="id4.2.1">Sub-item 4.2.1-->
<!--                                <li id="id4.2.2">Sub-item 4.2.2-->
<!--                            </ul>-->
<!--                    </ul>-->
            </ul>
        </div>
    </div>
    <div id="mapArea">
        <div id="mapPreview">
            <canvas id="map" width="800px" height="500px"></canvas>
        </div>
    </div>
    <div id="assetsArea">

        <?php

        $arrayFiles = scandir("assets/editor");

        for ($index = 0; $index < count($arrayFiles); $index++){

            $tabElement = $arrayFiles[$index];


            if(endswith($tabElement, ".json")){

                //wczytuje z pliku w formacie json dane odnosnie grafiki i wpisuje je do NODEa HTMLowego
                $str = file_get_contents("assets/editor/{$tabElement}");
                $json = json_decode($str, true);

                $layer = $json['layer'];
                $drawx = $json['x'];
                $drawy = $json['y'];

                $tabElement = substr($tabElement, 0, strlen($tabElement)-strlen(".json"));

                print("
                    <div class=\"row assetElement\" data-assetname=\"assets/editor/{$tabElement}.png\" data-layer=\"{$layer}\" data-drawx=\"{$drawx}\" data-drawy=\"{$drawy}\">
                        <div>
                            <div class=\"thumbnail\" style=\"width: 180px\">
                                <img src=\"assets/editor/{$tabElement}.png\">
                                <h5>{$tabElement}.png</h5>
                            </div>
                        </div>
                    </div>");

            }

        }

        function endswith($string, $test) {
            $strlen = strlen($string);
            $testlen = strlen($test);
            if ($testlen > $strlen) return false;
            return substr_compare($string, $test, $strlen - $testlen, $testlen) === 0;
        }

        ?>


    </div>
</div>
</body>
</html>