/**
 * Created by adambartkowiak on 01/08/15.
 */


/**
 * @method removeDeadEnemy
 */
app.managers.EnemyManager.prototype.removeDeadEnemy = function removeDeadEnemy() {

    var length = this._enemyList.length();
    var enemyIndex;
    var enemy;

    for (enemyIndex = length - 1; enemyIndex >= 0; enemyIndex--) {
        enemy = this._enemyList.getEnemy(enemyIndex);

        if (enemy.getCurrentHp() === 0) {
            this._enemyList.remove(enemyIndex);
        }
    }
};