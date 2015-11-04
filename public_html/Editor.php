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

    <link rel="stylesheet" type="text/css" href="css/editor.css"/>
    <title></title>
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
    var canvas = null;
    var mapController = null;

    var mouseHandler = new app.mouseHandler.MouseEventHandler();
    var mouse = new support.Mouse(mouseHandler);
    var rootView = null;

    window.onload = function(){
        assetListModel =  new editor.assets.AssetListModel();
        assetListController = new editor.assets.AssetListController(assetListModel);
        mapController = new editor.controller.MapController(mapModel, assetListModel);
        canvas = document.getElementById("map");
        mouse.initMouse();
        mapView = new editor.view.MapView(mapModel, assetListModel, 2000, 2000);
        mapView.setMouseEventListener(mapController);

        rootView = new support.view.RootView(canvas, mouseHandler);
        rootView.addView(mapView);

        setInterval(function () {
            mapView.draw(canvas);
        }, 100);

    }

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
            <ul class="nav navbar-nav">
                <li><a href="#">Graphic</a></li>
                <li><a href="#">Collision</a></li>
            </ul>
        </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
</nav>

<div id="contentArea">
    <div id="mapArea">
        <div id="mapPreview">
            <canvas id="map" width="2000px" height="2000px"></canvas>
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
                            <div class=\"thumbnail\" style=\"width: 280px\">
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