class Item {

    static types = new Map([
        ['auto', { sps: 0.1, count: 0, cost: 10 }],
        ['guy', { sps: 0.3, count: 0, cost: 25 }],
        ['slingshot', { sps: 1, count: 0, cost: 45 }],
        ['pencil', { sps: 2, count: 0, cost: 70 }],
        ['sharpie', { sps: 4, count: 0, cost: 100 }],
        ['wizard', { sps: 10, count: 0, cost: 150 }],
        ['polkadots', { sps: 25, count: 0, cost: 2000 }],
        ['squaredance', { sps: 111, count: 0, cost: 10000 }],
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
        if (item.cost <= score) {
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

    constructor(cost, type = 'default', flat = 0, mult = 1, discount = 1) {
        this.type = type;
        this.flat = flat;
        this.mult = mult;
        this.discount = discount;
        this.cost = cost;
    }

    buy($me) {
        if (score >= this.cost) {
            score -= this.cost;

            $me.addClass('do-remove');
            this.triggerEffect()
            Upgrade.purchased.push(this)

            const index = Upgrade.available.indexOf(5);
            if (index > -1) { // only splice array when item is found
                Upgrade.available.splice(index, 1); // 2nd parameter means remove one item only
            }
        }
    }

    triggerEffect() {
        var itemType = Item.types.get(this.type);

        itemType.cost *= this.discount;
        itemType.sps += this.flat;
        itemType.sps *= this.mult;
    }

    static makeAvailable(upgrade) {

        this.available.push(upgrade);

        this.available.sort((a, b) => a.cost - b.cost);

        $('#upgrade-shop').empty();

        this.available.forEach(function (upg) {

            $('#upgrade-shop').append(
                $('<div/>', { "class": 'shop-upgrade has-price' })
                    .append($('<img/>', { src: 'images/' + upg.type + '.png', "class":'upgrade-icon' }))
                    .data('thing', upg)
                    .on('click', function () {
                        console.log("shop upgrade clicked on");
                        $(this).data('thing').buy($(this));
                    })
            )
        }
        )
        $('#upgrade-shop').append(
            $('<div/>').addClass('bumper')
        );


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
        reflectCanBuy();
        $('do-remove').remove();
    }, 100);

    Upgrade.makeAvailable(new Upgrade( 100,'auto', flat = 1));
    Upgrade.makeAvailable(new Upgrade( 10,'guy', flat = 1));
    Upgrade.makeAvailable(new Upgrade( 15,'pencil', flat = 1));
    Upgrade.makeAvailable(new Upgrade( 1000,'sharpie', flat = 1));
    Upgrade.makeAvailable(new Upgrade( 112,'wizard', flat = 1));
    Upgrade.makeAvailable(new Upgrade( 25,'polkadots', flat = 1));
});

function initItemShop() {
    Item.types.forEach((data, type) => {
        $('#item-shop')
            .append($('<div/>', { "class": 'shop-item has-price' }).on('click', () => Item.add(type))
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

function reflectCanBuy() {
    try {

        $('.has-price').each(function () {
            $(this).toggleClass('cant-afford', $(this).data('thing').cost > score);
        })
    } catch (error) {

    }
}

function getImage(prefix, suffix) {
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
