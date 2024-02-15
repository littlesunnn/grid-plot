import { DrawAreaMode, SelectMode } from "../../Constants";
import { IPoint } from "../../Interface";
import { isPointInPolygon, getMousePos } from "../../utils";
import Feature from "../Feature";

class SelectArea extends Feature {

    selectMode: SelectMode = SelectMode.ONE_P;  // 是否框中一个点就判定为选中，还是全部点进入才判定选中
    drawMode: DrawAreaMode = DrawAreaMode.RECT;  // 绘制模式,多边形或者矩形
    callback: Function;
    lastMove: IPoint = { x: 0, y: 0 };

    constructor(fn = () => { }) {
        super([]);
        this.callback = fn;
        this.className = "SelectArea";
        this.lineWidth = 0;
        this.size = {
            width: 0,
            height: 0,
        };
        this.zIndex = Infinity;
        this.fillStyle = this.hoverStyle = this.focusStyle = "rgba(220, 233, 126, .4)"
        document.addEventListener("mousedown", this.setPointArr);
        this.resize = () => {
            this.lastMove.x = this.pointArr[0].x;
            this.lastMove.y = this.pointArr[0].y;
        }
    }

    setPointArr = (e: any) => {
        if (e.buttons == 1) {
            let startP = this.gls.getRelativePos(getMousePos(this.gls.dom, e));
            this.pointArr[0] = startP;
            this.gls.addFeature(this, false);
            var mouseMove = (ev: any) => {
                switch (this.drawMode) {
                    case DrawAreaMode.RECT: {
                        let endP = this.gls.getRelativePos(getMousePos(this.gls.dom, ev));
                        this.pointArr[1] = {
                            x: endP.x,
                            y: startP.y
                        }
                        this.pointArr[2] = {
                            x: endP.x,
                            y: endP.y
                        }
                        this.pointArr[3] = {
                            x: startP.x,
                            y: endP.y
                        }
                    }
                        break;
                    case DrawAreaMode.IRREGULAR: {
                        let moveP = this.gls.getRelativePos(getMousePos(this.gls.dom, ev));
                        this.addPoint(moveP);
                    }
                        break;
                    default:
                        break;
                }
                this.lastMove = JSON.parse(JSON.stringify(this.pointArr[0]));
            }
            var mouseUp = () => {
                let featuresIn = this.getSelectFeature();
                featuresIn.forEach(fi => {
                    this.addFeature(fi)
                })
                this.gls.enableTranform(this, true)
                this.callback(featuresIn);
                document.removeEventListener("mousedown", this.setPointArr)
                document.removeEventListener("mousemove", mouseMove)
                document.removeEventListener("mouseup", mouseUp)
            }
            document.addEventListener("mousemove", mouseMove);
            document.addEventListener("mouseup", mouseUp);
        }
    }

    getSelectFeature() {
        return this.gls.features.filter(f => {
            if (!f.cbSelect || !this.gls.isBasicFeature(f)) return
            let pointArr = f.pointArr;
            if (this.selectMode === SelectMode.ALL_P) {
                return pointArr.every(p => {
                    return isPointInPolygon(p, this.pointArr);
                });
            }
            if (SelectMode.ONE_P) {
                return pointArr.some(p => {
                    return isPointInPolygon(p, this.pointArr);
                });
            }
            return []
        })
    }

    destroy() {
        // this.children.forEach(f => { f.cbSelect = true; f.parent = null })
        // super.destroy();
        // this.gls.enableTranform(this, false)
    }

    // 顶部对齐
    toTopAlign(features: Feature[] = this.children, minY?: number) {
        if (minY == undefined) {
            if (features.length > 1) {
                let minYs = features.map(f => f.getRectWrapExtent()[2]);
                minY = minYs.sort(function (a, b) { return a - b })[0];  // 找到最大的minY

            } else {
                minY = this.gls.getRelativeY(0);
            }
        } else {
            minY = this.gls.getRelativeY(minY);
        }

        features.forEach(f => {
            f.translate(0, (minY || 0) - f.getRectWrapExtent()[2])
        })
    }

    toBottomAlign(features: Feature[] = this.children, maxY?: number) {
        if (maxY == undefined) {
            if (features.length > 1) {
                let maxYs = features.map(f => f.getRectWrapExtent()[3]);
                maxY = maxYs.sort(function (a, b) { return b - a })[0];

            } else {
                maxY = this.gls.getRelativeY(0);
            }
        } else {
            maxY = this.gls.getRelativeY(maxY);
        }

        if (features.length > 1 && maxY != undefined) {
            let maxYs = features.map(f => f.getRectWrapExtent()[3]);
            maxY = maxYs.sort(function (a, b) { return b - a })[0];
        }
        maxY = this.gls.getRelativeY(maxY);
        features.forEach(f => {
            f.translate(0, (maxY || 0) - f.getRectWrapExtent()[3])
        })
    }

    toLeftAlign(features: Feature[] = this.children, minX?: number) {
        if (minX == undefined) {
            if (features.length > 1) {
                let minXs = features.map(f => f.getRectWrapExtent()[0]);
                minX = minXs.sort(function (a, b) { return a - b })[0];

            } else {
                minX = this.gls.getRelativeY(0);
            }
        } else {
            minX = this.gls.getRelativeY(minX);
        }

        minX = this.gls.getRelativeX(minX);
        features.forEach(f => {
            f.translate((minX || 0) - f.getRectWrapExtent()[0], 0)
        })
    }

    toRightAlign(features: Feature[] = this.children, maxY?: number) {
        if (maxY == undefined) {
            if (features.length > 1) {
                let maxXs = features.map(f => f.getRectWrapExtent()[1]);
                maxY = maxXs.sort(function (a, b) { return b - a })[0];
            } else {
                maxY = this.gls.getRelativeY(0);
            }
        } else {
            maxY = this.gls.getRelativeY(maxY);
        }

        maxY = this.gls.getRelativeX(maxY);
        features.forEach(f => {
            f.translate((maxY || 0) - f.getRectWrapExtent()[1], 0)
        })
    }

    toHorizonalAlign(features: Feature[] = this.children, centerX?: number) {
        if (centerX == undefined) {
            if (features.length > 1) {
                let ys = features.map(f => f.getCenterPos().y);
                centerX = ys.reduce((a, b) => a + b) / ys.length;
            } else {
                centerX = this.gls.getRelativeY(0);
            }
        } else {
            centerX = this.gls.getRelativeY(centerX);
        }
        features.forEach(f => {
            f.translate(0, (centerX || 0) - f.getCenterPos().y)
        })
    }

    toVerticalAlign(features: Feature[] = this.children, centerY?: number) {
        if (centerY == undefined) {
            if (features.length > 1) {
                let xs = features.map(f => f.getCenterPos().x);
                centerY = xs.reduce((a, b) => a + b);
            } else {
                centerY = this.gls.getRelativeY(0);
            }
        } else {
            centerY = this.gls.getRelativeY(centerY);
        }

        features.forEach(f => {
            f.translate((centerY || 0) - f.getCenterPos().x, 0)
        })
    }

    // 均匀分布子元素, 两边有空隙
    toSpaceAroud(features: Feature[] = this.children) {
        if (features.length > 1) {
            features.sort((a, b) => a.getRectWrapExtent()[1] - b.getRectWrapExtent()[0])
            this.toLeftAlign(features);
            const { width, height, leftTop } = this.getSize();
            let sonWidths = 0;
            features.forEach(f => {
                let [minX, maxX, minY, maxY] = f.getRectWrapExtent();
                sonWidths += (maxX - minX);
            })
            let spaceWidth = (width - sonWidths) / (features.length + 1)
            let lastWidth = 0
            features.forEach((f, i) => {
                if (features[i - 1]) {
                    let [minX, maxX, minY, maxY] = features[i - 1].getRectWrapExtent();
                    lastWidth += (maxX - minX);
                }
                f.translate(spaceWidth * (i + 1) + lastWidth, 0)
            })
        }
    }

    // 均匀分布子元素, 两边吗没有空隙
    toSpaceBetween(features: Feature[] = this.children) {
        if (features.length > 1) {
            features.sort((a, b) => a.getRectWrapExtent()[1] - b.getRectWrapExtent()[0])
            this.toLeftAlign(features);
            const { width, height, leftTop } = this.getSize();
            let sonWidths = 0;
            features.forEach(f => {
                let [minX, maxX, minY, maxY] = f.getRectWrapExtent();
                sonWidths += (maxX - minX);
            })
            let spaceWidth = (width - sonWidths) / (features.length - 1)
            let lastWidth = 0
            features.forEach((f, i) => {
                if (features[i - 1]) {
                    let [minX, maxX, minY, maxY] = features[i - 1].getRectWrapExtent();
                    lastWidth += (maxX - minX);
                }
                f.translate(spaceWidth * i + lastWidth, 0)
            })
        }
    }

}

export default SelectArea;