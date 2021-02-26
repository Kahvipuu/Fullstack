
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => {
        return sum + blog.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
    const likes = blogs.map((blog) => {
        return blog.likes
    })

    const max = Math.max(...likes)

    return blogs.filter((blog) => {
        return blog.likes === max
    })
}

module.exports = { dummy, totalLikes, favoriteBlog }