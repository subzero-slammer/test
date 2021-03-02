var app = new Vue({
    el: "#app",
    data: {
        userid: getCookie("uid"),
        username: getCookie("username"),
        roomid: "",
        roomname: "",
        password: "",
        hostid: "",
        userList: "",
        is_start: "",
        is_startable: true,
        word:"",
        which_win:0,
        isvote:"",
        message:"",
        chatMessage:[{
            rid:"",
            sendid:"",
            sendname:"",
            message:""
        }]
    },
    methods: {
        getRoomAndAllUserInRoom: function () {
            var that = this;
            if (this.is_start == 0)
                axios.post("/boardgame/room/getRoomByUid", {uid: parseInt(this.userid)})
                    .then(function (response) {
                        that.roomid = response.data.rid;
                        that.hostid = response.data.host_id;
                        that.userList = response.data.users;
                        that.is_start = response.data.is_start;
                        if (that.roomid == null) {
                            alert("你被踢出了房间");
                            window.location.href = "/boardgame";
                        }
                        that.is_startable=true;
                        for(var i in that.userList) {
                            if (that.userList[i].is_ready == 0)
                                that.is_startable = false;
                        }
                    })
                    .catch(function (error) {
                    })
            else if (this.is_start == 1)
                axios.post("/boardgame/game/getRoomByUid", {uid: parseInt(this.userid)})
                    .then(function (response) {
                        that.roomid = response.data.rid;
                        that.hostid = response.data.host_id;
                        that.userList = response.data.users;
                        that.is_start = response.data.is_start;
                        that.which_win=response.data.which_win;
                        that.isvote=response.data.is_vote;
                        if (that.roomid == null) {
                            alert("你被踢出了房间");
                            window.location.href = "/boardgame";
                        }
                        for(var i in that.userList){
                            if(that.userList[i].uid==that.userid) {
                                that.isvote = that.userList[i].is_vote;
                                that.word = that.userList[i].word;
                            }
                        }
                        if(that.which_win==1) {
                            alert("卧底胜利！");
                            that.which_win=0;
                        }
                        if(that.which_win==2) {
                            alert("平民胜利！");
                            that.which_win=0;
                        }
                    })
                    .catch(function (error) {
                    })
        },
        updateRoom: function () {
            var that = this;
            axios.post("/boardgame/room/updateRoom", {
                rid: parseInt(this.roomid),
                roomname: this.roomname,
                password: this.password
            })
                .then(function (response) {
                    var judge = response.data;
                    if (judge)
                        alert("修改成功！");
                    else
                        alert("修改失败！");
                })
                .catch(function (error) {
                    alert("服务器错误！");
                })
        },
        userOut: function (id) {
            var that = this;
            axios.post("/boardgame/room/outRoom", {uid: id})
                .then(function (response) {
                    var judge = response.data;
                    if (judge)
                        alert("踢人成功");
                    else
                        alert("踢人失败");
                })
                .catch(function (error) {
                    alert("服务器错误！");
                })
        },
        outRoom: function () {
            var that = this;
            axios.post("/boardgame/room/outRoom", {uid: parseInt(this.userid)})
                .then(function (response) {
                    var judge = response.data;
                    if (judge) {
                        that.roomid = "";
                        that.roomname = "";
                    }
                    else
                        alert("退出失败");
                })
                .catch(function (error) {
                    alert("服务器错误！");
                })
        },
        userReady: function () {
            var that = this;
            axios.post("/boardgame/room/readyOrCancel", {uid: parseInt(this.userid)})
                .then(function (response) {
                })
                .catch(function (error) {
                    alert("服务器错误！");
                })
        },
        startGame: function () {
            var that = this;
            axios.post("/boardgame/game/startGame", {rid: parseInt(this.roomid)})
                .then(function (response) {
                })
                .catch(function (error) {
                    alert("服务器错误！");
                })
        },
        vote:function (vote_id) {
            var that=this;
            axios.post("/boardgame/game/vote", {uid: parseInt(this.userid),vote_id:parseInt(vote_id)})
                .then(function (response) {
                })
                .catch(function (error) {
                    alert("服务器错误！");
                })
        },
        /*聊天内容*/
        sendmessage:function () {
            if(this.message == ""||this.message==null||this.message=="undefined"){
                alert("不能发送空白信息");
            }
            else{
                var _this = this;
                axios.post('/boardgame/room/sendMessage',{rid:this.roomid,sendid:this.userid,sendname:this.username,message:this.message})
                    .then(function (response) {
                        if(!response.data)
                            alert("发送失败");
                        _this.clearmessage();
                    })
                    .catch(function (error) {
                        alert("不能发送特殊字符");
                        console.log(error);
                    })
            }
        },
        clearmessage:function () {
            this.message="";
        },
        getmessage:function () {
            var _this = this;
            var oldMessage = _this.chatMessage;
            axios.post('/boardgame/room/getMessage',{rid:this.roomid})
                .then(function (response) {
                    _this.chatMessage = response.data;
                    if(oldMessage.length!=_this.chatMessage.length) {
                        clearTimeout(this.sleep);
                        this.sleep = setTimeout(function () {
                            var div = document.getElementById('chatmessage');
                            div.scrollTop = div.scrollHeight;
                        },100);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        sleep:null,
        chattimer:null
    },
    created:function () {//聊天内容
        clearInterval(this.chattimer);
        this.chattimer = setInterval(this.getmessage,1000);
    },
    mounted: function () {
        var that = this;
        axios.post("/boardgame/room/getRoomByUid", {uid: parseInt(this.userid)})
            .then(function (response) {
                that.roomid = response.data.rid;
                that.roomname = response.data.roomname;
                that.password = response.data.password;
                that.hostid = response.data.host_id;
                that.userList = response.data.users;
                that.is_start = response.data.is_start;
                setInterval(that.getRoomAndAllUserInRoom, 1000);
            })
            .catch(function (error) {
            })
    }
});