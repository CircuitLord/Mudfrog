







exports.newHome = (MUDFROG, msg) => {

    var input = null;
    
    require(`./homeScreen.js`).run(MUDFROG, msg, input)

}