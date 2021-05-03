export default {
  created() {
    if (process.client) {
      this.socket = this.$nuxtSocket({});
    }
  },
  methods: {
    sendResult(eventName, toSend) {
      this.socket.emit(eventName, toSend, res => {
        console.log(res);
      });
    }
  }
};
