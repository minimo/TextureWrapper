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
            backgroundColor: 'black',
            width: 256,
            height: 512,
            fit: false,
        });

        this.replaceScene(InterfaceScene());
    },
});

phina.define("InterfaceScene", {
    superClass: "phina.display.DisplayScene",
    init: function() {
        this.superInit();

        var param = {
            width: 256,
            height: 512,
            fill: "transparent",
            stroke: "black",
            strokeWidth: 2,
        };
        this.border = phina.display.RectangleShape(param)
            .addChildTo(this)
            .setPosition(128, 256);
    },

    update: function() {
    },
});
