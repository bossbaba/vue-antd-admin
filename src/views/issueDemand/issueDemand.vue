<template>
  <div class="issueDemand">
    <div class="addtitle">
      <span>添加文章标题</span>
      <div>
        <input type="text" placeholder="请输入">
      </div>
    </div>
    <div class="moudel">
        <div class="edit_container">
          <quill-editor
            v-model="content"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @change="onEditorChange($event)"
          ></quill-editor>
        </div>
    </div>
    <div class="btn-group">
      <a-button-group>
        <a-button @click="clear">清空</a-button>
        <a-button type="primary" @click="submitContent">发布</a-button>
      </a-button-group>
    </div>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  data() {
    return {
      content: "",
      editorOption: {}
    };
  },
  components: {
    quillEditor
  },
  mounted () {
    console.log(this.$refs.myQuillEditor.quill)
  },
  methods: {
    onEditorReady(editor) {
      // 准备编辑器
    },
    submitContent () {
      console.log(this.content)
      this.$http.post('/api/addarcticle',{
        content:this.content
      }).then(resp=>{
        console.log(resp)
        this.content = ''
      })
    },
    clear () {
      this.content = ''
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {} // 内容改变事件
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  }
};
</script>

<style lang='stylus'>
.issueDemand 
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  position relative
  .addtitle
    height 100px;
    display flex
    justify-content  space-between
    flex-direction column
    box-sizing border-box
    padding 20px 0
    div
      border 1px solid #ccc
      input
        width 100%
        height 30px
        border none 
        box-sizing border-box
        padding 0 20px
  .edit_container
    height 800px
  .quill-editor
    height 700px
    position relative
  .btn-group
    position absolute
    right 30px
</style>
