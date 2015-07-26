/**
 * Created by adambartkowiak on 23/07/15.
 */

var support = support || {};
support.geom = support.geom || {};
support.geom.collision = support.geom.collision || {};
support.geom.collision.Collision = support.geom.collision.Collision || {};

var Utils = Utils || {};


/**
 * @method Point2dPoint2d
 * @param {support.geom.Point2d} p1 point1
 * @param {support.geom.Point2d} p2 point2
 * @return {Boolean} result
 */
support.geom.collision.Collision.Point2dPoint2d = function Point2dPoint2d(p1, p2) {

    if (p1.getX() === p2.getX() && p1.getY() === p2.getY()) {
        return true;
    }

    return false;
};

/**
 * @method Point2dCircle
 * @param {support.geom.Point2d} p1 point1
 * @param {support.geom.Circle} c1 circle1
 * @return {Boolean} result
 */
support.geom.collision.Collision.Point2dCircle = function Point2dCircle(p1, c1) {

    var vector2d = new support.geom.Vector2d(p1.getX(), p1.getY(), c1.getX(), c1.getY());

    if (vector2d.getVectorLength() <= c1.getRadius()) {
        return true;
    }

    return false;
};

/**
 * @method Point2dVector2d
 * @param {support.geom.Point2d} p1 point1
 * @param {support.geom.Vector2d} v1 vector1
 * @return {Boolean} result
 */
support.geom.collision.Collision.Point2dVector2d = function Point2dVector2d(p1, v1) {

    //odleglosc punktu od prostej w przedziale

    return true;
};

/**
 * @method Point2dRect
 * @param {support.geom.Point2d} p1 point1
 * @param {support.geom.Rect} r1 rect1
 * @return {Boolean} result
 */
support.geom.collision.Collision.Point2dRect = function Point2dRect(p1, r1) {

    if (p1.getX() >= r1.getX() && p1.getX() <= r1.getX() + r1.getWidth() &&
        p1.getY() >= r1.getY() && p1.getY() <= r1.getY() + r1.getHeight()) {
        return true;
    }

    return false;
};

/**
 * @method CircleCircle
 * @param {support.geom.Circle} c1 circle1
 * @param {support.geom.Circle} c2 circle2
 * @return {Boolean} result
 */
support.geom.collision.Collision.CircleCircle = function CircleCircle(c1, c2) {

    var vector2d = new support.geom.Vector2d(c1.getX(), c1.getY(), c2.getX(), c2.getY());

    if (vector2d.getVectorLength() <= c1.getRadius() + c2.getRadius() ){
        return true;
    }

    return false;
};

/**
 * @method CircleVector2d
 * @return {Boolean} result
 */
support.geom.collision.Collision.CircleVector2d = function CircleVector2d() {

    //odleglosc punktu od prostej w przedziale

    return true;
};

/**
 * @method CircleRect
 * @return {Boolean} result
 */
support.geom.collision.Collision.CircleRect = function CircleRect() {

    //Zastanowic sie jak to obliczyc najwydajnej

    return true;
};

/**
 * @method Vector2dVector2d
 * @param {support.geom.Vector2d} v1 vector1
 * @param {support.geom.Vector2d} v2 vector2
 * @return {Boolean} result
 */
support.geom.collision.Collision.Vector2dVector2d = function Vector2dVector2d(v1, v2) {

        //wyznaczenie prostej Ax + By + C = 0 dla wektora 1
        var a = v1.getEndPoint().getY() - v1.getStartPoint().getY();
        var b = - (v1.getEndPoint().getX() - v1.getStartPoint().getX());
        var c = -a * v1.getStartPoint().getX() - b * v1.getStartPoint().getY();

        //Odleglosci punktu poczatkowego i koncowego
        var k1 = a * v2.getStartPoint().getX() + b * v2.getStartPoint().getY() + c;
        var k2 = a * v2.getEndPoint().getX() + b * v2.getEndPoint().getY() + c;

        //Kiedy punkty koncowe sa po tej samej stronie wektory sie nie przecianja
        if ((k1 > 0 && k2 > 0) || (k1 < 0 && k2 < 0)){
            return false;
        }


        //wyznaczenie prostej Ax + By + C = 0 dla wektora 2
        a = v2.getEndPoint().getY() - v2.getStartPoint().getY();
        b = - (v2.getEndPoint().getX() - v2.getStartPoint().getX());
        c = -a * v2.getStartPoint().getX() - b * v2.getStartPoint().getY();

        //Odleglosci punktu poczatkowego i koncowego
        k1 = a * v1.getStartPoint().getX() + b * v1.getStartPoint().getY() + c;
        k2 = a * v1.getEndPoint().getX() + b * v1.getEndPoint().getY() + c;

        //Kiedy punkty koncowe sa po tej samej stronie wektory sie nie przecianja
        if ((k1 > 0 && k2 > 0) || (k1 < 0 && k2 < 0)){
            return false;
        }

    return true;
};

/**
 * @method Vector2dRect
 * @return {Boolean} result
 */
support.geom.collision.Collision.Vector2dRect = function Vector2dRect() {

    //Zastanowic sie jak to obliczyc najwydajnej

    return true;
};

/**
 * @method RectRect
 * @param {support.geom.Rect} r1 rect1
 * @param {support.geom.Rect} r2 rect2
 * @return {Boolean} result
 */
support.geom.collision.Collision.RectRect = function RectRect(r1, r2) {

    //Dokodzic
    //if (r1.getX() >= r2.getX() && r1.getX() <= r2.getX() + r2.getWidth() &&
    //    r1.getY() >= r2.getY() && r1.getY() <= r2.getY + r2.getHeight() )

    //Zastanowic sie jak to obliczyc najwydajnej

    return true;
};

/*
 square
 rectangle



 */





//kolizja wektora z okregiem zwiera kolizje 2 wektorow.


//W sumie przeciecie 2 wektorow trzeba sprawdzic zawsze kied


//1. kolizja 2 wektorow
//2. kolizja wektora z okregiem (trzeba wyznaczyc wektor prostopadly do wektora 2 i sprawdzic czy sie przecinaja, je
//jezeli sie nie przecinaja to sprawdzic czy sredk kola jest w odleglosci od mniejszej niz promien w stosunku do koncow wektora)
//3.


//        //sprawdzenie czy 2 wektory sie przecianja lub czy wktor przecina okrag
//
//        //wektor ruchu przeciwnika, ale nie musi byc bo moze to byc cel w miejscu
//        //to wtedy np zrobic ze jest okregiem o promieniu 5 :)
//
//        //wektor ruchu pocisku
//
//        //sprawdzenie przeciecia wektorow lub czy wektor przecina okrag
//
//
//
//
//        //ruch gracza
//        //o ile gracz sie poruszy
//        var pMoveVx = Math.cos(this._angle);
//        var pMoveVy = - Math.sin(this._angle);
//
//
//        //pozycja gracza
//        //this._getX();
//        //this._getY();
//
//
//        //sciana
//        //punkt sciany A - poczatek odcinka sciany
//        var wV1x = wall.getWallPoint(wallNo-1).getX();
//        var wV1y = wall.getWallPoint(wallNo-1).getY();
//
//        //punkt sciany B - koniec odcinka sciany
//        var wV2x = wall.getWallPoint(wallNo).getX();
//        var wV2y = wall.getWallPoint(wallNo).getY();
//
//
//
//
//
//
//        //Sciana
//        //Wyznaczenie prostej Ax + By + C = 0 dla gracza
//        var a = pMoveVy;
//        var b = - pMoveVx;
//        var c = - a * this.getX() - b * this.getY();
//
//        //odleglosci punktu poczatkowego i koncowego
//        var k1 = k1_1 = a * wV1x + b * wV1y + c;
//        var k2 = k1_2 = a * wV2x + b * wV2y + c;
//
//        //kiedy punkty koncowe sa po tej samej stronie
//        //wektory sie nie przecianja
//        if ((k1 > 0 && k2 > 0) || (k1 < 0 && k2 < 0)){
//            continue;
//        }
//
//
//
//
//
//
//        //Wyznaczenie prostej dla sciany
//        a = wV2y - wV1y;
//        b = -(wV2x - wV1x);
//        c = - a * wV1x - b * wV1y;
//
//        //odleglosci punktu poczatkowego i koncowego
//        k1 = k2_1 = a * this.getX() + b * this.getY() + c;
//        k2 = k2_2 = a * (this.getX() + pMoveVx) + b * (this.getY() + pMoveVy) + c;
//
//        //kiedy punkty koncowe sa po tej samej stronie
//        //wektory sie nie przecianja
//        if ((k1 > 0 && k2 > 0) || (k1 < 0 && k2 < 0)){
//            continue;
//        }