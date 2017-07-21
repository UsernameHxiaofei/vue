<style>
.clear:after {
    content: ".";
    display: block;
    height: 0;
    visibility: hidden;
    clear: both;
}
.discussion {
  padding: 30px 50px;
  box-sizing: margin-box;
}
.discussion .fl {
    float: left;
}
.discussion .headFigureURL {
    width: 50px;
    height: 50px;
    border-radius: 25px;
}
.discussion .text {
    padding-left: 70px;
}
.discussion textarea {
    width: 530px;
    height: 85px;
    padding: 15px;
    background: #fafafa;
    border: 1px #fafafa solid;
    border-radius: 4px;
    outline: none;
    resize: none;
}
.discussion .btnGroup {
    line-height: 56px;
}
.discussion .btnGroup .fr {
      float: right;
}
.discussion .btnGroup .like {
      display: inline-block;
      margin-bottom: -3px;
      margin-right: 5px;
}
.discussion .btnGroup a {
      padding-right: 30px;
}
.discussion .btnGroup span {
      padding-right: 10px;
}
.discussion .btnGroup .btn {
      padding: 0;
      width: 86px;
      line-height: 34px;
      background: #06ccb6;
      text-align: center;
      margin-top: 10px;
      text-align: center;
      color: #fff;
      border-radius: 4px;
      font-size: 12px;
}
.discussion .ppp {
    margin: 10px -50px;
    background: #F5F5F5;
    height: 40px;
}
.discussion .commentList {
    line-height: 17px;
    color: #666;
}
.discussion .commentList .firstList {
      padding-top: 10px;
      margin-bottom: 20px;
}
.discussion .commentList .firstList .nickname {
        line-height: 40px;
}
.discussion .commentList .time1 {
      display: inline-block;
      padding-left: 10px;
      color: #ccc;
}
.discussion .commentList .receiver {
      color: #06ccb6;
}
.discussion .commentList .secondList {
      padding: 8px 0;
}
.discussion .commentList textarea {
      width: 458px;
      height: 85px;
}
.discussion .commentList .reply {
      margin: 10px -50px 10px -120px;
      padding: 10px  120px;
      background: #F5F5F5;
}
.discussion .commentList .reply .open {
        line-height: 40px;
}
.discussion .commentList .reply .content1 {
        padding-left: 10px;
        width: 460px;
}
.discussion .commentList .reply .content1 p {
          min-height: 35px;
          margin-top: -4px;
}
.discussion .commentList .reply .secReply {
        margin-top: 9px;
        display: none;
        float: right;
}
.discussion .commentList .reply .replyList:hover .secReply {
        display: block;
}
.discussion .commentList .hiddenList .replyList {
      display: none;
}
.discussion .commentList .hiddenList .replyList:nth-child(1), .discussion .commentList .hiddenList .replyList:nth-child(2) {
      display: block;
}
.discussion .commentList .openList .replyList {
      display: block;
}
.discussion .commentList .hidden {
      display: none;
}
.discussion .ttttt {
    position: absolute;
    z-index: -1;
}
.discussion .btnBox {
    text-align: center;
}
.discussion .btnBox button {
      display: inline-block;
      padding: 6px 12px;
      border: 1px solid #06ccb6;
      color: #06ccb6;
      border-radius: 4px;
}


</style>
<template>
  <div class="discussion">
      <div class="comment clear">
            <img class="headFigureURL fl" :src="IndividualInfo.headFigureURL" alt="">
            <div class="text">
                <textarea name="" v-model="comment" id="" placeholder="在这里您想说些什么呢......"></textarea>
                <div class="btnGroup clear"> 
                    <!--<a href="javascript:;">123</a>
                    <a href="javascript:;">123</a>-->
                    <a href="javascript:;" class="fr btn" @click="replyProject">评论</a>
                    
                    <span class="fr">{{comment.length}}/2000</span>
                    
                </div>
            </div>
      </div> 
      <div class="commentList">
         
         <span class="ttttt">{{zz}}</span> 
            <ul v-if="commentList"  @click="hiddenText">
                <li class="firstList clear" v-for="(firstLevel,i ) in commentList" :key="i">
                     <div class="ppp"> </div>
                    <img class="headFigureURL fl" :src="firstLevel.headFigureURL" alt="">
                    <div class="text">
                        <p class="nickname">
                            <span>{{firstLevel.nickname}}</span>
                            <span class="time1">{{ firstLevel.creat_time | getNowFormatDate}}</span>
                        </p>
                        <span>{{firstLevel.subject_content}}</span>
                        <div class="btnGroup">
                                <a href="javascript:;" title="点赞" @click="toggleLike(i)"><img class="like" src="../../../assets/images/like.png"/>{{firstLevel.likeCount}}</a>
                                <a href="javascript:;" title="评论"  @click.stop="reply(i)"><img class="like" src="../../../assets/images/subject.png"/>({{firstLevel.subjectlength||0}}) </a>
                                <a href="javascript:;"  @click.stop="projectSubjectDelete(i)" v-if="firstLevel.creator==actorId">删除</a>
                        </div>
                        <div class="reply hiddenList" v-if="firstLevel.commentList">
                                <a href="javascript:;" class="open" @click.stop="limitShowMore(i,$event)"  v-show="firstLevel.subjectlength>2">展开评论∨</a>
                                <ul class="clear">
                                    <li class="secondList replyList clear" v-for="(item,index) in firstLevel.commentList" :key="index">
                                        
                                        <img class="headFigureURL fl" :src="item.headFigureURL" alt="">
                                        <div class="content1 fl">
                                            <p>
                                                <span class="nickname">{{item.nickname}}</span>
                                                <span class="time1">{{item.creat_time  | getNowFormatDate}}</span>
                                                <!--<a href="javascript:;" alt="回复" @click="reply(i,index)" class="secReply">回复</a>-->
                                                <a href="javascript:;" alt="回复" @click.stop="subjectDiscussDelete(i,index)" v-if="item.creator==actorId" class="secReply">删除</a>
                                            </p>
                                            <p> 
                                                <!--<span v-show="item.fornickname">回复: </span>
                                                <span class="receiver"> {{item.fornickname}}</span>
                                                <span v-show="item.fornickname"> : </span> -->
                                                {{item.discuss_content}}</p>
                                        </div>
                                    </li>
                                </ul> 
                        </div>
                         <div class="comment clear hidden"  :ref="'comment'+i">
                                <img class="headFigureURL fl" src="../../../assets/images/avatar.jpg" alt="">
                                <div class="text text1">
                                    <textarea name="" v-model="commentReply" :ref="'text'+i" placeholder="评论......"></textarea>
                                    <div class="btnGroup clear"> 
                                        <!--<a href="javascript:;">123</a>  v-focus="focusStatus"
                                        <a href="javascript:;">123</a>-->
                                        <a href="javascript:;" class="fr btn"  @click.stop="replySubject(firstLevel.subject_id,i)">评论</a> 
                                    </div>
                                </div>
                        </div>
                    </div>
                </li>
                
            </ul>
            <p class="btnBox" ><button v-if="showloadMoreSubject"  @click="loadMoreSubject">加载更多</button> <span v-else>没有更多评论</span></button></p>  
      </div>
  </div>
</template>
<script>
export default {
    name: 'commentlist',
    data(){
        return {
            comment:'',
            commentReply:'',
            focusStatus:false,
            index:undefined,
            commentList:'',
            pageNumber:1,
            pageVolume:10,
            i:0,
            limitShow:{},
            zz:1,
            showloadMoreSubject:false,
            IndividualInfo:{headFigureURL:'../../../assets/images/avatar.jpg',
                            nickname:'后台运营人员'},
        }
    },
    methods:{
        limitShowMore(i,event){
            if(this.limitShow[i]===undefined){
                this.limitShow[i]=true;
            }else{
                 this.limitShow[i]=!this.limitShow[i];
            }
            //console.log(event.target.parentNode.className)
            if(this.limitShow[i]){
                var len =event.target.nextSibling.children.length ;
                for(var ind =2; ind <len;ind++ ){
                    event.target.parentNode.className='reply openList'
                    event.target.text="隐藏评论∧"
                }
            }else{
                 var len =event.target.nextSibling.children.length ;
                for(var ind =2; ind <len;ind++ ){
                    event.target.parentNode.className='reply hiddenList'
                    event.target.text="展开评论∨"
                }
            }
        },
        replyProject(){
            
            if(!this.comment){
                //bus.$emit('showMassege','请输入评论内容')
                return ;
            }
            this.$http.post('SubjectDiscussManage/projectSubjectCreate',{actorId:this.actorId,subject_content:this.comment,project_id:this.projectItem.id,subject_picture:''})
            .then(response => {return response.body;})
            .then(data=>{
                //console.log(data,'projectSubjectCreate')
                if(data){
                    this.commentList=this.commentList||[]
                     this.commentList.push(
                        {creat_time: new Date(),
                            creator:this.actorId,
                            headFigureURL: this.IndividualInfo.headFigureURL,
                            nickname:this.IndividualInfo.nickname,
                            project_id:this.projectItem.id,
                            subject: '',
                            subject_content: this.comment,
                            subject_id: data,
                            subject_picture: '',
                            commentList:[],
                            subjectlength:0,
                            likeCount:0,
                    })
                    this.comment=""
                    //bus.$emit('showMassege','评论成功')
                    this.zz++;
                }
            }) 
          
        },
        reply(i,index){
            if(!this.actorId){
                //bus.$emit('showMassege','请登录')
                return ;
            }
            this.$refs['comment'+i][0].style.display='block';
            this.$refs['text'+i][0].focus();
            this.focusStatus=false;
            this.commentReply='';
           
        },
        replySubject(subject_id,i){
            console.log(subject_id,i);
            if(!this.commentReply){
                //bus.$emit('showMassege','请输入评论内容')
                return ;
            }
            this.$http.post('SubjectDiscussManage/subjectDiscussCreate',{actorId:this.actorId,subject_id:subject_id,discuss_content:this.commentReply,discuss_picture:''})
            .then(response => {return response.body;})
            .then(data=>{
                //console.log(data,'subjectDiscussCreate')
                if(data){ 
                    this.commentList[i].commentList.push(
                        {
                        creat_time:new Date(),
                        creator:this.actorId,
                        discuss_content:this.commentReply,
                        discuss_id:data.body,
                        discuss_picture:"",
                        headFigureURL: this.IndividualInfo.headFigureURL,
                        nickname:this.IndividualInfo.nickname,
                        is_del:"undelete",
                        parent_id:"",
                        subject_id:subject_id
                    });
                     this.zz++;
                      //bus.$emit('showMassege','评论成功')
                     this.commentList[i].subjectlength++;
                     //console.log(this.commentList);
                    this.$refs['comment'+i][0].style.display='none';
                }
            })
 
          
        },
        hiddenText(){
            //console.log('hidden');
            for(let i in this.commentList){
                //console.log(i);
                this.$refs['comment'+i][0].style.display='none';
            }
        },
        toggleLike(i){
            if(!this.actorId){
                //bus.$emit('showMassege','请登录')
                return ;
            }
            console.log(i,this.commentList[i].subject_id,'toggleLike');
            this.$http.post('SubjectDiscussManage/subjectLikeQueryByActorID',{actorId:this.actorId,subject_id:this.commentList[i].subject_id})
            .then(response => {return response.body;})
            .then(data=>{
                console.log(data,'subjectLikeQueryByActorID')
                //this.commentList.splice( i,1)
                if(data){
                    this.$http.post('SubjectDiscussManage/subjectLikeCancel',{actorId:this.actorId,subject_id:this.commentList[i].subject_id})
                    .then(response => {return response.body;})
                    .then(data=>{
                        console.log(data,'subjectLikeCancel')
                        //this.commentList.splice( i,1)
                        console.log(data)
                        if(data){
                            this.commentList[i].likeCount--;
                            this.zz++;
                        }
                    }) 
                }else{
                    this.$http.post('SubjectDiscussManage/subjectLikeCreate',{actorId:this.actorId,subject_id:this.commentList[i].subject_id})
                    .then(response => {return response.body;})
                    .then(data=>{
                        console.log(data,'subjectLikeCreate')
                        //this.commentList.splice( i,1)
                        console.log(data)
                        if(data){
                            this.commentList[i].likeCount++;
                            this.zz++;
                        }
                    }) 
                }
            }) 
        },
        projectSubjectDelete(i){
            //console.log(i);
            this.$http.post('SubjectDiscussManage/projectSubjectDeleteById',{subject_id:this.commentList[i].subject_id})
            .then(response => {return response.body; })
            .then(data=>{
                //console.log(data,'subjectDiscussAllQuery')
                this.commentList.splice( i,1)
                
            }) 
        },
        subjectDiscussDelete(i,index){
            //console.log(i,index);
            //console.log( this.commentList[i].commentList);
             this.$http.post('SubjectDiscussManage/subjectDiscussDeleteById',{subject_id:this.commentList[i].commentList[index].subject_id,discuss_id:this.commentList[i].commentList[index].discuss_id})
             .then(response => {return response.body;})
             .then(data=>{
               //console.log(data,'subjectDiscussDeleteById')
                this.commentList[i].commentList.splice( index,1)
                this.zz++;
                
            }) 
        },
        loadSubject(){
            this.$http.post('SubjectDiscussManage/projectSubjectAllQuery',{pageNumber:this.pageNumber,pageVolume:this.pageVolume,projectId:this.$route.params.projectId})
            .then(response => {return response.body;})
            .then(data=>{
                //console.log(data,'projectSubjectAllQuery')
                
                if(data&&data.count){
                    this.showloadMoreSubject=data.count>10*this.pageNumber?true:false;
                    
                    if(this.pageNumber==1){
                        this.commentList=data.records;
                    }else{
                        this.commentList=this.commentList.concat(data.records);
                    }
                    for(let i in data.records){
                        let num =1;
                        this.subjectDiscuss(data.records,i,num);
                        this.subjectLikeCount(data.records,i,num);
                    }
                }
                
            })
        },
        loadMoreSubject(){
            this.pageNumber++;
            this.loadSubject();
        },
        subjectLikeCount(itemList,i,subjectpageNumber){
            var  itemList1=itemList
            this.$http.post('SubjectDiscussManage/subjectLikeCount',{subject_id:itemList[i].subject_id})
            .then(response => { return response.body;})
            .then(data=>{
                //console.log(data,'subjectDiscussAllQuery')
                if(data){
                    this.commentList[this.commentList.length-itemList1.length+parseInt(i)].likeCount=data;
                }else{
                    this.commentList[this.commentList.length-itemList1.length+parseInt(i)].likeCount=0;
                }
                this.zz++;
            })  
        },
        subjectDiscuss(itemList,i,subjectpageNumber){
                var  itemList1=itemList
                this.$http.post('SubjectDiscussManage/subjectDiscussAllQuery',{pageNumber:subjectpageNumber,pageVolume:this.pageVolume,subject_id:itemList[i].subject_id})
                .then(response => {return response.body;})
                .then(data=>{
                    //console.log(data,'subjectDiscussAllQuery')
                     //console.log(itemList[i].subject_id);
                    this.zz++;
                    
                    if(!this.commentList[this.commentList.length-itemList1.length+parseInt(i)].commentList){
                        this.commentList[this.commentList.length-itemList1.length+parseInt(i)].commentList=[];
                        this.commentList[this.commentList.length-itemList1.length+parseInt(i)].subjectlength=0;
                    }
                    this.commentList[this.commentList.length-itemList1.length+parseInt(i)].commentList=
                    this.commentList[this.commentList.length-itemList1.length+parseInt(i)].commentList.concat(data.records);
                    this.commentList[this.commentList.length-itemList1.length+parseInt(i)].subjectlength+=data.records.length
                    if(subjectpageNumber*this.pageVolume<data.count){
                        //console.log(itemList1,subjectpageNumber,'1231231231');
                        this.subjectDiscuss(itemList1,i,++subjectpageNumber);
                    }else{
                        return;
                    }
                     
                })  
            },
           
    },
   
    computed:{
        projectItem(){
            return this.$store.state.item.show;
        },
        actorId(){
            return this.$store.state.login.actor.id;
        },
         
    },
    
     beforeMount(){
        this.loadSubject(); 
    }
}
</script>
