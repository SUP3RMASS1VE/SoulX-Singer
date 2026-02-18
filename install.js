module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/Soul-AILab/SoulX-Singer app",
        ]
      }
    },
    {
      method: "fs.copy",
      params: {
        src: "requirements.txt",
        dest: "app/requirements.txt"
      }
    },
    {
      method: "shell.run",
      params: {
        conda: {
          path: "conda_env",
          python: "python=3.10"
        },
        path: "app",
        message: [
          "uv pip install -r requirements.txt"
        ]
      }
    },
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          conda: {
            path: "conda_env",
            python: "python=3.10"
          },
          path: "app",
          xformers: false,
          triton: true,
          sageattention: true
        }
      }
    },
    {
      method: "hf.download",
      params: {
        path: "app",
        _: ["Soul-AILab/SoulX-Singer"],
        "local-dir": "pretrained_models/SoulX-Singer"
      }
    },
    {
      method: "hf.download",
      params: {
        path: "app",
        _: ["Soul-AILab/SoulX-Singer-Preprocess"],
        "local-dir": "pretrained_models/SoulX-Singer-Preprocess"
      }
    }
  ]
}
