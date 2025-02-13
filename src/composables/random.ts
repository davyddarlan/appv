export function Random(size: number): string {
    const values = 'abcdefghijklmnopqrstuvwyxz123456789@_!?'
    const totalValues = values.length
    let hash = '', randomValue = null

    for (let i = 0; i < size; i++) {
        randomValue = Math.floor(Math.random() * totalValues)

        hash += values[randomValue]
    }

    return hash
}