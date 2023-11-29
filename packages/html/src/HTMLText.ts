import { IString, IImage } from '@leafer-ui/interface'
import { Image, boundsType, registerUI, dataProcessor } from '@leafer-ui/core'

import { IHTMLTextData, IHTMLTextInputData } from '@leafer-in/interface'

import { HTMLTextData } from './data/HTMLTextData'


@registerUI()
export class HTMLText extends Image implements IImage {

    public get __tag() { return 'HTMLText' }

    @dataProcessor(HTMLTextData)
    declare public __: IHTMLTextData

    @boundsType('')
    public text: IString

    constructor(data?: IHTMLTextInputData) {
        super(data)
    }

    public __updateBoxBounds(): void {

        if (this.__.__htmlChanged) {

            const div = document.createElement('div')
            const { style } = div

            style.position = 'absolute'
            style.visibility = 'hidden'
            div.innerHTML = this.text
            document.body.appendChild(div)

            const { width, height } = div.getBoundingClientRect()
            const italicWidth = 20 // add italic width

            const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width + italicWidth}" height="${height}">
                        <foreignObject width="${width + italicWidth}" height="${height}">
                            <style>
                                * {
                                    margin: 0;
                                    padding: 0;
                                    box-sizing: border-box;
                                }
                            </style>
                            <body xmlns="http://www.w3.org/1999/xhtml">
                                ${this.text}
                            </body>
                        </foreignObject>
                    </svg>`

            this.__.url = 'data:image/svg+xml,' + encodeURIComponent(svg)
            this.__.__htmlChanged = false

            div.remove()
        }

        super.__updateBoxBounds()
    }

}