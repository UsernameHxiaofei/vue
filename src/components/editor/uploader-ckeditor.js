class FileUploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }

    upload() {
        return new Promise((resolve,reject)=>{
            const formData = new FormData()
            formData.append('upload',this.loader.file)
            const xhr = new XMLHttpRequest()
            xhr.open('post', '/ajax/fileupload_editor')
            let self = this
            const loading = Loading.service({
                target: document.getElementsByClassName('ckeditor')[0],
                text: '正在上传'
            })
            xhr.onload = function () {
                if (!xhr.response) {
                    reject('上传失败')
                } else if (xhr.status == 200) {
                    resolve({
                        default: xhr.response.data
                    })
                }
            }
            xhr.send(formData)
        })
    }

    abort() {
        //
    }
} 

export default FileUploadAdapter