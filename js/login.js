window.onload = function () {
    if (getCookie("uid")) {
        window.location.href = "/boardgame";
    }
};

var app = new Vue({
    el: "#app",
    data: {
        username: "",
        password: "",
        password2: "",
        userExist: "",
        userExistColor: "",
        judge: false,
        cur: 1
    },
    methods: {
        searchUser: function () {
            var that = this;
            axios.post("/boardgame/user/registerExist", {username: this.username})
                .then(function (response) {
                    that.judge = response.data;
                    if (that.judge == true) {
                        that.userExist = "可以注册！";
                        that.userExistColor = "color:green";
                    }
                    else {
                        that.userExist = "用户名不能使用！";
                        that.userExistColor = "color:red";
                    }
                })
                .catch(function (error) {
                })
        },
        registerUser: function () {
            var that = this;
            axios.post("/boardgame/user/register", {username: this.username, password: this.password, password2: this.password2})
                .then(function (response) {
                    var judge = response.data;
                    if (judge) {
                        alert("注册成功！");
                        window.location.reload();
                    }
                    else {
                        alert("注册失败！");
                    }
                })
                .catch(function (error) {
                    alert("服务器错误！");
                })
        },
        login: function () {
            var that = this;
            axios.post("/boardgame/user/login", {username: this.username, password: this.password})
                .then(function (response) {
                    var judge = response.data;
                    if (judge) {
                        alert("登录成功！");
                        window.location.href = "/boardgame";
                    }
                    else {
                        alert("登录失败！");
                    }
                })
                .catch(function (error) {
                })
        }
    }
});