/**
 * Created by adambartkowiak on 23/07/15.
 */

var support = support || {};
support.geom = support.geom || {};
support.geom.collision = support.geom.collision || {};
support.geom.collision.Collision = support.geom.collision.Collision || {};

var Utils = Utils || {};

var cc_fast = {"sd": 0, "radiusPow": 0, "result": false};

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

    var squareDistance = Math.pow(p1.getX() - c1.getX(), 2) + Math.pow(p1.getY() - c1.getY(), 2);

    if (squareDistance <= Math.pow(c1.getRadius(), 2)) {
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

    if (r1.getWidth() < 0) {
        r1.setX(r1.getX() + r1.getWidth());
        r1.setWidth(-r1.getWidth());
    }

    if (r1.getHeight() < 0) {
        r1.setY(r1.getY() + r1.getHeight());
        r1.setHeight(-r1.getHeight());
    }

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

    if (Math.pow(c2.getX() - c1.getX(), 2) + Math.pow(c2.getY() - c1.getY(), 2) <= Math.pow(c1.getRadius() + c2.getRadius(), 2)) {
        return true;
    }

    return false;
};

/**
 * @method CircleCircleFastWithDistanceSquer
 * @param {support.geom.Circle} c1 circle1
 * @param {support.geom.Circle} c2 circle2
 * @return {Boolean} result
 */
support.geom.collision.Collision.CircleCircleFastWithDistanceSquer = function CircleCircleFastWithDistanceSquer(c1, c2) {

    var squareDistance = Math.pow(c2.getX() - c1.getX(), 2) + Math.pow(c2.getY() - c1.getY(), 2),
        radiusPow = Math.pow(c1.getRadius() + c2.getRadius(), 2),
        result = false;

    if (squareDistance <= radiusPow) {
        result = true;
    }

    cc_fast.result = result;
    cc_fast.sd = squareDistance;
    cc_fast.radiusPow = radiusPow;
    return cc_fast;
};

/**
 * @method CircleCircleWithDistance
 * @param {support.geom.Circle} c1 circle1
 * @param {support.geom.Circle} c2 circle2
 * @return {Boolean} result
 */
support.geom.collision.Collision.CircleCircleWithDistance = function CircleCircleWithDistance(c1, c2) {

    console.log("ULTRA NIEWYDAJE PIERWIASTKOWANIE!! Mysl 2 razy zanim wybierzesz ta metode :)");

    var vector2d = new support.geom.Vector2d(c1.getX(), c1.getY(), c2.getX(), c2.getY()),
        distance = vector2d.getVectorLength(),
        result = false;

    if (distance <= c1.getRadius() + c2.getRadius()) {
        result = true;
    }

    return {"distance": distance, "result": result};
};

/**
 * @method CircleVector2d
 * @param {support.geom.Circle} c1 circle1
 * @param {support.geom.Vector2d} v1 vector1
 * @return {Boolean} result
 */
support.geom.collision.Collision.CircleVector2d = function CircleVector2d(c1, v1) {

    if (support.geom.collision.Collision.Point2dCircle(v1.getStartPoint(), c1)){
        return true;
    }

    //odleglosc punktu od prostej w przedziale
    //wektor kierunkowy z odcinka v1
    var dX = v1.getEndPoint().getX() - v1.getStartPoint().getX();
    var dY = v1.getEndPoint().getY() - v1.getStartPoint().getY();

    //wektor od srodka kuli do poczatku odcinka
    var fX = v1.getStartPoint().getX() - c1.getX();
    var fY = v1.getStartPoint().getY() - c1.getY();

    var a = dX * dX + dY * dY;
    var b = 2 * (fX * dX + fY * dY);
    var c = (fX * fX + fY * fY) - Math.pow(c1.getRadius(), 2);

    var delta = b * b - 4 * a * c;

    if (delta >= 0) {
        delta = Math.sqrt(delta);

        var t1 = (-b - delta) / (2 * a);
        var t2 = (-b + delta) / (2 * a);

        if (t1 >= 0 && t1 <= 1) {
            return true;
        }
        if (t2 >= 0 && t2 <= 1) {
            return true;
        }
    }

    return false;
};

/**
 * @method CircleRect
 * @param {support.geom.Circle} c1 circle1
 * @param {support.geom.Rect} r1 rect1
 * @return {Boolean} result
 */
support.geom.collision.Collision.CircleRect = function CircleRect(c1, r1) {

    //Center of Circle (Point2d) inside Eect
    var point = new support.geom.Point2d(c1.getX(), c1.getY());
    if (support.geom.collision.Collision.Point2dRect(point, r1)){
        return true;
    }


    //CHECK RECT EDGE'S WITH CIRCLE
    //TOP EDGE
    var v1 = new support.geom.Vector2d(r1.getX(), r1.getY(), r1.getX() + r1.getWidth(), r1.getY());
    if (support.geom.collision.Collision.CircleVector2d(c1, v1)) {
        return true;
    }

    //LEFT EDGE
    var v2 = new support.geom.Vector2d(r1.getX(), r1.getY(), r1.getX(), r1.getY() + r1.getHeight());
    if (support.geom.collision.Collision.CircleVector2d(c1, v2)) {
        return true;
    }

    //RIGHT EDGE
    var v3 = new support.geom.Vector2d(r1.getX() + r1.getWidth(), r1.getY(), r1.getX() + r1.getWidth(), r1.getY() + r1.getHeight());
    if (support.geom.collision.Collision.CircleVector2d(c1, v3)) {
        return true;
    }

    //BOTTOM EDGE
    var v4 = new support.geom.Vector2d(r1.getX(), r1.getY() + r1.getHeight(), r1.getX() + r1.getWidth(), r1.getY() + r1.getHeight());
    if (support.geom.collision.Collision.CircleVector2d(c1, v4)) {
        return true;
    }

    return false;
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
    var b = -(v1.getEndPoint().getX() - v1.getStartPoint().getX());
    var c = -a * v1.getStartPoint().getX() - b * v1.getStartPoint().getY();

    //Odleglosci punktu poczatkowego i koncowego
    var k1 = a * v2.getStartPoint().getX() + b * v2.getStartPoint().getY() + c;
    var k2 = a * v2.getEndPoint().getX() + b * v2.getEndPoint().getY() + c;

    //Kiedy punkty koncowe sa po tej samej stronie wektory sie nie przecianja
    if ((k1 > 0 && k2 > 0) || (k1 < 0 && k2 < 0)) {
        return false;
    }


    //wyznaczenie prostej Ax + By + C = 0 dla wektora 2
    a = v2.getEndPoint().getY() - v2.getStartPoint().getY();
    b = -(v2.getEndPoint().getX() - v2.getStartPoint().getX());
    c = -a * v2.getStartPoint().getX() - b * v2.getStartPoint().getY();

    //Odleglosci punktu poczatkowego i koncowego
    k1 = a * v1.getStartPoint().getX() + b * v1.getStartPoint().getY() + c;
    k2 = a * v1.getEndPoint().getX() + b * v1.getEndPoint().getY() + c;

    //Kiedy punkty koncowe sa po tej samej stronie wektory sie nie przecianja
    if ((k1 > 0 && k2 > 0) || (k1 < 0 && k2 < 0)) {
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

    return Math.abs(r1.getX() - r2.getX()) * 2 <= (r1.getWidth() + r2.getWidth()) &&
        Math.abs(r1.getY() - r2.getY()) * 2 <= (r1.getHeight() + r2.getHeight());

};

/*
 square
 rectangle

 */




// //support.geom.collision.Collision.CircleRect - check performance after adding it before checking tio/left/right/bottom edges
// //TOP-LEFT
// point.setX(r1.getX());
// point.setY(r1.getY());
// if (support.geom.collision.Collision.Point2dCircle(point, c1)) {
//     return true;
// }
//
// //TOP-RIGHT
// point.setX(r1.getX() + r1.getWidth());
// point.setY(r1.getY());
// if (support.geom.collision.Collision.Point2dCircle(point, c1)) {
//     return true;
// }
//
// //BOTTOM-LEFT
// point.setX(r1.getX());
// point.setY(r1.getY() + r1.getHeight());
// if (support.geom.collision.Collision.Point2dCircle(point, c1)) {
//     return true;
// }
//
// //BOTTOM-RIGHT
// point.setX(r1.getX() + r1.getWidth());
// point.setY(r1.getY() + r1.getHeight());
// if (support.geom.collision.Collision.Point2dCircle(point, c1)) {
//     return true;
// }

