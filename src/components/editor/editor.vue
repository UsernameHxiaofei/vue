<template>
    <div class="quill-editor">
      <slot name="toolbar"></slot> 
      
      <form action="#" method="post">
        <input style="display: none" id="quill" type="file" name="file" accept="image/jpg,image/jpeg,image/png,image/gif"
          @change="uploadImage"/>
      </form>
      <div ref="editor" style="min-height:200px;max-height:400px;overflow:auto"> 

      </div>
    </div>
</template>

<script>
  import { Loading } from 'element-ui';

  export default {
    name: 'quill-editor',
    data() {
      return {
        _content: '',
        defaultModules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean'],
            ['link', 'image', 'video'],
          ]
        },
        addImgRange: ''
      }
    },
    props: {
      content: String,
      value: String,
      disabled: Boolean,
      options: {
        type: Object,
        required: false,
        default() {
          return {}
        }
      }
    },
    beforeMount() {
      this.initialize()
    },
    beforeDestroy() {
      this.quill = null
    },
    methods: {
      handleImage(flag) {
        this.addImgRange = this.quill.getSelection();
        if (flag) {
          let fileInput = document.getElementById('quill');
          fileInput.click();
        }
      },
      uploadImage(form) {
        let fileInput = document.getElementById('quill');
        let formData = new FormData();
        formData.append('file', fileInput.files[0]);
        let xhr = new XMLHttpRequest();
        xhr.open('post', '/ajax/fileupload');
        let self = this;
        const loading = Loading.service({
          target: document.getElementsByClassName('quill-editor')[0],
          text: '正在上传'
        });
        xhr.onload = function () {
          if (!xhr.response) {
            self.$message.warning(JSON.parse(xhr.response).information);
          } else if (xhr.status == 200) {
            self.quill.insertEmbed(self.addImgRange.index || 0, 'image', JSON.parse(JSON.parse(xhr.response).objectLiteral));
          }
          fileInput.value = '';
          loading.close();
        };
        xhr.send(formData);
      },
      initialize() {
        if (this.$el) {

          // options and instance
          var self = this
          self.options.theme = self.options.theme || 'snow'
          self.options.boundary = self.options.boundary || document.body
          self.options.modules = self.options.modules || self.defaultModules
          self.options.modules.toolbar = self.options.modules.toolbar !== undefined
            ? self.options.modules.toolbar
            : self.defaultModules.toolbar
          self.options.placeholder = self.options.placeholder || '请在这里书写项目详细介绍'
          self.options.readOnly = self.options.readOnly !== undefined ? self.options.readOnly : false
          


          self.quill = new Quill(self.$refs.editor, self.options)
          self.quill.getModule('toolbar').addHandler("image", this.handleImage)

          // set editor content
          if (self.value || self.content) {
            self.quill.pasteHTML(self.value || self.content)
          }

          // mark model as touched if editor lost focus
          self.quill.on('selection-change', (range) => {
            if (!range) {
              self.$emit('blur', self.quill)
            } else {
              self.$emit('focus', self.quill)
            }
          })

          // update model if text changes
          self.quill.on('text-change', (delta, oldDelta, source) => {
            var html = self.$refs.editor.children[0].innerHTML
            const text = self.quill.getText()
            if (html === '<p><br></p>') html = ''
            self._content = html
            self.$emit('input', self._content)
            self.$emit('change', {
              editor: self.quill,
              html: html,
              text: text
            })
          })

          // emit ready
          self.$emit('ready', self.quill)
        }
      }
    },
    watch: {
      'content'(newVal, oldVal) {
        if (this.quill) {
          if (!!newVal && newVal !== this._content) {
            this._content = newVal
            this.quill.pasteHTML(newVal)
          } else if (!newVal) {
            this.quill.setText('')
          }
        }
      },
      'value'(newVal, oldVal) {
        if (this.quill) {
          if (newVal !== this._content) {
            this._content = newVal
            this.quill.pasteHTML(newVal)
          } else if (!newVal) {
            this.quill.setText('')
          }
        }
      },
      'disabled'(newVal, oldVal) {
        if (this.quill) {
          this.quill.enable(!newVal)
        }
      }
    }
  }

</script>

<style>

</style>