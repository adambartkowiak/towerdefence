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

<!-- Editor classes -->
<script type="text/javascript" src="js/editor/assets/AssetsController.js"></script>

<!-- Script -->
<script type="text/javascript">

    window.onload = function(){
        var assetsController = editor.assets.AssetsController();
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
            <canvas id="mapCanvas" width="16000px" height="16000px"></canvas>
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
                <div class=\"row assetElement\" assetName=\"assets/editor/{$tabElement}\">
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