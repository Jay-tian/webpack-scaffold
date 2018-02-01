class Alert {
    constructor(setting){
        this.body = $('body');
        this.temp =  $(`<div id="alert" class="alert text-center fixed transition" role="alert"><div id="alert-content"></div></div>`);
        this.body.prepend(this.temp);
    }

    show(message, level, time = 1000) {
        this.temp.addClass('show').find('#alert-content').text(message).removeClass().addClass('alert-' + level);
        this.hide(time);
    }

    hide(time){
        let self = this;
        clearTimeout(this.hideId);
        this.hideId = setTimeout(function(){
            self.temp.removeClass('show');
        }, time)
    }
}

export default Alert;