module.exports = {
  daemon: true,
  run: [
    {
      method: "local.set",
      params: {
        port: "{{port}}"
      }
    },
    {
      method: "shell.run",
      params: {
        conda: {
          path: "conda_env",
          python: "python=3.10"
        },
        env: {},
        path: "app",
        message: [
          "python webui.py --port {{local.port}}",
        ],
        on: [{
          event: "/http:\\/\\/\\S+:(\\d+)/",
          done: true
        }]
      }
    },
    {
      method: "local.set",
      params: {
        url: "http://127.0.0.1:{{input.event[1]}}"
      }
    },
    {
      method: "log",
      params: {
        raw: "SoulX-Singer running at {{local.url}}"
      }
    }
  ]
}
