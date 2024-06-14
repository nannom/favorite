var chars = ["clara","amelia watson","takanashi hoshino","myoya","ichihime","lumine","gawr gura","miu","yoyo"]
var images = ["main_clara.png","main_ameliawatson.png","main_takanashihoshino.png","main_myoya.png","main_ichihime.png","main_lumine.png","main_gawrgura.png","main_miu.png","main_yoyo.png"]
var selected = 4;
function loadimage() {
    var j = selected;
    for(var i = 1;i<=9;i++) {
        const element = document.getElementById('main' + i);
        element.innerHTML = '<img src="' + images[j] + '" alt="' + chars[j] + '" class="image" />'
        j++;
        if(j > 8) {
            j = 0;
        }
    }
}

function swap_left() {
    selected--;
    if(selected < 0) {
        selected = 8;
    }
loadimage();
}
function swap_right() {
    selected++;
    if(selected > 8) {
        selected = 0;
    }
loadimage();
}
loadimage();