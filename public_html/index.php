<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
<head>
    <title>HTML5 GAME - MAIN PAGE</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="background-color: dimgray">
<div id="fb-root"></div>

<!-- facebook login script-->
<script>(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.4&appId=718520094854936";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>


<!-- google analytics -->
<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-64834812-5', 'auto');
    ga('send', 'pageview');

</script>


<div style="margin:0 auto 0 auto;display:block;background:#111111;width:800px;height:800px;" id="gamediv">
    <canvas id="map" style="position: absolute;" width="800" height="800"></canvas>

    <!-- Game Menu-->
    <div id="gameMenu" style="position: absolute;width:800px; height:800px;background-color: rgba(0, 0, 0, 0.5);">
        <span style="text-align: center;">Select Map:</span>
        <?php


        $arrayFiles = scandir("assets/gamesaves");
        for ($index = 0; $index < count($arrayFiles); $index++) {

            $tabElement = $arrayFiles[$index];
            $fileName = basename($tabElement, ".json");
            //$action = app.loadGameSave(\"assets/gamesaves/".$fileName."\");
            $action = "app.loadGameSave('assets/gamesaves/".$tabElement."'); document.getElementById('gameMenu').style.display = 'none'";

            if (filter_files($fileName)){
                echo "<span style=\"display: block; text-align: center; font-size: 30px; color: wheat;\" onclick=\"".$action."\">".$fileName."</span>";
            }

        }

        function filter_files($file) {
            return ($file != '.' && $file != '..' && $file != '.DS_Store' && $file != 'Thumbs.db');
        }
        ?>
    </div>



    <div id="menuOpenButton" style="position: absolute;width:50px; height:50px;background-color: rgba(100, 100, 100, 0.7);" onclick="document.getElementById('gameMenu').style.display = 'block'">

    </div>


</div>


<div>HTML5 GAME</div>

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

<script type="text/javascript" src="js/support/data/ImageDataList.js"></script>


<!-- Game Files -->

<!--MODEL-->
<script type="text/javascript" src="js/app/model/AvailableActionsModel.js"></script>
<script type="text/javascript" src="js/app/model/WorldModel.js"></script>
<script type="text/javascript" src="js/app/model/ActionTypeModel.js"></script>
<script type="text/javascript" src="js/app/model/EntityTargetCollisionModel.js"></script>
<script type="text/javascript" src="js/app/model/TargetModel.js"></script>
<script type="text/javascript" src="js/app/model/EntityModelIndex.js"></script>
<script type="text/javascript" src="js/app/model/EntityModel.js"></script>
<script type="text/javascript" src="js/app/model/ListModel.js"></script>
<script type="text/javascript" src="js/app/model/TargetListModel.js"></script>
<script type="text/javascript" src="js/app/model/EntityListModel.js"></script>
<script type="text/javascript" src="js/app/model/map/AbstractMapLayerModel.js"></script>
<script type="text/javascript" src="js/app/model/map/MapCollisionLayerModel.js"></script>
<script type="text/javascript" src="js/app/model/map/MapGraphicLayerModel.js"></script>
<script type="text/javascript" src="js/app/model/MapModel.js"></script>
<script type="text/javascript" src="js/app/model/CameraModel.js"></script>
<script type="text/javascript" src="js/app/model/gui/MiniMapModel.js"></script>

<!--VIEW MOUSE EVENT LISTENER -->
<script type="text/javascript" src="js/app/view/mouseEventListener/CommandMouseEventListener.js"></script>

<!--VIEW-->
<script type="text/javascript" src="js/app/view/AbstractWorldView.js"></script>
<script type="text/javascript" src="js/app/view/WorldView.js"></script>
<script type="text/javascript" src="js/app/view/gui/ActionMenuView.js"></script>

<!--CONTROLLER-->
<script type="text/javascript" src="js/app/controller/BuildController.js"></script>
<script type="text/javascript" src="js/app/controller/MoveController.js"></script>
<script type="text/javascript" src="js/app/controller/CommandController.js"></script>
<script type="text/javascript" src="js/app/controller/WaypointCollisionDetectionController.js"></script>
<script type="text/javascript" src="js/app/controller/WaypointCollisionReactionController.js"></script>
<script type="text/javascript" src="js/app/controller/SelectTargetController.js"></script>

<!-- APP COMMANDS -->
<script type="text/javascript" src="js/app/command/SetMoveCommandOnCommandController.js"></script>


<script type="text/javascript" src="js/app/mouseHandler/MouseEventHandler.js"></script>

<script type="text/javascript" src="js/Main.js"></script>


<!-- facebook login div -->
<div class="fb-login-button" data-max-rows="1" data-size="medium" data-show-faces="false"
     data-auto-logout-link="false"></div>
<br>
<br>
<button onclick="app.saveGameToMinifyStringAndSendToBackend()">SAVE GAME</button>
<br>
<br>
<button onclick="app.saveScoreAndSendToBackend()">SAVE SCORE</button>
<br>
<br>

        <span>
            <span style="font-weight: 600">TODO:</span><br>
            <span style="color:limegreen"> - usprawnienie systemu kolizji - DONE,</span><br>
            <span style="color:yellow"> - zmiana struktury dziedziczenia - bardziej uniwersalna - ala RTS - juz duzo zostalo zrobione ale jeszcze jest kilka razy wiecej do zrobienia :),</span><br>
            <span style="color:darkgray"> - nowy interface do budowania wiezyczek,</span><br>
            <span style="color:limegreen"> - zaznaczanie obiektow: przeciwnikow i wiezyczek - udalo sie zrobic w wersji podstawowej,</span><br>
            <span style="color:darkgray"> - nowi przeciwnicy,</span><br>
            <span style="color:darkgray"> - nowe wiezyczki,</span><br>
            <span style="color:darkgray"> - nowe naboje,</span><br>
            <span style="color:darkgray"> - menu gry,</span><br>
            <span style="color:limegreen"> - rozpoczynanie nowej gry,</span><br>
            <span style="color:limegreen"> - wczytywanie gry,</span><br>
            <span style="color:limegreen"> - zapisywanie gry,</span><br>
            <span style="color:darkgray"> - podpiecie gry do Facebooka,</span><br>
            <span style="color:darkgray"> - inne TODO dojdzie</span><br>
        </span>
        <br>
        <br>
        <span style="color:white">
            - Dodano 2 bazy i model rozkrywki przypominajacy cos jakby gre w wersji super alpha :)<br>
            - Poprawiono model wykrywania kolizji - rectangle-circle - co skutkuje np. lepszym zaznaczaniem obiektow na mapie<br>
            - dodano wlasciwosci do obiektow np. team, targetable, selectable itp.<br>
        </span>


DODAC: minimape, button, text, statusmenu tak aby odtworzyc funkcjonalnosc ktora juz mamy + dodatkowo dodac kontrolery do widokow <br>
Dodac tez logike przekazywania eventow po struktorze drzewa dla GUI.


<br>
<br>
<span id="LoadGameResult"/>


</body>
</html>
