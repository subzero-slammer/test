var app = new Vue({
    el: "#app",
    data: {
        userid: getCookie("uid"),
        username: getCookie("username"),
        inRoomid: "",
        inRoomname: "",
        searchRoomname: "",
        roomList: ""
    },
    methods: {
        searchRoom: function () {
            var that = this;
            console.log(this.searchRoomname);
            if (this.searchRoomname!= "") {
                axios.post("/boardgame/room/SearchRoomByName", {roomname: this.searchRoomname})
                    .then(function (response) {
                        that.roomList = response.data;
                    })
                    .catch(function (error) {
                    })
            }
            else {
                axios.post("/boardgame/room/getAllRoom")
                    .then(function (response) {
                        that.roomList = response.data;
                    })
                    .catch(function (error) {
                    })
            }
        },
        outRoom: function () {
            var that = this;
            axios.post("/boardgame/room/outRoom", {uid: parseInt(this.userid)})
                .then(function (response) {
                    var judge = response.data;
                    if (judge) {
                        that.inRoomid = "";
                        that.inRoomname = "";
                        alert("退出成功");
                        window.location.reload();
                    }
                    else
                        alert("退出失败");
                })
                .catch(function (error) {
                    alert("服务器错误！");
                })
        }
    },
    mounted: function () {
        var that = this;
        axios.post("/boardgame/room/getRoomByUid", {uid: parseInt(this.userid)})
            .then(function (response) {
                that.inRoomid = response.data.rid;
                that.inRoomname = response.data.roomname;
            })
            .catch(function (error) {
            })
        axios.post("/boardgame/room/getAllRoom")
            .then(function (response) {
                that.roomList = response.data;
            })
            .catch(function (error) {
            })
    }
});