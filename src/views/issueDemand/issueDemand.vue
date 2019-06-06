<template>
  <div class="issueDemand">
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
  .edit_container
    height 800px
  .quill-editor
    height 700px
  .btn-group
    position absolute
    right 30px
</style>
