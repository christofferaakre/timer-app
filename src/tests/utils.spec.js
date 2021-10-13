const {parseTimeInput, padNum, parseTime} = require('../utils')

describe("padNum", () => {
    it('2 length number', () => {
        expect(padNum(13)).toEqual('13')
    })

    it('1 length number', () => {
        expect(padNum(3)).toEqual('03')
    })
})

describe('parseTime', () => {
    it('132 hours, 22 minutes, and 13 seconds', () =>{
        expect(parseTime(132, 22, 13)).toEqual('132:22:13')
    })
})

describe("parseTimeInput", () => {
    it("10:34:22", () => {
        expect(parseTimeInput('10:34:22')).toEqual([10, 34, 22])
    })

    it("3,75 :     1", () => {
        expect(parseTimeInput('3,75 :     1')).toEqual([4, 15, 1])
    })

    it("5 minutes", () => {
        expect(parseTimeInput('5 minutes')).toEqual([0, 5, 0])
    })

    it("10 hours 9 minutes 8 seconds", () => {
        expect(parseTimeInput('10 hours 9 minutes 8 seconds')).toEqual([10, 9, 8])
    })

    it("13h120m130s", () => {
        expect(parseTimeInput('13h120m130s')).toEqual([15, 2, 10])
    })

    it("5, 3, 2", () => {
        expect(parseTimeInput('5,3,2')).toEqual([5, 3, 2])
    })

    it("12/100/2", () => {
        expect(parseTimeInput('12/100/2')).toEqual([13, 40, 2])
    })
})