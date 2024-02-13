<template>
    <div class="app-container">
        <div class="top-toolbar">
            <a-row type="flex" align="middle">
                <div :class="['icon-wrap', { 'active': activeI === 0 }]" @click="onSelectTool(8)" title="锁定状态">
                    <i class="iconfont gls-xuanze"></i>
                </div>
                <a-divider type="vertical"></a-divider>
                <div :class="['icon-wrap subscript', { 'active': activeI === 0 }]" @click="onSelectTool(0)" title="区域选择">
                    <i class="iconfont gls-kuangxuan"></i>
                    <ul class="list-wrap hover-tab">
                        <li @click.stop="onSelectTool(0, 'rect')">
                            <a-row type="flex" align="middle">
                                <i class="iconfont gls-kuangxuan" style="margin-right: 4px;"></i> <span>矩形</span>
                            </a-row>
                        </li>
                    </ul>
                </div>
                <div :class="['icon-wrap subscript', { 'active': activeI === 1 }]" @click="onSelectTool(1)" title="单击创建矩形">
                    <i class="iconfont gls-zhengfangxing"></i>
                </div>
                <div :class="['icon-wrap subscript', { 'active': activeI === 2 }]" @click="onSelectTool(2)" title="单击创建圆">
                    <i class="iconfont gls-yaunxing"></i>
                </div>
                <div :class="['icon-wrap subscript', { 'active': activeI === 3 }]" @click="onSelectTool(3)"
                    title="连续点击创建折线">
                    <i class="iconfont gls-zhixian"></i>
                </div>
                <div :class="['icon-wrap subscript', { 'active': activeI === 4 }]" @click="onSelectTool(4)"
                    title="按住移动随意绘制">
                    <i class="iconfont gls-ziyoubi"></i>
                </div>
                <div :class="['icon-wrap subscript', { 'active': activeI === 5 }]" @click="onSelectTool(5)" title="单击创建文本">
                    <i class="iconfont gls-wenzi"></i>
                </div>
                <div :class="['icon-wrap subscript', { 'active': activeI === 6 }]" @click="onSelectTool(6)" title="单击创建图片">
                    <i class="iconfont gls-tupian"></i>
                </div>
                <div :class="['icon-wrap subscript', { 'active': activeI === 7 }]" @click="onSelectTool(7)" title="网格背景">
                    <i class="iconfont gls-wanggeguan"></i>
                </div>
                <div :class="['icon-wrap subscript', { 'active': activeI === 7 }]" @click="onSelectTool(8)" title="网格吸附">
                    <i class="iconfont gls-zidongxifu"></i>
                </div>
                <a-divider type="vertical"></a-divider>
                <div :class="['icon-wrap', { 'active': activeI === 8 }]" @click="onSelectTool(7)" title="更多工具">
                    <i class="iconfont gls-gengduogongju"></i>
                    <ul class="list-wrap hover-tab">
                        <li>123</li>
                    </ul>
                </div>
            </a-row>
        </div>
        <div class="props-tab">
            <div class="icon-wrap gengduo" @click="isShowSide = !isShowSide">
                <i class="iconfont gls-gengduo"></i>
            </div>
            <div class="props-page" v-if="isShowSide" style="margin-right: 15px">
                <ul class="list-wrap">
                    <li @click="onImportFile"><i class="iconfont gls-xiazai" /> 打开 </li>
                    <li @click="onSaveFile"><i class="iconfont gls-xiazai" /> 保存到...</li>
                    <li @click="onShowPreview"><i class="iconfont gls-daochutupian" /> 导出图片...</li>
                    <li @click="isShowHelp = true"><i class="iconfont gls-bangzhu" /> 帮助</li>
                    <li @click="reset"><i class="iconfont gls-shanchu" /> 重置画布</li>
                    <!-- <li @click="darkTheme"><i class="iconfont gls-shanchu" /> 深色模式</li> -->
                    <a-divider type="horizonal"></a-divider>
                    <li @click="linkTo('https://littlesunnn.github.io/')"><i class="iconfont gls-github" /> GitHub</li>
                    <li @click="linkTo('https://space.bilibili.com/436686692?spm_id_from=333.788.0.0')"><i
                            class="iconfont gls-bilibili" /> 关注up实时进展...</li>
                    <a-divider type="horizonal"></a-divider>
                    <li class="canvas-bg">
                        <div class="title">画布背景</div>
                        <a-row type="flex" align="middle" class="func-wrap">
                            <a-button size="small" style="background-color: #ffc9c9"
                                @click="() => { gls && (gls.backgroundColor = '#ffc9c9') }"></a-button>
                            <a-button size="small" style="background-color: #b2f2bb"
                                @click="() => { gls && (gls.backgroundColor = '#b2f2bb') }"></a-button>
                            <a-button size="small" style="background-color: #a5d8ff"
                                @click="() => { gls && (gls.backgroundColor = '#a5d8ff') }"></a-button>
                            <a-button size="small" style="background-color: #ffec99"
                                @click="() => { gls && (gls.backgroundColor = '#ffec99') }"></a-button>
                            <a-divider type="vertical"></a-divider>
                            <input type="color" class="color-picker" ref="color-picker"
                                @input="(e: any) => { gls && (gls.backgroundColor = e.target.value) }" />
                        </a-row>
                    </li>
                </ul>
            </div>
            <div class="props-page props-setting" v-if="isShowSide">
                <ul class="list-wrap">
                    <li>
                        <div class="title">描边色</div>
                        <a-row type="flex" align="middle" class="func-wrap">
                            <a-button size="middle" style="background-color: #e03131"
                                @click="() => { gls && gls.focusNode && (gls.focusNode.strokeStyle = '#e03131') }"></a-button>
                            <a-button size="middle" style="background-color: #2f9e44"
                                @click="() => { gls && gls.focusNode && (gls.focusNode.strokeStyle = '#2f9e44') }"></a-button>
                            <a-button size="middle" style="background-color: #1971c2"
                                @click="() => { gls && gls.focusNode && (gls.focusNode.strokeStyle = '#1971c2') }"></a-button>
                            <a-button size="middle" style="background-color: #f08c00"
                                @click="() => { gls && gls.focusNode && (gls.focusNode.strokeStyle = '#f08c00') }"></a-button>
                            <a-divider type="vertical"></a-divider>
                            <input type="color" class="color-picker" ref="color-picker"
                                @input="(e: any) => { gls && gls.focusNode && (gls.focusNode.strokeStyle = e.target.value) }" />
                        </a-row>
                    </li>
                    <li>
                        <div class="title">背景色</div>
                        <a-row type="flex" align="middle" class="func-wrap">
                            <a-button size="middle" style="background-color: #ffc9c9"
                                @click="() => { gls && gls.focusNode && (gls.focusNode.fillStyle = gls.focusNode.hoverStyle = gls.focusNode.focusStyle = '#ffc9c9') }"></a-button>
                            <a-button size="middle" style="background-color: #b2f2bb"
                                @click="() => { gls && gls.focusNode && (gls.focusNode.fillStyle = gls.focusNode.hoverStyle = gls.focusNode.focusStyle = '#b2f2bb') }"></a-button>
                            <a-button size="middle" style="background-color: #a5d8ff"
                                @click="() => { gls && gls.focusNode && (gls.focusNode.fillStyle = gls.focusNode.hoverStyle = gls.focusNode.focusStyle = '#a5d8ff') }"></a-button>
                            <a-button size="middle" style="background-color: #ffec99"
                                @click="() => { gls && gls.focusNode && (gls.focusNode.fillStyle = gls.focusNode.hoverStyle = gls.focusNode.focusStyle = '#ffec99') }"></a-button>
                            <input type="color" class="color-picker" ref="color-picker"
                                @input="(e: any) => { gls && gls.focusNode && (gls.focusNode.fillStyle = gls.focusNode.hoverStyle = e.target.value) }" />
                        </a-row>
                    </li>
                    <li>
                        <div class="title">描边宽度</div>
                        <a-row type="flex" align="middle" class="func-wrap">
                            <a-button style="background-color: hsl(240 25% 96%)"
                                @click="() => { gls && gls.focusNode && (gls.focusNode.lineWidth = .1) }" title="细">
                                <i class="iconfont gls-xi-zhixian"></i>
                            </a-button>
                            <a-button style="background-color: hsl(240 25% 96%)"
                                @click="() => { gls && gls.focusNode && (gls.focusNode.lineWidth = .5) }" title="粗">
                                <i class="iconfont gls-zhong-zhixian"></i>
                            </a-button>
                            <a-button style="background-color: hsl(240 25% 96%)"
                                @click="() => { gls && gls.focusNode && (gls.focusNode.lineWidth = 1) }" title="特粗">
                                <i class="iconfont gls-cu-zhixian"></i>
                            </a-button>
                            <a-divider type="vertical"></a-divider>
                            <a-slider id="test" :step=".1" :min=".1" :max="2" v-model:value="props.lineWidth"
                                style="width: 100px;"
                                @change="(e: any) => { gls?.focusNode && (gls.focusNode.lineWidth = e) }" />
                        </a-row>
                    </li>
                    <li>
                        <div class="title">边框样式</div>
                        <a-row type="flex" align="middle" class="func-wrap">
                            <a-button style="background-color: hsl(240 25% 96%)"
                                @click="() => { gls && gls.focusNode && (gls.focusNode.lineDashArr = []) }" title="实线">
                                <i class="iconfont gls-xi-zhixian"></i>
                            </a-button>
                            <a-button style="background-color: hsl(240 25% 96%)"
                                @click="() => { gls && gls.focusNode && (gls.focusNode.lineDashArr = [5, 12]) }" title="虚线">
                                <i class="iconfont gls-xuxian"></i>
                            </a-button>
                            <a-button style="background-color: hsl(240 25% 96%)"
                                @click="() => { gls && gls.focusNode && (gls.focusNode.lineDashArr = [5, 20]) }" title="特虚">
                                <i class="iconfont gls-xuxian1"></i>
                            </a-button>
                            <a-divider type="vertical"></a-divider>
                            <a-slider id="test" :step="1" :min="1" :max="30" v-model:value="props.lineWidth"
                                style="width: 100px;"
                                @change="(e: any) => { gls?.focusNode && (gls.focusNode.lineDashArr = [5, e]) }" />
                        </a-row>
                    </li>
                    <li>
                        <div class="title">圆角大小</div>
                        <a-row type="flex" align="middle" class="func-wrap">
                            <a-button style="background-color: hsl(240 25% 96%)"
                                @click="() => { gls?.focusNode && gls.focusNode instanceof Rect && (gls.focusNode.radius = 0) }"
                                title="直角">
                                <i class="iconfont gls-zhijiao"></i>
                            </a-button>
                            <a-button style="background-color: hsl(240 25% 96%)"
                                @click="() => { gls?.focusNode && gls.focusNode instanceof Rect && (gls.focusNode.radius = .5) }"
                                title="圆角">
                                <i class="iconfont gls-yuanjiao"></i>
                            </a-button>
                            <a-button style="background-color: hsl(240 25% 96%);visibility: hidden;" title="圆角">
                            </a-button>
                            <a-divider type="vertical"></a-divider>
                            <a-slider id="test" v-model:value="props.radius" :step=".1" :min="0" :max="1"
                                style="width: 100px;"
                                @change="(e: any) => { gls?.focusNode && gls.focusNode instanceof Rect && (gls.focusNode.radius = e) }" />
                        </a-row>
                    </li>
                    <li>
                        <div class="title">透明度</div>
                        <a-slider id="test" v-model:value="props.opacity" :step=".1" :min=".1" :max="2"
                            @change="(e: any) => { gls?.focusNode && (gls.focusNode.opacity = e) }" />
                    </li>
                    <li>
                        <div class="title">图层</div>
                        <a-row type="flex" align="middle" class="func-wrap">
                            <a-button style="background-color: hsl(240 25% 96%)" title="置于顶层"
                                @click="gls?.focusNode && gls?.toMaxIndex(gls.focusNode); message.info('置于顶层')">
                                <i class="iconfont gls-zhiyudingceng"></i>
                            </a-button>
                            <a-button style="background-color: hsl(240 25% 96%)" title="上移一层"
                                @click="gls?.focusNode && gls.focusNode.zIndex++; message.info('上移一层')">
                                <i class="iconfont gls-shangyiyiceng"></i>
                            </a-button>
                            <a-button style="background-color: hsl(240 25% 96%)" title="下移一层"
                                @click="gls?.focusNode && gls.focusNode.zIndex--; message.info('下移一层')">
                                <i class="iconfont gls-xiayiyiceng"></i>
                            </a-button>
                            <a-button style="background-color: hsl(240 25% 96%)" title="置于底层"
                                @click="gls?.focusNode && gls?.toMinIndex(gls.focusNode); message.info('置于底层')">
                                <i class="iconfont gls-zhiyudiceng"></i>
                            </a-button>
                        </a-row>
                    </li>
                    <li>
                        <div class="title">操作</div>
                        <a-row type="flex" align="middle" class="func-wrap">
                            <a-button style="background-color: hsl(240 25% 96%)" title="复制"
                                @click="gls?.focusNode && gls?.recordFeatureProps(gls.focusNode); message.info('复制了')">
                                <i class="iconfont gls-fuzhi"></i>
                            </a-button>
                            <a-button style="background-color: hsl(240 25% 96%)" title="删除"
                                @click="gls?.removeFeature(gls.focusNode); message.info('删除了')">
                                <i class="iconfont gls-shanchu"></i>
                            </a-button>
                            <a-button style="background-color: hsl(240 25% 96%)" title="是否闭合"
                                @click="gls?.focusNode && (gls.focusNode.closePath = !gls.focusNode.closePath)">
                                <i class="iconfont gls-bihe"></i>
                            </a-button>
                        </a-row>
                    </li>
                </ul>
            </div>
        </div>
        <canvas id="myCanvas" width="1580" height="880" ref="cvs"></canvas>
        <a-modal v-model:open="isShowSaveImage" title="保存为图片" width="80vw">
            <a-row type="flex" justify="center">
                <img alt="" id="preview-img" width="80%">
            </a-row>
            <template #footer>
                <a-button key="submit" type="primary" @click="onSaveImg">下载图片</a-button>
                <a-button key="back" @click="isShowSaveImage = false">关 闭</a-button>
            </template>
        </a-modal>
        <a-modal v-model:open="isShowHelp" title="帮助" width="50vw">
            <h4>操作指南:</h4>
            <ul>
                <li>鼠标左键选择元素,选中按住移动元素; 鼠标右键拖拽移动画布, 鼠标滚轮放大缩小画布 </li>
            </ul>
            <template #footer>
                <a-button key="back" @click="isShowHelp = false">关 闭</a-button>
            </template>
        </a-modal>
        <!-- <a-modal v-model:open="isShowSaveImage" title="保存为图片" width="80vw">
            <a-row type="flex" justify="center">
                <img alt="" id="preview-img" width="80%">
            </a-row>
            <template #footer>
                <a-button key="submit" type="primary" @click="onSaveImg">下载图片</a-button>
                <a-button key="back" @click="isShowSaveImage = false">关 闭</a-button>
            </template>
        </a-modal> -->
    </div>
</template>
    
<script lang="ts" setup>
import { Events } from "@/Constants";
import Circle from "@/features/basic-shape/Circle";
import Img from "@/features/basic-shape/Img";
import Line from "@/features/basic-shape/Line";
import Rect from "@/features/basic-shape/Rect";
import Text from "@/features/basic-shape/Text";
import Feature from "@/features/Feature";
import SelectArea from "@/features/function-shape/SelectArea";
import GridLine from "@/GridLine";
import { randomNum } from "@/utils";
import { message } from "ant-design-vue";
import { onMounted, reactive, ref, toRef, toRefs } from "vue";
import { DrawAreaMode } from "../Constants";
// import GridLine from "../GridLine";
import GridSystem from "../GridSystem";
const cvs = ref(null);
const activeI = ref(-1);
const isShowSide = ref(false);
const props = ref<Partial<Feature & Rect & Line>>({
    opacity: 1,
    lineWidth: .2,
    radius: 0,
});
let gl: GridLine | null = new GridLine();
let sa: SelectArea | null | undefined = null;
let gls: GridSystem | null;
const isShowPropTab = ref(false);
const isShowSaveImage = ref(false);
const isShowHelp = ref(false);

onMounted(() => {
    reset();
    gl = new GridLine();
    // document.addEventListener(Events.RIGHT_CLICK, ()=>{
    //     console.log(1111);
    // })
})

let cb: any;
function onSelectTool(index = 0) {
    if (activeI.value === index) {
        activeI.value = -1
    }
    if (cb) { cb(); cb = null };
    switch (index) {
        case 0: // 选择区域
            gls?.enableSelectArea();
            // sa = gls?.removeFeature(sa)
            // sa = new SelectArea();
            // sa.drawMode = DrawAreaMode.RECT;
            // console.log(111);
            break;
        case 1: // 选择区域
            let rect = new Rect(0, 0, 50, 20);
            gls?.click2DrawByClick(rect, true)
            break;
        case 2: // 选择区域
            let circle = new Circle(0, 0, 50, 50);
            gls?.click2DrawByClick(circle, true)
            break;
        case 3: // 选择区域
            let line1 = new Line();
            gls?.click2DrawByContinuousClick(line1, true, true)
            break;
        case 4: // 自由笔
            if (cb) { cb(); cb = null; return };
            function click2DrawByMove() {
                let line = new Line();
                line.fillStyle = "#000"
                cb = gls?.click2DrawByMove(line, false, false, () => {
                    click2DrawByMove();
                })
            }
            click2DrawByMove();
            break;
        case 5: // 选择区域
            var txt = prompt("请输入文字", "测试文字");
            let text = new Text(txt as string, 0, 0, 20, 10);
            text.fitSize = true;
            gls?.click2DrawByClick(text, true)
            break;
        case 6: // 选择区域
            window.showOpenFilePicker().then((res: any) => {
                if (res[0].kind === 'file') {
                    const reader = new FileReader();
                    res[0].getFile().then((file: any) => {
                        reader.readAsDataURL(file);
                    })
                    reader.onload = function () {
                        let imgEle = new Image();
                        imgEle.src = reader.result as string;
                        console.log(reader.result, "reader.result");
                        imgEle.onload = () => {
                            let img = new Img(imgEle, 0, 0, 50, 30);
                            gls?.click2DrawByClick(img, true)
                        }
                    }
                }
            });
            break;
        case 7: // 选择区域
            gl ? gl = null : gl = new GridLine()
            break;
        case 8: // 选择区域
            if (gls) {
                gls.cbAdsorption = !gls.cbAdsorption;
            }
            break;
        default:
            break;
    }
    if (activeI.value < 0) {
        return
    }
    activeI.value = index;
}

const previewImg = ref('')
function onSaveImg() {
    if (previewImg.value) {
        // 创建一个隐藏的<a>元素用于下载  
        var downloadLink = document.createElement('a');
        downloadLink.href = previewImg.value;
        downloadLink.download = 'canvas-image.png'; // 设置下载文件名  

        // 将<a>元素添加到DOM中，并模拟点击事件  
        document.body.appendChild(downloadLink);
        downloadLink.click();

        // 从DOM中移除<a>元素  
        document.body.removeChild(downloadLink);
    }
}

function onShowPreview() {
    isShowSaveImage.value = true;
    setTimeout(() => {
        if (gls) {
            var base64 = gls.dom.toDataURL("image/png");
            let img = document.getElementById("preview-img") as HTMLImageElement;
            img.src = base64;
            previewImg.value = base64;
        }
    }, 1000);
}

function onSaveFile() {
    if (gls?.features && gls.features.length <= 0) {
        return message.warning("没有元素,保存啥?")
    }
    let str = gls?.save();
    const text = JSON.stringify(str)
    const blob = new Blob([text], {
        type: "text/plain;charset=utf-8"
    })
    // 根据 blob生成 url链接
    const objectURL = URL.createObjectURL(blob)
    const domElement = document.createElement('a')
    domElement.href = objectURL;
    domElement.download = `${new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()}.gls`
    domElement.click()
    URL.revokeObjectURL(objectURL)
}
function onImportFile() {
    window.showOpenFilePicker().then((res: any) => {
        if (res[0].kind === 'file') {
            const reader = new FileReader();
            res[0].getFile().then((file: any) => {
                reader.readAsText(file);
            })
            reader.onload = function () {
                let features = JSON.parse(JSON.parse(reader.result as string))
                gls?.loadData(features);
                // let imgEle = new Image();
                // imgEle.src = reader.result as string;
                // console.log(reader.result, "reader.result");
                // imgEle.onload = () => {
                //     let img = new Img(imgEle, 0, 0, 50, 30);
                //     gls?.click2DrawByClick(img, true)
                // }
            }
        }
    });
}

function darkTheme() {

}

function startTime(gls: GridSystem) {
    gls.draw(true, () => {
        gl && gl.draw(gls)
    });
}

function reset() {
    if (gls) {
        gls.destroy();
        gls = null;
    }
    let canvasDom = cvs.value as unknown as HTMLCanvasElement;
    gls = new GridSystem(canvasDom);
    setCanvasSize(canvasDom);
    startTime(gls as GridSystem);
    
    for (let index = 0; index < 1000; index++) {
        gls.addFeature(new Feature([
            { x: randomNum(0,1000), y: randomNum(0,1000) },
            { x: randomNum(0,1000), y: randomNum(0,1000) },
        ]))
    }

}

function linkTo(url: string) {
    window.open(url);
}

function setCanvasSize(canvasDom: HTMLCanvasElement) {
    canvasDom.width = document.documentElement.clientWidth - 4;
    canvasDom.height = document.documentElement.clientHeight - 4;

    window.onresize = () => {
        canvasDom.width = document.documentElement.clientWidth - 4;
        canvasDom.height = document.documentElement.clientHeight - 4;
    }
}

</script>

<style scoped lang="less">
body {
    // width: 100vw;
    // height: 100vh;
}

canvas {
    // border: 1px solid;
}

.app-container {
    position: relative;
    font-family: "glsfont";
    overflow: hidden;

    .top-toolbar {
        position: absolute;
        left: 50%;
        top: 20px;
        padding: 0 10px;
        transform: translateX(-50%);
        background: #fff;
        box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, .17), 0px 0px 3px 0px rgba(0, 0, 0, .08), 0px 7px 14px 0px rgba(0, 0, 0, .05);
        border-radius: 8px;
        color: #676767;
    }

    .props-tab {
        position: absolute;
        left: 20px;
        top: 20px;

        .props-page {
            margin-top: 10px;
            border-radius: 10px;
            padding: 5px;
            float: left;
            // width: 180px;
            background-color: rgba(250, 250, 250, .95);
            box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, .17), 0px 0px 3px 0px rgba(0, 0, 0, .08), 0px 7px 14px 0px rgba(0, 0, 0, .05);

            .list-wrap {
                font-size: 14px;

                li {
                    padding: 8px 15px;
                    border-radius: 5px;
                    color: #333;
                    margin: 5px 0;
                    cursor: pointer;

                    &:hover {
                        background-color: rgba(222, 230, 237, .5);
                    }

                    &>i {
                        margin-right: 4px;
                    }
                }

                li.canvas-bg {
                    button {
                        width: 20px;
                        height: 20px;
                        margin-right: 5px;

                    }

                    .color-picker {
                        width: 20px;
                        height: 20px;
                        padding: 0px;
                    }
                }
            }
        }

        .title {
            font-size: 12px;
            margin-bottom: 6px;
        }

        .props-setting {
            // margin-left: 15px;


            .list-wrap {
                li {
                    padding: 4px 10px;

                    &:hover {
                        background-color: transparent;
                    }
                }
            }

            .func-wrap {
                display: flex;

                button {
                    margin-right: 8px;
                    width: 32px;
                    height: 32px;
                    padding: 0;

                    i {
                        font-size: 20px;
                    }
                }

                .color-picker {
                    display: inline-block;
                    width: 32px;
                    height: 32px;
                    border: 1px solid #d9d9d9;
                    border-radius: 5px;
                    margin-left: 5px;
                    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
                }

                // .icon-wrap {
                //     background-color: rgba(192, 202, 210, .5);
                //     &:hover {
                //         background-color: rgba(192, 202, 210, 1);
                //     }
                // }
            }
        }
    }

    .icon-wrap {
        width: 25px;
        height: 25px;
        padding: 5px;
        margin: 5px 10px;
        margin-left: 0;
        cursor: pointer;
        text-align: center;
        line-height: 25px;
        border-radius: 5px;

        &.subscript {
            position: relative;
            counter-increment: chapter;

            &:after {
                content: ". " counter(chapter);
                /* 使用counters函数获取当前计数值并显示 */
                /* 递增计数器 */
                position: absolute;
                right: 0px;
                bottom: -2px;
                font-size: 12px;
                font-weight: lighter;
                color: #000;
            }
        }

        i {
            font-size: 22px;
        }

        &:hover {
            background-color: #C6E2F8;
        }

        &.active {
            background-color: #5DB5F9;
        }

        &.gengduo {
            position: relative;
            z-index: 100;
            border-radius: 6px;
            background-color: rgba(192, 202, 210, .5);
            box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, .17), 0px 0px 3px 0px rgba(0, 0, 0, .08), 0px 7px 14px 0px rgba(0, 0, 0, .05);

            &:hover {
                background-color: rgba(192, 202, 210, 1);
            }
        }

        &:hover {
            &>.hover-tab {
                width: 60px;
                display: inline-block;
            }
        }

        .hover-tab {
            background-color: #fff;
            border-radius: 5px;
            // border: 1px solid #d9d9d9;
            box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, .17), 0px 0px 3px 0px rgba(0, 0, 0, .08), 0px 7px 14px 0px rgba(0, 0, 0, .05);
            display: none;
            margin-top: 20px;
            padding: 10px;
        }
    }
}
</style>