/*
 * cs312Context.js
 *
 * Drawing Context for CS312
 */

 /* ***************************************************************************
  * Constructor
  ****************************************************************************/
 cs312Context = function(canvas) {
     'use strict';
     this.can = canvas;
     this.ctx = canvas.getContext("2d");
     this.fillStyle = "black";
     this.ctx.setTransform(1, 0, 0, 1, 0, 0);
     this.setFont('20px Arial');

     // WARNING - create matrices for scale, rotate and translate
     //         - If you use the scale(), rotate() and translate() methods
     //           of the canvas context control, you will lose BIG points.  You
     //           must impliment those functions in this class.

    this.scaleMat = new Matrix();
    this.rotateMat = new Matrix();
    this.translateMat = new Matrix();
     //           The only context functions you should be using are:
     //             - beginPath()
     //             - lineTo()
     //             - moveTo()
     //             - stroke()
     //             - fillRect()
     //             - clearRect()
     //             - fillStyle
     //             - strokeStyle
     //             - you could use the berier functions if you want (extra)
 };


  /* ***************************************************************************
   * Prototype functions
   ****************************************************************************/
 cs312Context.prototype = {

   constructor: cs312Context,

   // ********************
   // General functions
   // ********************

   getWidth: function() {
       return this.can.width;
   },

   getHeight: function() {
       return this.can.height;
   },

   // ********************
   // text functions
   // ********************

   drawText: function(text, x, y) {
       this.ctx.fillText(text, x, y);
   },

   setFont: function(fontText) {
       this.ctx.font = fontText;
   },

   // ********************
   // Matrix functions
   // ********************

   scale: function(x, y) {
     this.scaleMat.scale(x, y, false);
   },

   rotation: function(angle) {
     this.rotateMat.rotate(angle, false);
   },

   translate: function(x, y) {
     this.translateMat.translate(x, y, false);
   },

   // ********************
   // drawing functions
   // ********************

   drawLines: function(mat, points) {

     var finalMat = new Matrix();

     if (mat != null)
       finalMat.multiply(mat);

     // apply context matrixes to points
     finalMat.multiply(this.scaleMat);
     finalMat.multiply(this.rotateMat);
     finalMat.multiply(this.translateMat);

     // apply given matrix to points
     for (var i = 0; i < points.length; i++)
     {
       points[i].applyMatrix(finalMat);
     }

     this.ctx.beginPath();
     this.ctx.moveTo(points[0].x, points[0].y);
     for (var i = 1; i < points.length; i++)
     {
       this.ctx.lineTo(points[i].x, points[i].y);
       // console.log('lineto ' + points[i].x + ', ' + points[i].y);
     }
     this.ctx.strokeStyle = '#ffffff';
     this.ctx.stroke();
   },


   drawPoints: function(mat, points) {

     var finalMat = new Matrix();

     if (mat != null)
       finalMat.multiply(mat);

     // apply context matrixes to poin ts
     finalMat.multiply(this.scaleMat);
     finalMat.multiply(this.rotateMat);
     finalMat.multiply(this.translateMat);

     // apply given matrix to points
     this.ctx.fillStyle = '#ffffff';
     for (var i = 0; i < points.length; i++)
     {
       points[i].applyMatrix(finalMat);
       this.ctx.fillRect(points[i].x, points[i].y, 2, 2);
     }
   },

   strokeStyle: function(style) {
     this.ctx.strokeStyle = style;
   },

   clear: function(l, t, w, h) {
     this.ctx.fillStyle = this.fillStyle;
     this.ctx.clearRect(l, t, w, h);
   },

   fill: function(l, t, w, h) {
     this.ctx.fillStyle = this.fillStyle;
     this.ctx.fillRect(l, t, w, h);
   },

 };
