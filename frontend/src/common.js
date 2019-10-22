import Cookies from "js-cookie";

function error_catch(error, vue_obj) {
    if (error.response) {
        vue_obj.$bvToast.toast(error.response.data.message, {
            title: error.response.status,
            toaster: "b-toaster-top-center",
            variant: "danger",
            solid: true,
            appendToast: false,
        });

        if(error.response.status=="401"){
            vue_obj.$router.push("/login");
        }
    } else if (error.request) {
        console.log(error.request);
        vue_obj.$bvToast.toast("不能连接服务器", {
            title: "Error",
            toaster: "b-toaster-top-center",
            variant: "danger",
            solid: true,
            appendToast: false,
        })
    } else {
        console.log('Error', error.message);
    }
    console.log(error.config);
}


//空值校验
function null_check(this_id) {
    var this_value = $("#" + this_id).val();
    if (this_value == "") {
        $("#" + this_id + "_msg").css("display", "block");
        return false
    } else {
        $("#" + this_id + "_msg").css("display", "none");
        return true
    }
}


// 空值以及中文，英文，数字输入校验
function null_ch_zn_number_check(this_id) {
    var reg = /^(\w|[\u4E00-\u9FA5])*$/;
    var this_value = $("#" + this_id).val();
    if (this_value == '') {
        $("#" + this_id + "_msg").css("display", "block");
        $("#" + this_id + "_msg2").css("display", "none");
        return false
    } else if (!this_value.match(reg)) {
        $("#" + this_id + "_msg").css("display", "none");
        $("#" + this_id + "_msg2").css("display", "block");
        return false
    } else {
        $("#" + this_id + "_msg").css("display", "none");
        $("#" + this_id + "_msg2").css("display", "none");
        return true
    }
}


// 空值以及英文输入校验
function null_en_check(this_id) {
    var reg = /^(\w|[a-zA-Z])*$/;
    var this_value = $("#" + this_id).val();
    if (this_value == '') {
        $("#" + this_id + "_msg").css("display", "block");
        $("#" + this_id + "_msg2").css("display", "none");
        return false
    } else if (!this_value.match(reg)) {
        $("#" + this_id + "_msg").css("display", "none");
        $("#" + this_id + "_msg2").css("display", "block");
        return false
    } else {
        $("#" + this_id + "_msg").css("display", "none");
        $("#" + this_id + "_msg2").css("display", "none");
        return true
    }
}


// 空值以及英文,数字输入校验
function null_en_number_check(this_id) {
    var reg = /^(\w|[a-zA-Z0-9])*$/;
    var this_value = $("#" + this_id).val();
    if (this_value == '') {
        $("#" + this_id + "_msg").css("display", "block");
        $("#" + this_id + "_msg2").css("display", "none");
        return false
    } else if (!this_value.match(reg)) {
        $("#" + this_id + "_msg").css("display", "none");
        $("#" + this_id + "_msg2").css("display", "block");
        return false
    } else {
        $("#" + this_id + "_msg").css("display", "none");
        $("#" + this_id + "_msg2").css("display", "none");
        return true
    }
}


// 空值以及中文输入校验
function null_zh_check(this_id) {
    var reg = /^([\u4E00-\u9FA5])*$/;
    var this_value = $("#" + this_id).val();
    if (this_value == '') {
        $("#" + this_id + "_msg").css("display", "block");
        $("#" + this_id + "_msg2").css("display", "none");
        return false
    } else if (!this_value.match(reg)) {
        $("#" + this_id + "_msg").css("display", "none");
        $("#" + this_id + "_msg2").css("display", "block");
        return false
    } else {
        $("#" + this_id + "_msg").css("display", "none");
        $("#" + this_id + "_msg2").css("display", "none");
        return true
    }
}


// 中文输入校验
function zh_check(this_id) {
    var reg = /^([\u4E00-\u9FA5])*$/;
    var this_value = $("#" + this_id).val();
    if (this_value != '') {
        if (!this_value.match(reg)) {
            $("#" + this_id + "_msg").css("display", "block");
            return false
        } else {
            $("#" + this_id + "_msg").css("display", "none");
            return true
        }
    }
}

export { error_catch, null_check }