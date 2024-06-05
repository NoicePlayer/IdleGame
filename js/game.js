class Item{

    static types = new Map([['auto', {sps: 0.1, name: 'auto', count: 0}], ['guy', {sps: 0.3, name: 'guy', count: 0}]]);
    static perSec = 0;

    static harvest(interval){
        Item.types.forEach((data, type)=>{
             score += (interval / 1000) * data.sps * data.count;
            });
        updateCounter();
    }

    static add(type){
        console.log(type);
        Item.types.get(type).count += 1;
        Item.perSec += Item.types.get(type).sps;
    }

}


let score = 0;

$(document).ready(function() {
    $('#clickable').on('click', function() {

        score++;
        updateCounter();

        if(!$(this).hasClass('pulsing')){
            $(this).addClass('pulsing');
            setTimeout(() => {
                this.classList.toggle('pulsing', !$(this).hasClass('pulsing'));
            }, 600); // Duration of the pulse animation
        }
    });

    initItemShop();

    setInterval(() => {
        Item.harvest(100);
    }, 100);
});

function initItemShop(){
    Item.types.forEach((data, type)=>{
        $('#shop')
        .append($('<div/>').addClass('shop-item').on('click', ()=>Item.add(type))
        .append($('<div/>', {"class": 'name'}).text(type))
    .append($('<img/>', {src : 'images/' + type + '_bg.png', "class": 'bg'}))
    .append($('<img/>', {src : 'images/' + type + '.png', "class": 'fg'}))
        .append($('<div/>', {"class": 'quant'}).text('x1'))
    );
    });

}

function updateCounter(){
    $('#counter').html('Score: ' + score.toFixed(2));
}

$(document).on('keydown',function(event) {
    // Check if only the left Shift key is pressed (keyCode 16) and no other keys are pressed
    if (event.shiftKey) {
        // Trigger your callback function here
        $('.quant').text('x10')
    }
});

$(document).on('keyup', function(event) {
    // Check if only the left Shift key is pressed (keyCode 16) and no other keys are pressed
    if (!event.shiftKey) {
        // Trigger your callback function here
        $('.quant').text('x1') 
    }
});
