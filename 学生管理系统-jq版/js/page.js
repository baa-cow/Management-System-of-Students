(function() {
    function turnPage(options, wrap) {
        this.current = options.current;
        this.total = options.total;
        this.wrap = wrap;
        this.cb = options.change;
    }
    turnPage.prototype.init = function() {
        this.render();
        this.bindEvend()
    }
    turnPage.prototype.render = function() {
        const pageUl = $("<ul id='page'></ul>");
        //上一页
        if (this.current > 1) {
            $("<li class='page-pre'></li>").text('上一页').appendTo(pageUl);
        };

        //第一页
        $("<li class='page-num'>1</li>").appendTo(pageUl).addClass(this.current == 1 ? 'active' : '');
        //省略号
        if (this.current - 3 >= 1) {
            $("<li style='width:20px'>...</li>").appendTo(pageUl);
        }
        //中间五页
        for (let i = this.current - 2; i <= this.current + 2; i++) {
            if (i > 1 && i < this.total) {
                $("<li class='page-num'></li>").text(i).appendTo(pageUl).addClass(this.current == i ? 'active' : '');
            }
        }
        //省略号
        if (this.current + 3 < this.total) {
            $("<li style='width:20px'>...</li>").appendTo(pageUl);
        }
        //最后一页
        $("<li class='page-num'></li>").text(this.total).appendTo(pageUl).addClass(this.current == this.total ? 'active' : '');
        //下一页
        if (this.current < this.total) {
            $("<li class='page-next'></li>").text('下一页').appendTo(pageUl);
        }
        this.wrap.html(pageUl)
    }
    turnPage.prototype.bindEvend = function() {
        $('#page').on('click', 'li', (e) => {
            let target = $(e.target);
            console.log(target);
            if (target.hasClass('page-pre')) {
                console.log(this.current);
                this.current--;
                this.cb(this.current)
            } else if (target.hasClass('page-next')) {
                this.current++;
                this.cb(this.current)
            } else {
                this.current = parseInt(target.text());
                this.cb(this.current)
            }
        })
    }
    $.fn.extend({
        page: function(options) {
            const page = new turnPage(options, this);
            page.init()
        }
    })
})()