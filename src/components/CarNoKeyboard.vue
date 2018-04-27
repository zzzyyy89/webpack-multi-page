<template>
  <div class="keyboard" @click.stop="popHide" v-show="isShowing">
    <p class="top-line" @click.stop="boardHide"><a>确定</a></p>
    <div class="key-area">
      <ul v-if="bType===0">
        <li v-for="l in letters">
          <button @click.stop="showSpec?(showSpec=false):clickLetter(l)">{{l}}</button>
        </li>
        <li style="position: relative;">
          <button @click.stop="showSpec=!showSpec">字</button>
          <div class="spec" v-show="showSpec">
            <div style="position: relative;">
              <ul>
                <li v-for="ss in specs">
                  <button @click.stop="clickSpec(ss)">{{ss}}</button>
                </li>
              </ul>
              <div class="delta"></div>
            </div>
          </div>
        </li>
      </ul>
      <ul v-if="bType===1">
        <li v-for="pp in province">
          <button @click.stop="clickLetter(pp)">{{pp}}</button>
        </li>
      </ul>
      <a class="board-del" @click.stop="showSpec?(showSpec=false):backspace()"><img src="../../static/img/del.png"></a>
    </div>
  </div>
</template>
<script>
  export default {
    props:['isShowing','boardType'],
    data(){
      return{
        showBoard:true,
        showSpec:false,
//        boardType:0,
        letters:[0,1,2,3,4,5,6,7,8,9,
          'Q','W','E','R','T','Y','U','I','O','P',
          'A','S','D','F','G','H','J','K','L',
          'Z','X','C','V','B','N','M'],
        province:['京','沪','浙','苏','粤','鲁','晋','冀','豫','川',
          '渝','辽','吉','黑','皖','鄂','湘','赣','闽','陕',
          '甘','宁','蒙','津','贵','云','桂','琼','青','新',
          '藏','使','票'],
        specs:['领','警','学','挂','港','澳','试','超']
      }
    },
    computed:{
      bType(){
        let t=this.$props.boardType;
        if(!t){
          return 0;
        }
        return t;
      }
    },
    methods:{
      clickLetter(l){
        this.$emit('inputEv',l);
      },
      clickSpec(l){
        this.$emit('inputEv',l);
        this.$data.showSpec = false;
      },
      popHide(){
        this.$data.showSpec=false;
      },
      backspace(){
        this.$emit('backspaceEv');
      },
      boardHide(){
        if(!this.$data.showSpec){
          this.$emit('hideEv');
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .font-min(){
    font-size: .75rem;
  }
  .font-smaller(){
    font-size: .88rem;
  }
  .font-mid(){
    font-size: 1rem;
  }
  .font-bigger(){
    font-size: 1.12rem;
  }
  .font-max(){
    font-size: 1.25rem;
  }
  .tac(){
    text-align: center;
  }
  .tar(){
    text-align: right;
  }
  .tal(){
    text-align: left;
  }
  .input-border(){
    border: 1px solid #e4e4e4;
  }
  .keyboard{
    position: fixed;
    bottom: 0;
    width: 100%;
    color: #222;
    border-top: #f2f2f2;
    z-index: 20;
    .top-line{
      background-color: white;
      overflow: hidden;
      .font-mid;
      color: #a7834b;
      line-height: 35px;
      a{
        float: right;
        padding: 0 10px;
      }
    }
    .key-area{
      position: relative;
      background-color: #ccc;
      padding-top: 10px;
      ul{
        overflow: hidden;
        li{
          box-sizing: border-box;
          width: 10%;
          float: left;
          .tac;
          button{
            font: 19px/38px "microsoft yahei","冬青";
            display: inline-block;
            width: 88%;
            height: 38px;
            background-color: white;
            border-radius: 3px;
            margin-bottom: 10px;
          }
          button[disabled]{
            opacity: .6;
          }
        }
      }
      .board-del{
        position: absolute;
        right: 2px;
        bottom: 10px;
        width: 19%;
        height: 39px;
        line-height: 39px;
        .tac;
        background-color: #b8b8b8;
        border-radius:3px ;
        img{
          vertical-align: middle;
          width: 22px;
        }
      }
    }
    .spec{
      background-color: white;
      position: absolute;
      top: -55px;
      left: -125px;
      width: 250px;
      border-radius: 4px;
      padding: 5px;
      ul{
        li{
          width: 12.5%;
          button{
            margin: 0;
            .input-border
          }
        }
      }
      .delta{
          left: 50%;
          position: absolute;
          width:0;
          height:0;
          border-width:10px;
          border-style:solid;
          border-color:white transparent transparent;
          font-size:0;
          line-height:0;
      }
    }
  }
</style>
