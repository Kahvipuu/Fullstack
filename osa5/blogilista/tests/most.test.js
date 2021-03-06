const listHelper = require('../utils/listHelper')
const helper = require('./blogTestHelper')

describe('most blogs', () => {

    test('returns author with most blogs', () => {
        const result = listHelper.mostBlogs(helper.blogList)
        expect(result.author).toBe('Robert C. Martin')
        expect(result.blogs).toBe(3)
    })

    test('WIP return author with most likes', () => {
        const result = listHelper.mostLikes(helper.blogList)
        expect(result.author).toBe('Edsger W. Dijkstra')
        expect(result.likes).toBe(17)
    })

})