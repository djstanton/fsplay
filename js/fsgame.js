function Sound(source,volume,loop)
{
    this.source=source;
    this.volume=volume;
    this.loop=loop;
    var son;
    this.son=son;
    this.finish=false;
    this.stop=function()
    {
        document.body.removeChild(this.son);
    }
    this.start=function()
    {
        if(this.finish)return false;
        this.son=document.createElement("embed");
        this.son.setAttribute("src",this.source);
        this.son.setAttribute("hidden","true");
        this.son.setAttribute("volume",this.volume);
        this.son.setAttribute("autostart","true");
        this.son.setAttribute("loop",this.loop);
        document.body.appendChild(this.son);
    }
    this.remove=function()
    {
        document.body.removeChild(this.son);
        this.finish=true;
    }
    this.init=function(volume,loop)
    {
        this.finish=false;
        this.volume=volume;
        this.loop=loop;
    }
}

var coin=new Sound("mario.mp3",100,false);
var errorSound =new Sound("bomb.mp3",100,false);
var mainTheme=new Sound("moneysong.mp3",80,true);
var playTheme=new Sound("go.mp3",80,true);
var finishTheme=new Sound("swag.mp3",80,true);
mainTheme.start();

String.prototype.toMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = minutes+':'+seconds;
    return time;
};

fsgame = {
    fmLimit : 5000,
    stockfallTime: 1000,
    currentHand: 0,
    coinStorage: 0,
    teamId: 0,
    keycodeConfig: {
        1: 48,
        2 : 55,
        3 : 53,
        4 : 110,
        5 : 50,
        6 : 109,
        7 : 56,
        8 : 54
    },
    step: 0,
    gameInterval: 20000,
    coinInterval: 500,
    playI: 0,
    x2: false,
    scoreWrap: '.score-text',
    isStarted: false,
    getRandomInt: function(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getTeam: function(e){
        switch(e.keyCode){

        }
    },
    startGame: function(){
        this.init();
    },
    startInterval: function(){
        var _this = this;
        _this.playI = setInterval(function(){
            _this.coinInterval =  _this.coinInterval + _this.getRandomInt((_this.x2 ? 10 : 300), (_this.x2 ? 50 : 800));
            _this.coinGenerator.makeCoin();
        }, _this.coinInterval);
    },
    startX2: function(){
        var _this = this;
        _this.x2 = 1;
        _this.startGame();
        setTimeout(function(){
            _this.stopX2();
        }, 5000);
    },
    stopX2: function(){
        var _this = this;
        _this.x2 = 0;
        _this.startGame();
    },
    setActiveStep:function(step){
        $('.fs-game').attr('data-state',step);
        this.step = step;
    },
    startTimer: function(){
        var _this = this, lastTime = _this.gameInterval/1000;
        _this.timerInterval = setInterval(function(){
            lastTime--;
            $('.timer-text').html(lastTime.toString().toMMSS());
            if(!lastTime){
                clearInterval(_this.timerInterval);
                _this.finish();
            }
        }, 1000);
    },
    nextStep:function(e){
        var _this = this, step = this.step,
            rightHand = $('.man-hand-even'), leftHand = $('.man-hand-odd');
        if(_this.lockGame){
            return;
        }
        if(step && step == 1){
            switch (e.keyCode) {
                case _this.keycodeConfig[1]:
                    _this.teamId = 1;
                    break;
                case _this.keycodeConfig[2]:
                    _this.teamId = 2;
                    break;
                case _this.keycodeConfig[3]:
                    _this.teamId = 3;
                    break;
                case _this.keycodeConfig[4]:
                    _this.teamId = 4;
                    break;
                case _this.keycodeConfig[5]:
                    _this.teamId = 5;
                    break;
                case _this.keycodeConfig[6]:
                    _this.teamId = 6;
                    break;
                case _this.keycodeConfig[7]:
                    _this.teamId = 7;
                    break;
                case _this.keycodeConfig[8]:
                    _this.teamId = 8;
                    break;
                default:
                    break;
            }
            if(_this.teamId){
                _this.setActiveStep(2);
                setTimeout(function(){
                    _this.play(_this.teamId);
                }, 1000);
            }
        } else if(step && step == 2){
            switch (e.keyCode) {
                case _this.keycodeConfig[1]:
                    _this.currentHand = 1;
                    leftHand.attr('data-pos', 7);
                    rightHand.attr('data-pos', -1);
                    break;
                case _this.keycodeConfig[2]:
                    _this.currentHand = 2;
                    rightHand.attr('data-pos', 8);
                    leftHand.attr('data-pos', -1);
                    break;
                case _this.keycodeConfig[3]:
                    _this.currentHand = 3;
                    leftHand.attr('data-pos', 5);
                    rightHand.attr('data-pos', -1);
                    break;
                case _this.keycodeConfig[4]:
                    _this.currentHand = 4;
                    rightHand.attr('data-pos', 6);
                    leftHand.attr('data-pos', -1);
                    break;
                case _this.keycodeConfig[5]:
                    _this.currentHand = 5;
                    leftHand.attr('data-pos', 3);
                    rightHand.attr('data-pos', -1);
                    break;
                case _this.keycodeConfig[6]:
                    _this.currentHand = 6;
                    rightHand.attr('data-pos', 4);
                    leftHand.attr('data-pos', -1);
                    break;
                case _this.keycodeConfig[7]:
                    _this.currentHand = 7;
                    leftHand.attr('data-pos', 1);
                    rightHand.attr('data-pos', -1);
                    break;
                case _this.keycodeConfig[8]:
                    _this.currentHand = 8;
                    rightHand.attr('data-pos', 2);
                    leftHand.attr('data-pos', -1);
                    break;
            }
        } else {
            _this.setActiveStep(1);
        }
    },
    init: function(){
        var _this = this;
        _this.lockGame = false;
        clearInterval(_this.playI);
        _this.startTimer();
        _this.coinGenerator.collectedCoins = 0;
        _this.gameInterval = 120000;
        _this.currentHand = 0;
        _this.teamId = 0;
        $(_this.scoreWrap).html('000000');
        _this.playI = setInterval(function(){
            _this.coinGenerator.makeCoin();
        }, _this.getRandomInt((_this.x2 ? 75 : 300), (_this.x2 ? 200 : 800)));

        if(!_this.isStarted){
            setTimeout(function(){
                clearInterval(_this.playI);
                console.log('Выпало '+fsgame.coinGenerator.coinsCounter+' монет');
            }, _this.gameInterval);
        }

        _this.isStarted = true;
    },
    play: function(teamId){
       var _this = this;
        mainTheme.stop();
        playTheme.start();
        setTimeout(function(){
            _this.init();
        }, 3000);

    },
    finish: function(){
        var _this = this, rightHand = $('.man-hand-even'), leftHand = $('.man-hand-odd');
        $('body').append('<div class="result"><div class="result-text-shadow">Вы собрали '+_this.coinGenerator.collectedCoins+' ФМ </div> <div class="result-text"> Вы собрали '+_this.coinGenerator.collectedCoins+' ФМ</div></div>');
        _this.lockGame = true;
        _this.coinGenerator.collectedCoins = 0;
        clearInterval(_this.playI);
        $(_this.scoreWrap).html('000000');
        _this.currentHand = 0;
        $('.timer-text').html('120'.toString().toMMSS());
        leftHand.attr('data-pos', -1);
        rightHand.attr('data-pos', -1);
        playTheme.stop();
        finishTheme.start();
        setTimeout(function(){
            _this.setActiveStep(0);
            finishTheme.stop();
            mainTheme.start();
            $('.result').fadeOut();
            _this.lockGame = false;
        }, 7000);12
    },
    setFallTime: function(){
        var _this = this;
        _this.stockfallTime = _this.stockfallTime + _this.getRandomInt(-200, 500);
    },
    coinGenerator: {
        coinsWrap: '.kit-body',
        coinsCounter: 0,
        collectedCoins: 0,
        id: 1,
        makeCoin: function(){
            var data = {
                slotId: fsgame.getRandomInt(0,7),
                isBomb: fsgame.getRandomInt(0, 7),
                speed: 1600,
                id: fsgame.coinGenerator.id
            };
            if(data.isBomb !== 1){
                fsgame.coinGenerator.coinsCounter++;
            }
            $.tmpl('<div class="coin coin-${id}" data-id="${slotId}" data-speed="${speed}" data-is-animated="1" data-is-fail="0" data-is-done="0" data-is-bomb="${isBomb}"> <div class="coin-hp1"> <div class="coin-hp2"></div><div class="coin-boom coin-boom-1"></div> <div class="coin-boom coin-boom-2"></div> <div class="coin-boom coin-boom-3"></div> <div class="coin-boom coin-boom-4"></div> <div class="coin-boom coin-boom-5"></div> <div class="coin-boom coin-boom-6"></div> <div class="coin-boom coin-boom-7"></div> <div class="coin-boom coin-boom-8"></div> <div class="coin-boom-core"></div>  <div class="coin-done"> <div class="coin-done-hp1"></div> <div class="coin-done-hp2"></div> <div class="coin-done-hp3"></div> </div> </div></div>', data).appendTo($('[data-kit-id ='+data.slotId+']').find('.kit-body')[0]);
            $('[data-kit-id ='+data.slotId+']').attr('data-is-animated', 1);
            fsgame.checkCollect(data);
            fsgame.coinGenerator.id++;
        },
        makeFail: function(){
            var _this = this;
            fsgame.coinGenerator.collectedCoins = fsgame.coinGenerator.collectedCoins-5;
            $(_this.scoreWrap).html(fsgame.coinGenerator.collectedCoins);

        }
    },
    addPads: function(coins){
        var str = "" + coins, pad = "000000", ans = pad.substring(0, pad.length - str.length) + str;
        return ans;
    },
    checkCollect: function(data){
        var _this = this;
        setTimeout(function(){
            if(data.slotId == _this.currentHand) {
                if(data.isBomb == 1){
                    fsgame.coinGenerator.collectedCoins = fsgame.coinGenerator.collectedCoins-3;
                    if(fsgame.coinGenerator.collectedCoins < 0){
                        fsgame.coinGenerator.collectedCoins = 0;
                    }
                    errorSound.start();
                    $('.coin-'+data.id).attr('data-is-done', 1);
                    $(_this.scoreWrap).html(_this.addPads(fsgame.coinGenerator.collectedCoins));
                } else {
                    fsgame.coinGenerator.collectedCoins++;
                    coin.start();
                    $('.coin-'+data.id).attr('data-is-done', 1);
                    setTimeout(function(){
                        $('.coin-'+data.id).remove();
                    }, 2000);
                    $(_this.scoreWrap).html(_this.addPads(fsgame.coinGenerator.collectedCoins));
                }
            } else {
                $('.coin-'+data.id).attr('data-is-fail', 1);
                console.log('Уронил');
            }
            $('[data-kit-id ='+data.slotId+']').attr('data-is-animated', 0);
        }, data.speed);
    },
    getCoin: function(id){
        if(id) {

        }
    },
    moveHand: function(id){

    }
}
