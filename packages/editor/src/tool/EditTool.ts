import { IPointData } from '@leafer-ui/interface'
import { IEditor, IEditResizeEvent, IEditRotateEvent, IEditTool, IEditSkewEvent, IEditMoveEvent } from '@leafer-in/interface'

export class EditTool implements IEditTool {

    static list: IEditTool[] = []

    public tag = 'EditTool'

    getMirrorData(editor: IEditor): IPointData {
        const { scaleX, scaleY } = editor.box
        return {
            x: scaleX < 0 ? 1 : 0, // 1 = mirrorX
            y: scaleY < 0 ? 1 : 0
        }
    }

    onMove(e: IEditMoveEvent): void {
        const { moveX, moveY, editor } = e
        editor.leafList.forEach(target => {
            const move = target.getLocalPoint({ x: moveX, y: moveY })
            target.move(move.x, move.y)
        })
    }

    onResize(e: IEditResizeEvent): void {
        const { scaleX, scaleY, transform, worldOrigin, editor } = e
        editor.leafList.forEach(target => {
            const resize = editor.getEditSize(target) === 'size'
            if (transform) {
                target.transform(transform, resize)
            } else {
                target.scaleOf(target.getInnerPoint(worldOrigin), scaleX, scaleY, resize)
            }
        })
    }

    onRotate(e: IEditRotateEvent): void {
        const { rotation, worldOrigin, editor } = e
        editor.leafList.forEach(target => {
            target.rotateOf(target.getInnerPoint(worldOrigin), rotation)
        })

    }

    onSkew(e: IEditSkewEvent): void {
        const { skewX, skewY, worldOrigin, editor } = e
        editor.leafList.forEach(target => {
            target.skewOf(target.getInnerPoint(worldOrigin), skewX, skewY)
        })
    }

    update(editor: IEditor) {
        const { targetSimulate, leafList: targetList } = editor

        let target = targetList.list[0]

        if (editor.multiple) {
            target = targetSimulate
            targetSimulate.parent.updateLayout()
        }

        const { x, y, scaleX, scaleY, rotation, skewX, skewY, width, height } = target.getOrientBounds('box', editor, true)
        editor.box.set({ x, y, scaleX, scaleY, rotation, skewX, skewY })
        editor.box.update({ x: 0, y: 0, width, height })
    }

}