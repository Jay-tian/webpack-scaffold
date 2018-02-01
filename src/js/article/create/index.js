import './../../../less/page/article-create.less'
import Article from './article.js';
let $form = $('#article');
let testEditor = editormd({
    id: 'content',
    path: "../../libs/editor.md/lib/",
    height: '100%',
    width: '100%',
    imageUpload: true,
    saveHTMLToTextarea: true,
});

let $article = $("#article");
let article = new Article($form);

document.onkeydown=function(e)   {
    if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
        $("#article").submit();
        return false;
    }
}

$article.validate({
    invalidHandler: function(data, validate) {
        let errorTip = validate.errorMap[Object.keys(validate.errorMap)[0]];
        if (errorTip) {
            $.alert.show(errorTip, 'danger');
        }
    },
    submitHandler: function(form) {
       article.save();
    },
    rules: {
        content_md: {
            required: true,
        },
        title: {
            required: true,
            minlength: 6,
            maxlength: 20,
        },
    },
    messages: {
        content_md: {
            required: "请输入正文内容",
        },
        title: {
            required: "请输入标题",
            minlength: "标题不能小于6个字符",
            maxlength: "标题不能大于20个字符",
        },
    }
});