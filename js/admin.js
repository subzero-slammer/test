new Vue({
    el:"#app",
    data:{
        user:{
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
        user1:{
            uid:"",
            username:"",
            password:"",
            gender:"",
            phone:"",
            email:"",
        },
        userList:[],
        userList1:[],
    },
    methods:{
          findAll:function () {
          var _this=this;
          axios.get('/boardgame/admin/findAll')
              .then(function (response) {
                  _this.userList=response.data;
                  console.log(_this.userList);
              })
              .catch(function (error) {
                  console.log(error);
              })
      },
        deleteUser:function (userid) {
             var _this=this;
            axios.get('/boardgame/admin/deleteUser',{params:{uid:userid}})
                .then(function (response) {
                    window.location.reload();
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        addUser:function (user1) {
              var _this=this;
              axios.post('/boardgame/admin/addUser',_this.user1)
            .then(function (response) {
                window.location.reload();
            })
                .catch(function (error) {
                    console.log(error);
                })

        },
        findById:function (userid) {
            var _this=this;
            axios.get('/boardgame/admin/findById',{params:{uid:userid}})
                .then(function (response) {
                    _this.user= response.data;
                    $('#myModal').show();
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        updateUser:function (user) {
            var _this=this;
              axios.post('/boardgame/admin/updateUser',user)
                  .then(function (response) {
                      window.location.reload();
                  })
                  .catch(function (error) {
                      console.log(error);
                  })
        },
        findByName:function (username1) {
            var _this=this;
            axios.get('/boardgame/admin/findByName',{params:{username:username1}})
                .then(function (response) {
                    _this.userList1=response.data;
                    $('#myModal1').show();

                })
                .catch(function (error) {
                    console.log(error);
                })
        },

},
    created:function(){
        this.findAll()
    }
});

(function() {
    /*建立模态框对象*/
    var modalBox = {};
    /*获取模态框*/
    modalBox.modal = document.getElementById("myModal");
    /*获得关闭按钮*/
    modalBox.closeBtn = document.getElementById("excelbtn");
    modalBox.success = document.getElementById("subtn");
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