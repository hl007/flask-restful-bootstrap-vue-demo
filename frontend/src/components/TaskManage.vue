<template>
  <div>
    <div style="margin: 20px 0 20px 0;float: right">
      <b-button style="margin-left: 10px" variant="primary" v-b-modal.taskInsertModal>新增</b-button>
      <b-button style="margin-left: 10px" variant="info" v-b-modal.taskUpdateModal disabled id="task_update_btn">修改</b-button>
      <b-button style="margin-left: 10px" variant="danger" v-b-modal.taskDeleteModal disabled id="task_delete_btn">删除</b-button>
    </div>
    <b-table
      ref="selectableTable"
      selectable
      select-mode="single"
      selected-variant="active"
      :items="task_list"
      :fields="fields"
      @row-selected="onRowSelected"
    >
      <template v-slot:cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
          <span aria-hidden="true">&check;</span>
          <span class="sr-only">Selectedwd</span>
        </template>
        <template v-else>
          <span aria-hidden="true">&nbsp;</span>
          <span class="sr-only">Not selected</span>
        </template>
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="count"
      :per-page="size"
      align="center"
      @input="getTaskList(currentPage)"
    ></b-pagination>
    <b-modal
      id="taskInsertModal"
      ref="modal"
      title="新增任务"
      @ok="insertTask"
      @hidden="resetModal"
    >
      <div>
        <b-form-group
          label-cols-md="2"
          label="title"
          label-for="title"
        >
          <b-form-input
            id="title"
            v-model="title"
          >
          </b-form-input>
          <small class="tip_label" id="title_msg">title is required</small>
        </b-form-group>
        <b-form-group
          label-cols-md="2"
          label="content"
          label-for="content"
        >
          <b-form-input
            id="content"
            v-model="content"
          ></b-form-input>
          <small class="tip_label" id="content_msg">content is required</small>
        </b-form-group>
      </div>
    </b-modal>
    <b-modal
      id="taskUpdateModal"
      ref="modal2"
      title="修改任务"
      @ok="updateTask"
      @hidden="resetModal"
    >
      <div>
        <b-form-group
          label-cols-md="2"
          label="title"
          label-for="title_update"
        >
          <b-form-input
            id="title_update"
            v-model="title_update"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
          label-cols-md="2"
          label="content"
          label-for="content_update"
        >
          <b-form-input
            id="content_update"
            v-model="content_update"
          ></b-form-input>
        </b-form-group>
      </div>
    </b-modal>
    <b-modal
      id="taskDeleteModal"
      ref="modal3"
      title="删除任务"
      @ok="deleteTask"
      @hidden="resetModal"
    >
      <p>确定删除此任务？</p>
    </b-modal>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import {error_catch, null_check} from "../common";

export default {
  data() {
    return {
      task_list: [],
      fields: ["selected","task_id","title","content"],
      count: 0,
      size: 0,
      currentPage: 1,
      title: "",
      content: "",
      task_id_update: "",
      title_update: "",
      content_update: "",
      selected: [],
    }
  },
  name: 'TaskManage',
  props: {

  },
  created() {
    this.getTaskList(1);
  },
  methods: {
    getTaskList(currentPage) {
      if (typeof Cookies.get("token")==="undefined") {
        this.$router.push('/login');
        return
      }

      this.axios.get("/tasks?index="+currentPage+"&size=10",{ auth: {username: Cookies.get("token"), password: "" } })
        .then((response) => {
          this.task_list=response.data.task_list;
          this.count=response.data.count;
          this.size=response.data.size;
          this.currentPage=currentPage;
        })
        .catch((error) => {
          error_catch(error,this);
        })
    },
    insertTask(bvModalEvt) {
      if (typeof Cookies.get("token")==="undefined") {
        this.$router.push('/login');
        return
      }

      bvModalEvt.preventDefault();
      var flag=true;
      if(! null_check("title")){
        flag=false;
      }
      if(! null_check("content")){
        flag=false;
      }
      if (! flag){
        return false;
      }

      this.axios.post("/tasks",{ title: this.title, content: this.content },{ auth: {username: Cookies.get("token") , password: ""} })
        .then((response) => {
          this.$nextTick(() => {
            this.$refs.modal.hide()
          });
          this.getTaskList(this.currentPage);
        })
        .catch((error) => {
          error_catch(error,this);
        })
    },
    resetModal() {
      this.title="";
      this.content="";
    },
    updateTask(bvModalEvt) {
      if (typeof Cookies.get("token")==="undefined") {
        this.$router.push('/login');
        return
      }

      bvModalEvt.preventDefault();
      this.axios.put("/tasks/"+this.task_id_update, { title: this.title_update, content: this.content_update }, { auth: {username: Cookies.get("token") , password: ""} })
        .then((response) => {
          this.$nextTick(() => {
            this.$refs.modal2.hide()
          });
          this.getTaskList(this.currentPage);
        })
        .catch((error) => {
          error_catch(error,this);
        })
    },
    deleteTask(bvModalEvt) {
      if (typeof Cookies.get("token")==="undefined") {
        this.$router.push('/login');
        return
      }

      bvModalEvt.preventDefault();
      this.axios.delete("/tasks/"+this.task_id_update,{ auth: {username: Cookies.get("token") , password: ""} })
        .then((response) => {
          this.$nextTick(() => {
            this.$refs.modal3.hide()
          });
          this.getTaskList(this.currentPage);
        })
        .catch((error) => {
          error_catch(error,this);
        })
    },
    onRowSelected(items) {
      if(items.length>0) {
        $("#task_update_btn").attr("disabled",false);
        $("#task_delete_btn").attr("disabled",false);
        this.selected = items;
        this.task_id_update = items[0].task_id;
        this.title_update = items[0].title;
        this.content_update = items[0].content;
      }
      else{
        $("#task_update_btn").attr("disabled",true);
        $("#task_delete_btn").attr("disabled",true);
      }
    },

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tip_label {
    font-size: 12px;
    color: red;
    font-weight: 500;
    display: none;
  }
</style>
