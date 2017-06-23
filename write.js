




//var lineWidth = document.getElementById('lineWidth');
//var fillstyle= document.getElementById('fillstyle');

//var strokestyle= document.getElementById('strokestyle');









$(function(){
    var canvas1 = document.getElementById('canvas1');
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext("2d");
    var ctx1 = canvas1.getContext("2d");
    var W = window.innerWidth - 6;
    var H = window.innerHeight - 120;
    //设置画布的宽高
    canvas.width = W;
    canvas.height = H;
    canvas1.width = W;
    canvas1.height = H;

    //颜色
    var colors = ['#9cc','#c99','#ccf','#c33','#ccc','#036','#f66','#c03','#636','#f66','#f00','#06c','#c96','#9c0','#933','#c69','#f93','#c96','#f93','#996','#630','#330','#cc9','#063','#3c3','#0c0','#06c','#033','#9c3','#cc6','#cc3','#999','#fc0','#939','#9c3','#cc3','#393','#399','#366','#ffc','#cfc','#fcc']
    $('.colors .items').each(function(index,item){
        $(item).css('background',colors[index])
    })

    //默认设置
    ctx.strokeStyle = colors[0];
    ctx.fillStyle = colors[0];
    ctx.setLineDash([0,0]);

    //画笔样式特效
    $('.pens button').click(function(){
        $(this).addClass('cur').siblings().removeClass('cur')
    })
    //改变颜色
    $('.colors .items').click(function(){
        ctx.strokeStyle = colors[$(this).index()-1];
        ctx.fillStyle = colors[$(this).index()-1];
    })
    console.log(colors.length)
    //编辑颜色
    $('#changeColors').on('change',function(){
        //console.log($(this).val())
        colors.push($(this).val());
        $('#colors .items').eq(colors.length-1).css('background',colors[colors.length-1])
        $('#colors').append('<div class="items"></div>')
        if($('#colors .items').length>54){
            $('.colors').css('overflow-y','scroll')
        }
        ctx.strokeStyle = colors[colors.length-1];
        ctx.fillStyle = colors[colors.length-1];
    })

    //选择描边
    var flag = false;  //默认描边状态
    $('.stroke').click(function(){
        if(flag){
            $(this).removeClass('curr')
            flag = false;
        }else{
            $(this).addClass('curr')
            flag = true;
        }
    })
    // 选择填充
    var flag1 = false;  //默认非填充状态
    $('.fill').click(function(){
        if(flag1){
            $(this).removeClass('curr')
            flag1 = false;
        }else{
            $(this).addClass('curr')
            flag1 = true;
        }
    })

    //设置虚线、实线
    $('#lineStyle').on('change',function(){
        console.log($(this).val())
        if($(this).val()== 'shixian'){
            ctx.setLineDash([0,0]);
        }else if($(this).val() == 'xuxian'){
            ctx.setLineDash([20,10])
        }
    })

    //设置线宽
    $('#lineWidth').on('change',function(){
        ctx.lineWidth = $(this).val();
    })

    //设置边数
    var bianshu = 3;
    $('#bianshu').on('change',function(){
        bianshu = parseInt($(this).val());
    })

    //设置填充或描边
    //铅笔
    $('#pens button:eq(0)').click(function(){
        canvas.onmousedown = function(e){
            ctx.clearRect(0,0,canvas.width,canvas.height)
            var e = e || window.event;
            var sX = e.offsetX;
            var sY = e.offsetY;
            ctx.save()
            ctx.beginPath();
            ctx.moveTo(sX,sY);
            canvas.onmousemove = function(e){
                var e = e || window.event;
                ctx.lineTo(e.offsetX,e.offsetY)
                ctx.stroke();
            }
        }
        canvas.onmouseup = function(){
            drawAgain();
            ctx.restore();
            ctx.clearRect(0,0,canvas.width,canvas.height)
            canvas.onmousemove = null;
        }
        canvas.onmouseout = function(){
            canvas.onmousemove = null;
        }
    })
   //直线
    $('#pens button:eq(1)').click(function(){
        canvas.onmousedown = function(e){
            var e = e || window.event;
            var sX = e.offsetX;
            var sY = e.offsetY;
            canvas.onmousemove = function(e){
                var e = e || window.event;
                ctx.clearRect(0,0,canvas.width,canvas.height)
                ctx.save()
                ctx.beginPath();
                ctx.moveTo(sX,sY);
                ctx.lineTo(e.offsetX,e.offsetY)
                ctx.stroke();
            }
        }
        canvas.onmouseup = function(){
            drawAgain();
            ctx.restore();
            ctx.clearRect(0,0,canvas.width,canvas.height)
            canvas.onmousemove = null;
        }
        canvas.onmouseout = function(){
            canvas.onmousemove = null;
        }
    })
    //矩形
     $('#pens button:eq(2)').click(function(){
        canvas.onmousedown = function(e){
            var e = e || window.event;
            var sX = e.offsetX;
            var sY = e.offsetY;
            canvas.onmousemove = function(e){
                var e = e || window.event;
                ctx.clearRect(0,0,canvas.width,canvas.height)
                ctx.save();
                ctx.beginPath();
                ctx.rect(sX,sY,e.offsetX-sX,e.offsetY-sY);

                strokeOrFill()
                ctx.closePath()
                ctx.restore();
            }
        }
        canvas.onmouseup = function(){
            drawAgain();
            ctx.restore();
            ctx.clearRect(0,0,canvas.width,canvas.height)
            canvas.onmousemove = null;
        }
        canvas.onmouseout = function(){
            canvas.onmousemove = null;
        }
    })
    //圆形
    $('#pens button:eq(3)').click(function(){
        canvas.onmousedown = function(e){
            var e = e || window.event;
            var sX = e.offsetX;
            var sY = e.offsetY;
            canvas.onmousemove = function(e){
                ctx.clearRect(0,0,canvas.width,canvas.height)
                var e = e || window.event;
                ctx.save();
                ctx.beginPath();
                ctx.arc(sX,sY,Math.abs(e.offsetX-sX),0,Math.PI*2);
                ctx.fill()
                strokeOrFill()
                ctx.closePath()
                ctx.restore();
            }

        }
        canvas.onmouseup = function (){
            drawAgain();
            ctx.clearRect(0,0,canvas.width,canvas.height)
            canvas.onmousemove = null;
        }
        canvas.onmouseout = function(){
            canvas.onmousemove = null;
        }
    })
    //星形
    $('#pens button:eq(4)').click(function(){
        canvas.onmousedown = function(e){

            var e = e || window.event;
            var sX = e.offsetX;
            var sY = e.offsetY;
            console.log(8)
            canvas.onmousemove = function(e){
                ctx.clearRect(0,0,canvas.width,canvas.height)
                var e = e || window.event;
                ctx.save();
                ctx.beginPath();
                ctx.translate(sX,sY)
                ctx.rotate(Math.PI/180*-18)
                ctx.moveTo(e.offsetX-sX,e.offsetY-sY);
                if(bianshu<= 6){
                    bianshu  = 5;
                }
                for(var i = 0 ; i<bianshu; i++){
                    ctx.rotate(Math.PI*2/bianshu*3);
                    ctx.lineTo(e.offsetX-sX,e.offsetY-sY);
                }
                ctx.closePath()
                strokeOrFill()
                ctx.restore();
            }
        }
        canvas.onmouseup = function (){
            drawAgain();
            ctx.clearRect(0,0,canvas.width,canvas.height)
            canvas.onmousemove = null;
        }
        canvas.onmouseout = function(){
            canvas.onmousemove = null;
        }
    })
    //弧线
    var endArr = [];
    $('#pens button:eq(5)').click(function(){
        //控制点
        var kX = 0,kY = 0;
        //结束点
        var eX = 0,eY = 0;
        var sX = 0, sY = 0
        var flags = false;
            canvas.onmousedown = function(e){
                e.stopPropagation()
                //ctx.clearRect(0,0,canvas.width,canvas.height)
                var e = e || window.event;
                sX = e.offsetX;
                sY = e.offsetY;

                canvas.onmousemove = function(e){
                    e.stopPropagation()
                    var e = e || window.event;

                    //if(!flags){
                    //    //ctx.stroke()
                    //    eX = e.offsetX;
                    //    eY = e.offsetY;
                    //    ctx.save()
                    //    ctx.beginPath();
                    //    ctx.moveTo(sX,sY);
                    //    ctx.lineTo(eX, eY);
                    //    ctx.stroke();
                    //    endArr = [eX, eY]
                    //    ctx.restore();
                    //    flags = true;
                    //}else{
                        ctx.clearRect(0,0,canvas.width,canvas.height)
                        ctx.save();
                        ctx.beginPath();
                        ctx.moveTo(sX,sY);
                        kX = e.offsetX
                        kY = e.offsetY
                        //kX = e.offsetX-(e.offsetX-sX)/2
                        //kY = e.offsetY-(e.offsetY-sY)/2
                        //ctx.quadraticCurveTo(kX ,kY, e.offsetX, e.offsetY);
                        ctx.quadraticCurveTo(kX,kY,sX+200,sY+200);
                        ctx.stroke();
                        ctx.restore();
                        //flags = false;
                    //}



                }
            }
            canvas.onmouseup = function (e){
                e.stopPropagation()


                drawAgain();
                ctx.clearRect(0,0,canvas.width,canvas.height)

                canvas.onmousemove = null;
            }
            canvas.onmouseout = function(){
                canvas.onmousemove = null;
            }

            //改变控制点
         /*   document.onmousedown = function(e){
                var e = e || window.event;
                e.stopPropagation()
                var sX1 = e.offsetX;
                var sY1 = e.offsetY;
                var isIn = ctx.isPointInPath(sX1,sY1)
                document.onmousemove = function(e){
                    console.log(111)
                    if(isIn){
                        console.log(2222)
                    }
                }
                document.onmouseup = function(){
                    document.onmousemove=null
                }
            }
*/




    })
    //多边形
    $('#pens button:eq(6)').click(function(){
        canvas.onmousedown = function(e){
            var e = e || window.event;
            var sX = e.offsetX;
            var sY = e.offsetY;
            canvas.onmousemove = function(e){
                ctx.clearRect(0,0,canvas.width,canvas.height)
                var e = e || window.event;
                ctx.save();
                ctx.beginPath();
                ctx.translate(sX,sY)
                ctx.rotate(Math.PI/180*-18)
                ctx.moveTo(e.offsetX-sX,e.offsetY-sY);
                for(var i = 0 ; i< bianshu; i++){
                    ctx.rotate(Math.PI*2/bianshu);
                    ctx.lineTo(e.offsetX-sX,e.offsetY-sY);
                }
                ctx.closePath()
                strokeOrFill()
                ctx.restore();
            }
        }
        canvas.onmouseup = function (){
            drawAgain();
            ctx.clearRect(0,0,canvas.width,canvas.height)
            canvas.onmousemove = null;
        }
        canvas.onmouseout = function(){
            canvas.onmousemove = null;
        }
    })
    //左右箭头
    $('#pens button:eq(7)').click(function(){
        canvas.onmousedown = function(e){
            ctx.clearRect(0,0,canvas.width,canvas.height)
            var e = e || window.event;
            var sX = e.offsetX;
            var sY = e.offsetY;

            canvas.onmousemove = function(e){
                var e = e || window.event;
                ctx.clearRect(0,0,canvas.width,canvas.height)
                ctx.save()
                ctx.beginPath();
                ctx.moveTo(sX,sY);
                ctx.lineTo(sX,sY-(e.offsetX-sX)/8/2)
                ctx.lineTo(sX+(e.offsetX-sX)/8*6,sY-(e.offsetX-sX)/8/2)
                ctx.lineTo(sX+(e.offsetX-sX)/8*6,sY-(e.offsetX-sX)/8/2-(e.offsetX-sX)/8)
                ctx.lineTo(e.offsetX, sY)
                ctx.lineTo(sX+(e.offsetX-sX)/8*6,sY+(e.offsetX-sX)/8/2+(e.offsetX-sX)/8)
                ctx.lineTo(sX+(e.offsetX-sX)/8*6,sY+(e.offsetX-sX)/8/2)
                ctx.lineTo(sX,sY+(e.offsetX-sX)/8/2)
                ctx.lineTo(sX,sY-(e.offsetX-sX)/8/2)
                strokeOrFill()
            }
        }
        canvas.onmouseup = function(){
            drawAgain();
            ctx.restore();
            ctx.clearRect(0,0,canvas.width,canvas.height)
            canvas.onmousemove = null;
        }
        canvas.onmouseout = function(){
            canvas.onmousemove = null;
        }
    })
    //上下箭头
    $('#pens button:eq(8)').click(function(){
        canvas.onmousedown = function(e){
            ctx.clearRect(0,0,canvas.width,canvas.height)
            var e = e || window.event;
            var sX = e.offsetX;
            var sY = e.offsetY;

            canvas.onmousemove = function(e){
                var e = e || window.event;
                ctx.clearRect(0,0,canvas.width,canvas.height)
                ctx.save()
                ctx.beginPath();
                ctx.moveTo(sX,sY);
                ctx.lineTo(sX+(e.offsetY-sY)/8/2,sY)
                ctx.lineTo(sX+(e.offsetY-sY)/8/2,sY+(e.offsetY-sY)/8*6)
                ctx.lineTo(sX+(e.offsetY-sY)/8/2+(e.offsetY-sY)/8,sY+(e.offsetY-sY)/8*6)
                ctx.lineTo(sX,sY+(e.offsetY-sY)/8*8)
                ctx.lineTo(sX-(e.offsetY-sY)/8/2-(e.offsetY-sY)/8,sY+(e.offsetY-sY)/8*6)
                ctx.lineTo(sX-(e.offsetY-sY)/8/2,sY+(e.offsetY-sY)/8*6)
                ctx.lineTo(sX-(e.offsetY-sY)/8/2,sY)
                ctx.lineTo(sX,sY)
                strokeOrFill()
            }
        }
        canvas.onmouseup = function(){
            drawAgain();
            ctx.restore();
            ctx.clearRect(0,0,canvas.width,canvas.height)
            canvas.onmousemove = null;
        }
        canvas.onmouseout = function(){
            canvas.onmousemove = null;
        }
    })

    //框选删除
    var arr=[]
    $('.delet').click(function(){
        var sX;
        var sY;

        canvas.onmousedown = function(e){
            var e = e || window.event;
            sX = e.offsetX;
            sY = e.offsetY;
            canvas.onmousemove = function(e){
                var e = e || window.event;
                ctx.clearRect(0,0,canvas.width,canvas.height)
                ctx.save();
                ctx.strokeStyle = 'blue';
                ctx.lineWidth = 1;
                ctx.setLineDash([10,10])
                ctx.beginPath();
                ctx.rect(sX,sY,e.offsetX-sX,e.offsetY-sY);
                arr = [e.offsetX-sX,e.offsetY-sY]
                ctx.stroke();
            }
        }
        canvas.onmouseup = function(e){
            console.log(arr)
            drawAgain();
            document.onkeyup = function(e){
                console.log(e.keyCode)
                if(e.keyCode == 46){
                    ctx1.clearRect(sX-1,sY-1,arr[0]+2,arr[1]+2)
                    //ctx1.clearRect(0,0,canvas.width,canvas.height)
                }
            }
            ctx.restore();
            ctx.clearRect(0,0,canvas.width,canvas.height)
            canvas.onmousemove = null;


        }

        canvas.onmouseout = function(){
            canvas.onmousemove = null;
        }
    })
    //橡皮
    $('#eraser').on('click',function(){
      //橡皮擦的半径
        var r = 10;
        var last = null;

        canvas.onmousedown = function(e){
            var e = e || window.event;
            var sX = e.offsetX;
            var sY = e.offsetY;
            ctx.save()
            //ctx.globalCompositeOperation = "source-out";
            ctx.beginPath();
            ctx.lineWidth =14;
            ctx.strokeStyle = '#fff';
            ctx.moveTo(sX,sY);
            canvas.onmousemove = function(e){
                var e = e || window.event;
                ctx.lineTo(e.offsetX,e.offsetY)
                ctx.stroke()
            }
        }
        canvas.onmouseup = function(){
            drawAgain();
            ctx.restore();
            ctx.clearRect(0,0,canvas.width,canvas.height)
            canvas.onmousemove = null;
        }
        canvas.onmouseout = function(){
            canvas.onmousemove = null;
        }


     /*   canvas.onmousedown = function(e){
            //ctx.clearRect(0,0,canvas.width,canvas.height)
            var e = e || window.event;
            var sX = e.offsetX;
            var sY = e.offsetY;
            ctx.save()
            ctx.fillStyle="#fff";
            ctx.beginPath()
            ctx.arc(sX,sY,r,0,2*Math.PI);
            ctx.clip()
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.restore();
            canvas.onmousemove = function(e){
                var e = e || window.event;
                var eX = e.offsetX;
                var eY = e.offsetY;
                //求取两点之间的坐标
                var asin = r*Math.sin(Math.atan((eY-sY)/(eX-sX)));
                var acos = r*Math.cos(Math.atan((eY-sY)/(eX-sX)));
                var x3 = sX+asin;
                var y3 = sY-acos;
                var x4 = sX-asin;
                var y4 = sY+acos;
                var x5 = eX+asin;
                var y5 = eY-acos;
                var x6 = eX-asin;
                var y6 = eY+acos;

                //保证线条的连贯，所以在矩形一端画圆
                ctx.save()
                ctx.beginPath()
                ctx.fillStyle="#fff";
                ctx.arc(eX,eY,r,0,2*Math.PI);
                ctx.clip()
                ctx.clearRect(0,0,canvas.width,canvas.height);
                ctx.restore();

                //清除矩形剪辑区域里的像素
                ctx.save()
                ctx.beginPath()
                ctx.fillStyle="#fff";
                ctx.moveTo(x3,y3);
                ctx.lineTo(x5,y5);
                ctx.lineTo(x6,y6);
                ctx.lineTo(x4,y4);
                ctx.closePath();
                ctx.clip()
                ctx.clearRect(0,0,canvas.width,canvas.height);
                ctx.restore();
                //记录最后坐标
                sX = eX;
                sY = eY;
            }
        }
        canvas.onmouseup = function (){
            canvas.onmousemove = null;
            last = null;
        }
        canvas.onmouseout = function(){
            canvas.onmousemove = null;
            last = null;
        }
*/
    })
    //保存
    $('#saves').on('click',function(){
        var imgdata = canvas1.toDataURL('images/png')
        var formData = new FormData();
        formData.append('data',imgdata);
        var xhr = new XMLHttpRequest();
        xhr.open('post','save.php');
        xhr.send(formData);
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                console.log(xhr.responseText);
            }
        }
    })
    //清除画布
    $('#clears').on('click',function(){
        console.log(11)
        ctx1.clearRect(0,0,W,H)
        console.log(22)
    })
    //画布重画
    function drawAgain(){
        //在另一张画布上画图
        var imgdata = canvas.toDataURL('images/png');
        var Img = new Image();
        Img.src = imgdata;
        Img.onload = function(){
            ctx1.drawImage(Img,0,0)
        }
    }
    //设置描边还是填充
    function strokeOrFill(){
        //都为false  默认描边
        if(flag == false && flag1 == false ){
            ctx.stroke();
        }else if(flag == true && flag1 == false ){
            ctx.stroke();
        }else if(flag == true && flag1 == true ){
            ctx.stroke();
            ctx.fill();
        }else if(flag == false && flag1 == true ){
            ctx.fill();
        }
    }
})
