/**
 * Created by adambartkowiak on 30/04/16.
 */

app.GuiConfig = {};

app.GuiConfig.width = 1200;
app.GuiConfig.height = 800;

//minimap
app.GuiConfig.minimapwidth = 200;
app.GuiConfig.minimapheight = 200;
app.GuiConfig.minimapx = 0;
app.GuiConfig.minimapy = app.GuiConfig.height - app.GuiConfig.minimapheight;

//actionmenu
app.GuiConfig.actionmenuwidth = 265;
app.GuiConfig.actionmenuheight = 200;
app.GuiConfig.actionmenux = app.GuiConfig.width - app.GuiConfig.actionmenuwidth;
app.GuiConfig.actionmenuy = app.GuiConfig.height - app.GuiConfig.actionmenuheight;

//statusmenu
app.GuiConfig.statusmenuwidth = app.GuiConfig.width - app.GuiConfig.minimapwidth - app.GuiConfig.actionmenuwidth;
app.GuiConfig.statusmenuheight = 160;
app.GuiConfig.statusmenux = app.GuiConfig.minimapwidth;
app.GuiConfig.statusmenuy = app.GuiConfig.height - app.GuiConfig.statusmenuheight;

