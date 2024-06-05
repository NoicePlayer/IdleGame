class Item {

    static types = new Map([
        ['auto', { sps: 0.1, count: 0, cost: 10 }],
        ['guy', { sps: 0.3, count: 0, cost: 25 }],
        ['slingshot', { sps: 1, count: 0, cost: 45 }],
        // ['pencil', { sps: 2, count: 0, cost: 70 }],
        // ['sharpie', { sps: 4, count: 0, cost: 100 }],
        // ['wizard', { sps: 10, count: 0, cost: 150 }],
        // ['polkadot', { sps: 25, count: 0, cost: 2000 }],
        // ['squaredance', { sps: 111, count: 0, cost: 10000 }],
    ]);
    static perSec = 0;

    static harvest(interval) {
        Item.types.forEach((data, type) => {
            score += (interval / 1000) * this.perSec;
        });
        updateCounter();
    }

    static add(type) {
        var item = Item.types.get(type);
        if(item.cost <= score){
            score -= item.cost;
            console.log(type);
            item.count += 1;
            Item.perSec += item.sps;
            updateCounter();
        }
    }

}

class Upgrade {

    static available = [];
    static purchased = [];

    constructor(type, flat, mult, discount, cost) {
        this.type = type;
        this.flat = flat;
        this.mult = mult;
        this.discount = discount;
        this.cost = cost;
    }

    buy(){
        if(score >= this.cost){
            score -= this.cost;
            this.triggerEffect()
        }
    }

    triggerEffect(){
        var itemType = Item.types.get(this.type);

        itemType.cost *= this.discount;
        itemType.sps += this.flat;
        itemType.sps *= this.mult;
    }

    static makeAvailable(upgrade) {
        $('#upgrade-shop').append(
            $('<div/>', {"class":'shop-upgrade has-price'})
            .append('<img/>', {src:'images/' + upgrade.type + '_small.png'}).data('thing', upgrade)
        )
    }
}


let score = 0;
let totalScore = 0;
let scorePerSec = 0;

$(document).ready(function () {
    $('#clickable').on('click', function () {

        score++;
        updateCounter();

        if (!$(this).hasClass('pulsing')) {
            $(this).addClass('pulsing');
            setTimeout(() => {
                this.classList.toggle('pulsing', !$(this).hasClass('pulsing'));
            }, 600); // Duration of the pulse animation
        }
    });

    initItemShop();

    setInterval(() => {
        Item.harvest(100);
        reflectCanBuy()
    }, 100);
});

function initItemShop() {
    Item.types.forEach((data, type) => {
        $('#item-shop')
            .append($('<div/>', {"class":'shop-item has-price'}).on('click', () => Item.add(type))
                .append($('<div/>', { "class": 'name' }).text(type))
                .append($('<img/>', { src: 'images/' + type + '_bg.png', "class": 'bg' }))
                .append($('<img/>', { src: 'images/' + type + '.png', "class": 'fg' }))
                .append($('<div/>', { "class": 'quant' }).text('x1'))
                .data('thing', data)
            );
    });

}

function updateCounter() {
    $('#counter').html('Score: ' + score.toFixed(2));
}

function reflectCanBuy(){
    $('.has-price').each(function (){
        $(this).toggleClass('cant-afford', $(this).data('thing').cost > score);
    })
}

function getImage(prefix, suffix){
    try {
        
    } catch (error) {
        
    }
}

$(document).on('keydown', function (event) {
    // Check if only the left Shift key is pressed (keyCode 16) and no other keys are pressed
    if (event.shiftKey) {
        // Trigger your callback function here
        $('.quant').text('x10')
    }
});

$(document).on('keyup', function (event) {
    // Check if only the left Shift key is pressed (keyCode 16) and no other keys are pressed
    if (!event.shiftKey) {
        // Trigger your callback function here
        $('.quant').text('x1')
    }
});
