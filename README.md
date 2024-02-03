
# 🚧 UNDER CONSTRUCTION 🚧

<a>
    <img src="https://i.imgur.com/XNquU2o.png" alt="Databricks CoPilot logo" title="Databricks CoPilot" align="right" height="135" />
</a>

# Databricks Copilot 

Github Copilot for Databricks notebooks.

<img src="https://i.imgur.com/NqQyO0V.gif"/>

## Motivation

Replace with non AI Generated text:

>Databricks CoPilot is a tool that helps you write Databricks notebooks faster. It provides code suggestions and completions based on the context of your notebook. 

## Prerequisites:

* [Github Copilot Subscription](https://github.com/features/copilot)
* [VSCode Dev Container Extension](https://code.visualstudio.com/docs/devcontainers/tutorial)
* Chrome
* [Ngrok Account](https://ngrok.com/)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/gardnmi/deductible_dbx.git
    ```

2. Add a `devcontainer.env` file to the `.devcontainer` directory with the following content:

    ```
    # .devcontainer/devcontainer.env

    NGROK_TOKEN=<your_ngrok_token>
    ```



## Usage

```python
import foobar

# returns 'words'
foobar.pluralize('word')

# returns 'geese'
foobar.pluralize('goose')

# returns 'phenomenon'
foobar.singularize('phenomena')
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)