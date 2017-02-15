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
    <style>
        @font-face {
            font-family: 'silkscreennormal';
            src: url('assets/fonts/slkscr-webfont.eot');
            src: url('assets/fonts/slkscr-webfont.eot?#iefix') format('embedded-opentype'),
            url('assets/fonts/slkscr-webfont.woff') format('woff'),
            url('assets/fonts/slkscr-webfont.ttf') format('truetype'),
            url('assets/fonts/slkscr-webfont.svg#silkscreennormal') format('svg');
            font-weight: normal;
            font-style: normal;
        }
    </style>
</head>
<body style="background-color: dimgray">
<div id="fb-root"></div>

<!-- facebook login script-->
<!--<script>(function (d, s, id) {-->
<!--    var js, fjs = d.getElementsByTagName(s)[0];-->
<!--    if (d.getElementById(id)) return;-->
<!--    js = d.createElement(s);-->
<!--    js.id = id;-->
<!--    js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.4&appId=718520094854936";-->
<!--    fjs.parentNode.insertBefore(js, fjs);-->
<!--}(document, 'script', 'facebook-jssdk'));</script>-->

<!-- facebook canvas SDK -->
<script>
    window.fbAsyncInit = function() {
        FB.init({
            appId      : '718520094854936',
            xfbml      : true,
            version    : 'v2.8'
        });

        // ADD ADDITIONAL FACEBOOK CODE HERE
    };

    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
</script>

<!-- google analytics -->
<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-64834812-5', 'auto');
    ga('send', 'pageview');

</script>


<div style="margin:0 auto 0 auto;display:block;background:#111111;width:1200px;height:800px;" id="gamediv">
    <canvas id="map" style="position: absolute; background-color: #333333;" width="1200" height="800"></canvas>

    <!-- Game Menu-->
    <div id="gameMenu" style="position: absolute;width:1200px; height:800px;background-color: rgba(0, 0, 0, 0.5);">
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



    <div id="menuOpenButton" style="position: absolute;margin-left:1032px;width:140px; height:45px;background-color: rgba(255, 50, 50, 0.5);" onclick="document.getElementById('gameMenu').style.display = 'block'">

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
<script type="text/javascript" src="js/support/view/LabelView.js"></script>
<script type="text/javascript" src="js/support/view/ButtonView.js"></script>
<script type="text/javascript" src="js/support/view/MinimapView.js"></script>
<script type="text/javascript" src="js/support/view/RootView.js"></script>

<script type="text/javascript" src="js/support/command/AbstractCommand.js"></script>

<script type="text/javascript" src="js/support/data/ImageDataList.js"></script>


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
<script type="text/javascript" src="js/app/model/function/MoveModel.js"></script>

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
<script type="text/javascript" src="js/app/controller/UpdatePositionController.js"></script>
<script type="text/javascript" src="js/app/controller/GatherController.js"></script>
<script type="text/javascript" src="js/app/controller/CommandController.js"></script>
<script type="text/javascript" src="js/app/controller/WaypointCollisionDetectionController.js"></script>
<script type="text/javascript" src="js/app/controller/WaypointCollisionReactionController.js"></script>
<script type="text/javascript" src="js/app/controller/SelectTargetController.js"></script>
<script type="text/javascript" src="js/app/controller/AttackController.js"></script>
<script type="text/javascript" src="js/app/controller/RemoveEntityController.js"></script>

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
<script type="text/javascript" src="js/app/command/MoveCommand.js"></script>
<script type="text/javascript" src="js/app/command/BuildCommand.js"></script>
<script type="text/javascript" src="js/app/command/GoGatherCommand.js"></script>
<script type="text/javascript" src="js/app/command/PatrolCommand.js"></script>
<script type="text/javascript" src="js/app/command/AttackCommand.js"></script>
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

<!-- FACTORY - MODEL -->
<script type="text/javascript" src="js/app/factory/model/function/AbstractFunctionModelFactory.js"></script>
<script type="text/javascript" src="js/app/factory/model/function/AllObjectivesCompleted.js"></script>
<script type="text/javascript" src="js/app/factory/model/function/Attribute.js"></script>
<script type="text/javascript" src="js/app/factory/model/function/ChangeObjectiveResult.js"></script>
<script type="text/javascript" src="js/app/factory/model/function/Equal.js"></script>
<script type="text/javascript" src="js/app/factory/model/function/EqualOrGreater.js"></script>
<script type="text/javascript" src="js/app/factory/model/function/GetEntityProperty.js"></script>
<script type="text/javascript" src="js/app/factory/model/function/GetEventEntity.js"></script>
<script type="text/javascript" src="js/app/factory/model/function/GetResourcesValue.js"></script>
<script type="text/javascript" src="js/app/factory/model/function/GetUnitCount.js"></script>
<script type="text/javascript" src="js/app/factory/model/function/GetVariableValue.js"></script>
<script type="text/javascript" src="js/app/factory/model/function/IncrementVariableValue.js"></script>
<script type="text/javascript" src="js/app/factory/model/function/Move.js"></script>
<script type="text/javascript" src="js/app/factory/model/function/ShowConsoleLog.js"></script>
<script type="text/javascript" src="js/app/factory/model/function/ShowVictoryPopup.js"></script>
<script type="text/javascript" src="js/app/factory/model/function/TurnOffTrigger.js"></script>
<script type="text/javascript" src="js/app/factory/model/function/TurnOnTrigger.js"></script>

<!-- FACTORY -->
<script type="text/javascript" src="js/app/factory/FunctionModelFactory.js"></script>
<script type="text/javascript" src="js/app/factory/CommandFactory.js"></script>

<!-- Mouse Event Handler -->
<script type="text/javascript" src="js/app/mouseHandler/MouseEventHandler.js"></script>


<!-- Main JS File -->
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

<span id="LoadGameResult"/>

</body>
</html>
