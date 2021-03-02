var chat = new Vue({
    el:"#app",
    data:{
        userid:getCookie("uid"),
        username:getCookie("username"),
        searching:false,
        findFriend:"",
        userList:[{
            uid:"",
            username:"",
            password:"",
            gender:"",
            phone:"",
            email:"",
            sign:"",
            user_logo:"",
            game_num:"",
            win_num:"",
            money:""
        }],
        searchingList:[{
            uid:"",
            username:"",
            password:"",
            gender:"",
            phone:"",
            email:"",
            sign:"",
            user_logo:"",
            game_num:"",
            win_num:"",
            money:""
        }],
        chating:{
            uid:"",
            username:"",
            password:"",
            gender:"",
            phone:"",
            email:"",
            sign:"",
            user_logo:"",
            game_num:"",
            win_num:"",
            money:""
        },
        message:"",
        chatMessage:[{
            cid:"",
            sendid:"",
            receiveid:"",
            is_read:"",
            message:"",
            sendtime:""
        }],
        applyers:[{
            uid:"",
            username:"",
            password:"",
            gender:"",
            phone:"",
            email:"",
            sign:"",
            user_logo:"",
            game_num:"",
            win_num:"",
            money:""
        }],
        online:false,
        haveselected:false,
        sendgold_or_not:true
    },
    methods:{
        allfriend:function () {
            var _this = this;
            axios.post('/boardgame/user/findfriend',{userid:this.userid})
                .then(function (response) {
                    _this.userList = response.data;//响应数据给userList赋值
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        findfriend:function () {
            if (this.findFriend==""||this.findFriend==null||this.findFriend=="undefined") {
                this.searching = false;
            }
            else {
                this.searching = true;
                var _this = this;
                axios.post('/boardgame/user/searching',{username:_this.findFriend})
                    .then(function (response) {
                        _this.searchingList = response.data;//响应数据给userList赋值
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            }
        },
        addfriend:function (userid) {
            var _this = this;
            axios.post('/boardgame/user/addfriend',{uid:this.userid,fid:userid})
                .then(function (response) {
                    alert("成功发送好友请求");
                    _this.clearSearching();
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        clearSearching:function () {
            this.findFriend="";
            this.searching=false;
        },
        selectFriend:function (user) {
            this.chating = user;
            this.haveselected = true;
            this.judgesend();
            this.getmessage();
            this.friendonlinejudge();
            clearInterval(this.timer);
            this.timer = setInterval(this.getmessage,200);
            clearInterval(this.friendonlinetimer);
            this.friendonlinetimer = setInterval(this.friendonlinejudge,1000);
        },
        sendmessage:function () {
            if(this.message == ""||this.message==null||this.message=="undefined"){
                alert("不能发送空白信息");
            }
            else{
                var _this = this;
                axios.post('/boardgame/chat/sendMessage',{sendid:this.userid,receiveid:this.chating.uid,message:this.message})
                    .then(function (response) {
                        _this.clearmessage();
                    })
                    .catch(function (error) {
                        alert("发送失败,不能发送特殊字符");
                        console.log(error);
                    })
            }
        },
        clearmessage:function () {
            this.message="";
        },
        getmessage:function () {
            if(this.chating.uid == ""||this.chating.uid == null||this.chating.uid=="undefined"){}
            else{
                var _this = this;
                var oldMessage = _this.chatMessage;
                axios.post('/boardgame/chat/getMessage',{sendid:this.userid,receiveid:this.chating.uid})
                    .then(function (response) {
                        _this.chatMessage = response.data;
                        if(oldMessage.length!=_this.chatMessage.length) {
                            clearTimeout(this.sleep);
                            this.sleep = setTimeout(function () {
                                var div = document.getElementById('chatMessage');
                                div.scrollTop = div.scrollHeight;
                            },100);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            }
        },
        haveapply:function () {
            var _this = this;
            axios.post('/boardgame/user/haveapply',{userid:this.userid})
              .then(function (response) {
                  _this.applyers = response.data;
                  console.log(_this.applyers);
              })
              .catch(function (error) {
                  console.log(error);
              })
        },
        accept:function (uid) {
            var _this = this;
            axios.post('/boardgame/user/accept',{userid:this.userid,sendid:uid})
                .then(function (response) {
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        reject:function (uid) {
            axios.post('/boardgame/user/reject',{userid:this.userid,sendid:uid})
                .then(function (response) {
                    alert("拒绝成功");
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        acceptall:function () {
            var _this = this;
            axios.post('/boardgame/user/acceptall',{userid:this.userid})
                .then(function (response) {
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        onlineapply:function () {
            var _this = this;
            axios.post('/boardgame/user/onlineapply',{userid:this.userid})
                .then(function (response) {
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        friendonlinejudge:function () {
            var _this = this;
            axios.post('/boardgame/user/onlinejudge',{uid:this.chating.uid})
                .then(function (response) {
                    _this.online = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        sendgold:function () {
            var _this = this;
            axios.post('/boardgame/user/sendgold',{sendid:this.userid,receiveid:this.chating.uid})
                .then(function (response) {
                    _this.sendgold_or_not = response.data;
                    alert("赠送成功!");
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        judgesend:function () {
            var _this = this;
            axios.post('/boardgame/user/judgesend',{sendid:this.userid,receiveid:this.chating.uid})
                .then(function (response) {
                    _this.sendgold_or_not = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        timer:null,
        sleep:null,
        applaytimer:null,
        allfriendtimer:null,
        onlinetimer:null,
        friendonlinetimer:null
   },
    created:function () {//页面加载时触发请求，查询所有
        this.allfriend();
        //clearInterval(this.applaytimer);
        this.applaytimer = setInterval(this.haveapply,2000);
        this.allfriendtimer = setInterval(this.allfriend,2000);
        this.onlinetimer = setInterval(this.onlineapply,2000);
    },
    destroyed:function() {
        clearTimeout(this.time);
        clearInterval(this.applaytimer);
        clearInterval(this.allfriendtimer);
        clearInterval(this.onlinetimer);
        clearInterval(this.friendonlinetimer);
    }
});
(function() {
    /*建立模态框对象*/
    var modalBox = {};
    /*获取模态框*/
    modalBox.modal = document.getElementById("myModal");
    /*获得trigger按钮*/
    modalBox.triggerBtn = document.getElementById("button1");
    /*获得关闭按钮*/
    modalBox.closeBtn = document.getElementById("closeBtn");
    modalBox.success = document.getElementById("button2");
    /*模态框显示*/
    modalBox.show = function() {
        console.log(this.modal);
        this.modal.style.display = "block";
    }
    /*模态框关闭*/
    modalBox.close = function() {
        this.modal.style.display = "none";
    }
    /*当用户点击模态框内容之外的区域，模态框也会关闭*/
    modalBox.outsideClick = function() {
        var modal = this.modal;
        window.onclick = function(event) {
            if(event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
    /*模态框初始化*/
    modalBox.init = function() {
        var that = this;
        this.triggerBtn.onclick = function() {
            that.show();
        }
        this.closeBtn.onclick = function() {
            that.close();
        }
        this.success.onclick = function() {
            that.close();
        }
        this.outsideClick();
    }
    modalBox.init();
})();
