export class CanvasRect {
    x1: number = 0
    y1: number = 0
    x2: number = 0
    y2: number = 0

    getWidth(): number {
        let width = this.x1 - this.x2
        return Math.abs(width)
    }

    getHeight(): number {
        let height = this.y1 - this.y2
        return Math.abs(height)
    }

    getMinX(): number {
        return this.x1 > this.x2 ? this.x2 : this.x1
    }

    getMinY(): number {
        return this.y1 > this.y2 ? this.y2 : this.y1
    }
}
