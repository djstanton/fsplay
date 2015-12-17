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
    getTeam: function(e){
        switch(e.keyCode){

        }
    },
    startGame: function(){
       this.init();
    },
    init: function(){

    },
    finish: function(){

    },
    setFallTime: function(){
        var _this = this;
        _this.stockfallTime = _this.stockfallTime + parseInt((Math.random() * (-200 - 500) + 500));
    },
    coinGenerator: {
        coinsWrap: '.fs-game-bg',
        makeCoin: function(){
            var data = {
                slotId: parseInt(Math.random() * (0 - 8) + 8),
                isBomb: (Math.random() * (0 - 25) + 25)
            };
            $.tmpl('<div class="coin" data-id="${slotId}" data-is-animated="1" data-is-caught="0" data-is-bomb="${isBomb}"> <div class="coin-hp1"> <div class="coin-hp2"></div><div class="coin-boom coin-boom-1"></div> <div class="coin-boom coin-boom-2"></div> <div class="coin-boom coin-boom-3"></div> <div class="coin-boom coin-boom-4"></div> <div class="coin-boom coin-boom-5"></div> <div class="coin-boom coin-boom-6"></div> <div class="coin-boom coin-boom-7"></div> <div class="coin-boom coin-boom-8"></div> <div class="coin-boom-core"></div> </div></div>', data).append(this.coinsWrap)
        },
        makeFail: function(){

        }
    },
    getCoin: function(id){
        if(id) {

        }
    },
    moveHand: function(e){

    }
}
