/*
 *  Application.js
 *  2016/11/04
 *  @auther minimo  
 *  This Program is MIT license.
 */

//インスタンス
var app;
phina.main(function() {
    app = Application();
    app.run();

    moveGridSizeX = document.getElementById("moveGridSizeX");
    moveGridSizeY = document.getElementById("moveGridSizeY");
});

phina.define("Application", {
    superClass: "phina.display.CanvasApp",

    init: function() {
        this.superInit({
            query: '#app',
            backgroundColor: 'black',
            width: 256,
            height: 256,
            fit: false,
        });
        this.focus = null;

        var scene = MainScene();

        //キャンバスに対するイベント
        this.domElement.addEventListener("dragenter", function(e) {
            e.preventDefault();
            return false;
        }, true);
        this.domElement.addEventListener("dragover", function(e) {
            e.preventDefault();
            return false;
        }, true);
        this.domElement.addEventListener("drop", function(e) {
            e.preventDefault();
            return false;
        }, true);

        //Saveボタン
        var save = document.getElementById("ok");
        save.addEventListener("click", function() {
            app.focus = null;
            app.canvas.clear();
            app.background = "transparent";
            scene.tweener.clear().wait(200).call(function() {
                app.canvas.saveAsImage();
                app.background = "black";
            });
        });

        //Deleteボタン
        var del = document.getElementById("del");
        del.addEventListener("click", function() {
            if (app.focus) app.focus.remove();
        });

        //Clearボタン
        var clear = document.getElementById("clear");
        clear.addEventListener("click", function() {
            var c = scene.children.slice();
            c.forEach(function(elm) {
                elm.remove();
            });
        });

        var canvasSize = document.getElementsByClassName("canvasSize");
        [canvasSize[0], canvasSize[1]].forEach(function(element) {
            element.addEventListener("change", function() {
                var w = ~~document.getElementById("canvasWidth").value;
                var h = ~~document.getElementById("canvasHeight").value;
                app.canvas.setSize(w, h);
            });
        });

        this.replaceScene(scene);
    },
});

phina.define("MainScene", {
    superClass: "phina.display.DisplayScene",
    init: function() {
        this.superInit();
    },

    update: function() {
        var kb = app.keyboard;
        if (app.focus) {
            var g = ~~moveGridSizeX.value;
            if (kb.getKeyDown("left")) {
                app.focus.x -= g;
            } else if (kb.getKeyDown("right")) {
                app.focus.x += g;
            }

            var g = ~~moveGridSizeY.value;
            if (kb.getKeyDown("up")) {
                app.focus.y -= g;
            } else if (kb.getKeyDown("down")) {
                app.focus.y += g;
            }
        }
    },
});

phina.define("Texture", {
    superClass: "phina.display.Sprite",

    init: function(sprite) {
        this.superInit(sprite);
        this.origin.set(0, 0);

        var param = {
            width: this.width,
            height: this.height,
            fill: "transparent",
            stroke: "rgba(255, 255, 255, 0.5)",
            strokeWidth: 2,
        };
        this.border = phina.display.RectangleShape(param)
            .addChildTo(this)
            .setOrigin(0, 0)
            .setInteractive(true);

        this.boundingType = "rect";
    },

    update: function(app) {
        this.border.visible = (app.focus === this);
    },

    onpointingstart: function() {
        app.focus = this;
    }

});

