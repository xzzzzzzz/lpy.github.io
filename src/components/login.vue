<template>
    <div>
        <nav-title title="登陆" v-if="detailShow"></nav-title>

        <div class="topheight"></div>
        <div class="formbox">
            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" Custom>
                 <FormItem  prop="user">
                    <Input ref="phoneNum" type="text" v-model="formCustom.user" placeholder="手机号"></Input>
                </FormItem>
                 <FormItem  prop="code">
                    <Input ref="code" type="text" v-model="formCustom.code" placeholder="验证码"></Input>
                    <code-Count :start='start' @countDown ='start=false' @click.native='sendCode' ></code-Count>
                </FormItem>
                 <FormItem  prop="password">
                    <Input ref="pwdNum" type="password" v-model="formCustom.password" placeholder="密码"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formCustom')">登录</Button>
                </FormItem>
            </Form>
        </div>
 

    </div>
</template>
<script>

import md5 from 'blueimp-md5';
import navTitle from '../components/modules/title.vue'
import codeCount from '../components/modules/code.vue'
export default {
    data () {
        const  validateuser = function(rule, value, callback){
            var pat = /^1[3-9]\d{9}$/;
            if(!value){
                 return callback(new Error("请输入手机号"));
            }else if(!pat.test(value)){
                return callback(new Error("请正确输入11位手机号"))
            }else{
                callback();
            }
        };
        const  validatepassword = function(rule, value, callback){
            if(!value){
                 return callback(new Error("请输入密码"));
            }else{
                callback();
            }
        };
        const  validatecode = function(rule, value, callback){
            if(!value){
                 return callback(new Error("请输入验证码"));
            }else{
                callback();
            }
        };
        return {
            msg: '登陆',
            disabled: false,
            detailShow:true,
            start : false,
            formcode: {
                cellPhone: '',
                useType: '106',
                OPT: '4'
            },
            formLogin:{
                name: '',
                randomCode: '',
                pwd: '',
                OPT: '1'
            },
            formCustom: {
                user: '',
                password: '',
                code: ''
            },
            ruleCustom: {
                user : [{validator: validateuser,trigger: 'blur'}],
                password : [{validator: validatepassword,trigger: 'blur'}],
                code : [{validator: validatecode,trigger: 'blur'}]
            }
        }
    },
    methods: {
        sendCode (value) {
            var userphoneNum = this.formCustom.user;
            var pat = /^1[3-9]\d{9}$/;
            if(!userphoneNum){
                this.$Message.error("请输入手机号");
            }else if(!pat.test(userphoneNum)){
                this.$Message.error("请正确输入11位手机号");
            }else{
                this.formcode.cellPhone = userphoneNum;
                this.axios({
                  method: 'post',
                  data: this.formcode
                }).then((response) => {
                    if(response.data.error == -1){
                        this.$Message.success(response.data.msg);
                        this.start = true
                    }else{
                        this.$Message.error(response.data.msg);
                    }
                }).catch((error) => {
                    console.log(error)
                });
            }
            
        },
        handleSubmit(name) {
            var SECRET = "GDgLwwdK270Qj1w4";
            var userphoneNum = this.formCustom.user;
            var usercodeNum = this.formCustom.code;
            var userpasswordNum = this.formCustom.password;
            this.formLogin.name = userphoneNum;
            this.formLogin.randomCode = usercodeNum;
            this.formLogin.pwd = md5(userpasswordNum + SECRET);
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.axios({
                      method: 'post',
                      data: this.formLogin
                    }).then((response) => {
                        if(response.data.error == -1){
                            this.$Message.success(response.data.msg);
                            const token = JSON.stringify(response.data)
                            window.localStorage.setItem('token', token)
                            const redirect = decodeURIComponent(this.$route.query.redirect || '/');
                            this.$router.push({
                                path: redirect
                            })

                        }else{
                            this.$Message.error(response.data.msg);
                        }
                    }).catch((error) => {
                        console.log(error)
                    })
                } else {
                    // this.$Message.error("wqeq");

                }
            }) 
        },

        
    },

    created () {
        this.$store.state.showBottomNav = true
    },
    components: { navTitle , codeCount}
}
</script>
<style>
    .topheight{margin-top:3rem;}
    .formbox{padding:2rem;}
    button{border:1px solid red;}
</style>