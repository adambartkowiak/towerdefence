/**
 * Created by adambartkowiak on 31/07/15.
 */

//Jest odpowiedzialny za strzelanie


/**
 * @method tryShotToEnemy
 */
app.managers.TowerManager.prototype.tryShotToEnemy = function tryShotToEnemy() {

    var towerLength = this._towerList.length();
    var enemyLength = this._enemyList.length();
    var towerIndex;
    var enemyIndex;
    var tower;
    var enemy;
    var moveVector;

    for (towerIndex = 0; towerIndex < towerLength; towerIndex++) {

        tower = this._towerList.getTower(towerIndex);

        for (enemyIndex = 0; enemyIndex < enemyLength; enemyIndex++) {

            enemy = this._enemyList.getEnemy(enemyIndex);

            moveVector = new support.geom.SimpleVector2d(enemy.getX() - tower.getX(), enemy.getY() - tower.getY());

            if (moveVector.getVectorLength() < tower.getRange() * worldModel.SIZEPROPORTION) {

                var normalizedVector = moveVector.getNormalizedVector();
                tower.setAngle(Math.atan2(normalizedVector.getY(), normalizedVector.getX()) * 180 / Math.PI + 90);

                if (tower.getCooldown() === 0) {
                    var bulletTemplate = tower.getBullet();
                    var target = new app.objects.Target(0, 0, enemy.getGuid());
                    var bullet = new app.objects.Bullet(tower.getX(), tower.getY(), target, bulletTemplate.getSpeed(), bulletTemplate.getDamage(), bulletTemplate.getGraphicUrl());
                    this._bulletList.addBullet(bullet);
                    tower.setCooldown(tower.getRate());
                }
                //jezeli przeciwnik jest w zasiegu - to juz nie sprawdza kolejnych przeciwnikow.
                //bo albo odda strzal albo nie.
                break;
            }
        }
    }

};



/**
 * @method cooldownTimer
 * @param {Number} timeDelta
 */
app.managers.TowerManager.prototype.cooldownTimer = function cooldownTimer(timeDelta) {

    var length = this._towerList.length();
    var towerIndex;
    var tower;
    var cooldownValue;

    for (towerIndex = 0; towerIndex < length; towerIndex++) {

        tower = this._towerList.getTower(towerIndex);

        cooldownValue = tower.getCooldown();
        cooldownValue -= timeDelta;

        if (cooldownValue < 0) {
            cooldownValue = 0;
        }

        tower.setCooldown(cooldownValue);
    }
};