const Card = Vue.component('card', {
    template: `
        <div class="card card-result">
        <div class="card-header">
            <p class="card-header-title">{{title}}</p>
            <a class="card-header-icon">
                <span :class="['icon', {'is-favorite': isFavorite}]" @click="toggleFavorite">
                    <i class="fa fa-star"></i>
                </span>
            </a>
            <router-link :to="{name: 'Show', params: {id: id}}">
                Seemore
            </router-link>
        </div>
        <div class="card-content">
            <div class="media">
                <div class="media-left">
                    <figure class="image is-128x200">
                        <img :src="image" alt="Image">
                    </figure>
                </div>
                <div class="media-content">
                    <p class=""> {{created}} - {{seasonsCount}} seasons</p>
                    <p class="tags">
                        <span v-for="(genre, index) in genres" class="tag">
                            {{genre}}
                        </span>
                    <p class="tags">
                        <span class="tag is-primary" :class="{'is-warning' : isWarning}">{{status}}</span>
                    </p>
                    <div class="content" @click="toggleFullDescription">
                        <template v-if="fullDescription">
                            {{description}}
                        </template>
                        <template v-else >
                            {{description | limit(50)}}
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    props: {
        id: {
            required: true,
            type: Number,
        },
        title: {
            required: true,
            type: String
        },
        image: {
            required: true,
            type: String,
        },
        description: {
            required: true,
            type: String
        },
        status: {
            required: true,
            type: String
        },
        created: {
            required: true,
            // type: Date
        },
        seasonsCount: {
            required: true,
            // type: Number,
            default: 0
        },
        genres: {
            required: true,
            type: Array,
        },
        isFavorite: {
            required: false,
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            localIsFavorite: this.isFavorite,
            fullDescription: false,
        }
    },
    computed: {
        isWarning () {
            return this.status !== 'Continuing'
        },
    },
    methods: {
        toggleFavorite(){
            // this.localIsFavorite ^= true
            this.$emit('toggle-favorite', {
                id: this.id,
                status: !this.isFavorite
            })
        },
        toggleFullDescription(){
            this.fullDescription ^= true
        }
    }
})