const listHelper = require('../utils/listHelper')
const helper = require('./blogTestHelper')

describe('total likes', () => {
    
    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(helper.listWithOneBlog)
        expect(result).toBe(5)
    })

    test('most likes from list of blogs, toBe', ()=>{
        const result = listHelper.favoriteBlog(helper.blogList)
        expect(result[0]).toBe(helper.blogList[2])
    })

    // ??? mikä on ero
    test('most likes from list of blogs, toEqual', ()=>{
        const result = listHelper.favoriteBlog(helper.blogList)
        expect(result[0]).toEqual(helper.blogList[2])
    })


})