class Druid_Channel {
    constructor(channelName) {
        if (!channelName) {
            throw new Error('channelName cannot be empty.')
        }

        this.constructorName = 'druid_channel'
        this.channelName = channelName
        this.listenerList = {}
    }
}

Druid_Channel.prototype = {
    init() {
        let _this = this

        window.addEventListener('storage', function(e) {
            let channelName = e.key

            if (channelName === _this.channelName) {
                let pipe = JSON.parse(e.newValue)
                let pipeName = pipe.name
                let pipeData = pipe.data

                if (_this.listenerList[pipeName]) {
                    _this.listenerList[pipeName](pipeData)
                }
            }
        })

        return this
    },

    add_listener(name, callback) {
        this.listenerList[name] = callback
    },

    add_pipe(name, data, burstMode = false) {
        if (!name) {
            throw new Error('pipe name cannot be empty.')
        }

        if (burstMode) {
            localStorage.setItem(
                this.channelName,
                JSON.stringify({
                    name: Druid_Channel.NULL,
                    data: null,
                })
            )
        }

        localStorage.setItem(
            this.channelName,
            JSON.stringify({
                name,
                data,
            })
        )
    },

    remove_listener(name) {
        this.listenerList[name] = null
    },
}

Druid_Channel.NULL = 'Druid_Channel_NULL'

export default Druid_Channel
