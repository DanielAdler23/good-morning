const redundantWords = ['a', 'the', 'and', 'i', 'to', 'you', 'is',
                        'this', 'in', 'for', 'of', 'on', 'all', 'me',
                        'my', 'it', 'up', 'from', 'have', 'at', 'with',
                        'be', 'so', "it's", '[]']

function getPopular(docs) {
    var sortable = [];
    var popular = []
    for (var key in docs[0].words)
        sortable.push([key, docs[0].words[key]])

    sortable.sort(function(a, b) {
        return b[1] - a[1]
    })
    for(var item of sortable)
        if(popular.length < 10 && !redundantWords.includes(item[0]))
            popular.push(item[0])

    return popular
}


module.exports = {
    getPopular
}