fsgame = {
    fmLimit : 5000,
    stockfallTime: 1000,
    currentHand: 1,
    coinStorage: 0,
    teamId: 1,
    keycodeConfig: {
        49 : 1,
        50 : 2,
        51 : 3,
        52 : 4,
        53 : 5,
        54 : 6,
        55 : 7,
        56 : 8
    },
    gameInterval: 5000,
    coinInterval: 500,
    playI: 0,
    x2: false,
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
    init: function(){
        var _this = this;
        clearInterval(_this.playI);
        _this.playI = setInterval(function(){
            _this.coinGenerator.makeCoin();
        }, _this.getRandomInt((_this.x2 ? 75 : 300), (_this.x2 ? 200 : 800)));

        if(!_this.isStarted){
            setTimeout(function(){
                clearInterval(_this.playI);
                console.log('Вы собрали хуй');
                console.log('Выпало '+fsgame.coinGenerator.coinsCounter+' монет');
            }, _this.gameInterval);
        }

        _this.isStarted = true;
    },
    play: function(teamId){
       var _this = this;
        _this.teamId = teamId;
       _this.init();
    },
    finish: function(){

    },
    setFallTime: function(){
        var _this = this;
        _this.stockfallTime = _this.stockfallTime + _this.getRandomInt(-200, 500);
    },
    coinGenerator: {
        coinsWrap: '.fs-game-bg',
        coinsCounter: 0,
        id: 1,
        makeCoin: function(){
            var data = {
                slotId: fsgame.getRandomInt(0,7),
                isBomb: fsgame.getRandomInt(0, 3),
                speed: fsgame.getRandomInt(1, 3)
            };
            data.speed = (data.speed/2)*1000;
            if(data.isBomb !== 1){
                fsgame.coinGenerator.coinsCounter++;
            }
            $.tmpl('<div class="coin" data-id="${slotId}" data-speed="${speed}" data-is-animated="1" data-is-caught="0" data-is-bomb="${isBomb}"> <div class="coin-hp1"> <div class="coin-hp2"></div><div class="coin-boom coin-boom-1"></div> <div class="coin-boom coin-boom-2"></div> <div class="coin-boom coin-boom-3"></div> <div class="coin-boom coin-boom-4"></div> <div class="coin-boom coin-boom-5"></div> <div class="coin-boom coin-boom-6"></div> <div class="coin-boom coin-boom-7"></div> <div class="coin-boom coin-boom-8"></div> <div class="coin-boom-core"></div> </div></div>', data).appendTo(this.coinsWrap);
            fsgame.checkCollect(data);
            fsgame.coinGenerator.id++;
        },
        makeFail: function(){
            fsgame.coinGenerator.coinsCounter = fsgame.coinGenerator.coinsCounter-5;
        }
    },
    checkCollect: function(data){
        var _this = this;
        setTimeout(function(){
            if(data.slotId == _this.currentHand) {
                console.log('Собрал');
            } else {
                console.log('Уронил');
            }
        }, data.speed);
    },
    getCoin: function(id){
        if(id) {

        }
    },
    moveHand: function(id){

    }
}
