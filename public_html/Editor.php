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
    var mapModel = new app.model.MapModel(4000, 4000, 40, 40);
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
        mapView = new editor.view.MapView(mapModel, 4000, 4000);
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
                <li class="active"><a href="#">Link <span class="sr-only">(current)</span></a></li>
                <li><a href="#">Link</a></li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="#">Action</a></li>
                        <li><a href="#">Another action</a></li>
                        <li><a href="#">Something else here</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="#">Separated link</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="#">One more separated link</a></li>
                    </ul>
                </li>
            </ul>
        </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
</nav>

<div id="contentArea">
    <div id="mapArea">
        <div id="mapPreview">
            <canvas id="map" width="4000px" height="4000px"></canvas>
        </div>
    </div>
    <div id="assetsArea">

        <?php

        $arrayFiles = scandir("assets/editor");

        for ($index = 0; $index < count($arrayFiles); $index++){

            $tabElement = $arrayFiles[$index];

            if($tabElement === "." || $tabElement === ".."){
                continue;
            }

            print("
                <div class=\"row assetElement\" data-assetname=\"assets/editor/{$tabElement}\">
                    <div>
                        <div class=\"thumbnail\" style=\"width: 150px\">
                            <img src=\"assets/editor/{$tabElement}\" alt=\"...\">
                            <h5>{$tabElement}</h5>
                        </div>
                    </div>
                </div>");

        }



        ?>


    </div>
</div>
</body>
</html>