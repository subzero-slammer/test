var title = new Vue({
    el: "title",
    data: {
        userid: getCookie("uid"),
        username: getCookie("username")
    }
})
var app = new Vue({
    el: "#app",
    data: {
        userid: getCookie("uid"),
        username: "",
        password: "",
        gender: "",
        phone: "",
        email: "",
        sign: "",
        game_num: "",
        win_num: "",
        money: ""
    },
    methods: {
        updateUser: function () {
            var that = this;
            axios.post("/boardgame/user/update", {
                uid: parseInt(this.userid),
                username: this.username,
                password: this.password,
                gender: this.gender,
                phone: this.phone,
                email: this.email,
                sign: this.sign
            })
                .then(function (response) {
                    var judge = response.data;
                    if (judge) {
                        alert("修改成功！");
                        window.location.reload();
                    }
                    else {
                        alert("修改失败！用户名已经存在！或存在其他的填写错误！");
                    }
                })
                .catch(function (error) {
                    window.location.reload();
                })
        }
    },
    mounted: function () {
        var that = this;
        axios.post("/boardgame/user/getById", {uid: parseInt(this.userid)})
            .then(function (response) {
                that.username = response.data.username;
                that.password = response.data.password;
                that.gender = response.data.gender;
                that.phone = response.data.phone;
                that.email = response.data.email;
                that.sign = response.data.sign;
                that.game_num = response.data.game_num;
                that.win_num = response.data.win_num;
                that.money = response.data.money;
            })
            .catch(function (error) {
            })
    }
})