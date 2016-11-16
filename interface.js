/*
 *  Interface.js
 *  2016/11/04
 *  @auther minimo  
 *  This Program is MIT license.
 */

phina.define("Interface", {
    superClass: "phina.display.CanvasApp",

    init: function() {
        this.superInit({
            query: '#interface',
            backgroundColor: 'white',
            width: 512,
            height: 64,
            fit: false,
        });

        this.replaceScene(InterfaceScene());
        this.moveMode = false;
    },
});

phina.define("InterfaceScene", {
    superClass: "phina.display.DisplayScene",
    init: function() {
        this.superInit();

        var param = {
            width: 512,
            height: 64,
            fill: "transparent",
            stroke: "black",
            strokeWidth: 1,
        };
        this.border = phina.display.RectangleShape(param)
            .addChildTo(this)
            .setPosition(128, 256);
    },

    update: function() {
    },
});
