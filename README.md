# Unemployment Insurance Modernization demo

Unemployment Insurance (UI) intake storybook project built to demonstrate what Truss has learned by working in the UI field as well as provide artifacts to be used for sales, demos, and in future projects. This is intentionally a storybook only project- not a full application- for ease of demo and easier application to existing and future Truss applications.

## Set up

- [Node](https://nodejs.org/en/download/)
  - This project's required Node version can be found in [.tool-versions](./.tool-versions)
  - Since [Node versions](https://nodejs.org/en/about/releases/) enter and exit active LTS status regularly, it is reccomended to use a Node version manager. On Mac use asdf for version management by following these steps:
    - Install asdf if not already installed (https://asdf-vm.com/guide/getting-started.html)
    - Install GnuPG (a prerequisite for asdf controlling Nodejs version)
      ```
      brew install gpg gawk
      ```
    - Install the asdf NodeJS plugin
      ```
      asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git
      ```
    - Check that the nodejs plugin installed correctly with the below command
      ```
      asdf plugin list
      ```
      NOTE: you should see 'nodejs' listed in the terminal as a response
    - Install the correct NodeJS version specified in [.tool-versions](./.tool-versions)
      ```
      asdf install nodejs <version number>
      ```
    - Set the version used above to be applied globally
      ```
      asdf global nodejs <version number>
      ```
    - Double check NodeJs is using the correct version
      ```
      node -v
      ```
    - If you have an issue run the following command and then close and re-open your terminal to be sure changes
      have taken affect
      ```
      asdf reshim nodejs
      ```
    - If you are still running into an issue due to previous installations of node, do the following
      - Add the node version to your path file by opening your startup file (ex. `~/.zshrc` or `~/.bash-profile`)
        and adding the following to the bottom:
        ```
        export PATH=“/Users/<YourUsername>/.asdf/installs/nodejs/<DesiredVersion>//bin:$PATH”
        ```
      - rerun the asdf reshim command to ensure asdf forces a recheck on your setting
        ```
        asdf reshim nodejs
        ```
      - Close and reopen your terminal and check that node is now on the correct version:
        ```
        node -v
        ```
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/)

## Dependencies

- in your Terminal navigate to this directory and run

```
yarn install
```

#### Usage

- in your Terminal navigate to this directory and run

```
yarn storybook
```

- Storybook should open automatically in your local browser at http://localhost:6006/
