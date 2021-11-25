import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from '@/components/table/table.template'
import { $ } from '@core/DOM'

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            listeners: ['mousedown']
        })
    }

    toHTML() {
        return createTable(26)
    }

    onMousedown(event) {
        if (event.target.dataset.resize) {
            const $resizer = $(event.target)
            const $parent = $resizer.closest('[data-type="resizable"]')
            const coords = $parent.getCoords()

            document.onmousemove = e => {
                const delta = e.pageX - coords.right
                const value = coords.width + delta
                $parent.$el.style.width = value + 'px'
                this.$root.document.querySelectorAll(`[data-col="${$parent.data.col}"]`)
                    .forEach(el => el.style.width = value + 'px')
            }

            document.ommouseup = () => {
                document.onmousemove = null
            }
        }
    }
}