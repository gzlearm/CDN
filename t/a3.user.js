// ==UserScript==
// @name         自动化A3（负载均衡）
// @namespace    learm
// @version      0.3.10.1
// @description  自定义参数
// @author       learm
// @match        *://*.chaoxing.com/exam/test/reVersionTestStartNew*
// @match        *://*.edu.cn/exam/test/reVersionTestStartNew*
// @run-at       document-end
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @grant        GM_setClipboard
// @updateURL    https://upyun.learm.top/t/a3.user.js
// @supportURL   https://blog.learm.top
// @license      MIT
// ==/UserScript==
//
//==========================================
//           这是升级自动化安装包
//    建议更新版本，直接点上方“安装”即可！
//==========================================
//   公示:
//   该版本已经过测试后才下发给你们升级。
//   如需使用自动打码功能请购买key使用。
//   打码平台是第三方的，网上打码大约1毛1个。
//
//                          2020年3月12日
//                          下发升级文件
//
//==========================================
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var setting = {
    // 5E3 == 5000，
    time: 5E3
    ,token: ''

    ,none: 0
    ,jump: 1
    ,copy: 0

    ,hide: 0
    ,scale: 0
},
_self = unsafeWindow,
$ = _self.jQuery,
UE = _self.UE;

String.prototype.toCDB = function() {
    return this.replace(/\s/g, '').replace(/[\uff01-\uff5e]/g, function(str) {
        return String.fromCharCode(str.charCodeAt(0) - 65248);
    }).replace(/[“”]/g, '"').replace(/[‘’]/g, "'").replace(/。/g, '.');
};

// setting.time += Math.ceil(setting.time * Math.random()) - setting.time / 2;
setting.TiMu = [
    filterImg('.Cy_TItle .clearfix').replace(/\s*（\d+\.\d+分）$/, ''),
    $('[name^=type]:not([id])').val() || '-1',
    $('.cur a').text().trim() || '无',
    $('li .clearfix').map(function() {
        return filterImg(this);
    }),
    $('#paperId').val()
];

GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://mooc.forestpolice.org/report/cxk/?paperId=' + setting.TiMu[4]
});

setting.div = $(
    '<div style="border: 2px dashed rgb(0, 85, 68); width: 330px; position: fixed; top: 0; right: 0; z-index: 99999; background-color: rgba(70, 196, 38, 0.6); overflow-x: auto;">' +
        '<span style="font-size: medium;"></span>' +
        '<div style="font-size: medium;">正在搜索答案...</div>' +
        '<button style="margin-right: 10px;">暂停答题</button>' +
        '<button style="margin-right: 10px;' + (setting.jump ? '' : ' display: none;') + '">点击停止本次切换</button>' +
        '<button style="margin-right: 10px;">重新查询</button>' +
        '<button style="margin-right: 10px; display: none;">复制答案</button>' +
        '<button>答题详情</button>' +
        '<div style="max-height: 200px; overflow-y: auto;">' +
            '<table border="1" style="font-size: 12px;">' +
                '<thead>' +
                    '<tr>' +
                        '<th colspan="2">' + ($('#randomOptions').val() == 'false' ? '' : '<font color="red">本次考试的选项为乱序 系统会选择正确的选项</font>') + '</th>' +
                    '</tr>' +
                    '<tr>' +
                        '<th style="width: 60%; min-width: 130px;">题目（点击可复制）</th>' +
                        '<th style="min-width: 130px;">答案（点击可复制）</th>' +
                    '</tr>' +
                '</thead>' +
                '<tfoot style="' + (setting.jump ? ' display: none;' : '') + '">' +
                    '<tr>' +
                        '<th colspan="2">已关闭 本次自动切换</th>' +
                    '</tr>' +
                '</tfoot>' +
                '<tbody>' +
                    '<tr>' +
                        '<td colspan="2" style="display: none;"></td>' +
                    '</tr>' +
                '</tbody>' +
            '</table>' +
        '</div>' +
    '</div>'
).appendTo('body').on('click', 'button, td', function() {
    var num = setting.$btn.index(this);
    if (num == -1) {
        GM_setClipboard($(this).text());
    } else if (num === 0) {
        if (setting.loop) {
            clearInterval(setting.loop);
            delete setting.loop;
            num = ['已暂停搜索', '继续答题'];
        } else {
            setting.loop = setInterval(findTiMu, setting.time);
            num = ['正在搜索答案...', '暂停答题'];
        }
        setting.$div.html(function() {
            return $(this).data('html') || num[0];
        }).removeData('html');
        $(this).html(num[1]);
    } else if (num == 1) {
        setting.jump = 0;
        setting.$div.html(function() {
            return arguments[1].replace('即将切换下一题', '未开启自动切换');
        });
        setting.div.find('tfoot').add(this).toggle();
    } else if (num == 2) {
        location.reload();
    } else if (num == 3) {
        GM_setClipboard(setting.div.find('td:last').text());
    } else if (num == 4) {
        ($('.leftCard .saveYl')[0] || $()).click();
    }
}).detach(setting.hide ? '*' : 'html');
setting.$btn = setting.div.children('button');
setting.$div = setting.div.children('div:eq(0)');

$(document).keydown(function(event) {
    if (event.keyCode == 38) {
        setting.div.detach();
    } else if (event.keyCode == 40) {
        setting.div.appendTo('body');
    }
});

if (setting.scale) _self.UEDITOR_CONFIG.scaleEnabled = false;
$('script').prev('textarea').each(function(index, value) {
    UE.getEditor(this.name).ready(function() {
        this.destroy();
        UE.getEditor(value.name);
    });
});
$('input[onpaste]').removeAttr('onpaste');
setting.loop = setInterval(findTiMu, setting.time);

function findTiMu() {
    GM_xmlhttpRequest({
        method: 'POST',
        url: 'http://mooc.forestpolice.org/cxk/' + (setting.token || 0) + '/' + encodeURIComponent(setting.TiMu[0]),
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        data: 'exam=' + encodeURIComponent(setting.TiMu[2]) + '&type=' + setting.TiMu[1] + '&id=' + setting.TiMu[4],
        timeout: setting.time,
        onload: function(xhr) {
            if (!setting.loop) {
            } else if (xhr.status == 200) {
                var obj = $.parseJSON(xhr.responseText) || {};
                if (obj.code) {
                    var data = obj.data.replace(/&/g, '&amp;').replace(/<([^i])/g, '&lt;$1'),
                    que = setting.TiMu[0].match('<img') ? setting.TiMu[0] : setting.TiMu[0].replace(/&/g, '&amp;').replace(/</g, '&lt');
                    obj.data = /^http/.test(data) ? '<img src="' + obj.data + '">' : obj.data;
                    setting.div.find('tbody').append(
                        '<tr>' +
                            '<td title="点击可复制">' + que + '</td>' +
                            '<td title="点击可复制">' + (/^http/.test(data) ? obj.data : '') + data + '</td>' +
                        '</tr>'
                    );
                    setting.copy && GM_setClipboard(obj.data);
                    setting.$btn.eq(3).show();
                    fillAnswer(obj);
                } else {
                    setting.$div.html(obj.data || '服务器繁忙，小黑屋20秒');
                }
                setting.div.children('span').html(obj.msg || '');
            } else if (xhr.status == 403) {
                setting.$div.data('html', '请求过于频繁，建议稍后再试').siblings('button:eq(0)').click();
            } else {
                setting.$div.text('服务器异常，小黑屋20秒');
            }
        },
        ontimeout: function() {
            setting.loop && setting.$div.text('服务器超时，小黑屋20秒');
        }
    });
}

function fillAnswer(obj, tip) {
    var $input = $(':radio, :checkbox', '.Cy_ulBottom'),
    str = String(obj.data).toCDB() || new Date().toString(),
    data = str.split(/#|\x01|\|/),
    opt = obj.opt || str,
    btn = $('.saveYl:contains(下一题)').offset();
    // $input.filter(':radio:checked').prop('checked', false);
    obj.code > 0 && $input.each(function(index) {
        if (this.value == 'true') {
            data.join().match(/(^|,)(正确|是|对|√|T|ri)(,|$)/) && this.click();
        } else if (this.value == 'false') {
            data.join().match(/(^|,)(错误|否|错|×|F|wr)(,|$)/) && this.click();
        } else {
            index = setting.TiMu[3][index].toCDB() || new Date().toString();
            index = $.inArray(index, data) + 1 || (setting.TiMu[1] == '1' && str.match(index));
            Boolean(index) == this.checked || this.click();
        }
    }).each(function() {
        if (!/^A?B?C?D?E?F?G?$/.test(opt)) return false;
        Boolean(opt.match(this.value)) == this.checked || this.click();
    });
    if (setting.TiMu[1].match(/^[013]$/)) {
        tip = $input.is(':checked') || setting.none && (($input[Math.floor(Math.random() * $input.length)] || $()).click(), '不会');
    } else if (setting.TiMu[1].match(/^(2|[4-9]|1[08])$/)) {
        var $li = $('.Cy_ulTk li');
        data = String(obj.data).split(/#|\x01|\|/);
        tip = (obj.code > 0 && data.length == $li.length) || setting.none && '不会';
        tip && $li.each(function(index, dom) {
            data[index] = (obj.code > 0 && (data[index] || '').trim()) || '不会';
            dom = $('.inp', this).filter(':visible').val(data[index]).end().is(':hidden') ? $(this).next() : dom;
            $('.edui-default + textarea', dom).each(function() {
                UE.getEditor(this.name).setContent(data[index]);
            });
        });
        setting.len = str.length * setting.time / 10;
    }
    if (tip == '不会') {
        tip = '已执行默认操作';
    } else if (tip) {
        tip = '自动答题已完成';
    } else if (tip === undefined) {
        tip = '该题型不支持自动答题';
    } else {
        tip = '未找到有效答案';
    }
    if (btn) {
        tip += setting.jump ? '，即将切换下一题' : '，未开启自动切换';
        setInterval(function() {
            if (!setting.jump) return;
            var mouse = document.createEvent('MouseEvents'),
            arr = [btn.left + Math.ceil(Math.random() * 80), btn.top + Math.ceil(Math.random() * 26)];
            mouse.initMouseEvent('click', true, true, document.defaultView, 0, 0, 0, arr[0], arr[1], false, false, false, false, 0, null);
            _self.event = $.extend(true, {}, mouse);
            delete _self.event.isTrusted;
            _self.getTheNextQuestion(1);
        }, setting.len || Math.ceil(setting.time * Math.random()) * 2);
    } else {
        setting.$btn.eq(1).hide();
        tip = '答题已完成，请自行查看答题详情';
    }
    setting.$div.data('html', tip).siblings('button:eq(0)').hide().click();
}

function filterImg(dom) {
    return $(dom).clone().find('img[src]').replaceWith(function() {
        return $('<p></p>').text('<img src="' + $(this).attr('src') + '">');
    }).end().find('iframe[src]').replaceWith(function() {
        return $('<p></p>').text('<iframe src="' + $(this).attr('src') + '"></irame>');
    }).end().text().trim();
}