<style lang="scss" scoped>
.ck-block{
    margin:50px;
    .ckeditor {
      width: 860px;
      margin: 0 auto;
    }
    .edit-content{
        min-height:300px;
        max-height:800px;
        overflow-y:auto;
    }
}

</style>
<template>
    <div class="ck-block">
        <div class="ckeditor edit-content" >
          <textarea name="content" ref="ckeditor"></textarea>
        </div>
    </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      editorConfig: {
        toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ],
        heading: {
            options: [
                { modelElement: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                { modelElement: 'heading1', viewElement: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                { modelElement: 'heading2', viewElement: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
            ]
        }
      }
    };
  },
  methods: {

    config(editor) {
        if(!editor){
            return;
        }
    }
  },
  mounted() {
   
    window.ClassicEditor.create(this.$refs.ckeditor,
    {
        ckfinder: {
            uploadUrl: '/ajax/fileupload_editor'
        },
    }  
  )
      .then(editor => {
       console.log(editor)




      })
      .catch(error => {
        console.error(error);
      });
  }
};
</script>
