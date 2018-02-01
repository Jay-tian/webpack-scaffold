class Article {
    constructor($form){
        this.form = $form;
        
    }
    save() {
        let $form = this.form;
        
        $.post($form.attr('action'), $form.serialize(), function(message){
            if (message.error) {
                $.alert.show(message.error, 'danger', 3000);
            } else {
                $.alert.show('保存成功', 'success', 3000);
            }
            $form.find('#article-id').val(message.id);
        });
    }
}

export default Article;