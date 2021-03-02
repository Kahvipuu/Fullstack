const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => {
        return sum + blog.likes
    }, 0)
}

const mostBlogs = (blogs) => {
    const authors = blogs.map(b => b.author)
    console.log('most Blogs Authors', authors);

    const uniqAuthors = lodash.uniq(authors)
    console.log('most Blogs Uniq Authors', uniqAuthors);

    let authWithBlogCount = []

    uniqAuthors.forEach(a => {
        const auth = { author: a, blogs: 0 }
        console.log(auth);
        authWithBlogCount = authWithBlogCount.concat(auth)

    })
    console.log('most Blogs Uniq Authors with blogs', authWithBlogCount);
    //tähän asti kai ok
    authors.forEach(a => {
        const index = lodash.findIndex(authWithBlogCount, (i => i.author === a))
        console.log('Authors forEach INDEX', index);
        authWithBlogCount[index].blogs += 1
    })
    return lodash.maxBy(authWithBlogCount, (a => a.blogs))
    // voihan *** kun oli työlästä.. ja lopputulos ei kovinkaan kaunis..
}

const mostLikes = (blogs) => {
    const authors = blogs.map(b => b.author)
    const uniqAuthors = lodash.uniq(authors)
    let authWithBlogCount = []

    uniqAuthors.forEach(a => {
        const auth = { author: a, likes: 0 }
        authWithBlogCount = authWithBlogCount.concat(auth)
    })
    console.log('most Blogs Uniq Authors with blogs', authWithBlogCount);

    blogs.forEach(a => {
        const index = lodash.findIndex(authWithBlogCount, (i => i.author === a.author))
        console.log('Authors forEach INDEX', index);
        authWithBlogCount[index].likes += a.likes
    })
    return lodash.maxBy(authWithBlogCount, (a => a.likes))
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

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }