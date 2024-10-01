import Song from './Song.js'
import CreatorBoard from './CreatorBoard.js'

export default {

    template:
    `
        <div>
        <CreatorBoard/>
        </div>
    `,
    name:"CreatorSpace",
    components:{
        CreatorBoard
    }
}