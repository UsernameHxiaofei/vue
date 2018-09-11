<style lang="scss" scoped>
    .ck-block {
        width: 100%;
        .ckeditor {
            width: 100%;
            margin: 0 auto;
            font-size: 14px;

        }
        .edit-content {
            min-height: 300px;
            max-height: 400px;
            overflow-y: auto;

        }
        .ck-content {
            font-size: 0.875rem;
            img {
                max-width: 100%;
            }
            p {
                margin: 0;
                line-height: initial;
                font-size: 1em;
                line-height: 2em;
            }
            figure {
                display: block;
                margin-left: 0;
                margin-right: 0;
            }
        }
    }
</style>
<template>
    <div class="ck-block">
        <div class="ckeditor" v-if="isEdit">
            <div ref="ckeditor" @change="getData" class="edit-content"></div>
        </div>
        <div class="ckeditor" v-if="!isEdit">
            <div class="ck-content" ref="ckeditorContent"></div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "ckeditor",
        data() {
            return {
                editor: {},
            };
        },
        props: {
            isEdit: {
                reqiured: false,
                type: Boolean,
                default: false,
            },
            value: {
                reqiured: false,
                type: String,
                default: '<p></p><p></p><p></p>'
            }
        },
        watch: {
            value: function (v, old) {
                if (this.editor.plugins) {
                    this.editor.setData(v)
                } else if (!this.isEdit) {
                    this.$nextTick(() => {
                        this.$refs.ckeditorContent.innerHTML = v
                    })
                }
            }
        },
        methods: {
            initCkeditor() {
                if (!window.ClassicEditor) {
                    console.log('window.ClassicEditor is disappear')
                    return;
                }
                window.ClassicEditor.create(this.$refs.ckeditor,
                    {
                        fontSize: {
                            options: [
                                'tiny',
                                'default',
                                'big'
                            ]
                        },
                        image: {
                            // You need to configure the image toolbar, too, so it uses the new style buttons.
                            toolbar: ['imageTextAlternative', '|', 'imageStyle:full', 'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight'],
                            styles: [
                                // This option is equal to a situation where no style is applied.
                                'full',
                                'alignCenter',
                                // This represents an image aligned to the left.
                                'alignLeft',
                                // This represents an image aligned to the right.
                                'alignRight',
                            ]
                        },
                        language: 'zh-cn'
                    }
                ).then(editor => {
                    editor.plugins.get('FileRepository').createUploadAdapter = function (loader) {
                        return new FileUploadAdapter(loader);
                    };
                    this.editor = editor;

                    this.editor.keystrokes.set('Ctrl+S', (data, cancel) => {
                        this.getData();
                        cancel();
                    });
                }).catch(error => {
                    console.error(error);
                });
            },
            getData() {
                if (this.editor.plugins) {
                    let value = this.editor.getData()
                    this.$emit('input', value)
                    return value
                }
            },
        },
        mounted() {
            if (this.isEdit) {
                this.initCkeditor();
            } else {
                this.$nextTick(() => {
                    this.$refs.ckeditorContent.innerHTML = this.value;
                })
            }
        }
    };
    class FileUploadAdapter {
        constructor(loader) {
            this.loader = loader;
        }
        onProgress(e) {
            this.loader.uploadTotal = e.total;
            this.loader.uploaded = e.loaded;
        }
        upload() {
            return new Promise((resolve, reject) => {
                const formData = new FormData()
                formData.append('upload', this.loader.file)
                const xhr = new XMLHttpRequest();
                xhr.upload.addEventListener('progress', (e) => {
                    this.loader.uploadTotal = e.total;
                    this.loader.uploaded = e.loaded;
                });
                xhr.open('post', '/ajax/fileupload_editor')
                xhr.responseType = 'json'
                xhr.onload = function () {
                    if (xhr.status == 200) {
                        console.log(xhr);
                        if (xhr.response.head.success) {
                            let str = ''
                            try {
                                str = JSON.parse(xhr.response.objectLiteral)
                            } catch (error) {
                                reject(error)
                            }
                            resolve({
                                default: str
                            })
                        } else {
                            reject(xhr.response.head.information)
                        }
                    }
                }
                xhr.send(formData)
            })
        }
        abort() {
        }
    }
</script>