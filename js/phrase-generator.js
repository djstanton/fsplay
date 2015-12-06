phraseGenerator = (function () {
    var wrapNode = document.getElementById('phrase'),
        textNode = document.getElementById('phrase-text'),
        intervalID = null,
        isAnimated = false,
        animationTimeMs = 5000,

        texts = {
            good: [
                'Уже почти 700000',
                'Нужно больше золота',
                'Жизнь за ФМ'],
            bad: [
                'Сервер упал',
                'Похоже в этом меяце премии не будет',
                'Локал опять тупит']
        },

        getText = function (type) {
            var textArr = texts[type],
                id = Math.floor((Math.random() * textArr.length));

            if (textArr.length === 0) {
                return false;
            }

            var text = textArr[id];
            textArr.splice(id,1);

            return text;
        };

    return {
        showPhrase: function(type) {

            if (!type || isAnimated) {
                return;
            }

            var text = getText(type);

            if (text === false ) {
                return;
            }

            wrapNode.setAttribute('data-is-animated', '1');
            isAnimated = true;
            textNode.innerHTML = text;

            setTimeout( function(){
                wrapNode.setAttribute('data-is-animated', '0');
                isAnimated = false;
            }.bind(this), animationTimeMs);
        }
    }
})();