import { IGroup, IRect, IBoundsData, IKeyEvent, IBoxInputData } from '@leafer-ui/interface'
import { IEditor } from './IEditor'
import { IEditPoint } from './IEditPoint'

export interface IEditBox extends IGroup {

    editor: IEditor
    dragging: boolean
    moving: boolean

    circle: IEditPoint
    rect: IRect

    buttons: IGroup

    resizePoints: IEditPoint[]
    rotatePoints: IEditPoint[]
    resizeLines: IEditPoint[]

    readonly flipped: boolean
    readonly flippedX: boolean
    readonly flippedY: boolean
    readonly flippedOne: boolean

    enterPoint: IEditPoint

    getPointStyle(userStyle?: IBoxInputData): IBoxInputData
    getPointsStyle(): IBoxInputData[]
    getMiddlePointsStyle(): IBoxInputData[]

    update(bounds: IBoundsData): void
    onArrow(e: IKeyEvent): void

}