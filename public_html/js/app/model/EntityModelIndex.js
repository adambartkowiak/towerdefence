/**
 * Created by adambartkowiak on 16/08/15.
 */

app.model.EntityModelIndex = {} || app.model.EntityModelIndex;

app.model.EntityModelIndex.ENTITY_MODEL_INDEX = 0;

app.model.EntityModelIndex.getEntityModelIndex = function getEntityIndexModel() {
    app.model.EntityModelIndex.ENTITY_MODEL_INDEX += 1;
    return app.model.EntityModelIndex.ENTITY_MODEL_INDEX;
};