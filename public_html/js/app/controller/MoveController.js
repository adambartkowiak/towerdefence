/**
 * Created by adambartkowiak on 31/07/15.
 */

'use strict';

var app = app || {};
app.controller = app.controller || {};

var Utils = Utils || {};

/**
 * @namespace app.controller
 * @class MoveController
 * @constructor
 * @param {app.model.EntityListModel} listModel
 *
 */
app.controller.MoveController = function MoveController(entityListModel) {

    /**
     * @property {app.model.EntityListModel} _list
     * @private
     */
    this._list = entityListModel;


    this._collisionTree = null;

    this._conditionOne = true;

    this._optymalizationOne = true;
    this._optymalizationTwo = true;

};

Utils.inherits(app.controller.MoveController, Object);

/**
 * @method update
 * @param {Number} timeDelta
 * @param {app.model.MapModel} mapModel
 */
app.controller.MoveController.prototype.update = function update(timeDelta, mapModel) {

    var listLength = this._list.length();
    var elementIndex;
    var element;
    var moveVector;
    var availableStep;
    var targetEntityId;
    var targetEntity;
    var nextStepX;
    var nextStepY;
    var normalizedMoveVector;

    var potentialCollisionList;
    var potentialCollisionElement;
    var potentialCollisionIndex;
    var potentialCollisionLength;

    var collisionVector;
    var collisionVector2;

    this.prepareObjectsGroups(mapModel);

    /*
     ROZPYCHANIE OBIEKTÓW JEZELI NA SIEBIE NACHODZA
     */
    for (elementIndex = 0; elementIndex < listLength; elementIndex++) {

        element = this._list.getElement(elementIndex);
        //availableStep = element.getMoveList() && element.getMoveList().length() > 0;


        //jezeli element nie zmienił pozycji to nie sprawdza on czy wypycha inny obiekt -
        //bo skoro nie zmienil pozycji to nie moze tego robic

        //Ale moze pojawic sie nowy obiket - ktory poruszy ten obiekt.. a pojawienie sie obiektu to poiwnna byc zmiana pozycji! :)

        //TO BY MOZNA ZROBIC UZYPIANIE OBIEKTOW ALE PO CZASIE!

        if (this._optymalizationTwo && element.isSleeping()) {
            continue;
        } else {
            element.setX(element.getX());
            element.setY(element.getY());
        }

        //jezeli element jest nieskonczenie ciezki - to nie sprawdzamy dla niego kolizji
        //wtedy inne elementy sprawdzaja czy go nie dotykaja i jak tak to odbijaja/odpychaja sie od niego
        //Z tego wynika ze obiekty nieskonczenie ciezkie nie koliduja ze soba
        if (element.getMass() === -1) {
            continue;
        }

        if (this._conditionOne) {
            var c1 = new support.geom.Circle(element.getX(), element.getY(), element.getCollisionRadius());
            var c2 = new support.geom.Circle(0, 0, 0);

            //Pociski nie rozpychaja innych obiektów!
            if (element.getMoveList() && element.getMoveList().length() > 0 && element.getMoveList().getElement(0).getActionType() !== app.model.ActionTypeModel.ATTACK || element.getMoveList() && element.getMoveList().length() === 0) {

                if (this._optymalizationOne){
                    potentialCollisionList = this.getCollisionArrayByEntityElement(element, mapModel);
                    potentialCollisionLength = potentialCollisionList.length;
                } else {
                    potentialCollisionList = this._list;
                    potentialCollisionLength = potentialCollisionList.length();
                }

                for (potentialCollisionIndex = 0; potentialCollisionIndex < potentialCollisionLength; potentialCollisionIndex++) {

                    if (this._optymalizationOne){
                        potentialCollisionElement = potentialCollisionList[potentialCollisionIndex];
                    } else {
                        potentialCollisionElement = potentialCollisionList.getElement(potentialCollisionIndex);
                    }

                    //samego ze soba nie sprawdzam kolizji bo to bez sensu :)
                    if (element === potentialCollisionElement) {
                        continue;
                    }

                    if (potentialCollisionElement.getMoveList() && potentialCollisionElement.getMoveList().length() > 0 && potentialCollisionElement.getMoveList().getElement(0).getActionType() === app.model.ActionTypeModel.ATTACK) {
                        continue;
                    }

                    c2.setX(potentialCollisionElement.getX());
                    c2.setY(potentialCollisionElement.getY());
                    c2.setRadius(potentialCollisionElement.getCollisionRadius());

                    var collision = support.geom.collision.Collision.CircleCircle(c1, c2);

                    if (collision) {

                        //wektor miedzy srodkami
                        collisionVector = new support.geom.SimpleVector2d(element.getX() - potentialCollisionElement.getX(), element.getY() - potentialCollisionElement.getY());
                        var lengthVector = collisionVector.getVectorLength() - element.getCollisionRadius() - potentialCollisionElement.getCollisionRadius();

                        var vX = potentialCollisionElement.getX();
                        var vY = potentialCollisionElement.getY();


                        //console.log(element.getId() + " " + potentialCollisionElement.getId());
                        if (Math.abs(lengthVector) < 0.5) {
                            //console.log("continute - lengthVector < 0.5");
                            continue;
                        } else {
                            //console.log("continute - lengthVector > 0.5");
                        }

                        if (potentialCollisionElement.getMass() !== -1) {
                            potentialCollisionElement.setX(vX + collisionVector.getNormalizedVector().getX() * lengthVector / 4);
                            potentialCollisionElement.setY(vY + collisionVector.getNormalizedVector().getY() * lengthVector / 4);
                        }

                        element.setX(element.getX() - collisionVector.getNormalizedVector().getX() * lengthVector / 4);
                        element.setY(element.getY() - collisionVector.getNormalizedVector().getY() * lengthVector / 4);


                    }

                }
            }
        }

    }


    //PORUSZANIE OBIEKTOW + OMIJANIE PRZECIWNIKOW
    for (elementIndex = 0; elementIndex < listLength; elementIndex++) {

        element = this._list.getElement(elementIndex);

        availableStep = element.getMoveList() && element.getMoveList().length() > 0;

        //NO AVAILABLE STEPS!
        if (!availableStep || element.getGroundSpeed() === 0) {
            continue;
        }

        //Ustawienie miejsca docelowego na podstawie pozycji entityId targetu
        targetEntityId = element.getMoveList().getElement(0).getEntityId();
        if (targetEntityId > 0) {
            targetEntity = this._list.getElementById(targetEntityId);
            if (targetEntity !== null) {
                nextStepX = element.getMoveList().getElement(0).setX(targetEntity.getX());
                nextStepY = element.getMoveList().getElement(0).setY(targetEntity.getY());
            }
        }

        //Ustalenie pozycji Docelowej X, Y
        nextStepX = element.getMoveList().getElement(0).getX();
        nextStepY = element.getMoveList().getElement(0).getY();

        //Wyznaczenie wektora do celu
        moveVector = new support.geom.SimpleVector2d(nextStepX - element.getX(), nextStepY - element.getY());

        //Wektor ruchu
        normalizedMoveVector = moveVector.getNormalizedVector();


        /*
         SPRAWDZANIE KOLIZJI POC !!!!
         A PODSTAWIE KOLIZJI ZOSTAJE ZMODYFIKOWANY WEKTOR NORMALNY RUCHU
         */

        if (false) {
            //Sprawdzenie czy nie wystepuje kolizja na drodze w promieniu wykrywania kolizji - petla ze wszystkimi entitys
            var c1 = new support.geom.Circle(element.getX(), element.getY(), element.getMoveCollisionDetectionRadius());
            var c2 = new support.geom.Circle(0, 0, 0);


            var totalMoveVector = new support.geom.SimpleVector2d(0, 0);


            //Pociski nie omijaja celow tylko leca przez nie !
            if (element.getMoveList().getElement(0).getActionType() !== app.model.ActionTypeModel.ATTACK) {

                potentialCollisionLength = this._list.length();
                var normalDirectionWasCounted = false;
                for (potentialCollisionIndex = 0; potentialCollisionIndex < potentialCollisionLength; potentialCollisionIndex++) {
                    potentialCollisionElement = this._list.getElement(potentialCollisionIndex);

                    //samego ze soba nie sprawdzam kolizji bo to bez sensu :)
                    if (element === potentialCollisionElement) {
                        continue;
                    }

                    //omijanie pociskow tez nie ma sensu
                    if (potentialCollisionElement.getMoveList() !== null && potentialCollisionElement.getMoveList().length() > 0 &&
                        potentialCollisionElement.getMoveList().getElement(0).getActionType() === app.model.ActionTypeModel.ATTACK) {
                        continue;
                    }

                    //nie ma ruchow
                    if (potentialCollisionElement.getMoveList() === null || potentialCollisionElement.getMoveList() !== null && potentialCollisionElement.getMoveList().length() === 0) {
                        continue;
                    }

                    c2.setX(potentialCollisionElement.getX());
                    c2.setY(potentialCollisionElement.getY());
                    c2.setRadius(potentialCollisionElement.getMoveCollisionDetectionRadius());

                    var collision = support.geom.collision.Collision.CircleCircle(c1, c2);

                    if (collision) {

                        //wektor miedzy srodkami
                        collisionVector = new support.geom.SimpleVector2d(element.getX() - potentialCollisionElement.getX(), element.getY() - potentialCollisionElement.getY());

                        //wektor do niego prostopadly
                        collisionVector2 = new support.geom.SimpleVector2d(-collisionVector.getY(), collisionVector.getX());

                        //jezenie obiekty oddalaja sie od siebie to sie nie wymijaja.
                        var vectorLength = collisionVector.getVectorLength();

                        //SPRAWDZENIE CZY OBIEKTY SIE DO SIEBIE ZBLIZAJA
                        collisionVector.setX(element.getLastPosition().getX() - potentialCollisionElement.getLastPosition().getX());
                        collisionVector.setY(element.getLastPosition().getY() - potentialCollisionElement.getLastPosition().getY());

                        var previousDistance = collisionVector.getVectorLength();
                        /*
                         DOKODZIC !!! IDZIE NA NAS I SIE SZYBKO ZBLIZA TO MA WIEKSZA WAGE !!
                         */
                        //Na te obiekty ktore sie zblizaja szybko trzeba zwraca duza uwage - dokodzic !!! i musze miec duzo wieksza wage !!

                        //console.log(previousDistance - vectorLength);
                        if (previousDistance <= vectorLength) {

                            //console.log(previousDistance - vectorLength);

                            break;
                        }


                        /*
                         Liczenie wag wektora prostopadlego i normalnego
                         Jak sa daleko to waga jest 1, jak sie stykaja to waga jest 0
                         */
                        var wag = (vectorLength - element.getCollisionRadius() - potentialCollisionElement.getCollisionRadius()) / (element.getMoveCollisionDetectionRadius() - element.getCollisionRadius() + potentialCollisionElement.getMoveCollisionDetectionRadius() - potentialCollisionElement.getCollisionRadius());

                        //zamiana jak jest blisko to jest 1 jak daleko 0
                        wag = 1 - wag;
                        wag = Math.pow(wag, 4);


                        //Cosinus kata miedzy ektorem do celu, a kate przeciecia
                        var xA = normalizedMoveVector.getX();
                        var yA = normalizedMoveVector.getY();

                        var xB = collisionVector2.getNormalizedVector().getX();
                        var yB = collisionVector2.getNormalizedVector().getY();


                        /*
                         OBLICZANIE PO STREMU TEZ JEST POMOCNE
                         */
                        var cosA1 = xA * xB + yA * yB;
                        //jezeli cosA to zmieniamy wektor na wektor styczny!
                        if (!isNaN(cosA1)) {
                            var acos = Math.acos(cosA1) * 180 / Math.PI;

                            if (acos > 90) {
                                yB = -yB;
                                xB = -xB;
                            }
                        }


                        /*
                         OBLICZANIE PO NOWEMU
                         */

                        //NOWE LEPSZE OMIJANIE!
                        var newMoveVector = new support.geom.SimpleVector2d(0, 0);
                        var normalDirection = new support.geom.SimpleVector2d(0, 0);
                        var specialDirection = new support.geom.SimpleVector2d(0, 0);

                        //console.log(wag);

                        normalDirection.setX(xA * (1 - wag));
                        normalDirection.setY(yA * (1 - wag));

                        specialDirection.setX(xB * wag);
                        specialDirection.setY(yB * wag);

                        newMoveVector.setX(xA * (1 - wag) + xB * wag);
                        newMoveVector.setY(yA * (1 - wag) + yB * wag);

                        //newMoveVector.setX(xA + xB);
                        //newMoveVector.setY(yA + yB);

                        //roznica pomiedzy newMoveVector, a normalizedVector
                        var cosA2 = xA * newMoveVector.getNormalizedVector().getX() + yA * newMoveVector.getNormalizedVector().getY();


                        if (cosA2 > 1) {
                            cosA2 = 1
                        }
                        ;
                        if (cosA2 < -1) {
                            cosA2 = -1
                        }
                        ;


                        //liczenie Kata w stopniach odchylenia
                        var acos2 = Math.acos(cosA2) * 180 / Math.PI;

                        var xC = newMoveVector.getNormalizedVector().getX();
                        var yC = newMoveVector.getNormalizedVector().getY();

                        if (acos2 > 90) {
                            yC = -yC;
                            xC = -xC;
                        }


                        //im mniejsze odchylenie tym mniej sie liczy bo mnozymy przez kat odchylenia
                        if (!normalDirectionWasCounted) {
                            //xC = xC * acos2/180;
                            //yC = yC * acos2/180;
                        } else {
                            //tylko tutaj moze byc sytuacja ze sie wktory znasza.. moze powinny byc liczone oddzielnie i ma byc wybierany wiekszy ?
                            xC = specialDirection.getX();// * acos2/180;
                            yC = specialDirection.getY();// * acos2/180;
                        }

                        //im wieksza roznica w kacie tym wieksza waga wektora

                        totalMoveVector.setX(totalMoveVector.getX() + xC);
                        totalMoveVector.setY(totalMoveVector.getY() + yC);

                        //normalDirectionWasCounted = true;

                    }
                }
            }


            if (totalMoveVector.getX() !== 0 || totalMoveVector.getY() !== 0) {


                normalizedMoveVector.setX(totalMoveVector.getNormalizedVector().getX());
                normalizedMoveVector.setY(totalMoveVector.getNormalizedVector().getY());


                //console.log(normalizedMoveVector.getX() + " " + normalizedMoveVector.getY());
            }

        }


        //obrot postaci
        element.setAngle(Math.atan2(normalizedMoveVector.getY(), normalizedMoveVector.getX()) * 180 / Math.PI);


        //Przemieszczenie entitty o podany wektor
        element.setX(element.getX() + normalizedMoveVector.getX() * timeDelta / 1000 * element.getGroundSpeed());
        element.setY(element.getY() + normalizedMoveVector.getY() * timeDelta / 1000 * element.getGroundSpeed());

    }

};


/**
 * @method prepareObjectsGroups
 * @param {app.model.MapModel} mapModel
 */
app.controller.MoveController.prototype.prepareObjectsGroups = function prepareObjectsGroups(mapModel) {

    var listLength = this._list.length(),
        elementIndex,
        element,
        elementX = 0,
        elementY = 0,
        elementRadius = 0,
        tileIndexX = 0,
        tileIndexY = 0,
        startTileIndexX = 0,
        startTileIndexY = 0,
        endTileIndexX = 0,
        endTileIndexY = 0,
        tileGraphicWidth = mapModel.getMapGraphicModel().getTileWidth(),
        tileGraphicHeight = mapModel.getMapGraphicModel().getTileHeight(),
        maxTileGraphicIndexX = Math.ceil(mapModel.getMapGraphicModel().getMapWidth() / tileGraphicWidth),
        maxTileGraphicIndexY = Math.ceil(mapModel.getMapGraphicModel().getMapHeight() / tileGraphicHeight);


    this._collisionTree = [];

    for (elementIndex = 0; elementIndex < listLength; elementIndex++) {

        element = this._list.getElement(elementIndex);

        elementX = element.getX();
        elementY = element.getY();
        elementRadius = element.getRadius();

        //startIndex
        startTileIndexX = Math.round((elementX - elementRadius) / tileGraphicWidth);
        startTileIndexY = Math.round((elementY - elementRadius) / tileGraphicHeight);

        //endIndex
        endTileIndexX = Math.round((elementX + elementRadius) / tileGraphicWidth);
        endTileIndexY = Math.round((elementY + elementRadius) / tileGraphicHeight);


        for (tileIndexX = startTileIndexX; tileIndexX <= endTileIndexX; tileIndexX++){
            for (tileIndexY = startTileIndexY; tileIndexY <= endTileIndexY; tileIndexY++){

                if (this._collisionTree[maxTileGraphicIndexY * tileIndexX + tileIndexY] === undefined) {
                    this._collisionTree[maxTileGraphicIndexY * tileIndexX + tileIndexY] = [];
                }

                this._collisionTree[maxTileGraphicIndexY * tileIndexX + tileIndexY].push(element);

            }
        }


    }

};


/**
 * @method getCollisionArrayByEntityElement
 * @param {app.model.MapModel} mapModel
 */
app.controller.MoveController.prototype.getCollisionArrayByEntityElement = function getCollisionArrayByEntityElement(element, mapModel) {

    var tileGraphicWidth = mapModel.getMapGraphicModel().getTileWidth(),
        tileGraphicHeight = mapModel.getMapGraphicModel().getTileHeight(),
        maxTileGraphicIndexX = Math.ceil(mapModel.getMapGraphicModel().getMapWidth() / tileGraphicWidth),
        maxTileGraphicIndexY = Math.ceil(mapModel.getMapGraphicModel().getMapHeight() / tileGraphicHeight),
        tileIndexX = Math.round(element.getX() / tileGraphicWidth),
        tileIndexY = Math.round(element.getY() / tileGraphicHeight);

    return this._collisionTree[maxTileGraphicIndexY * tileIndexX + tileIndexY];

};