(function(){
    window.Tabs = {
        dom: function(id) {
            return document.getElementById(id)
        },
        pom: function(id) {
            return document.getElementsByClassName(id)[0]
        },
        iom: function(id, dis) {
            var alist = document.getElementsByClassName(id);
            if (alist) {
                for (var idx = 0; idx < alist.length; idx++) {
                    var mya = alist[idx];
                    mya.style.display = dis
                }
            }
        },
        qie: function(c) {this.iom("home", "none");this.iom("setc", "none");this.iom("helpme", "none");this.dom("setc").style.background="";this.dom("home").style.background="";this.dom("helpme").style.background="";
if(c=="helpme"){this.iom("typecho-option-submit", "none");}else{this.iom("typecho-option-submit", "block");}
            this.iom(c, "block");this.dom(c).style.background="#E9E9E6";
            return false
        }
    }
})(); 
var f = 0;function bian(){if(f>5){document.getElementsByTagName('body')[0].className = 'night';document.getElementById("tools-banquanzaijian").style.display="inline";document.getElementById("banquanzaijian").innerHTML="\u9690\u85cf\u7f51\u7ad9\u5e95\u90e8\u7248\u6743";document.getElementById("banquanzaijian").style.display="inline";}else{f++;}}
