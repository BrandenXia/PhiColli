const { uniqueNamesGenerator, names } = require('unique-names-generator')

const randomName = () => uniqueNamesGenerator({
    dictionaries: [names],
    length: 1,
})

export default randomName;